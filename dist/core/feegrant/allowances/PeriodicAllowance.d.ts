import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { BasicAllowance } from './BasicAllowance';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { PeriodicAllowance as PeriodicAllowance_pb } from '@terra-money/terra.proto/cosmos/feegrant/v1beta1/feegrant';
/**
 * PeriodicAllowance extends Allowance to allow for both a maximum cap,
 * as well as a limit per time period.
 */
export declare class PeriodicAllowance extends JSONSerializable<PeriodicAllowance.Amino, PeriodicAllowance.Data, PeriodicAllowance.Proto> {
    basic: BasicAllowance;
    period: number;
    period_reset: Date;
    period_spend_limit: Coins;
    period_can_spend: Coins;
    /**
     * @param basic basic allowance given per period
     * @param period the time duration in which period_spend_limit coins can be spent before that allowance is reset
     * @param period_spend_limit the maximum number of coins that can be spent in the period
     * @param period_can_spend the number of coins left to be spent before the period_reset time
     * @param period_reset the time at which this period resets and a new one begins
     */
    constructor(basic: BasicAllowance, period: number, period_spend_limit: Coins.Input, period_can_spend: Coins.Input, period_reset: Date);
    static fromAmino(data: PeriodicAllowance.Amino, isClassic?: boolean): PeriodicAllowance;
    toAmino(isClassic?: boolean): PeriodicAllowance.Amino;
    static fromData(proto: PeriodicAllowance.Data, _?: boolean): PeriodicAllowance;
    toData(_?: boolean): PeriodicAllowance.Data;
    static fromProto(proto: PeriodicAllowance.Proto, _?: boolean): PeriodicAllowance;
    toProto(_?: boolean): PeriodicAllowance.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): PeriodicAllowance;
}
export declare namespace PeriodicAllowance {
    interface Amino {
        type: 'feegrant/PeriodicAllowance' | 'cosmos-sdk/PeriodicAllowance';
        value: {
            basic: BasicAllowance.Amino;
            period: string;
            period_spend_limit: Coins.Amino;
            period_can_spend: Coins.Amino;
            period_reset: string;
        };
    }
    interface Data {
        '@type': '/cosmos.feegrant.v1beta1.PeriodicAllowance';
        basic: BasicAllowance.Data;
        period: string;
        period_spend_limit: Coins.Data;
        period_can_spend: Coins.Data;
        period_reset: string;
    }
    type Proto = PeriodicAllowance_pb;
}
