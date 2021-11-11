import { LCDClient } from './LCDClient';
import { Coin } from '../../core/Coin';
import { Int, Dec } from '../../core/numeric';
import { Validator } from '../../core/staking/Validator';

interface ValidatorWithVotingPower {
  validatorInfo: Validator;
  votingPower: number;
  proposerPriority: number;
}

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

  /**
   * Gets current validators and merges their voting power from the validator set query.
   */
  public async validatorsWithVotingPower(): Promise<{
    [validatorAddress: string]: ValidatorWithVotingPower;
  }> {
    const [validatorSet] = await this.lcd.tendermint.validatorSet();
    const validatorSetByPubKey = validatorSet.reduce((m: any, o) => {
      m[o.pub_key.key] = o;
      return m;
    }, {});

    const validators: Validator[] = [];
    let next_key: string | undefined;
    for (;;) {
      const validatorsRes = await this.lcd.staking.validators({
        'pagination.key': next_key,
      });

      validators.push(...validatorsRes[0]);

      if (!validatorsRes[1].next_key) break;
      next_key = validatorsRes[1].next_key;
    }

    const res: { [k: string]: ValidatorWithVotingPower } = {};

    for (const v of validators) {
      const delegateInfo =
        validatorSetByPubKey[v.consensus_pubkey.toData().key as string];
      if (delegateInfo === undefined) continue;
      res[v.operator_address] = {
        validatorInfo: v,
        votingPower: Number.parseInt(delegateInfo.voting_power),
        proposerPriority: Number.parseInt(delegateInfo.proposer_priority),
      };
    }

    return res;
  }
}
