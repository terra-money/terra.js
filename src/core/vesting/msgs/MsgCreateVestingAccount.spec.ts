const data = require('./MsgCreateVestingAccount.data.json');
import { Coins } from '../../Coins';
import { MsgCreateVestingAccount } from './MsgCreateVestingAccount';

describe('MsgCreateVestingAccount', () => {
  it('deserializes', () => {
    MsgCreateVestingAccount.fromData(data);
  });

  it('conversion', () => {
    const obj = MsgCreateVestingAccount.fromData(data);
    const p = obj.toProto();
    expect(obj.from_address).toStrictEqual(p.fromAddress);
    expect(obj.to_address).toStrictEqual(p.toAddress);
    expect(obj.delayed).toStrictEqual(p.delayed);
    expect(obj.end_time).toStrictEqual(p.endTime.toNumber());
    expect(obj.amount).toStrictEqual(Coins.fromProto(p.amount));

    const d = obj.toData(false);
    expect(obj).toStrictEqual(MsgCreateVestingAccount.fromData(d));
    const a = obj.toAmino(false);
    expect(obj).toStrictEqual(MsgCreateVestingAccount.fromAmino(a));
  });
});
