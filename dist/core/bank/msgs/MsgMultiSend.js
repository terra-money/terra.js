"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgMultiSend = void 0;
var json_1 = require("../../../util/json");
var Coins_1 = require("../../Coins");
/**
 * If you have multiple senders and/or multiple recipients, you can use MsgMultiSend,
 * which can batch together the senders and recipients in one message to save on gas
 * fees.
 *
 * Specify the senders and recipients and their corresponding deposit contribution /
 * receiving amounts with [[MsgMultiSend.Input]] or [[MsgMultiSend.Output]].
 *
 * Example:
 *
 * ```ts
 * import { MsgMultiSend } from "@terra-money/terra.js";
 *
 * const inputs: MsgMultiSend.Input[] = [
 *    new MsgMultiSend.Input(
 *      'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
 *      {
 *        ukrw: 123123,
 *      })
 *    ),
 *    new MsgMultiSend.Input('terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfad', [
 *      new Coin('uluna', 123123),
 *    ]),
 *  ];
 *   const outputs: MsgMultiSend.Output[] = [
 *    new MsgMultiSend.Output(
 *      'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfad',
 *        {
 *          ukrw: 123123,
 *        }
 *    ),
 *    new MsgMultiSend.Output('terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfga',
 *      {
 *        uluna: 123123,
 *      }
 *    ),
 *  ];
 *  const multisend = new MsgMultiSend(inputs, outputs);
 * ```
 */
var MsgMultiSend = /** @class */ (function (_super) {
    __extends(MsgMultiSend, _super);
    /**
     * @param inputs inputs
     * @param outputs outputs
     */
    function MsgMultiSend(inputs, outputs) {
        var _this = _super.call(this) || this;
        _this.inputs = inputs;
        _this.outputs = outputs;
        return _this;
    }
    MsgMultiSend.fromData = function (data) {
        var _a = data.value, inputs = _a.inputs, outputs = _a.outputs;
        return new MsgMultiSend(inputs.map(function (i) { return MsgMultiSend.Input.fromData(i); }), outputs.map(function (o) { return MsgMultiSend.Output.fromData(o); }));
    };
    MsgMultiSend.prototype.toData = function () {
        var _a = this, inputs = _a.inputs, outputs = _a.outputs;
        return {
            type: 'bank/MsgMultiSend',
            value: {
                inputs: inputs.map(function (i) { return i.toData(); }),
                outputs: outputs.map(function (o) { return o.toData(); }),
            },
        };
    };
    return MsgMultiSend;
}(json_1.JSONSerializable));
exports.MsgMultiSend = MsgMultiSend;
(function (MsgMultiSend) {
    var IO = /** @class */ (function (_super) {
        __extends(IO, _super);
        /**
         * @param address address
         * @param coinsInput coins-compatible input
         */
        function IO(address, coinsInput) {
            var _this = _super.call(this) || this;
            _this.address = address;
            _this.coins = new Coins_1.Coins(coinsInput);
            return _this;
        }
        IO.prototype.toData = function () {
            var _a = this, address = _a.address, coins = _a.coins;
            return {
                address: address,
                coins: coins.toData(),
            };
        };
        IO.fromData = function (data) {
            var address = data.address, coins = data.coins;
            return new IO(address, Coins_1.Coins.fromData(coins));
        };
        return IO;
    }(json_1.JSONSerializable));
    MsgMultiSend.IO = IO;
    MsgMultiSend.Input = IO;
    MsgMultiSend.Output = IO;
})(MsgMultiSend = exports.MsgMultiSend || (exports.MsgMultiSend = {}));
exports.MsgMultiSend = MsgMultiSend;
//# sourceMappingURL=MsgMultiSend.js.map