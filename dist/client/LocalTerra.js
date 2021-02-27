"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalTerra = void 0;
var LCDClient_1 = require("./lcd/LCDClient");
var MnemonicKey_1 = require("../key/MnemonicKey");
var LOCALTERRA_MNEMONICS = {
    validator: 'satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn',
    test1: 'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
    test2: 'quality vacuum heart guard buzz spike sight swarm shove special gym robust assume sudden deposit grid alcohol choice devote leader tilt noodle tide penalty',
    test3: 'symbol force gallery make bulk round subway violin worry mixture penalty kingdom boring survey tool fringe patrol sausage hard admit remember broken alien absorb',
    test4: 'bounce success option birth apple portion aunt rural episode solution hockey pencil lend session cause hedgehog slender journey system canvas decorate razor catch empty',
    test5: 'second render cat sing soup reward cluster island bench diet lumber grocery repeat balcony perfect diesel stumble piano distance caught occur example ozone loyal',
    test6: 'spatial forest elevator battle also spoon fun skirt flight initial nasty transfer glory palm drama gossip remove fan joke shove label dune debate quick',
    test7: 'noble width taxi input there patrol clown public spell aunt wish punch moment will misery eight excess arena pen turtle minimum grain vague inmate',
    test8: 'cream sport mango believe inhale text fish rely elegant below earth april wall rug ritual blossom cherry detail length blind digital proof identify ride',
    test9: 'index light average senior silent limit usual local involve delay update rack cause inmate wall render magnet common feature laundry exact casual resource hundred',
    test10: 'prefer forget visit mistake mixture feel eyebrow autumn shop pair address airport diesel street pass vague innocent poem method awful require hurry unhappy shoulder',
};
var LocalTerra = /** @class */ (function (_super) {
    __extends(LocalTerra, _super);
    function LocalTerra() {
        var _this = _super.call(this, {
            URL: 'http://localhost:1317',
            chainID: 'localterra',
        }) || this;
        _this.wallets = {
            validator: _this.wallet(new MnemonicKey_1.MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.validator })),
            test1: _this.wallet(new MnemonicKey_1.MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test1 })),
            test2: _this.wallet(new MnemonicKey_1.MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test2 })),
            test3: _this.wallet(new MnemonicKey_1.MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test3 })),
            test4: _this.wallet(new MnemonicKey_1.MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test4 })),
            test5: _this.wallet(new MnemonicKey_1.MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test5 })),
            test6: _this.wallet(new MnemonicKey_1.MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test6 })),
            test7: _this.wallet(new MnemonicKey_1.MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test7 })),
            test8: _this.wallet(new MnemonicKey_1.MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test8 })),
            test9: _this.wallet(new MnemonicKey_1.MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test9 })),
            test10: _this.wallet(new MnemonicKey_1.MnemonicKey({ mnemonic: LOCALTERRA_MNEMONICS.test10 })),
        };
        return _this;
    }
    return LocalTerra;
}(LCDClient_1.LCDClient));
exports.LocalTerra = LocalTerra;
//# sourceMappingURL=LocalTerra.js.map