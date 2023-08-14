import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgUpgradeClient as MsgUpgradeClient_pb } from '@terra-money/terra.proto/ibc/core/client/v1/tx';
/**
 * MsgUpgradeClient defines an sdk.Msg to upgrade an IBC client to a new client state
 */
export declare class MsgUpgradeClient extends JSONSerializable<any, MsgUpgradeClient.Data, MsgUpgradeClient.Proto> {
    client_id: string;
    client_state: any;
    consensus_state: any;
    proof_upgrade_client: string;
    proof_upgrade_consensus_state: string;
    signer: AccAddress;
    /**
     * @param client_id client unique identifier
     * @param client_state  upgraded client state
     * @param consensus_state upgraded consensus state, only contains enough information to serve as a basis of trust in update logic
     * @param proof_upgrade_client proof that old chain committed to new client
     * @param proof_upgrade_consensus_state  proof that old chain committed to new consensus state
     * @param signer signer address
     */
    constructor(client_id: string, client_state: any, consensus_state: any, proof_upgrade_client: string, proof_upgrade_consensus_state: string, signer: AccAddress);
    static fromAmino(_: any, isClassic?: boolean): MsgUpgradeClient;
    toAmino(_?: boolean): any;
    static fromData(data: MsgUpgradeClient.Data, _?: boolean): MsgUpgradeClient;
    toData(_?: boolean): MsgUpgradeClient.Data;
    static fromProto(proto: MsgUpgradeClient.Proto, _?: boolean): MsgUpgradeClient;
    toProto(_?: boolean): MsgUpgradeClient.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgUpgradeClient;
}
export declare namespace MsgUpgradeClient {
    interface Data {
        '@type': '/ibc.core.client.v1.MsgUpgradeClient';
        client_id: string;
        client_state: any;
        consensus_state: any;
        proof_upgrade_client: string;
        proof_upgrade_consensus_state: string;
        signer: AccAddress;
    }
    type Proto = MsgUpgradeClient_pb;
}
