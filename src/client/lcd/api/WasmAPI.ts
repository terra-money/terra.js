import { BaseAPI } from './BaseAPI';
import { AccAddress } from '../../../core/bech32';

export interface CodeInfo {
  code_hash: string;
  creator: AccAddress;
}

export interface ContractInfo {
  code_id: number;
  address: AccAddress;
  creator: AccAddress;
  admin: AccAddress;
  init_msg: any; // object
}

export namespace ContractInfo {
  export interface Data {
    code_id: string;
    address: AccAddress;
    creator: AccAddress;
    admin: AccAddress;
    init_msg: any; // object
  }
}

export interface WasmParams {
  max_contract_size: number;
  max_contract_gas: number;
  max_contract_msg_size: number;
}

export namespace WasmParams {
  export interface Data {
    max_contract_size: string;
    max_contract_gas: string;
    max_contract_msg_size: string;
  }
}

export class WasmAPI extends BaseAPI {
  public async codeInfo(codeID: number): Promise<CodeInfo> {
    return this.c.get<CodeInfo>(`/wasm/codes/${codeID}`).then(d => d.result);
  }

  public async contractInfo(
    contractAddress: AccAddress
  ): Promise<ContractInfo> {
    return this.c
      .get<ContractInfo.Data>(`/wasm/contracts/${contractAddress}`)
      .then(({ result: d }) => ({
        code_id: Number.parseInt(d.code_id),
        address: d.address,
        creator: d.creator,
        admin: d.admin,
        init_msg: d.init_msg,
      }));
  }

  public async contractQuery<T>(
    contractAddress: AccAddress,
    query: object
  ): Promise<T> {
    return this.c
      .get<T>(`/wasm/contracts/${contractAddress}/store`, {
        query_msg: JSON.stringify(query),
      })
      .then(d => d.result);
  }

  public async parameters(): Promise<WasmParams> {
    return this.c
      .get<WasmParams.Data>(`/wasm/parameters`)
      .then(({ result: d }) => ({
        max_contract_size: Number.parseInt(d.max_contract_size),
        max_contract_gas: Number.parseInt(d.max_contract_gas),
        max_contract_msg_size: Number.parseInt(d.max_contract_msg_size),
      }));
  }
}
