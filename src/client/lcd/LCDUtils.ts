import { LCDClient } from './LCDClient';
import { Coin } from '../../core/Coin';
import { Int, Dec } from '../../core/numeric';

export class LCDUtils {
  constructor(public lcd: LCDClient) {}

  /**
   * Calculates the tax that would be applied for the Coin if sent.
   * Tax = min(taxCap, taxRate * amount)
   * @param coin
   */
  public async calculateTax(coin: Coin): Promise<Coin> {
    const rate = await this.lcd.treasury.taxRate();
    const cap = await this.lcd.treasury.taxCap(coin.denom);
    return new Coin(
      coin.denom,
      Int.ceil(Dec.min(coin.amount.mul(rate), cap.amount))
    );
  }
}
