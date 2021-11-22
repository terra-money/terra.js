import Axios, { AxiosInstance } from 'axios';
import { OrderBy as OrderBy_pb } from '@terra-money/terra.proto/cosmos/tx/v1beta1/service';

export type APIParams = Record<string, string | number | null | undefined>;

export interface Pagination {
  next_key: string | null;
  total: number;
}

export const OrderBy = OrderBy_pb;
export type OrderBy = OrderBy_pb;

export interface PaginationOptions {
  'pagination.limit': string;
  'pagination.offset': string;
  'pagination.key': string;
  'pagination.count_total': 'true' | 'false';
  'pagination.reverse': 'true' | 'false';
  order_by: keyof typeof OrderBy;
}

export class APIRequester {
  private axios: AxiosInstance;
  constructor(baseURL: string) {
    this.axios = Axios.create({
      baseURL,
      headers: {
        Accept: 'application/json',
      },
      timeout: 30000,
    });
  }

  public async getRaw<T>(
    endpoint: string,
    params: URLSearchParams | APIParams = {}
  ): Promise<T> {
    return this.axios.get(endpoint, { params }).then(d => d.data);
  }

  public async get<T>(
    endpoint: string,
    params: URLSearchParams | APIParams = {}
  ): Promise<T> {
    return this.axios.get(endpoint, { params }).then(d => d.data);
  }

  public async postRaw<T>(endpoint: string, data?: any): Promise<T> {
    return this.axios.post(endpoint, data).then(d => d.data);
  }

  public async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.axios.post(endpoint, data).then(d => d.data);
  }
}
