import { MsgTransfer } from './MsgTransfer';
import { Coin } from '../../../../../Coin';
import { Height } from '../../../../core/client/Height';
import { Numeric } from '../../../../..';

describe('MsgTransfer', () => {
  it('deserializes correctly', () => {
    const send = MsgTransfer.fromData(
      {
        '@type': '/ibc.applications.transfer.v1.MsgTransfer',
        source_port: 'sourceport-01',
        source_channel: 'sourcehannel-01',
        token: { denom: 'uluna', amount: '1024' },
        sender: 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
        receiver: 'recvr17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
        timeout_height: {
          revision_number: '0',
          revision_height: '0',
        },
        timeout_timestamp: '1642663176848000000',
      },
      true
    );

    expect(send).toMatchObject({
      source_port: 'sourceport-01',
      source_channel: 'sourcehannel-01',
      token: new Coin('uluna', '1024'),
      sender: 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
      receiver: 'recvr17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
      timeout_height: {
        revision_number: 0,
        revision_height: 0,
      },
      timeout_timestamp: Numeric.parse('1642663176848000000'),
    });
  });

  it('deserializes amino without timeout_height', () => {
    const send = MsgTransfer.fromData({
      '@type': '/ibc.applications.transfer.v1.MsgTransfer',
      source_port: 'sourceport-01',
      source_channel: 'sourcehannel-01',
      token: { denom: 'uluna', amount: '1024' },
      sender: 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
      receiver: 'recvr17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
      timeout_height: new Height(0, 0).toData(),
      timeout_timestamp: '1642663176848000000',
    });
    const aminoSend = send.toAmino();

    expect(aminoSend).toMatchObject({
      type: 'cosmos-sdk/MsgTransfer',
      value: {
        source_port: 'sourceport-01',
        source_channel: 'sourcehannel-01',
        token: new Coin('uluna', '1024').toAmino(),
        sender: 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
        receiver: 'recvr17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
        timeout_height: {},
        timeout_timestamp: '1642663176848000000',
      },
    });

    expect(send.toData()).toMatchObject({});
  });

  it('deserializes amino without timeout_timestamp', () => {
    const send = MsgTransfer.fromData({
      '@type': '/ibc.applications.transfer.v1.MsgTransfer',
      source_port: 'sourceport-01',
      source_channel: 'sourcehannel-01',
      token: { denom: 'uluna', amount: '1024' },
      sender: 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
      receiver: 'recvr17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
      timeout_height: {
        revision_number: '5',
        revision_height: '57240001',
      },
      timeout_timestamp: '0',
    });
    const aminoSend = send.toAmino();

    expect(aminoSend).toMatchObject({
      type: 'cosmos-sdk/MsgTransfer',
      value: {
        source_port: 'sourceport-01',
        source_channel: 'sourcehannel-01',
        token: new Coin('uluna', '1024').toAmino(),
        sender: 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
        receiver: 'recvr17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
        timeout_height: new Height(5, 57240001).toAmino(),
        timeout_timestamp: undefined,
      },
    });

    expect(send.toData()).toMatchObject({});
  });
});
