import { MsgUpdateClient } from './MsgUpdateClient';

describe('MsgUpdateClient', () => {
  it('deserializes correctly', () => {
    const send = MsgUpdateClient.fromData({
      '@type': '/ibc.core.client.v1.MsgUpdateClient',
      value: {
        client_id: 'client-01',
        header: {
          signed_header: { header: '', commit: '' },
          validator_set: {
            validators: [
              {
                address: 'val1',
                pub_key: 'pk',
                voting_power: 1,
                proposer_priority: 1,
              },
            ],
            proposer: {
              address: 'val1',
              pub_key: 'pk',
              voting_power: 1,
              proposer_priority: 1,
            },
            total_voting_power: 1,
          },
          trusted_height: { revision_height: 1, revision_number: 2 },
          trusted_validators: {
            validators: [
              {
                address: 'val1',
                pub_key: 'pk',
                voting_power: 1,
                proposer_priority: 1,
              },
            ],
            proposer: {
              address: 'val1',
              pub_key: 'pk',
              voting_power: 1,
              proposer_priority: 1,
            },
            total_voting_power: 1,
          },
        },
        signer: 'terra1av6ssz7k4xpc5nsjj2884nugakpp874ae0krx7',
      },
    });

    expect(send).toMatchObject({
      client_id: 'client-01',
      header: {
        signed_header: { header: '', commit: '' },
        validator_set: {
          validators: [
            {
              address: 'val1',
              pub_key: 'pk',
              voting_power: 1,
              proposer_priority: 1,
            },
          ],
          proposer: {
            address: 'val1',
            pub_key: 'pk',
            voting_power: 1,
            proposer_priority: 1,
          },
          total_voting_power: 1,
        },
        trusted_height: { revision_height: 1, revision_number: 2 },
        trusted_validators: {
          validators: [
            {
              address: 'val1',
              pub_key: 'pk',
              voting_power: 1,
              proposer_priority: 1,
            },
          ],
          proposer: {
            address: 'val1',
            pub_key: 'pk',
            voting_power: 1,
            proposer_priority: 1,
          },
          total_voting_power: 1,
        },
      },
      signer: 'terra1av6ssz7k4xpc5nsjj2884nugakpp874ae0krx7',
    });

    expect(send.toData()).toMatchObject({});
  });
});
describe('MsgUpdateClient2', () => {
  it('deserializes correctly 2', () => {
    const send = MsgUpdateClient.fromData({
      '@type': '/ibc.core.client.v1.MsgUpdateClient',
      value: {
        client_id: '07-tendermint-2',
        signer: 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
        header: {
          typeUrl: '/ibc.lightclients.tendermint.v1.Header',
          value:
            'CqgGCpIDCgIICxILb3lzdGVybmV0LTEYiLBmIgsI09zliQYQ+9etSCpICiA5wPCH7odWqU+28nChUuzf4EJ5q4nAxm13vR72J0LDAhIkCAESICrcqfIA4RqqqxSNEUZCkXeoczCKK98kbwuBWvnOGI3oMiD2xHhFEZxfRMwE7iC8wbwxdRHQk79t575Sp6NYZVsW4Tog47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFVCILoX0DgbRDMpFRy1gvwUu1nDMbZTYM8Wnushiss3BUJ/SiC6F9A4G0QzKRUctYL8FLtZwzG2U2DPFp7rIYrLNwVCf1IgBICRvH3cKD93v7+R1zxE2ljD34qcvIZ0Bdi389qtoi9aICgxmbYIOwlYTLGYa3ngoZ+lu16lzB9QTc+C37twaeM9YiAFowsiaNKwMsrNotvCUwmqahm9NxTsup5lJKBJ0wuS8Wog47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFVyFI09LPbbYUGjqgJOrPIXMUJrOBA7EpADCIiwZhpICiAH6OyiqaOWY0y3fv7ns9hrzhVt7x/nbnWKU5GFB5cQmRIkCAESIEh1Q8j02kwhpkvdb3M0dLfyoy8G5ThRWZu3wZpGhuZMImgIAhIUEcwS0fey7ivKPP4ExPaB16D8uCwaDAjY3OWJBhDruMuVAiJAvCZDTbChHUIMCp2mhv/pacdg5DbTbdBV7BUqI2D7qEuc3AfzEJvwp3DWAWleiYPOYyOFp6U9a95tTSQzbYU/AiICCAEiaAgCEhQ0kYe7KBOXZ4ziW/VB1zZkRb1uMxoMCNjc5YkGEMHpjJQCIkDypOzU6jeGaVULe55I7OzwpT7kRB3+3yRzadWij+V7RZyAzSqJ+EcQzyxt+WlB+eN5wL1CG4V1WFx4yaXvhBMFImgIAhIUjT0s9tthQaOqAk6s8hcxQms4EDsaDAjY3OWJBhCQ3PWYAiJAz0YzVvyRQHQI0SxSU0YlCL03v2MmUxQ9A8NVttld1vuY4t+X67UoRTz6sTz0D5K7yxixULAR/Jg9nNqTo27/CRK5Ago8ChQRzBLR97LuK8o8/gTE9oHXoPy4LBIiCiBGkdFbduo5fV1gy5TcsZovyKED8VeBrXezH4IwavHtrxgjCjwKFC4ptGS+O/Lhom5znrafOm7AC9liEiIKIDXVdj+x9sQi1rTkzLWYUhRuvgHKFgMjV8lIINUZ77r7GCMKPAoUNJGHuygTl2eM4lv1Qdc2ZEW9bjMSIgogbsiN0B5unvirrRSglj3GsaxKyrOR59bf2ga7ju4KSdIYIwo8ChSNPSz222FBo6oCTqzyFzFCazgQOxIiCiBNTqEHncpTGC3779zKGO0q4yC3Qpxq4S+IoN8UIbiiJxgjEjwKFI09LPbbYUGjqgJOrPIXMUJrOBA7EiIKIE1OoQedylMYLfvv3MoY7SrjILdCnGrhL4ig3xQhuKInGCMYjAEaBggBEIOwZiK5Ago8ChQRzBLR97LuK8o8/gTE9oHXoPy4LBIiCiBGkdFbduo5fV1gy5TcsZovyKED8VeBrXezH4IwavHtrxgjCjwKFC4ptGS+O/Lhom5znrafOm7AC9liEiIKIDXVdj+x9sQi1rTkzLWYUhRuvgHKFgMjV8lIINUZ77r7GCMKPAoUNJGHuygTl2eM4lv1Qdc2ZEW9bjMSIgogbsiN0B5unvirrRSglj3GsaxKyrOR59bf2ga7ju4KSdIYIwo8ChSNPSz222FBo6oCTqzyFzFCazgQOxIiCiBNTqEHncpTGC3779zKGO0q4yC3Qpxq4S+IoN8UIbiiJxgjEjwKFI09LPbbYUGjqgJOrPIXMUJrOBA7EiIKIE1OoQedylMYLfvv3MoY7SrjILdCnGrhL4ig3xQhuKInGCMYjAE=',
        },
      },
    });

    expect(send).toMatchObject({
      value: {
        signer: 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
        header: {
          value:
            'CqgGCpIDCgIICxILb3lzdGVybmV0LTEYiLBmIgsI09zliQYQ+9etSCpICiA5wPCH7odWqU+28nChUuzf4EJ5q4nAxm13vR72J0LDAhIkCAESICrcqfIA4RqqqxSNEUZCkXeoczCKK98kbwuBWvnOGI3oMiD2xHhFEZxfRMwE7iC8wbwxdRHQk79t575Sp6NYZVsW4Tog47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFVCILoX0DgbRDMpFRy1gvwUu1nDMbZTYM8Wnushiss3BUJ/SiC6F9A4G0QzKRUctYL8FLtZwzG2U2DPFp7rIYrLNwVCf1IgBICRvH3cKD93v7+R1zxE2ljD34qcvIZ0Bdi389qtoi9aICgxmbYIOwlYTLGYa3ngoZ+lu16lzB9QTc+C37twaeM9YiAFowsiaNKwMsrNotvCUwmqahm9NxTsup5lJKBJ0wuS8Wog47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFVyFI09LPbbYUGjqgJOrPIXMUJrOBA7EpADCIiwZhpICiAH6OyiqaOWY0y3fv7ns9hrzhVt7x/nbnWKU5GFB5cQmRIkCAESIEh1Q8j02kwhpkvdb3M0dLfyoy8G5ThRWZu3wZpGhuZMImgIAhIUEcwS0fey7ivKPP4ExPaB16D8uCwaDAjY3OWJBhDruMuVAiJAvCZDTbChHUIMCp2mhv/pacdg5DbTbdBV7BUqI2D7qEuc3AfzEJvwp3DWAWleiYPOYyOFp6U9a95tTSQzbYU/AiICCAEiaAgCEhQ0kYe7KBOXZ4ziW/VB1zZkRb1uMxoMCNjc5YkGEMHpjJQCIkDypOzU6jeGaVULe55I7OzwpT7kRB3+3yRzadWij+V7RZyAzSqJ+EcQzyxt+WlB+eN5wL1CG4V1WFx4yaXvhBMFImgIAhIUjT0s9tthQaOqAk6s8hcxQms4EDsaDAjY3OWJBhCQ3PWYAiJAz0YzVvyRQHQI0SxSU0YlCL03v2MmUxQ9A8NVttld1vuY4t+X67UoRTz6sTz0D5K7yxixULAR/Jg9nNqTo27/CRK5Ago8ChQRzBLR97LuK8o8/gTE9oHXoPy4LBIiCiBGkdFbduo5fV1gy5TcsZovyKED8VeBrXezH4IwavHtrxgjCjwKFC4ptGS+O/Lhom5znrafOm7AC9liEiIKIDXVdj+x9sQi1rTkzLWYUhRuvgHKFgMjV8lIINUZ77r7GCMKPAoUNJGHuygTl2eM4lv1Qdc2ZEW9bjMSIgogbsiN0B5unvirrRSglj3GsaxKyrOR59bf2ga7ju4KSdIYIwo8ChSNPSz222FBo6oCTqzyFzFCazgQOxIiCiBNTqEHncpTGC3779zKGO0q4yC3Qpxq4S+IoN8UIbiiJxgjEjwKFI09LPbbYUGjqgJOrPIXMUJrOBA7EiIKIE1OoQedylMYLfvv3MoY7SrjILdCnGrhL4ig3xQhuKInGCMYjAEaBggBEIOwZiK5Ago8ChQRzBLR97LuK8o8/gTE9oHXoPy4LBIiCiBGkdFbduo5fV1gy5TcsZovyKED8VeBrXezH4IwavHtrxgjCjwKFC4ptGS+O/Lhom5znrafOm7AC9liEiIKIDXVdj+x9sQi1rTkzLWYUhRuvgHKFgMjV8lIINUZ77r7GCMKPAoUNJGHuygTl2eM4lv1Qdc2ZEW9bjMSIgogbsiN0B5unvirrRSglj3GsaxKyrOR59bf2ga7ju4KSdIYIwo8ChSNPSz222FBo6oCTqzyFzFCazgQOxIiCiBNTqEHncpTGC3779zKGO0q4yC3Qpxq4S+IoN8UIbiiJxgjEjwKFI09LPbbYUGjqgJOrPIXMUJrOBA7EiIKIE1OoQedylMYLfvv3MoY7SrjILdCnGrhL4ig3xQhuKInGCMYjAE=',
        },
      },
    });

    expect(send.toData()).toMatchObject({});
  });
});
