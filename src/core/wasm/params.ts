import { ParamChange } from '..';
import { Convert } from '../../util/convert';

type MaxContractSize = ParamChange.Type<'wasm', 'maxcontractsize', number>;

type MaxContractGas = ParamChange.Type<'wasm', 'maxcontractgas', number>;

type MaxContractMsgSize = ParamChange.Type<
  'wasm',
  'maxcontractmsgsize',
  number
>;

type GasMultiplier = ParamChange.Type<'wasm', 'gasmultiplier', number>;

export type WasmParamChange =
  | MaxContractSize
  | MaxContractGas
  | MaxContractMsgSize
  | GasMultiplier;

export namespace WasmParamChange {
  export type Data =
    | ParamChange.Data.Type<MaxContractSize>
    | ParamChange.Data.Type<MaxContractGas>
    | ParamChange.Data.Type<MaxContractMsgSize>
    | ParamChange.Data.Type<GasMultiplier>;
}

export interface WasmParamChanges {
  wasm?: {
    maxcontractsize?: number;
    maxcontractgas?: number;
    maxcontractmsgsize?: number;
    gasmultiplier?: number;
  };
}

export namespace WasmParamChanges {
  export const ConversionTable = {
    wasm: {
      maxcontractsize: [Convert.toNumber, Convert.toFixed],
      maxcontractgas: [Convert.toNumber, Convert.toFixed],
      maxcontractmsgsize: [Convert.toNumber, Convert.toFixed],
      gasmultiplier: [Convert.toNumber, Convert.toFixed],
    },
  };
}
