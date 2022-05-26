import { BasicAllowance } from './BasicAllowance';
import { PeriodicAllowance } from './PeriodicAllowance';
import { AllowedMsgAllowance } from './AllowedMsgAllowance';

export * from './BasicAllowance';
export * from './PeriodicAllowance';
export * from './AllowedMsgAllowance';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';

export type Allowance =
  | BasicAllowance
  | PeriodicAllowance
  | AllowedMsgAllowance;

export namespace Allowance {
  export type Amino =
    | BasicAllowance.Amino
    | PeriodicAllowance.Amino
    | AllowedMsgAllowance.Amino;

  export type Data =
    | BasicAllowance.Data
    | PeriodicAllowance.Data
    | AllowedMsgAllowance.Data;

  export type Proto =
    | BasicAllowance.Proto
    | PeriodicAllowance.Proto
    | AllowedMsgAllowance.Proto;

  export function fromAmino(
    data: Allowance.Amino,
    isClassic?: boolean
  ): Allowance {
    switch (data.type) {
      case 'feegrant/BasicAllowance':
      case 'cosmos-sdk/BasicAllowance':
        return BasicAllowance.fromAmino(data, isClassic);
      case 'feegrant/PeriodicAllowance':
      case 'cosmos-sdk/PeriodicAllowance':
        return PeriodicAllowance.fromAmino(data, isClassic);
      case 'feegrant/AllowedMsgAllowance':
      case 'cosmos-sdk/AllowedMsgAllowance':
        return AllowedMsgAllowance.fromAmino(data, isClassic);
    }
  }

  export function fromData(
    data: Allowance.Data,
    isClassic?: boolean
  ): Allowance {
    switch (data['@type']) {
      case '/cosmos.feegrant.v1beta1.PeriodicAllowance':
        return PeriodicAllowance.fromData(data, isClassic);
      case '/cosmos.feegrant.v1beta1.BasicAllowance':
        return BasicAllowance.fromData(data, isClassic);
      case '/cosmos.feegrant.v1beta1.AllowedMsgAllowance':
        return AllowedMsgAllowance.fromData(data, isClassic);
    }
  }

  export function fromProto(proto: Any, isClassic?: boolean): Allowance {
    switch (proto.typeUrl) {
      case '/cosmos.feegrant.v1beta1.PeriodicAllowance':
        return PeriodicAllowance.unpackAny(proto, isClassic);
      case '/cosmos.feegrant.v1beta1.BasicAllowance':
        return BasicAllowance.unpackAny(proto, isClassic);
      case '/cosmos.feegrant.v1beta1.AllowedMsgAllowance':
        return AllowedMsgAllowance.unpackAny(proto, isClassic);
    }

    throw new Error(`not supported allowance ${proto.typeUrl}`);
  }
}
