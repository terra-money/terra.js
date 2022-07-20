const data = require('./MsgCreatePeriodicVestingAccount.data.json');
import { MsgCreatePeriodicVestingAccount } from './MsgCreatePeriodicVestingAccount';

describe('MsgCreatePeriodicVestingAccount', () => {
  it('deserializes', () => {
    MsgCreatePeriodicVestingAccount.fromData(data);
  });

  it('conversion', () => {
    const obj = MsgCreatePeriodicVestingAccount.fromData(data);
    const p = obj.toProto(false);
    expect(obj.from_address).toStrictEqual(p.fromAddress);
    expect(obj.start_time).toStrictEqual(p.startTime.toNumber());
    expect(obj.to_address).toStrictEqual(p.toAddress);
    expect(obj.vesting_periods.toString()).toStrictEqual(
      p.vestingPeriods.toString()
    );
    const d = obj.toData(false);
    expect(obj).toStrictEqual(MsgCreatePeriodicVestingAccount.fromData(d));
    const a = obj.toAmino(false);
    expect(obj).toStrictEqual(MsgCreatePeriodicVestingAccount.fromAmino(a));
  });
});
