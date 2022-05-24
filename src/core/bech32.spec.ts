import {
  AccAddress,
  ValAddress,
  AccPubKey,
  ValPubKey,
  ValConsAddress,
} from './bech32';
import { bech32 } from 'bech32';

describe('AccAddress', () => {
  it('validates account address', () => {
    expect(
      AccAddress.validate('terravaloper1pdx498r0hrc2fj36sjhs8vuhrz9hd2cw0yhqtk')
    ).toBe(false);

    expect(
      AccAddress.validate('terra1pdx498r0h7c2fj36sjhs8vu8rz9hd2cw0tmam9')
    ).toBe(false); // bad checksum

    expect(
      AccAddress.validate('cosmos176m2p8l3fps3dal7h8gf9jvrv98tu3rqfdht86')
    ).toBe(false);

    const words = bech32.toWords(Buffer.from('foobar', 'utf8'));
    const badAddress = bech32.encode('terra', words);

    expect(AccAddress.validate(badAddress)).toBe(false);
    // normal account address
    expect(
      AccAddress.validate('terra1pdx498r0hrc2fj36sjhs8vuhrz9hd2cw0tmam9')
    ).toBe(true);
    // contract account address
    expect(
      AccAddress.validate(
        'terra1uj9dm5xdm34fy5xwd84lfakarcnlpxw0ppgy7vpsruj0vtks29cqn0ztcs'
      )
    ).toBe(true);
  });

  it('converts from validator address', () => {
    expect(
      AccAddress.fromValAddress(
        'terravaloper1pdx498r0hrc2fj36sjhs8vuhrz9hd2cw0yhqtk'
      )
    ).toEqual('terra1pdx498r0hrc2fj36sjhs8vuhrz9hd2cw0tmam9');
  });
});

describe('ValAddress', () => {
  it('validates validator address', () => {
    const words = bech32.toWords(Buffer.from('foobar', 'utf8'));
    const badAddress = bech32.encode('terravaloper', words);

    expect(ValAddress.validate(badAddress)).toBe(false);

    expect(
      ValAddress.validate('terravaloper1pdx498r0hrc2fj36sjhs8vuhrz9hd2cw0yhqtk')
    ).toBe(true);
  });

  it('converts from account address', () => {
    expect(
      ValAddress.fromAccAddress('terra1pdx498r0hrc2fj36sjhs8vuhrz9hd2cw0tmam9')
    ).toEqual('terravaloper1pdx498r0hrc2fj36sjhs8vuhrz9hd2cw0yhqtk');
  });
});

describe('AccPubKey', () => {
  it('validates account pubkey', () => {
    expect(
      AccPubKey.validate(
        'terravaloperpub1addwnpepqt8ha594svjn3nvfk4ggfn5n8xd3sm3cz6ztxyugwcuqzsuuhhfq5y7accr'
      )
    ).toBe(false);

    const words = bech32.toWords(Buffer.from('foobar', 'utf8'));
    const badPubKey = bech32.encode('terrapub', words);

    expect(AccPubKey.validate(badPubKey)).toBe(false);
    expect(
      AccPubKey.validate('terrapub1x46rqay4d3cssq8gxxvqz8xt6nwlz4tdh39t77')
    ).toBe(true);
  });

  it('converts from validator pubkey', () => {
    expect(
      AccPubKey.fromAccAddress('terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v')
    ).toEqual('terrapub1x46rqay4d3cssq8gxxvqz8xt6nwlz4tdh39t77');
  });
});

describe('ValPubKey', () => {
  it('validates validator pubkey', () => {
    expect(
      ValPubKey.validate(
        'terravaloperpub12g4nkvsjjnl0t7fvq3hdcw7y8dc9fq69gvd5ag'
      )
    ).toBe(true);

    const words = bech32.toWords(Buffer.from('foobar', 'utf8'));
    const badPubKey = bech32.encode('terrapub', words);

    expect(ValPubKey.validate(badPubKey)).toBe(false);
    expect(
      ValPubKey.validate('terravaloper12g4nkvsjjnl0t7fvq3hdcw7y8dc9fq69nyeu9q')
    ).toBe(false);
  });

  it('converts from validator address', () => {
    expect(
      ValPubKey.fromValAddress(
        'terravaloper12g4nkvsjjnl0t7fvq3hdcw7y8dc9fq69nyeu9q'
      )
    ).toEqual('terravaloperpub12g4nkvsjjnl0t7fvq3hdcw7y8dc9fq69gvd5ag');
  });
});

describe('ValConsAddress', () => {
  it('validate validator consensus address', () => {
    expect(
      ValConsAddress.validate(
        'terravalcons1relcztayk87c3r529rqf3fwdmn8hr6rhcgyrxd'
      )
    ).toBeTruthy();
  });
});
