import {
  WaitTxBroadcastResult,
  BlockTxBroadcastResult,
  isTxError,
} from '../client/lcd/api/TxAPI';
import { TxInfo } from '../core/TxInfo';

export function getCodeId(
  txResult: WaitTxBroadcastResult | BlockTxBroadcastResult | TxInfo,
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
  txResult: WaitTxBroadcastResult | BlockTxBroadcastResult | TxInfo,
  msgIndex = 0,
  isClassic = false
): string {
  if (
    isTxError(txResult) ||
    txResult.logs === undefined ||
    txResult.logs.length === 0
  ) {
    throw new Error('could not parse contract address -- tx logs are empty.');
  }
  let eventName: string;
  let attributeKey: string;
  if (isClassic) {
    eventName = 'instantiate_contract';
    attributeKey = 'contract_address';
  } else {
    eventName = 'wasm';
    attributeKey = '_contract_address';
  }
  const contractAddress =
    txResult.logs[msgIndex].eventsByType[eventName][attributeKey][0];
  return contractAddress;
}

export interface ContractEvent {
  contract_address: string;
  [key: string]: string;
}

export function getContractEvents(
  txResult: WaitTxBroadcastResult | BlockTxBroadcastResult | TxInfo,
  msgIndex = 0,
  isClassic = false
): ContractEvent[] {
  if (
    isTxError(txResult) ||
    txResult.logs === undefined ||
    txResult.logs.length === 0
  ) {
    throw new Error('could not parse contract events -- tx logs are empty.');
  }

  let eventName: string;
  let attributeKey: string;
  if (isClassic) {
    eventName = 'from_contract';
    attributeKey = 'contract_address';
  } else {
    eventName = 'instantiate';
    attributeKey = '_contract_address';
  }

  const contractEvents: ContractEvent[] = [];
  for (const event of txResult.logs[msgIndex].events) {
    if (event.type === eventName) {
      let eventData: ContractEvent = { contract_address: '' }; // will be overwritten
      let currentContractAddress = event.attributes[0].value;
      for (const att of event.attributes) {
        if (att.key == attributeKey && currentContractAddress !== att.value) {
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
  throw new Error(`could not find event type ${eventName} in logs`);
}
