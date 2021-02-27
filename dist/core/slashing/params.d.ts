import { ParamChange } from '../params/ParamChange';
import { Dec } from '../numeric';
export declare type MaxEvidenceAge = ParamChange.Type<'slashing', 'MaxEvidenceAge', number>;
export declare type SignedBlocksWindow = ParamChange.Type<'slashing', 'SignedBlocksWindow', number>;
export declare type MinSignedPerWindow = ParamChange.Type<'slashing', 'MinSignedPerWindow', Dec>;
export declare type DowntimeJailDuration = ParamChange.Type<'slashing', 'DowntimeJailDuration', number>;
export declare type SlashFractionDoubleSign = ParamChange.Type<'slashing', 'SlashFractionDoubleSign', Dec>;
export declare type SlashFractionDowntime = ParamChange.Type<'slashing', 'SlashFractionDowntime', Dec>;
export declare type SlashingParamChange = MaxEvidenceAge | SignedBlocksWindow | MinSignedPerWindow | DowntimeJailDuration | SlashFractionDoubleSign | SlashFractionDowntime;
export declare namespace SlashingParamChange {
    type Data = ParamChange.Data.Type<MaxEvidenceAge> | ParamChange.Data.Type<SignedBlocksWindow> | ParamChange.Data.Type<MinSignedPerWindow> | ParamChange.Data.Type<DowntimeJailDuration> | ParamChange.Data.Type<SlashFractionDoubleSign> | ParamChange.Data.Type<SlashFractionDowntime>;
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
export declare namespace SlashingParamChanges {
    const ConversionTable: {
        slashing: {
            MaxEvidenceAge: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            SignedBlocksWindow: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            MinSignedPerWindow: (((c: import("decimal.js").default.Value) => Dec) | ((c: any) => string))[];
            DowntimeJailDuration: (((string: string, radix?: number | undefined) => number) | ((c: any) => string))[];
            SlashFractionDoubleSign: (((c: import("decimal.js").default.Value) => Dec) | ((c: any) => string))[];
            SlashFractionDowntime: (((c: import("decimal.js").default.Value) => Dec) | ((c: any) => string))[];
        };
    };
}
