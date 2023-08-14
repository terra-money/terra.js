import { WaitTxBroadcastResult, BlockTxBroadcastResult } from '../client/lcd/api/TxAPI';
import { TxInfo } from '../core/TxInfo';
export declare function getCodeId(txResult: WaitTxBroadcastResult | BlockTxBroadcastResult | TxInfo, msgIndex?: number): string;
export declare function getContractAddress(txResult: WaitTxBroadcastResult | BlockTxBroadcastResult | TxInfo, msgIndex?: number, isClassic?: boolean): string;
export interface ContractEvent {
    contract_address: string;
    [key: string]: string;
}
export declare function getContractEvents(txResult: WaitTxBroadcastResult | BlockTxBroadcastResult | TxInfo, msgIndex?: number, isClassic?: boolean): ContractEvent[];
