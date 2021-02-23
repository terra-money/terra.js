import { LCDClient } from './LCDClient';
import { Key } from '../../key';
import { CreateTxOptions } from '../lcd/api/TxAPI';
import { StdTx, StdSignMsg } from '../../core';
export declare class Wallet {
    lcd: LCDClient;
    key: Key;
    constructor(lcd: LCDClient, key: Key);
    accountNumberAndSequence(): Promise<{
        account_number: number;
        sequence: number;
    }>;
    accountNumber(): Promise<number>;
    sequence(): Promise<number>;
    createTx(options: CreateTxOptions): Promise<StdSignMsg>;
    createAndSignTx(options: CreateTxOptions): Promise<StdTx>;
}
