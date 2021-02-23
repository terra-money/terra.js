import { BaseAPI } from './BaseAPI';
import { AccAddress } from '../../../core/strings';
export interface CodeInfo {
    code_hash: string;
    code_creator: AccAddress;
}
export interface ContractInfo {
    code_id: number;
    address: AccAddress;
    owner: AccAddress;
    init_msg: any;
    migratable: boolean;
}
export declare namespace ContractInfo {
    interface Data {
        code_id: string;
        address: AccAddress;
        owner: AccAddress;
        init_msg: string;
        migratable: boolean;
    }
}
export interface WasmParams {
    max_contract_size: number;
    max_contract_gas: number;
    max_contract_msg_size: number;
}
export declare namespace WasmParams {
    interface Data {
        max_contract_size: string;
        max_contract_gas: string;
        max_contract_msg_size: string;
    }
}
export declare class WasmAPI extends BaseAPI {
    codeInfo(codeID: number): Promise<CodeInfo>;
    contractInfo(contractAddress: AccAddress): Promise<ContractInfo>;
    contractQuery<T>(contractAddress: AccAddress, query: object): Promise<T>;
    parameters(): Promise<WasmParams>;
}
