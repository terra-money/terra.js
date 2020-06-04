import { BaseAPI } from './BaseAPI';
import { AccAddress } from '../../../core/strings';

export interface CodeInfo {
  code_hash: string;
  code_creator: AccAddress;
}

export interface ContractInfo {
  code_id: number;
  address: AccAddress;
  creator: AccAddress;
  init_msg: any; // object
}

export namespace ContractInfo {
  export interface Data {
    code_id: string;
    address: AccAddress;
    creator: AccAddress;
    init_msg: string;
  }
}

export class WasmAPI extends BaseAPI {
  public async codeInfo(codeID: number): Promise<CodeInfo> {
    return this.c.get<CodeInfo>(`/wasm/code/${codeID}`).then(d => d.result);
  }

  public async contractInfo(
    contractAddress: AccAddress
  ): Promise<ContractInfo> {
    return this.c
      .get<ContractInfo.Data>(`/wasm/contract/${contractAddress}`)
      .then(d => d.result)
      .then(d => ({
        code_id: Number.parseInt(d.code_id),
        address: d.address,
        creator: d.creator,
        init_msg: JSON.parse(new Buffer(d.init_msg, 'base64').toString()),
      }));
  }

  public async contractQuery(
    contractAddress: AccAddress,
    query: any
  ): Promise<any> {
    return this.c
      .get<any>(`/wasm/contract/${contractAddress}/store`, {
        query_msg: JSON.stringify(query),
      })
      .then(d => d.result);
  }
}
