import { MnemonicKey } from './MnemonicKey';
import { MsgSend, MsgMultiSend } from '../core/bank/msgs';
import { Coins } from '../core/Coins';
import { Fee } from '../core/Fee';
import { AuthInfo, TxBody } from '../core/Tx';
import { SignDoc } from '../core/SignDoc';
import { SimplePublicKey } from '../core';

describe('MnemonicKey', () => {
  it('derives correct Key information', () => {
    const examples = [
      {
        mnemonic:
          'wonder caution square unveil april art add hover spend smile proud admit modify old copper throw crew happy nature luggage reopen exhibit ordinary napkin',
        publicKey: new SimplePublicKey(
          'As9+0LWDJTjNibVQhM6TOZsYbjgWhLMTiHY4AUOcvdIK'
        ),
      },
      {
        mnemonic:
          'speak scatter present rice cattle sight amateur novel dizzy wheel cannon mango model sunset smooth appear impose want lunar tattoo theme zero misery flower',
        publicKey: new SimplePublicKey(
          'A3rCe3YxpfO1tN4t5eUnGM293FCK4PQOcf9wJsoLXpi5'
        ),
      },
      {
        mnemonic:
          'pool december kitchen crouch robot relax oppose system virtual spread pistol obtain vicious bless salmon drive repeat when frost summer render shed bone limb',
        publicKey: new SimplePublicKey(
          'AzoigD/43c9+s0xcJExaZOlTVhODvD9ZOyIS/TQKXK2F'
        ),
      },
    ];
    examples.forEach(example => {
      const { mnemonic } = example;
      const mk = new MnemonicKey({ mnemonic });
      expect(mk).toMatchObject(example);
    });
  });

  it('generates random mnemonic', () => {
    const mk = new MnemonicKey();
    const mk2 = new MnemonicKey();
    expect(mk.mnemonic).not.toEqual(mk2.mnemonic);
  });

  it('signature', async () => {
    const mk = new MnemonicKey({
      mnemonic:
        'island relax shop such yellow opinion find know caught erode blue dolphin behind coach tattoo light focus snake common size analyst imitate employ walnut',
    });
    const { accAddress } = mk;

    const msgSend = new MsgSend(
      accAddress,
      'terra1wg2mlrxdmnnkkykgqg4znky86nyrtc45q336yv',
      new Coins({ uluna: '100000000' })
    );

    const fee = new Fee(46467, new Coins({ uluna: '698' }));
    const signDoc = new SignDoc(
      'columbus-3-testnet',
      45,
      0,
      new AuthInfo([], fee),
      new TxBody([msgSend])
    );

    const {
      data: { single },
    } = await mk.createSignatureAmino(signDoc, true);
    expect((single as any).signature).toEqual(
      'FJKAXRxNB5ruqukhVqZf3S/muZEUmZD10fVmWycdVIxVWiCXXFsUy2VY2jINEOUGNwfrqEZsT2dUfAvWj8obLg=='
    );
  });

  it('multisig', async () => {
    const receiverAddr = 'terra1ptdx6akgk7wwemlk5j73artt5t6j8am08ql3qv';
    const multisigAddr = 'terra16ddrexknvk2e443jsnle4n6s2ewjc6z3mjcu6d';
    const multisigAccountNumber = 46;
    const multisigSequenceNumber = 0;
    const a1Key = new MnemonicKey({
      mnemonic:
        'swamp increase solar renew twelve easily possible pig ostrich harvest more indicate lion denial kind target small dumb mercy under proud arrive gentle field',
    });
    expect(a1Key.accAddress).toEqual(
      'terra12dazwl3yq6nwrce052ah3fudkarglsgvacyvl9'
    );
    const a2Key = new MnemonicKey({
      mnemonic:
        'service frozen keen unveil luggage initial surge name conduct mesh soup escape weather gas clown brand holiday result protect chat plug false pitch little',
    });
    expect(a2Key.accAddress).toEqual(
      'terra1jqw25580qljucyy2xkpp7j02kd4mwx69wvfgf9'
    );
    const a3Key = new MnemonicKey({
      mnemonic:
        'corn peasant blue sight spy three stove confirm night brother vote dish reduce sick observe outside vacant arena laugh devote exotic wasp supply rally',
    });
    expect(a3Key.accAddress).toEqual(
      'terra13hrg8ul0p7sh85jwalh3leysdrw9swh44dql2h'
    );

    const msgSend = new MsgSend(
      multisigAddr,
      receiverAddr,
      new Coins({ uluna: 100000000 })
    );

    const signDoc = new SignDoc(
      'columbus-3-testnet',
      multisigAccountNumber,
      multisigSequenceNumber,
      new AuthInfo([], new Fee(50000, { uluna: 750 })),
      new TxBody([msgSend])
    );

    const a1Signature = await a1Key.createSignatureAmino(signDoc, true);
    expect((a1Signature.data.single as any).signature).toEqual(
      '/kIFqGnmgOqMzf7guoe1eDTA1W5TjJcelJSRBdN0CTRyyxTMIbsxd+wL4fatHAq4hYOTf/zxD4l5xyU7/POZyg=='
    );

    const a2Signature = await a2Key.createSignatureAmino(signDoc, true);
    expect((a2Signature.data.single as any).signature).toEqual(
      'hEjv9CnXQa89robHVsHS3GDZJiunnNb8xqziWD8D4aAuBXwxDzUXY14IE7q9Z3Qh0VMb3FBHuogHi7QZn2pM9g=='
    );

    const a3Signature = await a3Key.createSignatureAmino(signDoc, true);
    expect((a3Signature.data.single as any).signature).toEqual(
      'CwHdmwC9ADtr5cTUdRZEfAcA8d1bgkF8fB+DcbB6MBB6amJz51WQYfVE1VgVTEY8Lyzg8+s8gX6nkqkXPeX72A=='
    );
  });

  it('multisend', async () => {
    const key = new MnemonicKey({
      mnemonic:
        'spatial fantasy weekend romance entire million celery final moon solid route theory way hockey north trigger advice balcony melody fabric alter bullet twice push',
    });

    const signDoc = new SignDoc(
      'columbus-3-testnet',
      47,
      0,
      new AuthInfo([], new Fee(100000, { uluna: 1500, usdr: 1000 })),
      new TxBody(
        [
          new MsgMultiSend(
            [
              new MsgMultiSend.Input(key.accAddress, {
                uluna: 1000000,
                usdr: 1000000,
              }),
            ],
            [
              new MsgMultiSend.Output(
                'terra12dazwl3yq6nwrce052ah3fudkarglsgvacyvl9',
                {
                  uluna: 500000,
                }
              ),
              new MsgMultiSend.Output(
                'terra1ptdx6akgk7wwemlk5j73artt5t6j8am08ql3qv',
                {
                  uluna: 500000,
                  usdr: 1000000,
                }
              ),
            ]
          ),
        ],
        '1234'
      )
    );

    const signature = await key.createSignatureAmino(signDoc, true);
    expect((signature.data.single as any).signature).toEqual(
      'YA/ToXLxuuAOQlpm5trbIUu2zv5NfBmeHz2jmXgNrt8jP+odukerfri3DUXAJuhETAMHVVV78t7Q4xC0j+CVkA=='
    );
  });
});
