import { ParamChange } from '../params/ParamChange';
import { Convert } from '../../util/convert';
import { Dec } from '../numeric';

export type MaxEvidenceAge = ParamChange.Type<
  'slashing',
  'MaxEvidenceAge',
  number
>;

export type SignedBlocksWindow = ParamChange.Type<
  'slashing',
  'SignedBlocksWindow',
  number
>;

export type MinSignedPerWindow = ParamChange.Type<
  'slashing',
  'MinSignedPerWindow',
  Dec
>;

export type DowntimeJailDuration = ParamChange.Type<
  'slashing',
  'DowntimeJailDuration',
  number
>;

export type SlashFractionDoubleSign = ParamChange.Type<
  'slashing',
  'SlashFractionDoubleSign',
  Dec
>;

export type SlashFractionDowntime = ParamChange.Type<
  'slashing',
  'SlashFractionDowntime',
  Dec
>;

export type SlashingParamChange =
  | MaxEvidenceAge
  | SignedBlocksWindow
  | MinSignedPerWindow
  | DowntimeJailDuration
  | SlashFractionDoubleSign
  | SlashFractionDowntime;

export namespace SlashingParamChange {
  export type Data =
    | ParamChange.Data.Type<MaxEvidenceAge>
    | ParamChange.Data.Type<SignedBlocksWindow>
    | ParamChange.Data.Type<MinSignedPerWindow>
    | ParamChange.Data.Type<DowntimeJailDuration>
    | ParamChange.Data.Type<SlashFractionDoubleSign>
    | ParamChange.Data.Type<SlashFractionDowntime>;
}

export interface SlashingParamChanges {
  slashing?: {
    MaxEvidenceAge?: number;
    SignedBlocksWindow?: number;
    MinSignedPerWindow?: Dec;
    DowntimeJailDuration?: number;
    SlashFractionDoubleSign?: Dec;
    SlashFractionDowntime?: Dec;
  };
}
