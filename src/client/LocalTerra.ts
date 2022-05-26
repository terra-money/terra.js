import { LCDClient } from './lcd/LCDClient';
import { Wallet } from './lcd/Wallet';
import { MnemonicKey } from '../key/MnemonicKey';

const LOCALTERRA_MNEMONICS = {
  validator:
    'satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn',
  test1:
    'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
  test2:
    'quality vacuum heart guard buzz spike sight swarm shove special gym robust assume sudden deposit grid alcohol choice devote leader tilt noodle tide penalty',
  test3:
    'symbol force gallery make bulk round subway violin worry mixture penalty kingdom boring survey tool fringe patrol sausage hard admit remember broken alien absorb',
  test4:
    'bounce success option birth apple portion aunt rural episode solution hockey pencil lend session cause hedgehog slender journey system canvas decorate razor catch empty',
  test5:
    'second render cat sing soup reward cluster island bench diet lumber grocery repeat balcony perfect diesel stumble piano distance caught occur example ozone loyal',
  test6:
    'spatial forest elevator battle also spoon fun skirt flight initial nasty transfer glory palm drama gossip remove fan joke shove label dune debate quick',
  test7:
    'noble width taxi input there patrol clown public spell aunt wish punch moment will misery eight excess arena pen turtle minimum grain vague inmate',
  test8:
    'cream sport mango believe inhale text fish rely elegant below earth april wall rug ritual blossom cherry detail length blind digital proof identify ride',
  test9:
    'index light average senior silent limit usual local involve delay update rack cause inmate wall render magnet common feature laundry exact casual resource hundred',
  test10:
    'prefer forget visit mistake mixture feel eyebrow autumn shop pair address airport diesel street pass vague innocent poem method awful require hurry unhappy shoulder',
};

export class LocalTerra extends LCDClient {
  public wallets: {
    validator: Wallet;
    test1: Wallet;
    test2: Wallet;
    test3: Wallet;
    test4: Wallet;
    test5: Wallet;
    test6: Wallet;
    test7: Wallet;
    test8: Wallet;
    test9: Wallet;
    test10: Wallet;
  };

  constructor(isClassic?: boolean) {
    super({
      URL: 'http://localhost:1317',
      chainID: 'localterra',
      isClassic,
    });

    this.wallets = {
      validator: this.wallet(
        new MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.validator })
      ),
      test1: this.wallet(
        new MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test1 })
      ),
      test2: this.wallet(
        new MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test2 })
      ),
      test3: this.wallet(
        new MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test3 })
      ),
      test4: this.wallet(
        new MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test4 })
      ),
      test5: this.wallet(
        new MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test5 })
      ),
      test6: this.wallet(
        new MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test6 })
      ),
      test7: this.wallet(
        new MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test7 })
      ),
      test8: this.wallet(
        new MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test8 })
      ),
      test9: this.wallet(
        new MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test9 })
      ),
      test10: this.wallet(
        new MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test10 })
      ),
    };
  }
}
