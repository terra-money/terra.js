import { LCDClient } from './LCDClient';
import { Key } from '../../key';
import {
  Account,
  Msg,
  StdFee,
  StdTx,
  StdSignMsg,
  Coins,
  Coin,
  Numeric,
} from '../../core';

export interface CreateTxOptions {
  msgs: Msg[];
  fee?: StdFee;
  sourceAddress?: string;
  memo?: string;
  gasPrices?: Coins.Input;
  gasAdjustment?: Numeric.Input;
}

export class Wallet {
  constructor(public lcd: LCDClient, public key: Key) {}

  public async accountNumber(sourceAddress?: string): Promise<number> {
    sourceAddress = sourceAddress || this.key.accAddress;
    return this.lcd.auth.accountInfo(sourceAddress).then(d => {
      if (d instanceof Account) {
        return d.account_number;
      } else {
        return d.BaseAccount.account_number;
      }
    });
  }

  public async sequence(sourceAddress?: string): Promise<number> {
    sourceAddress = sourceAddress || this.key.accAddress;
    return this.lcd.auth.accountInfo(sourceAddress).then(d => {
      if (d instanceof Account) {
        return d.sequence;
      } else {
        return d.BaseAccount.sequence;
      }
    });
  }

  public async createTx(options: CreateTxOptions): Promise<StdSignMsg> {
    let { fee, memo, sourceAddress } = options;
    const { msgs } = options;
    memo = memo || '';
    sourceAddress = sourceAddress || this.key.accAddress;
    const estimateFeeOptions = {
      gasPrices: options.gasPrices || this.lcd.config.gasPrices,
      gasAdjustment: options.gasAdjustment || this.lcd.config.gasAdjustment,
    };

    const balance = await this.lcd.bank.balance(sourceAddress);
    const balanceOne = balance.map(c => new Coin(c.denom, 1));
    // create the fake fee

    if (fee === undefined) {
      // estimate the fee
      const stdTx = new StdTx(msgs, new StdFee(0, balanceOne), [], memo);
      fee = await this.lcd.tx.estimateFee(stdTx, estimateFeeOptions);
    }

    return new StdSignMsg(
      this.lcd.config.chainID,
      await this.accountNumber(sourceAddress),
      await this.sequence(sourceAddress),
      fee,
      msgs,
      memo
    );
  }

  public async createAndSignTx(options: CreateTxOptions): Promise<StdTx> {
    const stdSignMsg = await this.createTx(options);
    return this.key.signTx(stdSignMsg);
  }
}
