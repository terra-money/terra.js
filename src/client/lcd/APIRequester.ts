import Axios, { AxiosInstance } from 'axios';

export interface APIResponse<T> {
  height: string;
  result: T;
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

  public async getRaw<T>(endpoint: string, params?: any): Promise<T> {
    return this.axios.get(endpoint, { params }).then(d => d.data);
  }

  public async get<T>(endpoint: string, params?: any): Promise<APIResponse<T>> {
    return this.axios.get(endpoint, { params }).then(d => d.data);
  }

  public async postRaw<T>(endpoint: string, data?: any): Promise<T> {
    return this.axios.post(endpoint, data).then(d => d.data);
  }

  public async post<T>(endpoint: string, data?: any): Promise<APIResponse<T>> {
    return this.axios.post(endpoint, data).then(d => d.data);
  }
}
