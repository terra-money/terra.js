import { CommunityPoolSpendProposal } from './CommunityPoolSpendProposal';
import { Coins } from '../../Coins';

describe('CommunityPoolSpendProposal', () => {
  it('legacy deserialize', () => {
    const fund = CommunityPoolSpendProposal.fromAmino({
      type: 'distribution/CommunityPoolSpendProposal',
      value: {
        title: 'Community Pool',
        description: 'Community Pool',
        recipient: 'terra1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        amount: [
          {
            denom: 'uluna',
            amount: '8102024952',
          },
        ],
      },
    });

    expect(fund).toMatchObject({
      title: 'Community Pool',
      description: 'Community Pool',
      recipient: 'terra1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      amount: new Coins({
        uluna: 8102024952,
      }),
    });

    expect(fund.toAmino(true)).toMatchObject({
      type: 'distribution/CommunityPoolSpendProposal',
      value: {
        title: 'Community Pool',
        description: 'Community Pool',
        recipient: 'terra1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        amount: [
          {
            denom: 'uluna',
            amount: '8102024952',
          },
        ],
      },
    });
  });
});

it('deserialize amino', () => {
  const fund = CommunityPoolSpendProposal.fromAmino({
    type: 'cosmos-sdk/CommunityPoolSpendProposal',
    value: {
      title: 'Community Pool',
      description: 'Community Pool',
      recipient: 'terra1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      amount: [
        {
          denom: 'uluna',
          amount: '8102024952',
        },
      ],
    },
  });

  expect(fund).toMatchObject({
    title: 'Community Pool',
    description: 'Community Pool',
    recipient: 'terra1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
    amount: new Coins({
      uluna: 8102024952,
    }),
  });

  expect(fund.toAmino()).toMatchObject({
    type: 'cosmos-sdk/CommunityPoolSpendProposal',
    value: {
      title: 'Community Pool',
      description: 'Community Pool',
      recipient: 'terra1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      amount: [
        {
          denom: 'uluna',
          amount: '8102024952',
        },
      ],
    },
  });
});
