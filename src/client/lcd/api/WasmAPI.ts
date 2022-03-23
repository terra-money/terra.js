import { BaseAPI } from './BaseAPI';
import { AccAddress } from '../../../core/bech32';
import { APIParams } from '../APIRequester';

export interface CodeInfo {
  code_id: number;
  code_hash: string;
  creator: AccAddress;
}

export namespace CodeInfo {
  export interface Data {
    code_id: string;
    code_hash: string;
    creator: AccAddress;
  }
}

export interface ContractInfo {
  code_id: number;
  address: AccAddress;
  creator: AccAddress;
  admin?: AccAddress;
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
  public async codeInfo(
    codeID: number,
    params: APIParams = {}
  ): Promise<CodeInfo> {
    return this.c
      .get<{ code_info: CodeInfo.Data }>(
        `/terra/wasm/v1beta1/codes/${codeID}`,
        params
      )
      .then(({ code_info: d }) => ({
        code_id: Number.parseInt(d.code_id),
        code_hash: d.code_hash,
        creator: d.creator,
      }));
  }

  public async contractInfo(
    contractAddress: AccAddress,
    params: APIParams = {}
  ): Promise<ContractInfo> {
    return this.c
      .get<{ contract_info: ContractInfo.Data }>(
        `/terra/wasm/v1beta1/contracts/${contractAddress}`,
        params
      )
      .then(({ contract_info: d }) => ({
        code_id: Number.parseInt(d.code_id),
        address: d.address,
        creator: d.creator,
        admin: d.admin !== '' ? d.admin : undefined,
        init_msg: d.init_msg,
      }));
  }

  public async contractQuery<T>(
    contractAddress: AccAddress,
    query: object | string,
    params: APIParams = {}
  ): Promise<T> {
    return this.c
      .get<{ query_result: T }>(
        `/terra/wasm/v1beta1/contracts/${contractAddress}/store`,
        {
          ...params,
          query_msg: Buffer.from(JSON.stringify(query), 'utf-8').toString(
            'base64'
          ),
        }
      )
      .then(d => d.query_result);
  }

  public async parameters(params: APIParams = {}): Promise<WasmParams> {
    return this.c
      .get<{ params: WasmParams.Data }>(`/terra/wasm/v1beta1/params`, params)
      .then(({ params: d }) => ({
        max_contract_size: Number.parseInt(d.max_contract_size),
        max_contract_gas: Number.parseInt(d.max_contract_gas),
        max_contract_msg_size: Number.parseInt(d.max_contract_msg_size),
      }));
  }
}
