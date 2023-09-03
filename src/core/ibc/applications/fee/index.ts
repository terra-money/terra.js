import { MsgPayPacketFee } from './msgs/MsgPayPacketFee';
import { MsgPayPacketFeeAsync } from './msgs/MsgPayPacketFeeAsync';
import { MsgRegisterPayee } from './msgs/MsgRegisterPayee';
import { MsgRegisterCounterpartyPayee } from './msgs/MsgRegisterCounterpartyPayee';

export * from './Metadata';
export * from './IdentifiedPacketFee';
export * from './PacketFee';
export * from './Fee';
export * from './msgs/MsgPayPacketFee';
export * from './msgs/MsgPayPacketFeeAsync';
export * from './msgs/MsgRegisterPayee';
export * from './msgs/MsgRegisterCounterpartyPayee';

export type IbcFeeMsg =
  | MsgPayPacketFee
  | MsgPayPacketFeeAsync
  | MsgRegisterPayee
  | MsgRegisterCounterpartyPayee;

export namespace IbcFeeMsg {
  export type Data =
    | MsgPayPacketFee.Data
    | MsgPayPacketFeeAsync.Data
    | MsgRegisterPayee.Data
    | MsgRegisterCounterpartyPayee.Data;
  export type Amino =
    | MsgPayPacketFee.Amino
    | MsgPayPacketFeeAsync.Amino
    | MsgRegisterPayee.Amino
    | MsgRegisterCounterpartyPayee.Amino;
  export type Proto =
    | MsgPayPacketFee.Proto
    | MsgPayPacketFeeAsync.Proto
    | MsgRegisterPayee.Proto
    | MsgRegisterCounterpartyPayee.Proto;
}
