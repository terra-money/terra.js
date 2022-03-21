import { MsgVerifyInvariant } from './MsgVerifyInvariant';

describe('MsgVerifyInvariant', () => {
  it('deserialize correctly', () => {
    const send = MsgVerifyInvariant.fromAmino({
      type: 'crisis/MsgVerifyInvariant',
      value: {
        sender: 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
        invariantModuleName: 'bank',
        invariantRoute: 'nonnegative-outstanding-supply',
      },
    });

    expect(send).toMatchObject({
      sender: 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
      invariantModuleName: 'bank',
      invariantRoute: 'nonnegative-outstanding-supply',
    });

    expect(send.toAmino()).toMatchObject({
      type: 'crisis/MsgVerifyInvariant',
      value: {
        sender: 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
        invariantModuleName: 'bank',
        invariantRoute: 'nonnegative-outstanding-supply',
      },
    });
  });

  it('deserialize correctly proto', () => {
    const send = MsgVerifyInvariant.fromData({
      '@type': '/cosmos.crisis.v1beta1.MsgVerifyInvariant',
      sender: 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
      invariantModuleName: 'bank',
      invariantRoute: 'nonnegative-outstanding-supply',
    });

    expect(send).toMatchObject({
      sender: 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
      invariantModuleName: 'bank',
      invariantRoute: 'nonnegative-outstanding-supply',
    });

    expect(send.toData()).toMatchObject({
      '@type': '/cosmos.crisis.v1beta1.MsgVerifyInvariant',
      sender: 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
      invariantModuleName: 'bank',
      invariantRoute: 'nonnegative-outstanding-supply',
    });
  });
});
