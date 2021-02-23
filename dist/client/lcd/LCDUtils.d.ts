import { LCDClient } from './LCDClient';
import { Coin } from '../../core/Coin';
export declare class LCDUtils {
    lcd: LCDClient;
    constructor(lcd: LCDClient);
    calcTax(coin: Coin): Promise<Coin>;
}
