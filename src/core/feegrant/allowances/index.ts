import { BasicAllowance } from './BasicAllowance';
import { PeriodicAllowance } from './PeriodicAllowance';
import { AllowedMsgAllowance } from './AllowedMsgAllowance';

export * from './BasicAllowance';
export * from './PeriodicAllowance';
export * from './AllowedMsgAllowance';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';

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

  export function fromAmino(data: Allowance.Amino): Allowance {
    switch (data.type) {
      case 'feegrant/BasicAllowance':
        return BasicAllowance.fromAmino(data);
      case 'feegrant/PeriodicAllowance':
        return PeriodicAllowance.fromAmino(data);
      case 'feegrant/AllowedMsgAllowance':
        return AllowedMsgAllowance.fromAmino(data);
    }
  }

  export function fromData(data: Allowance.Data): Allowance {
    switch (data['@type']) {
      case '/cosmos.feegrant.v1beta1.PeriodicAllowance':
        return PeriodicAllowance.fromData(data);
      case '/cosmos.feegrant.v1beta1.BasicAllowance':
        return BasicAllowance.fromData(data);
      case '/cosmos.feegrant.v1beta1.AllowedMsgAllowance':
        return AllowedMsgAllowance.fromData(data);
    }
  }

  export function fromProto(proto: Any): Allowance {
    switch (proto.typeUrl) {
      case '/cosmos.feegrant.v1beta1.PeriodicAllowance':
        return PeriodicAllowance.unpackAny(proto);
      case '/cosmos.feegrant.v1beta1.BasicAllowance':
        return BasicAllowance.unpackAny(proto);
      case '/cosmos.feegrant.v1beta1.AllowedMsgAllowance':
        return AllowedMsgAllowance.unpackAny(proto);
    }

    throw new Error(`not supported allowance ${proto.typeUrl}`);
  }
}
