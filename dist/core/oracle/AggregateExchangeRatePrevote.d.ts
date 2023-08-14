import { JSONSerializable } from '../../util/json';
import { ValAddress } from '../bech32';
import { AggregateExchangeRatePrevote as AggregateExchangeRatePrevote_pb } from '@classic-terra/terra.proto/terra/oracle/v1beta1/oracle';
/**
 * Stores information about data about Oracle aggregate prevotes fetched from the blockchain.
 */
export declare class AggregateExchangeRatePrevote extends JSONSerializable<AggregateExchangeRatePrevote.Amino, AggregateExchangeRatePrevote.Data, AggregateExchangeRatePrevote.Proto> {
    hash: string;
    voter: ValAddress;
    submit_block: number;
    /**
     * @param hash aggregate vote hash
     * @param voter validator
     * @param submit_block block during which aggregate prevote was submitted
     */
    constructor(hash: string, voter: ValAddress, submit_block: number);
    static fromAmino(data: AggregateExchangeRatePrevote.Amino): AggregateExchangeRatePrevote;
    toAmino(): AggregateExchangeRatePrevote.Amino;
    static fromData(data: AggregateExchangeRatePrevote.Data): AggregateExchangeRatePrevote;
    toData(): AggregateExchangeRatePrevote.Data;
    static fromProto(data: AggregateExchangeRatePrevote.Proto): AggregateExchangeRatePrevote;
    toProto(): AggregateExchangeRatePrevote.Proto;
}
export declare namespace AggregateExchangeRatePrevote {
    interface Amino {
        hash: string;
        voter: ValAddress;
        submit_block: string;
    }
    interface Data {
        hash: string;
        voter: ValAddress;
        submit_block: string;
    }
    type Proto = AggregateExchangeRatePrevote_pb;
}
