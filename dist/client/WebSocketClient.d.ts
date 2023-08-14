/// <reference types="node" />
import { EventEmitter } from 'events';
declare type Callback = (data: TendermintSubscriptionResponse) => void;
export interface TendermintSubscriptionResponse {
    type: string;
    value: Record<string, any>;
}
export declare type TendermintEventType = 'NewBlock' | 'NewBlockHeader' | 'Evidence' | 'Tx' | 'ValidatorSetUpdates' | 'CompleteProposal' | 'Lock' | 'NewRound' | 'NewRoundStep' | 'Polka' | 'Relock' | 'Relock' | 'TimeoutPropose' | 'TimeoutWait' | 'Unlock' | 'ValidBlock' | 'Vote';
declare type TendermintQueryOperand = string | number | Date;
export interface TendermintQuery {
    [k: string]: TendermintQueryOperand | ['>', number | Date] | ['<', number | Date] | ['<=', number | Date] | ['>=', number | Date] | ['CONTAINS', string] | ['EXISTS'];
}
/**
 * An object repesenting a connection to a Terra node's WebSocket RPC endpoint.
 * This allows for subscribing to Tendermint events through WebSocket.
 *
 * ### Events
 * **error** emitted when error raises
 * **connect** emitted after connection establishment
 * **reconnect** emitted upon every attempt of reconnection
 * **destroyed** emitted when socket has been destroyed
 *
 * ### Example
 *
 * ```ts
 * import { WebSocketClient } from '@terra-money/terra.js';
 *
 * const wsclient = new WebSocketClient("ws://localhost:26657/websocket");
 *
 * wsclient.subscribe('NewBlock', {}, (data) => {
 *    console.log(data.value);
 *
 *    // close after receiving one block.
 *    wsclient.destroy();
 * })
 *
 * wsclient.subscribe(
 * 'Tx',
 *  {
 *    'message.action': 'send',
 *    'message.sender': ['CONTAINS', 'terra1...'],
 *  },
 *  (data) => {
 *    console.log(data.value);
 *
 *   // close after receiving one send Tx
 *   wsclient.destroy();
 * });
 *
 * wsclient.start();
 * ```
 */
export declare class WebSocketClient extends EventEmitter {
    private URL;
    private reconnectCount;
    private reconnectInterval;
    isConnected: boolean;
    private reconnectTimeoutId?;
    private queryParams?;
    private callback?;
    private shouldAttemptReconnect;
    private socket;
    private _reconnectCount;
    /**
     * WebSocketClient constructor
     * @param URL The WebSocket endpoint URL on the Tendermint RPC server.
     *            Ex: ws://localhost:26657/websocket
     * @param reconnectCount 0 for not to attempt reconnect, -1 for infinite, > 0 for number of times to attempt
     * @param reconnectInterval retry interval in milliseconds
     */
    constructor(URL: string, reconnectCount?: number, reconnectInterval?: number);
    /**
     * Destroys class as well as socket
     */
    destroy(): void;
    start(): void;
    private onOpen;
    private onMessage;
    private onClose;
    subscribe(event: TendermintEventType, query: TendermintQuery, callback: Callback): void;
    subscribeTx(query: TendermintQuery, callback: Callback): void;
}
export {};
