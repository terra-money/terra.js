import { ParamChange } from '../params/ParamChange';
import { Convert } from '../../util/convert';

type MaxContractSize = ParamChange.Type<'wasm', 'MaxContractSize', number>;

type MaxContractGas = ParamChange.Type<'wasm', 'MaxContractGas', number>;

type MaxContractMsgSize = ParamChange.Type<
  'wasm',
  'MaxContractMsgSize',
  number
>;

export type WasmParamChange =
  | MaxContractSize
  | MaxContractGas
  | MaxContractMsgSize;

export namespace WasmParamChange {
  export type Data =
    | ParamChange.Data.Type<MaxContractSize>
    | ParamChange.Data.Type<MaxContractGas>
    | ParamChange.Data.Type<MaxContractMsgSize>;
}

export interface WasmParamChanges {
  wasm?: {
    MaxContractSize?: number;
    MaxContractGas?: number;
    MaxContractMsgSize?: number;
  };
}

export namespace WasmParamChanges {
  export const ConversionTable = {
    wasm: {
      MaxContractSize: [Convert.toNumber, Convert.toFixed],
      MaxContractGas: [Convert.toNumber, Convert.toFixed],
      MaxContractMsgSize: [Convert.toNumber, Convert.toFixed],
    },
  };
}
