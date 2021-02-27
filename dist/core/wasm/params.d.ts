import { ParamChange } from '..';
declare type MaxContractSize = ParamChange.Type<'wasm', 'maxcontractsize', number>;
declare type MaxContractGas = ParamChange.Type<'wasm', 'maxcontractgas', number>;
declare type MaxContractMsgSize = ParamChange.Type<'wasm', 'maxcontractmsgsize', number>;
export declare type WasmParamChange = MaxContractSize | MaxContractGas | MaxContractMsgSize;
export declare namespace WasmParamChange {
    type Data = ParamChange.Data.Type<MaxContractSize> | ParamChange.Data.Type<MaxContractGas> | ParamChange.Data.Type<MaxContractMsgSize>;
}
export interface WasmParamChanges {
    wasm?: {
        maxcontractsize?: number;
        maxcontractgas?: number;
        maxcontractmsgsize?: number;
    };
}
export declare namespace WasmParamChanges {
    const ConversionTable: {
        wasm: {
            maxcontractsize: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            maxcontractgas: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            maxcontractmsgsize: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
        };
    };
}
export {};
