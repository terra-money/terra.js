import WebSocket from 'ws';
import { hashAmino } from '../util/hash';

export interface WebSocketClientConfig {
  /**
   * The WebSocket endpoint URL on the Tendermint RPC server.
   * Ex: ws://localhost:26657/websocket
   */
  URL: string;
}

export interface TendermintSubscriptionResponse {
  type: string;
  value: Record<string, any>;
}

export type TendermintEventType =
  | 'NewBlock'
  | 'NewBlockHeader'
  | 'Evidence'
  | 'Tx'
  | 'ValidatorSetUpdates'
  | 'CompleteProposal'
  | 'Lock'
  | 'NewRound'
  | 'NewRoundStep'
  | 'Polka'
  | 'Relock'
  | 'Relock'
  | 'TimeoutPropose'
  | 'TimeoutWait'
  | 'Unlock'
  | 'ValidBlock'
  | 'Vote';

type TendermintQueryOperand = string | number | Date;

interface TendermintQuery {
  [k: string]:
    | TendermintQueryOperand
    | ['>', number | Date]
    | ['<', number | Date]
    | ['<=', number | Date]
    | ['>=', number | Date]
    | ['CONTAINS', string]
    | ['EXISTS'];
}

const escapeSingleQuotes = (str: string) => str.replace(/'/g, "\\'");

function makeQueryString(query: TendermintQuery): string {
  const queryBuilder: string[] = [];
  for (const key of Object.keys(query)) {
    let queryItem: string;
    const value = query[key];
    // if value is scalar
    if (!Array.isArray(value)) {
      switch (typeof value) {
        case 'number':
          queryItem = `${key}=${value}`;
          break;
        case 'string':
          queryItem = `${key}='${escapeSingleQuotes(value)}'`;
          break;
        default:
          // Date
          queryItem = `${key}=${value.toISOString()}`;
      }
    } else {
      switch (value[0]) {
        case '>':
        case '<':
        case '<=':
        case '>=':
          if (typeof value[1] !== 'number') {
            queryItem = `${key}${value[0]}${value[1].toISOString()}`;
          } else {
            queryItem = `${key}${value[0]}${value[1]}`;
          }
          break;
        case 'CONTAINS':
          queryItem = `${key} CONTAINS '${escapeSingleQuotes(value[1])}'`;
          break;
        case 'EXISTS':
          queryItem = `${key} EXISTS`;
          break;
      }
    }
    queryBuilder.push(queryItem);
  }
  return queryBuilder.join(' AND ');
}

/**
 * An object repesenting a connection to a Terra node's WebSocket RPC endpoint.
 * This allows for subscribing to Tendermint events through WebSocket.
 *
 * ### Example
 *
 * ```ts
 * import { WebSocketClient } from '@terra-money/terra.js';
 *
 * const wsclient = new WebSocketClient({
 *    URL: "ws://localhost:26657/websocket",
 * });
 *
 * wsclient.subscribe('NewBlock', {}, (data, socket) => {
 *    console.log(data.value);
 *
 *    // close after receiving one block.
 *    socket.close();
 * })
 *
 * wsclient.subscribe(
 * 'Tx',
 *  {
 *    'message.action': 'send',
 *    'message.sender': ['CONTAINS', 'terra1...'],
 *  },
 *  (data, socket) => {
 *    console.log(data.value);
 *
 *   // close after receiving one send Tx
 *   socket.close();
 * });
 * ```
 */
export class WebSocketClient {
  public config: WebSocketClientConfig;
  constructor(config: WebSocketClientConfig) {
    this.config = {
      ...config,
    };
  }

  public subscribe(
    event: TendermintEventType,
    query: TendermintQuery,
    callback: (data: TendermintSubscriptionResponse, socket: WebSocket) => void
  ): void {
    const ws = new WebSocket(this.config.URL);
    const queryString = makeQueryString({
      'tm.event': event,
      ...query,
    });

    ws.on('open', () => {
      ws.send(
        JSON.stringify({
          jsonrpc: '2.0',
          method: 'subscribe',
          params: [queryString],
          id: 1,
        })
      );
    });

    ws.on('message', data => {
      const parsedData = JSON.parse(data.toString());
      if (parsedData.result && parsedData.result.query === queryString) {
        callback(parsedData.result.data, ws);
      }
    });
  }

  public subscribeTx(
    query: TendermintQuery,
    callback: (data: TendermintSubscriptionResponse, socket: WebSocket) => any
  ): void {
    const newCallback = (d: TendermintSubscriptionResponse, s: WebSocket) => {
      d.value.TxResult.txhash = hashAmino(d.value.TxResult.tx);
      return callback(d, s);
    };
    return this.subscribe('Tx', query, newCallback);
  }
}
