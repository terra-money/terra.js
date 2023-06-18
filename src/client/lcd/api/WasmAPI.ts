import { BaseAPI } from './BaseAPI';
import { AccAddress } from '../../../core/bech32';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { HistoryEntry } from '../../../core/wasm/HistoryEntry';
import { AbsoluteTxPosition } from '../../../core/wasm/AbsoluteTxPosition';
import { AccessConfig } from '../../../core/wasm';

export interface CodeInfo {
  code_id: number;
  code_hash: string; // TODO: rename it to data_hash when bumping to v4
  creator: AccAddress;
  instantiate_config?: AccessConfig;
}

export namespace CodeInfo {
  export interface Data {
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
  init_msg?: any; // object
  // new properties
  label?: string;
  created?: AbsoluteTxPosition;
  ibc_port_id?: string;
}

export namespace ContractInfo {
  export interface Data {
    code_id: string;
    creator: AccAddress;
    admin: AccAddress;
    label?: string;
    created?: AbsoluteTxPosition.Data;
    ibc_port_id?: string;
  }
}

export interface CodeParams {
  code_upload_access: {
    permission: CodeParams.Permission;
    address: AccAddress;
    addresses: AccAddress[];
  };
  instantiate_default_permission: CodeParams.Permission;
}

export namespace CodeParams {
  export type Permission =
    | 'Nobody'
    | 'OnlyAddress'
    | 'Everybody'
    | 'AnyOfAddresses';
  export interface Data {
    code_upload_access: {
      permission: Permission;
      address: AccAddress;
      addresses: AccAddress[];
    };
    instantiate_default_permission: Permission;
  }
}

export interface PinnedCodes {
  code_ids: number[];
}

export namespace PinnedCodes {
  export interface Data {
    code_ids: string[];
  }
}
export interface QueryResult {
  data: string;
}
export namespace QueryResult {
  export interface Data {
    data: string;
  }
}

export interface Model {
  key: string;
  value: string;
}

export namespace Model {
  export interface Data {
    key: string;
    value: string;
  }
}

export class WasmAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  public async codeInfo(
    codeID: number,
    params: APIParams = {}
  ): Promise<CodeInfo> {
    const endpoint = `/cosmwasm/wasm/v1/code/${codeID}`;

    return this.c
      .get<{ code_info: CodeInfo.Data }>(endpoint, params)
      .then(({ code_info: d }) => ({
        code_id: +d.code_id,
        code_hash: d.data_hash,
        creator: d.creator,
        instantiate_permission: d.instantiate_permission
          ? AccessConfig.fromData(d.instantiate_permission)
          : undefined,
      }));
  }

  public async contractInfo(
    contractAddress: AccAddress,
    params: APIParams = {}
  ): Promise<ContractInfo> {
    // new endpoint doesn't return init_msg so have to retrieve it from history
    const [historyEntry] = await this.contractHistory(contractAddress);

    const endpoint = `/cosmwasm/wasm/v1/contract/${contractAddress}`;
    return this.c
      .get<{ contract_info: ContractInfo.Data }>(endpoint, params)
      .then(({ contract_info: d }) => ({
        code_id: Number.parseInt(d.code_id),
        address: contractAddress,
        creator: d.creator,
        admin: d.admin !== '' ? d.admin : undefined,
        label: d.label !== '' ? d.label : undefined,
        init_msg: historyEntry[0].msg,
        created: d.created ? AbsoluteTxPosition.fromData(d.created) : undefined,
        ibc_port_id: d.ibc_port_id !== '' ? d.ibc_port_id : undefined,
      }));
  }

  public async contractQuery<T>(
    contractAddress: AccAddress,
    query: object | string,
    params: APIParams = {}
  ): Promise<T> {
    const query_msg = Buffer.from(JSON.stringify(query), 'utf-8').toString(
      'base64'
    );
    const endpoint = `/cosmwasm/wasm/v1/contract/${contractAddress}/smart/${query_msg}`;
    return this.c
      .get<{ data: T }>(endpoint, {
        ...params,
      })
      .then(d => d.data);
  }

  public async codeParams(params: APIParams = {}): Promise<CodeParams> {
    return this.c
      .get<{ params: CodeParams.Data }>(
        `/cosmwasm/wasm/v1/codes/params`,
        params
      )
      .then(({ params: d }) => ({
        code_upload_access: d.code_upload_access,
        instantiate_default_permission: d.instantiate_default_permission,
      }));
  }

  public async pinnedCodes(params: APIParams = {}): Promise<PinnedCodes> {
    return this.c
      .get<{ pinned_code: PinnedCodes.Data }>(
        `/cosmwasm/wasm/v1/codes/pinned`,
        params
      )
      .then(({ pinned_code: d }) => ({
        code_ids: d.code_ids.map(code_id => Number.parseInt(code_id)),
      }));
  }

  public async rawContractState(
    contractAddress: AccAddress,
    query_data: string,
    params: APIParams = {}
  ): Promise<QueryResult> {
    return this.c
      .get<{ result: QueryResult.Data }>(
        `/cosmwasm/wasm/v1/contract/${contractAddress}/raw/${Buffer.from(
          query_data,
          'utf-8'
        ).toString('base64')}`,
        params
      )
      .then(({ result: d }) => ({
        data: Buffer.from(d.data, 'base64').toString(),
      }));
  }

  public async smartContractState(
    contractAddress: AccAddress,
    query_data: object | string,
    params: APIParams = {}
  ): Promise<QueryResult> {
    return this.c
      .get<{ result: QueryResult.Data }>(
        `/cosmwasm/wasm/v1/contract/${contractAddress}/smart/${Buffer.from(
          JSON.stringify(query_data),
          'utf-8'
        ).toString('base64')}`,
        params
      )
      .then(({ result: d }) => ({
        data: d.data,
      }));
  }

  public async contractHistory(
    contractAddress: AccAddress,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[HistoryEntry[], Pagination]> {
    return this.c
      .get<{
        entries: HistoryEntry.Data[];
        pagination: Pagination;
      }>(`/cosmwasm/wasm/v1/contract/${contractAddress}/history`, params)
      .then(d => [
        d.entries.map(entry => HistoryEntry.fromData(entry)),
        d.pagination,
      ]);
  }

  public async contractStates(
    contractAddress: AccAddress,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Model[], Pagination]> {
    return this.c
      .get<{
        models: Model.Data[];
        pagination: Pagination;
      }>(`/cosmwasm/wasm/v1/contract/${contractAddress}/state`, params)
      .then(d => [
        d.models.map(model => {
          return {
            key: model.key,
            value: model.value,
          };
        }),
        d.pagination,
      ]);
  }

  public async allCodes(
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[CodeInfo[], Pagination]> {
    return this.c
      .get<{
        codeInfos: CodeInfo.Data[];
        pagination: Pagination;
      }>(`/cosmwasm/wasm/v1/code`, params)
      .then(d => [
        d.codeInfos.map(codeInfo => {
          return {
            code_id: +codeInfo.code_id,
            code_hash: codeInfo.data_hash,
            creator: codeInfo.creator,
            instantiate_permission: codeInfo.instantiate_permission
              ? AccessConfig.fromData(codeInfo.instantiate_permission)
              : undefined,
          };
        }),
        d.pagination,
      ]);
  }
}
