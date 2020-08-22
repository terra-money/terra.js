import { LCDClient } from './LCDClient';
import { Key } from '../../key';
import { CreateTxOptions } from '../lcd/api/TxAPI';

import { Account, StdTx, StdSignMsg } from '../../core';

export class Wallet {
  constructor(public lcd: LCDClient, public key: Key) {}

  public async accountNumber(): Promise<number> {
    return this.lcd.auth.accountInfo(this.key.accAddress).then(d => {
      if (d instanceof Account) {
        return d.account_number;
      } else {
        return d.BaseAccount.account_number;
      }
    });
  }

  public async sequence(): Promise<number> {
    return this.lcd.auth.accountInfo(this.key.accAddress).then(d => {
      if (d instanceof Account) {
        return d.sequence;
      } else {
        return d.BaseAccount.sequence;
      }
    });
  }

  public async createTx(options: CreateTxOptions): Promise<StdSignMsg> {
    return this.lcd.tx.create(this.key.accAddress, options);
  }

  public async createAndSignTx(options: CreateTxOptions): Promise<StdTx> {
    const stdSignMsg = await this.createTx(options);
    return this.key.signTx(stdSignMsg);
  }
}
