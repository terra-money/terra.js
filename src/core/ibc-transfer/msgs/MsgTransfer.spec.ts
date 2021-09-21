import { MsgTransfer } from './MsgTransfer';
import { Coin } from '../../Coin';
import Long from 'long';

describe('MsgTransfer', () => {
  it('deserializes correctly', () => {
    const send = MsgTransfer.fromData({
      '@type': '/ibc.applications.transfer.v1.MsgTransfer',
      source_port: 'sourceport-01',
      source_channel: 'sourcehannel-01',
      token: { denom: 'uluna', amount: '1024' },
      sender: 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
      receiver: 'recvr17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
      timeout_height: {
        revisionNumber: new Long(0),
        revisionHeight: new Long(0),
      },
      timeout_timestamp: 1631618921,
    });

    expect(send).toMatchObject({
      source_port: 'sourceport-01',
      source_channel: 'sourcehannel-01',
      token: new Coin('uluna', '1024'),
      sender: 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
      receiver: 'recvr17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
      timeout_height: {
        revisionNumber: new Long(0),
        revisionHeight: new Long(0),
      },
      timeout_timestamp: 1631618921,
    });

    expect(send.toData()).toMatchObject({});
  });
});
