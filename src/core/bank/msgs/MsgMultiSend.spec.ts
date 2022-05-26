import { MsgMultiSend } from './MsgMultiSend';
import { Coins } from '../../Coins';
import { Coin } from '../../Coin';

const example_legacy: MsgMultiSend.Amino = {
  type: 'bank/MsgMultiSend',
  value: {
    inputs: [
      {
        address: 'terra1fex9f78reuwhfsnc8sun6mz8rl9zwqh03fhwf3',
        coins: [
          {
            denom: 'uluna',
            amount: '1',
          },
        ],
      },
      {
        address: 'terra1gg64sjt947atmh45ls45avdwd89ey4c4r72u9h',
        coins: [
          {
            denom: 'uluna',
            amount: '6900000000',
          },
        ],
      },
      {
        address: 'terra1yh9u2x8phrh2dan56nntgpmg7xnjrwtldhgmyu',
        coins: [
          {
            denom: 'uluna',
            amount: '1000000',
          },
        ],
      },
      {
        address: 'terra1c5a0njk9q6q6nheja8gp4ymt2c0qspd8ggpg49',
        coins: [
          {
            denom: 'uluna',
            amount: '16430000000',
          },
        ],
      },
      {
        address: 'terra1psswnm8mvy9qg5z4cxc2nvptc9dx62r4tvfrmh',
        coins: [
          {
            denom: 'uluna',
            amount: '9900000000',
          },
        ],
      },
      {
        address: 'terra10lgpfm8wjrl4d9datzw6r6dl83k977afzel4t5',
        coins: [
          {
            denom: 'uluna',
            amount: '15800000000',
          },
        ],
      },
      {
        address: 'terra13uj5qs3lcqtffqtu6aa089uf6a2pusgwndzzch',
        coins: [
          {
            denom: 'uluna',
            amount: '6900000000',
          },
        ],
      },
    ],
    outputs: [
      {
        address: 'terra1fex9f78reuwhfsnc8sun6mz8rl9zwqh03fhwf3',
        coins: [
          {
            denom: 'uluna',
            amount: '1',
          },
        ],
      },
      {
        address: 'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
        coins: [
          {
            denom: 'uluna',
            amount: '6900000000',
          },
        ],
      },
      {
        address: 'terra1fex9f78reuwhfsnc8sun6mz8rl9zwqh03fhwf3',
        coins: [
          {
            denom: 'uluna',
            amount: '1000000',
          },
        ],
      },
      {
        address: 'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
        coins: [
          {
            denom: 'uluna',
            amount: '16430000000',
          },
        ],
      },
      {
        address: 'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
        coins: [
          {
            denom: 'uluna',
            amount: '9900000000',
          },
        ],
      },
      {
        address: 'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
        coins: [
          {
            denom: 'uluna',
            amount: '15800000000',
          },
        ],
      },
      {
        address: 'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
        coins: [
          {
            denom: 'uluna',
            amount: '6900000000',
          },
        ],
      },
    ],
  },
};

const proto_example: MsgMultiSend.Data = {
  '@type': '/cosmos.bank.v1beta1.MsgMultiSend',
  inputs: [
    {
      address: 'terra1fex9f78reuwhfsnc8sun6mz8rl9zwqh03fhwf3',
      coins: [
        {
          denom: 'uluna',
          amount: '1',
        },
      ],
    },
    {
      address: 'terra1gg64sjt947atmh45ls45avdwd89ey4c4r72u9h',
      coins: [
        {
          denom: 'uluna',
          amount: '6900000000',
        },
      ],
    },
    {
      address: 'terra1yh9u2x8phrh2dan56nntgpmg7xnjrwtldhgmyu',
      coins: [
        {
          denom: 'uluna',
          amount: '1000000',
        },
      ],
    },
    {
      address: 'terra1c5a0njk9q6q6nheja8gp4ymt2c0qspd8ggpg49',
      coins: [
        {
          denom: 'uluna',
          amount: '16430000000',
        },
      ],
    },
    {
      address: 'terra1psswnm8mvy9qg5z4cxc2nvptc9dx62r4tvfrmh',
      coins: [
        {
          denom: 'uluna',
          amount: '9900000000',
        },
      ],
    },
    {
      address: 'terra10lgpfm8wjrl4d9datzw6r6dl83k977afzel4t5',
      coins: [
        {
          denom: 'uluna',
          amount: '15800000000',
        },
      ],
    },
    {
      address: 'terra13uj5qs3lcqtffqtu6aa089uf6a2pusgwndzzch',
      coins: [
        {
          denom: 'uluna',
          amount: '6900000000',
        },
      ],
    },
  ],
  outputs: [
    {
      address: 'terra1fex9f78reuwhfsnc8sun6mz8rl9zwqh03fhwf3',
      coins: [
        {
          denom: 'uluna',
          amount: '1',
        },
      ],
    },
    {
      address: 'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
      coins: [
        {
          denom: 'uluna',
          amount: '6900000000',
        },
      ],
    },
    {
      address: 'terra1fex9f78reuwhfsnc8sun6mz8rl9zwqh03fhwf3',
      coins: [
        {
          denom: 'uluna',
          amount: '1000000',
        },
      ],
    },
    {
      address: 'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
      coins: [
        {
          denom: 'uluna',
          amount: '16430000000',
        },
      ],
    },
    {
      address: 'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
      coins: [
        {
          denom: 'uluna',
          amount: '9900000000',
        },
      ],
    },
    {
      address: 'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
      coins: [
        {
          denom: 'uluna',
          amount: '15800000000',
        },
      ],
    },
    {
      address: 'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
      coins: [
        {
          denom: 'uluna',
          amount: '6900000000',
        },
      ],
    },
  ],
};

const example: MsgMultiSend.Amino = {
  type: 'cosmos-sdk/MsgMultiSend',
  value: {
    inputs: [
      {
        address: 'terra1fex9f78reuwhfsnc8sun6mz8rl9zwqh03fhwf3',
        coins: [
          {
            denom: 'uluna',
            amount: '1',
          },
        ],
      },
      {
        address: 'terra1gg64sjt947atmh45ls45avdwd89ey4c4r72u9h',
        coins: [
          {
            denom: 'uluna',
            amount: '6900000000',
          },
        ],
      },
      {
        address: 'terra1yh9u2x8phrh2dan56nntgpmg7xnjrwtldhgmyu',
        coins: [
          {
            denom: 'uluna',
            amount: '1000000',
          },
        ],
      },
      {
        address: 'terra1c5a0njk9q6q6nheja8gp4ymt2c0qspd8ggpg49',
        coins: [
          {
            denom: 'uluna',
            amount: '16430000000',
          },
        ],
      },
      {
        address: 'terra1psswnm8mvy9qg5z4cxc2nvptc9dx62r4tvfrmh',
        coins: [
          {
            denom: 'uluna',
            amount: '9900000000',
          },
        ],
      },
      {
        address: 'terra10lgpfm8wjrl4d9datzw6r6dl83k977afzel4t5',
        coins: [
          {
            denom: 'uluna',
            amount: '15800000000',
          },
        ],
      },
      {
        address: 'terra13uj5qs3lcqtffqtu6aa089uf6a2pusgwndzzch',
        coins: [
          {
            denom: 'uluna',
            amount: '6900000000',
          },
        ],
      },
    ],
    outputs: [
      {
        address: 'terra1fex9f78reuwhfsnc8sun6mz8rl9zwqh03fhwf3',
        coins: [
          {
            denom: 'uluna',
            amount: '1',
          },
        ],
      },
      {
        address: 'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
        coins: [
          {
            denom: 'uluna',
            amount: '6900000000',
          },
        ],
      },
      {
        address: 'terra1fex9f78reuwhfsnc8sun6mz8rl9zwqh03fhwf3',
        coins: [
          {
            denom: 'uluna',
            amount: '1000000',
          },
        ],
      },
      {
        address: 'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
        coins: [
          {
            denom: 'uluna',
            amount: '16430000000',
          },
        ],
      },
      {
        address: 'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
        coins: [
          {
            denom: 'uluna',
            amount: '9900000000',
          },
        ],
      },
      {
        address: 'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
        coins: [
          {
            denom: 'uluna',
            amount: '15800000000',
          },
        ],
      },
      {
        address: 'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
        coins: [
          {
            denom: 'uluna',
            amount: '6900000000',
          },
        ],
      },
    ],
  },
};

describe('MsgMultiSend', () => {
  it('deserialize correctly', () => {
    const multisend = MsgMultiSend.fromAmino(example_legacy);
    expect(multisend.toAmino(true)).toMatchObject(example_legacy);
    expect(multisend.toAmino(false)).toMatchObject(example);
  });

  it('deserialize correctly proto', () => {
    const multisend = MsgMultiSend.fromProto(proto_example);
    expect(multisend.toData(true)).toMatchObject(proto_example);
    expect(multisend.toData(false)).toMatchObject(proto_example);
  });

  it('can be created manually', () => {
    const inputs: MsgMultiSend.Input[] = [
      new MsgMultiSend.Input(
        'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
        new Coins({
          uluna: 123123,
        })
      ),
      new MsgMultiSend.Input('terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfad', [
        new Coin('uluna', 123123),
      ]),
    ];

    const outputs: MsgMultiSend.Output[] = [
      new MsgMultiSend.Output(
        'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfad',
        new Coins({
          uluna: 123123,
        })
      ),
      new MsgMultiSend.Output('terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfga', {
        uluna: 123123,
      }),
    ];
    const multisend = new MsgMultiSend(inputs, outputs);
    expect(multisend.toAmino(true)).toMatchObject({
      type: 'bank/MsgMultiSend',
      value: {
        inputs: [
          {
            address: 'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
            coins: [
              {
                denom: 'uluna',
                amount: '123123',
              },
            ],
          },
          {
            address: 'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfad',
            coins: [
              {
                denom: 'uluna',
                amount: '123123',
              },
            ],
          },
        ],
        outputs: [
          {
            address: 'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfad',
            coins: [
              {
                denom: 'uluna',
                amount: '123123',
              },
            ],
          },
          {
            address: 'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfga',
            coins: [
              {
                denom: 'uluna',
                amount: '123123',
              },
            ],
          },
        ],
      },
    });
  });
});
