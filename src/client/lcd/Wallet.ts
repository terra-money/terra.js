import { LCDClient } from './LCDClient';
import { Key } from '../../key';
import { CreateTxOptions } from '../lcd/api/TxAPI';
import { Tx } from '../../core/Tx';
import { SignMode as SignModeV1 } from '@terra-money/legacy.proto/cosmos/tx/signing/v1beta1/signing';
import { SignMode as SignModeV2 } from '@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing';

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

  public async createTx(
    options: CreateTxOptions & {
      sequence?: number;
    }
  ): Promise<Tx> {
    return this.lcd.tx.create(
      [
        {
          address: this.key.accAddress,
          sequenceNumber: options.sequence,
          publicKey: this.key.publicKey,
        },
      ],
      options
    );
  }

  public async createAndSignTx(
    options: CreateTxOptions & {
      sequence?: number;
      accountNumber?: number;
      signMode?: SignModeV1 | SignModeV2;
    }
  ): Promise<Tx> {
    let accountNumber = options.accountNumber;
    let sequence = options.sequence;

    if (accountNumber === undefined || sequence === undefined) {
      const res = await this.accountNumberAndSequence();
      if (accountNumber === undefined) {
        accountNumber = res.account_number;
      }

      if (sequence === undefined) {
        sequence = res.sequence;
      }
    }

    options.sequence = sequence;
    options.accountNumber = accountNumber;

    const tx = await this.createTx(options); // don't need isClassic because lcd already have it
    return this.key.signTx(
      tx,
      {
        accountNumber,
        sequence,
        chainID: this.lcd.config.chainID,
        signMode:
          options.signMode ||
          (this.lcd.config.isClassic
            ? SignModeV1.SIGN_MODE_DIRECT
            : SignModeV2.SIGN_MODE_DIRECT),
      },
      this.lcd.config.isClassic
    );
  }
}
