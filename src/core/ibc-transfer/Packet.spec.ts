import { FungibleTokenPacketData } from './packet';

describe('FungibleTokenPacketData', () => {
  it('conversion', () => {
    const packet = new FungibleTokenPacketData(
      'uluna',
      '1000',
      'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38',
      'terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp'
    );
    const data = packet.toData();
    const fromData = FungibleTokenPacketData.fromData(data);
    const proto = packet.toProto();
    const fromProto = FungibleTokenPacketData.fromProto(proto);
    expect(fromData).toStrictEqual(packet);
    expect(fromProto).toStrictEqual(packet);
  });
});
