import { RawKey, MnemonicKey } from '.';
import { MsgSend } from '../core/bank/msgs';
import { Coins } from '../core';
import { StdSignMsg } from '../core';
import { StdFee } from '../core';

describe('RawKey', () => {
  it('derives correct key information', () => {
    const examples: {
      mnemonic?: string;
      accAddress: string;
      accPubKey: string;
      valAddress: string;
      valPubKey: string;
    }[] = [
      {
        mnemonic:
          'wonder caution square unveil april art add hover spend smile proud admit modify old copper throw crew happy nature luggage reopen exhibit ordinary napkin',
        accAddress: 'terra1jnzv225hwl3uxc5wtnlgr8mwy6nlt0vztv3qqm',
        accPubKey:
          'terrapub1addwnpepqt8ha594svjn3nvfk4ggfn5n8xd3sm3cz6ztxyugwcuqzsuuhhfq5nwzrf9',
        valAddress: 'terravaloper1jnzv225hwl3uxc5wtnlgr8mwy6nlt0vztraasg',
        valPubKey:
          'terravaloperpub1addwnpepqt8ha594svjn3nvfk4ggfn5n8xd3sm3cz6ztxyugwcuqzsuuhhfq5y7accr',
      },
      {
        mnemonic:
          'speak scatter present rice cattle sight amateur novel dizzy wheel cannon mango model sunset smooth appear impose want lunar tattoo theme zero misery flower',
        accAddress: 'terra1ghvjx8jyn3m4v94nwdzjjevlsqz3uevvvhvedp',
        accPubKey:
          'terrapub1addwnpepqdavy7mkxxjl8dd5mck7tef8rrxmmhzs3ts0grn3laczdjstt6vtjfsumau',
        valAddress: 'terravaloper1ghvjx8jyn3m4v94nwdzjjevlsqz3uevvvcqyaj',
        valPubKey:
          'terravaloperpub1addwnpepqdavy7mkxxjl8dd5mck7tef8rrxmmhzs3ts0grn3laczdjstt6vtj7qrqv6',
      },
      {
        mnemonic:
          'pool december kitchen crouch robot relax oppose system virtual spread pistol obtain vicious bless salmon drive repeat when frost summer render shed bone limb',
        accAddress: 'terra1a3l5xudduhrk43whxm65hpyh3lqspx94vhlx6h',
        accPubKey:
          'terrapub1addwnpepqvaz9qpllrwu7l4nf3wzgnz6vn54x4snsw7r7kfmygf06dq2tjkc2plmywj',
        valAddress: 'terravaloper1a3l5xudduhrk43whxm65hpyh3lqspx94vcnm2y',
        valPubKey:
          'terravaloperpub1addwnpepqvaz9qpllrwu7l4nf3wzgnz6vn54x4snsw7r7kfmygf06dq2tjkc2k0yll5',
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

    const fee = new StdFee(46467, new Coins({ uluna: '698' }));
    const stdSignMsg = new StdSignMsg('columbus-3-testnet', 45, 0, fee, [
      msgSend,
    ]);

    const { signature } = await rk.createSignature(stdSignMsg);
    expect(signature).toEqual(
      'FJKAXRxNB5ruqukhVqZf3S/muZEUmZD10fVmWycdVIxVWiCXXFsUy2VY2jINEOUGNwfrqEZsT2dUfAvWj8obLg=='
    );
  });
});
