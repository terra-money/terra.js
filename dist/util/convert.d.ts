import { JSONSerializable } from './json';
import { Dec, Numeric } from '../core/numeric';
export declare namespace Convert {
    const id: (c: any) => any;
    const toDec: (c: Numeric.Input) => Dec;
    const toString: (c: any) => string;
    const toFixed: (c: number) => string;
    const toNumber: (string: string, radix?: number | undefined) => number;
    const toData: (c: JSONSerializable<any, any, any>) => any;
}
