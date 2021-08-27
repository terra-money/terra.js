import { BasicAllowance } from './BasicAllowance';
import { PeriodicAllowance } from './PeriodicAllowance';
import { AllowedMsgAllowance } from './AllowedMsgAllowance';

export * from './BasicAllowance';
export * from './PeriodicAllowance';
export * from './AllowedMsgAllowance';

export type Allowance =
  | BasicAllowance
  | PeriodicAllowance
  | AllowedMsgAllowance;

export namespace Allowance {
  export type Data =
    | BasicAllowance.Data
    | PeriodicAllowance.Data
    | AllowedMsgAllowance.Data;

  export type Proto =
    | BasicAllowance.Proto
    | PeriodicAllowance.Proto
    | AllowedMsgAllowance.Proto;

  export function fromData(data: Allowance.Data): Allowance {
    switch (data.type) {
      case 'feegrant/BasicAllowance':
        return BasicAllowance.fromData(data);
      case 'feegrant/PeriodicAllowance':
        return PeriodicAllowance.fromData(data);
      case 'feegrant/AllowedMsgAllowance':
        return AllowedMsgAllowance.fromData(data);
    }
  }

  export function fromProto(proto: Allowance.Proto): Allowance {
    switch (proto['@type']) {
      case '/cosmos.feegrant.v1beta1.PeriodicAllowance':
        return PeriodicAllowance.fromProto(proto);
      case '/cosmos.feegrant.v1beta1.BasicAllowance':
        return BasicAllowance.fromProto(proto);
      case '/cosmos.feegrant.v1beta1.AllowedMsgAllowance':
        return AllowedMsgAllowance.fromProto(proto);
    }
  }
}
