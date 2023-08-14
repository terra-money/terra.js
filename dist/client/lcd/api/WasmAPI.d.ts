import { BaseAPI } from './BaseAPI';
import { AccAddress } from '../../../core/bech32';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { HistoryEntry } from '../../../core/wasm/HistoryEntry';
import { AbsoluteTxPosition } from '../../../core/wasm/AbsoluteTxPosition';
import { AccessConfig } from '../../../core/wasm';
export interface CodeInfo {
    code_id: number;
    code_hash: string;
    creator: AccAddress;
    instantiate_config?: AccessConfig;
}
export declare namespace CodeInfo {
    interface DataV1 {
        code_id: string;
        code_hash: string;
        creator: AccAddress;
    }
    interface DataV2 {
        code_id: string;
        data_hash: string;
        creator: AccAddress;
        instantiate_permission?: AccessConfig.Data;
    }
}
export interface ContractInfo {
    code_id: number;
    address?: AccAddress;
    creator: AccAddress;
    admin?: AccAddress;
    init_msg?: any;
    label?: string;
    created?: AbsoluteTxPosition;
    ibc_port_id?: string;
}
export declare namespace ContractInfo {
    interface DataV1 {
        code_id: string;
        address: AccAddress;
        creator: AccAddress;
        admin: AccAddress;
        init_msg: any;
    }
    interface DataV2 {
        code_id: string;
        creator: AccAddress;
        admin: AccAddress;
        label?: string;
        created?: AbsoluteTxPosition.Data;
        ibc_port_id?: string;
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
export interface PinnedCodes {
    code_ids: number[];
}
export declare namespace PinnedCodes {
    interface Data {
        code_ids: string[];
    }
}
export interface QueryResult {
    data: string;
}
export declare namespace QueryResult {
    interface Data {
        data: string;
    }
}
export interface Model {
    key: string;
    value: string;
}
export declare namespace Model {
    interface Data {
        key: string;
        value: string;
    }
}
export declare class WasmAPI extends BaseAPI {
    lcd: LCDClient;
    constructor(lcd: LCDClient);
    codeInfo(codeID: number, params?: APIParams): Promise<CodeInfo>;
    contractInfo(contractAddress: AccAddress, params?: APIParams): Promise<ContractInfo>;
    contractQuery<T>(contractAddress: AccAddress, query: object | string, params?: APIParams): Promise<T>;
    parameters(params?: APIParams): Promise<WasmParams>;
    pinnedCodes(params?: APIParams): Promise<PinnedCodes>;
    rawContractState(contractAddress: AccAddress, query_data: string, params?: APIParams): Promise<QueryResult>;
    smartContractState(contractAddress: AccAddress, query_data: object | string, params?: APIParams): Promise<QueryResult>;
    contractHistory(contractAddress: AccAddress, params?: Partial<PaginationOptions & APIParams>): Promise<[HistoryEntry[], Pagination]>;
    contractStates(contractAddress: AccAddress, params?: Partial<PaginationOptions & APIParams>): Promise<[Model[], Pagination]>;
    allCodes(params?: Partial<PaginationOptions & APIParams>): Promise<[CodeInfo[], Pagination]>;
}
