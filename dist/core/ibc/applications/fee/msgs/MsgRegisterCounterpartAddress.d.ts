import { JSONSerializable } from '../../../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgRegisterCounterpartyAddress as MsgRegisterCounterpartyAddress_pb } from '@terra-money/terra.proto/ibc/applications/fee/v1/tx';
/**
 * MsgRegisterCounterpartyAddress defines the request type for the RegisterCounterpartyAddress rpc
 */
export declare class MsgRegisterCounterpartyAddress extends JSONSerializable<any, MsgRegisterCounterpartyAddress.Data, MsgRegisterCounterpartyAddress.Proto> {
    address: string;
    counterparty_address: string;
    channel_id: string;
    /**
     * @param address the relayer address
     * @param counterparty_adress the counterparty relayer address
     * @param channel_id unique channel identifier
     */
    constructor(address: string, counterparty_address: string, channel_id: string);
    static fromAmino(_: any, isClassic?: boolean): MsgRegisterCounterpartyAddress;
    toAmino(isClassic?: boolean): any;
    static fromData(data: MsgRegisterCounterpartyAddress.Data, isClassic?: boolean): MsgRegisterCounterpartyAddress;
    toData(isClassic?: boolean): MsgRegisterCounterpartyAddress.Data;
    static fromProto(proto: MsgRegisterCounterpartyAddress.Proto, isClassic?: boolean): MsgRegisterCounterpartyAddress;
    toProto(isClassic?: boolean): MsgRegisterCounterpartyAddress.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgRegisterCounterpartyAddress;
}
export declare namespace MsgRegisterCounterpartyAddress {
    interface Data {
        '@type': '/ibc.applications.fee.v1.MsgRegisterCounterpartyAddress';
        address: string;
        counterparty_address: string;
        channel_id: string;
    }
    type Proto = MsgRegisterCounterpartyAddress_pb;
}
