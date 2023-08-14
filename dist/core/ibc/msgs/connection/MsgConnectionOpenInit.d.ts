import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Counterparty } from '../../core/connection/Counterparty';
import { Version } from '../../core/connection/Version';
import { MsgConnectionOpenInit as MsgConnectionOpenInit_pb } from '@terra-money/terra.proto/ibc/core/connection/v1/tx';
/**
 * MsgConnectionOpenInit defines the msg sent by an account on Chain A to initialize a connection with Chain B.
 */
export declare class MsgConnectionOpenInit extends JSONSerializable<any, MsgConnectionOpenInit.Data, MsgConnectionOpenInit.Proto> {
    client_id: string;
    counterparty?: Counterparty;
    version?: Version;
    delay_period: number;
    signer: AccAddress;
    /**
     * @param client_id identifier of the port to use
     * @param counterparty
     * @param version
     * @param delay_period
     * @param signer signer address
     */
    constructor(client_id: string, delay_period: number, signer: AccAddress, counterparty?: Counterparty, version?: Version);
    static fromAmino(_: any, isClassic?: boolean): MsgConnectionOpenInit;
    toAmino(_?: boolean): any;
    static fromData(data: MsgConnectionOpenInit.Data, _?: boolean): MsgConnectionOpenInit;
    toData(_?: boolean): MsgConnectionOpenInit.Data;
    static fromProto(proto: MsgConnectionOpenInit.Proto, _?: boolean): MsgConnectionOpenInit;
    toProto(_?: boolean): MsgConnectionOpenInit.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgConnectionOpenInit;
}
export declare namespace MsgConnectionOpenInit {
    interface Data {
        '@type': '/ibc.core.connection.v1.MsgConnectionOpenInit';
        client_id: string;
        counterparty?: Counterparty.Data;
        version?: Version.Data;
        delay_period: string;
        signer: AccAddress;
    }
    type Proto = MsgConnectionOpenInit_pb;
}
