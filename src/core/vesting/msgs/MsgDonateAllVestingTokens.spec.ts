const data = require('./MsgDonateAllVestingTokens.data.json');
import { MsgDonateAllVestingTokens } from './MsgDonateAllVestingTokens';

describe('MsgDonateAllVestingTokens', () => {
  it('deserializes', () => {
    MsgDonateAllVestingTokens.fromData(data);
  });

  it('conversion', () => {
    const obj = MsgDonateAllVestingTokens.fromData(data);
    const p = obj.toProto();
    expect(obj.from_address).toStrictEqual(p.fromAddress);

    const d = obj.toData();
    expect(obj).toStrictEqual(MsgDonateAllVestingTokens.fromData(d));
    const a = obj.toAmino();
    expect(obj).toStrictEqual(MsgDonateAllVestingTokens.fromAmino(a));
  });
});
