import { APIRequester } from '../APIRequester';

export abstract class BaseAPI {
  constructor(protected c: APIRequester) {}
}
