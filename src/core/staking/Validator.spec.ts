import { Validator } from './Validator';
import { Int, Dec } from '../numeric';
import { ValConsPublicKey } from '../PublicKey';

describe('Validator', () => {
  it('deserializes', () => {
    const validator = Validator.fromAmino({
      operator_address: 'terravaloper1ptyzewnns2kn37ewtmv6ppsvhdnmeapvgk6d65',
      consensus_pubkey: {
        type: 'tendermint/PubKeyEd25519',
        value: '1v2BCLSLYe9tQ9JXMuYURf3UIQ/uE+RUVcYfTDVM1ec=',
      },
      jailed: false,
      status: 2,
      tokens: '111401100001',
      delegator_shares: '111401100001.000000000000000000',
      description: {
        moniker: 'WeStaking',
        identity: 'DA9C5AD3E308E426',
        website: 'https://www.westaking.io',
        details:
          'Delegate your luna to us for the staking rewards. We will do our best as secure and stable validator.',
        security_contact: 'x@x.com',
      },
      unbonding_height: '0',
      unbonding_time: '1970-01-01T00:00:00Z',
      commission: {
        commission_rates: {
          rate: '0.200000000000000000',
          max_rate: '0.250000000000000000',
          max_change_rate: '0.010000000000000000',
        },
        update_time: '2019-12-01T03:28:34.024363013Z',
      },
      min_self_delegation: '1',
    });

    expect(validator).toMatchObject({
      operator_address: 'terravaloper1ptyzewnns2kn37ewtmv6ppsvhdnmeapvgk6d65',
      consensus_pubkey: new ValConsPublicKey(
        '1v2BCLSLYe9tQ9JXMuYURf3UIQ/uE+RUVcYfTDVM1ec='
      ),
      jailed: false,
      status: 2,
      tokens: new Int(111401100001),
      delegator_shares: new Dec('111401100001.000000000000000000'),
      description: {
        moniker: 'WeStaking',
        identity: 'DA9C5AD3E308E426',
        website: 'https://www.westaking.io',
        details:
          'Delegate your luna to us for the staking rewards. We will do our best as secure and stable validator.',
        security_contact: 'x@x.com',
      },
      unbonding_height: 0,
      unbonding_time: new Date('1970-01-01T00:00:00Z'),
      commission: {
        commission_rates: {
          rate: new Dec('0.2'),
          max_rate: new Dec('0.25'),
          max_change_rate: new Dec('0.01'),
        },
        update_time: new Date('2019-12-01T03:28:34.024363013Z'),
      },
      min_self_delegation: new Int(1),
    });
  });
});
