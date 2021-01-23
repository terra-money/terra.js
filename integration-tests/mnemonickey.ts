import { MnemonicKey } from '../src';

const mk = new MnemonicKey({
  mnemonic:
    'satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn',
  coinType: 118,
  account: 5,
  index: 32,
});

console.log(mk.accAddress);
