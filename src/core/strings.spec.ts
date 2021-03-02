import { AccAddress, ValAddress, AccPubKey, ValPubKey } from './strings';
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
    expect(
      AccAddress.validate('terra1pdx498r0hrc2fj36sjhs8vuhrz9hd2cw0tmam9')
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
      AccPubKey.validate(
        'terrapub1addwnpepqt8ha594svjn3nvfk4ggfn5n8xd3sm3cz6ztxyugwcuqzsuuhhfq5nwzrf9'
      )
    ).toBe(true);
  });

  it('converts from validator pubkey', () => {
    expect(
      AccPubKey.fromValPubKey(
        'terravaloperpub1addwnpepqt8ha594svjn3nvfk4ggfn5n8xd3sm3cz6ztxyugwcuqzsuuhhfq5y7accr'
      )
    ).toEqual(
      'terrapub1addwnpepqt8ha594svjn3nvfk4ggfn5n8xd3sm3cz6ztxyugwcuqzsuuhhfq5nwzrf9'
    );
  });
});

describe('ValPubKey', () => {
  it('validates validator pubkey', () => {
    expect(
      ValPubKey.validate(
        'terravaloperpub1addwnpepqt8ha594svjn3nvfk4ggfn5n8xd3sm3cz6ztxyugwcuqzsuuhhfq5y7accr'
      )
    ).toBe(true);

    const words = bech32.toWords(Buffer.from('foobar', 'utf8'));
    const badPubKey = bech32.encode('terrapub', words);

    expect(ValPubKey.validate(badPubKey)).toBe(false);
    expect(
      ValPubKey.validate(
        'terrapub1addwnpepqt8ha594svjn3nvfk4ggfn5n8xd3sm3cz6ztxyugwcuqzsuuhhfq5nwzrf9'
      )
    ).toBe(false);
  });

  it('converts from account pubkey', () => {
    expect(
      ValPubKey.fromAccPubKey(
        'terrapub1addwnpepqt8ha594svjn3nvfk4ggfn5n8xd3sm3cz6ztxyugwcuqzsuuhhfq5nwzrf9'
      )
    ).toEqual(
      'terravaloperpub1addwnpepqt8ha594svjn3nvfk4ggfn5n8xd3sm3cz6ztxyugwcuqzsuuhhfq5y7accr'
    );
  });
});
