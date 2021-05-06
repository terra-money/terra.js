import { ParamChange } from '..';
import { EventParams } from './EventParams';
import { Convert } from '../../util/convert';

type MaxContractSize = ParamChange.Type<'wasm', 'MaxContractSize', number>;

type MaxContractGas = ParamChange.Type<'wasm', 'MaxContractGas', number>;

type MaxContractMsgSize = ParamChange.Type<
  'wasm',
  'MaxContractMsgSize',
  number
>;

type MaxContractDataSize = ParamChange.Type<
  'wasm',
  'MaxContractDataSize',
  number
>;

export type EventPolicy = ParamChange.Type<'wasm', 'EventParams', EventParams>;

export type WasmParamChange =
  | MaxContractSize
  | MaxContractGas
  | MaxContractMsgSize
  | MaxContractDataSize
  | EventPolicy;

export namespace WasmParamChange {
  export type Data =
    | ParamChange.Data.Type<MaxContractSize>
    | ParamChange.Data.Type<MaxContractGas>
    | ParamChange.Data.Type<MaxContractMsgSize>
    | ParamChange.Data.Type<MaxContractDataSize>
    | ParamChange.Data.Type<EventPolicy>;
}

export interface WasmParamChanges {
  wasm?: {
    MaxContractSize?: number;
    MaxContractGas?: number;
    MaxContractMsgSize?: number;
    MaxContractDataSize?: number;
    EventParams?: EventParams;
  };
}

export namespace WasmParamChanges {
  export const ConversionTable = {
    wasm: {
      MaxContractSize: [Convert.toNumber, Convert.toFixed],
      MaxContractGas: [Convert.toNumber, Convert.toFixed],
      MaxContractMsgSize: [Convert.toNumber, Convert.toFixed],
      MaxContractDataSize: [Convert.toNumber, Convert.toFixed],
      EventParams: [Convert.toEventParams, Convert.toData],
    },
  };
}
