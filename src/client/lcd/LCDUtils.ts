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
    const validatorSetResponse = await this.lcd.tendermint.validatorSet();
    const validators = await this.lcd.staking.validators();
    const validatorSet = validatorSetResponse.validators.reduce((m: any, o) => {
      m[o.pub_key.value] = o;
      return m;
    }, {});

    const res: { [k: string]: ValidatorWithVotingPower } = {};

    for (const v of validators) {
      const delegateInfo =
        validatorSet[v.consensus_pubkey.toData().value as string];
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
