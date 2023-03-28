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

    const d = obj.toData(false);
    expect(obj).toStrictEqual(MsgDonateAllVestingTokens.fromData(d));
    const a = obj.toAmino(false);
    expect(obj).toStrictEqual(MsgDonateAllVestingTokens.fromAmino(a));
  });
});
