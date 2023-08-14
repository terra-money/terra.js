import { Coins } from '../Coins';
import { Period as Period_pb } from '@terra-money/terra.proto/cosmos/vesting/v1beta1/vesting';
import { JSONSerializable } from '../../util/json';
/**
 * Period defines a length of time and amount of coins that will vest.
 */
export declare class Period extends JSONSerializable<Period.Amino, Period.Data, Period.Proto> {
    length: number;
    amount: Coins;
    /**
     * @param length
     * @param amount
     */
    constructor(length: number, amount: Coins.Input);
    static fromAmino(data: Period.Amino, _?: boolean): Period;
    toAmino(_?: boolean): Period.Amino;
    static fromData(data: Period.Data, _?: boolean): Period;
    toData(_?: boolean): Period.Data;
    static fromProto(proto: Period.Proto, _?: boolean): Period;
    toProto(_?: boolean): Period.Proto;
}
export declare namespace Period {
    interface Amino {
        length: string;
        amount: Coins.Amino;
    }
    interface Data {
        length: string;
        amount: Coins.Data;
    }
    type Proto = Period_pb;
}
