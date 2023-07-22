import { PacketFee } from './PacketFee';
import { Fee } from './Fee';

describe('PacketFee', () => {
  it('serialization', () => {
    const fee = new Fee([], [], []);
    const packetFee = new PacketFee(fee, 'address', ['relayer1', 'relayer2']);

    expect(packetFee.toData()).toMatchObject({
      '@type': '/ibc.applications.fee.v1.Msg/PayPacketFee',
      fee: {
        '@type': '/ibc.applications.fee.v1.Fee',
        recv_fee: [],
        ack_fee: [],
        timeout_fee: [],
      },
      refund_address: 'address',
      relayers: ['relayer1', 'relayer2'],
    });

    const any = packetFee.packAny();
    PacketFee.unpackAny(any);
  });
});
