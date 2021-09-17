import { LCDClient } from './LCDClient';
import { Key } from '../../key';
import { CreateTxOptions } from '../lcd/api/TxAPI';
import { Tx } from 'core';
import { SignMode } from '@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing';

export class Wallet {
  constructor(public lcd: LCDClient, public key: Key) {}

  public accountNumberAndSequence(): Promise<{
    account_number: number;
    sequence: number;
  }> {
    return this.lcd.auth.accountInfo(this.key.accAddress).then(d => {
      return {
        account_number: d.getAccountNumber(),
        sequence: d.getSequenceNumber(),
      };
    });
  }

  public accountNumber(): Promise<number> {
    return this.lcd.auth.accountInfo(this.key.accAddress).then(d => {
      return d.getAccountNumber();
    });
  }

  public sequence(): Promise<number> {
    return this.lcd.auth.accountInfo(this.key.accAddress).then(d => {
      return d.getSequenceNumber();
    });
  }

  public async createTx(options: CreateTxOptions): Promise<Tx> {
    return this.lcd.tx.create(this.key.accAddress, options);
  }

  public async createAndSignTx(options: CreateTxOptions): Promise<Tx> {
    let accountNumber = options.accountNumber;
    let sequence = options.sequence;

    if (!accountNumber || !sequence) {
      const res = await this.accountNumberAndSequence();
      if (!accountNumber) {
        accountNumber = res.account_number;
      }

      if (!sequence) {
        sequence = res.sequence;
      }
    }

    options.sequence = sequence;
    options.accountNumber = accountNumber;

    const tx = await this.createTx(options);
    return this.key.signTx(tx, {
      accountNumber,
      sequence,
      chainID: this.lcd.config.chainID,
      signMode: options.signMode || SignMode.SIGN_MODE_DIRECT,
    });
  }
}
