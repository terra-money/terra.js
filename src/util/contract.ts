import { BlockTxBroadcastResult, isTxError } from '../client/lcd/api/TxAPI';
import { TxInfo } from '../core/TxInfo';

/**
 * Serializes a JavaScript object to a JSON string. If the data passed is
 * already a string, it will not be serialized and just return as-is.
 *
 * @param data object to encode
 * @returns JSON string
 */
export function dictToJSONRawMessage(data: any): string {
  // if data is just a plain string, it was not valid JSON so it could not be parsed
  if (typeof data === 'string') {
    return data;
  } else {
    return JSON.stringify(data);
  }
}

/**
 * Recovers a JavaScript object from a JSON string. If an error is encountered
 * while parsing, the string will not be converted and fail by returning the input as-is.
 *
 * @param data string
 * @returns converted object
 */
export function JSONRawMessageToDict(data: string): any {
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
}

export function getCodeId(
  txResult: BlockTxBroadcastResult | TxInfo,
  msgIndex = 0
): string {
  if (
    isTxError(txResult) ||
    txResult.logs === undefined ||
    txResult.logs.length === 0
  ) {
    throw new Error('could not parse code id -- tx logs are empty.');
  }
  const codeId =
    txResult.logs[msgIndex].eventsByType['store_code']['code_id'][0];
  return codeId;
}

export function getContractAddress(
  txResult: BlockTxBroadcastResult | TxInfo,
  msgIndex = 0
): string {
  if (
    isTxError(txResult) ||
    txResult.logs === undefined ||
    txResult.logs.length === 0
  ) {
    throw new Error('could not parse contract address -- tx logs are empty.');
  }
  const contractAddress =
    txResult.logs[msgIndex].eventsByType['instantiate_contract'][
      'contract_address'
    ][0];
  return contractAddress;
}

export interface ContractEvent {
  contract_address: string;
  [key: string]: string;
}

export function getContractEvents(
  txResult: BlockTxBroadcastResult | TxInfo,
  msgIndex = 0
): ContractEvent[] {
  if (
    isTxError(txResult) ||
    txResult.logs === undefined ||
    txResult.logs.length === 0
  ) {
    throw new Error('could not parse contract events -- tx logs are empty.');
  }
  const contractEvents: ContractEvent[] = [];
  for (const event of txResult.logs[msgIndex].events) {
    if (event.type === 'from_contract') {
      let eventData: ContractEvent = { contract_address: '' }; // will be overwritten
      let currentContractAddress = event.attributes[0].value;
      for (const att of event.attributes) {
        if (
          att.key == 'contract_address' &&
          currentContractAddress !== att.value
        ) {
          contractEvents.push(eventData);
          eventData = { contract_address: '' };
          currentContractAddress = att.value;
        }
        eventData[att.key] = att.value;
      }
      contractEvents.push(eventData);
      return contractEvents;
    }
  }
  throw new Error("could not find event type 'from_contract' in logs");
}
