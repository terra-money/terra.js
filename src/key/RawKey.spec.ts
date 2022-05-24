import { RawKey, MnemonicKey } from '.';
import { MsgSend } from '../core/bank/msgs';
import { Coins } from '../core/Coins';
import { SignDoc } from '../core/SignDoc';
import { Fee } from '../core/Fee';
import { SignatureV2 } from '../core/SignatureV2';
import { AuthInfo, TxBody } from '../core/Tx';
import { PublicKey, SimplePublicKey } from '../core';

describe('RawKey', () => {
  it('derives correct key information', () => {
    const examples: {
      mnemonic?: string;
      publicKey: PublicKey;
    }[] = [
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
      const rk = new RawKey(mk.privateKey);
      delete example.mnemonic;
      expect(rk).toMatchObject(example);
    });
  });

  it('signature', async () => {
    const mk = new MnemonicKey({
      mnemonic:
        'island relax shop such yellow opinion find know caught erode blue dolphin behind coach tattoo light focus snake common size analyst imitate employ walnut',
    });
    const rk = new RawKey(mk.privateKey);
    const { accAddress } = rk;

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
    } = await rk.createSignatureAmino(signDoc, true);
    expect((single as SignatureV2.Descriptor.Single).signature).toEqual(
      'FJKAXRxNB5ruqukhVqZf3S/muZEUmZD10fVmWycdVIxVWiCXXFsUy2VY2jINEOUGNwfrqEZsT2dUfAvWj8obLg=='
    );
  });
});
