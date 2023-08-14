import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Counterparty } from '../../core/connection/Counterparty';
import { Version } from '../../core/connection/Version';
import { MsgConnectionOpenTry as MsgConnectionOpenTry_pb } from '@terra-money/terra.proto/ibc/core/connection/v1/tx';
import { Height } from '../../core/client/Height';
/**
 *  MsgConnectionOpenTry defines a msg sent by a Relayer to try to open a connection on Chain B.
 */
export declare class MsgConnectionOpenTry extends JSONSerializable<any, MsgConnectionOpenTry.Data, MsgConnectionOpenTry.Proto> {
    client_id: string;
    previous_connection_id: string;
    client_state: any;
    counterparty: Counterparty | undefined;
    delay_period: number;
    counterparty_versions: Version[];
    proof_height: Height | undefined;
    proof_init: string;
    proof_client: string;
    proof_consensus: string;
    consensus_height: Height | undefined;
    signer: AccAddress;
    /**
     * @param client_id in the case of crossing hello's, when both chains call OpenInit, we need the connection identifier of the previous connection in state INIT
     * @param previous_connection_id
     * @param client_state
     * @param counterparty
     * @param delay_period
     * @param counterparty_versions
     * @param proof_height proof of the initialization the connection on Chain A: `UNITIALIZED -> INIT`
     * @param proof_init proof of client state included in message
     * @param proof_client proof of client consensus state
     * @param proof_consensus
     * @param consensus_height
     * @param signer signer address
     */
    constructor(client_id: string, previous_connection_id: string, client_state: any, counterparty: Counterparty | undefined, delay_period: number, counterparty_versions: Version[], proof_height: Height | undefined, proof_init: string, proof_client: string, proof_consensus: string, consensus_height: Height | undefined, signer: AccAddress);
    static fromAmino(_: any, isClassic?: boolean): MsgConnectionOpenTry;
    toAmino(_?: boolean): any;
    static fromData(data: MsgConnectionOpenTry.Data, _?: boolean): MsgConnectionOpenTry;
    toData(_?: boolean): MsgConnectionOpenTry.Data;
    static fromProto(proto: MsgConnectionOpenTry.Proto, _?: boolean): MsgConnectionOpenTry;
    toProto(_?: boolean): MsgConnectionOpenTry.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgConnectionOpenTry;
}
export declare namespace MsgConnectionOpenTry {
    interface Data {
        '@type': '/ibc.core.connection.v1.MsgConnectionOpenTry';
        client_id: string;
        previous_connection_id: string;
        client_state: Any;
        counterparty?: Counterparty.Data;
        delay_period: string;
        counterparty_versions: Version.Data[];
        proof_height?: Height.Data;
        proof_init: string;
        proof_client: string;
        proof_consensus: string;
        consensus_height?: Height.Data;
        signer: AccAddress;
    }
    type Proto = MsgConnectionOpenTry_pb;
}
