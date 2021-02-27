import { LCDClient } from './lcd/LCDClient';
import { Wallet } from './lcd/Wallet';
export declare class LocalTerra extends LCDClient {
    wallets: {
        validator: Wallet;
        test1: Wallet;
        test2: Wallet;
        test3: Wallet;
        test4: Wallet;
        test5: Wallet;
        test6: Wallet;
        test7: Wallet;
        test8: Wallet;
        test9: Wallet;
        test10: Wallet;
    };
    constructor();
}
