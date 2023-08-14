import { BasicAllowance } from './BasicAllowance';
import { PeriodicAllowance } from './PeriodicAllowance';
import { AllowedMsgAllowance } from './AllowedMsgAllowance';
export * from './BasicAllowance';
export * from './PeriodicAllowance';
export * from './AllowedMsgAllowance';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
export declare type Allowance = BasicAllowance | PeriodicAllowance | AllowedMsgAllowance;
export declare namespace Allowance {
    type Amino = BasicAllowance.Amino | PeriodicAllowance.Amino | AllowedMsgAllowance.Amino;
    type Data = BasicAllowance.Data | PeriodicAllowance.Data | AllowedMsgAllowance.Data;
    type Proto = BasicAllowance.Proto | PeriodicAllowance.Proto | AllowedMsgAllowance.Proto;
    function fromAmino(data: Allowance.Amino, isClassic?: boolean): Allowance;
    function fromData(data: Allowance.Data, isClassic?: boolean): Allowance;
    function fromProto(proto: Any, isClassic?: boolean): Allowance;
}
