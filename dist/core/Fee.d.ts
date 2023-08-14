import { JSONSerializable } from '../util/json';
import { Coins } from './Coins';
import { Fee as Fee_pb } from '@terra-money/terra.proto/cosmos/tx/v1beta1/tx';
/**
 * A transaction must include a fee, otherwise it will be rejected.
 */
export declare class Fee extends JSONSerializable<Fee.Amino, Fee.Data, Fee.Proto> {
    readonly gas_limit: number;
    payer?: string | undefined;
    granter?: string | undefined;
    /** Fee amount to be paid */
    readonly amount: Coins;
    /**
     * Creates a new Fee object.
     * @param gas gas limit
     * @param amount amount to be paid to validator
     */
    constructor(gas_limit: number, amount: Coins.Input, payer?: string | undefined, granter?: string | undefined);
    static fromAmino(data: Fee.Amino): Fee;
    toAmino(): Fee.Amino;
    static fromData(data: Fee.Data): Fee;
    toData(): Fee.Data;
    static fromProto(proto: Fee.Proto): Fee;
    toProto(): Fee.Proto;
    /**
     * Gets the minimum gas prices implied by the fee. Minimum gas prices are `fee amount / gas`.
     */
    gasPrices(): Coins;
}
export declare namespace Fee {
    interface Amino {
        gas: string;
        amount: Coins.Amino;
    }
    interface Data {
        gas_limit: string;
        payer: string;
        granter: string;
        amount: Coins.Data;
    }
    type Proto = Fee_pb;
}
