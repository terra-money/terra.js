import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { ClientUpdateProposal as ClientUpdateProposal_pb } from '@terra-money/terra.proto/ibc/core/client/v1/client';
/**
 * Proposal that allows updating IBC clients. If it passes, the substitute
 * client's latest consensus state is copied over to the subject client.
 */
export declare class ClientUpdateProposal extends JSONSerializable<ClientUpdateProposal.Amino, ClientUpdateProposal.Data, ClientUpdateProposal.Proto> {
    title: string;
    description: string;
    subjectClientId: string;
    substituteClientId: string;
    /**
     * @param title proposal's title
     * @param description proposal's description
     * @param subjectClientId client to update
     * @param substituteClientId client to copy
     */
    constructor(title: string, description: string, subjectClientId: string, substituteClientId: string);
    static fromAmino(data: ClientUpdateProposal.Amino, _?: boolean): ClientUpdateProposal;
    toAmino(_?: boolean): ClientUpdateProposal.Amino;
    static fromData(data: ClientUpdateProposal.Data, _?: boolean): ClientUpdateProposal;
    toData(_?: boolean): ClientUpdateProposal.Data;
    static fromProto(proto: ClientUpdateProposal.Proto, _?: boolean): ClientUpdateProposal;
    toProto(_?: boolean): ClientUpdateProposal.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): ClientUpdateProposal;
}
export declare namespace ClientUpdateProposal {
    interface Amino {
        type: 'ibc/ClientUpdateProposal';
        value: {
            title: string;
            description: string;
            subjectClientId: string;
            substituteClientId: string;
        };
    }
    interface Data {
        '@type': '/ibc.core.client.v1.ClientUpdateProposal';
        title: string;
        description: string;
        subject_client_id: string;
        substitute_client_id: string;
    }
    type Proto = ClientUpdateProposal_pb;
}
