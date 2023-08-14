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
exports.MsgMultiSend = void 0;
var json_1 = require("../../../util/json");
var Coins_1 = require("../../Coins");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/bank/v1beta1/tx");
var bank_1 = require("@terra-money/terra.proto/cosmos/bank/v1beta1/bank");
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
    MsgMultiSend.fromAmino = function (data, _) {
        _;
        var _a = data.value, inputs = _a.inputs, outputs = _a.outputs;
        return new MsgMultiSend(inputs.map(function (i) { return MsgMultiSend.Input.fromAmino(i); }), outputs.map(function (o) { return MsgMultiSend.Output.fromAmino(o); }));
    };
    MsgMultiSend.prototype.toAmino = function (isClassic) {
        var _a = this, inputs = _a.inputs, outputs = _a.outputs;
        return {
            type: isClassic ? 'bank/MsgMultiSend' : 'cosmos-sdk/MsgMultiSend',
            value: {
                inputs: inputs.map(function (i) { return i.toAmino(); }),
                outputs: outputs.map(function (o) { return o.toAmino(); }),
            },
        };
    };
    MsgMultiSend.fromData = function (data, _) {
        _;
        var inputs = data.inputs, outputs = data.outputs;
        return new MsgMultiSend(inputs.map(function (i) { return MsgMultiSend.Input.fromData(i); }), outputs.map(function (o) { return MsgMultiSend.Output.fromData(o); }));
    };
    MsgMultiSend.prototype.toData = function (_) {
        _;
        var _a = this, inputs = _a.inputs, outputs = _a.outputs;
        return {
            '@type': '/cosmos.bank.v1beta1.MsgMultiSend',
            inputs: inputs.map(function (i) { return i.toData(); }),
            outputs: outputs.map(function (o) { return o.toData(); }),
        };
    };
    MsgMultiSend.fromProto = function (proto, _) {
        _;
        return new MsgMultiSend(proto.inputs.map(function (i) { return MsgMultiSend.Input.fromProto(i); }), proto.outputs.map(function (o) { return MsgMultiSend.Output.fromProto(o); }));
    };
    MsgMultiSend.prototype.toProto = function (_) {
        _;
        var _a = this, inputs = _a.inputs, outputs = _a.outputs;
        return tx_1.MsgMultiSend.fromPartial({
            inputs: inputs.map(function (i) { return i.toProto(); }),
            outputs: outputs.map(function (i) { return i.toProto(); }),
        });
    };
    MsgMultiSend.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.bank.v1beta1.MsgMultiSend',
            value: tx_1.MsgMultiSend.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgMultiSend.unpackAny = function (msgAny, isClassic) {
        return MsgMultiSend.fromProto(tx_1.MsgMultiSend.decode(msgAny.value), isClassic);
    };
    return MsgMultiSend;
}(json_1.JSONSerializable));
exports.MsgMultiSend = MsgMultiSend;
(function (MsgMultiSend) {
    var Input = /** @class */ (function (_super) {
        __extends(Input, _super);
        /**
         * @param address address
         * @param coinsInput coins-compatible input
         */
        function Input(address, coinsInput) {
            var _this = _super.call(this) || this;
            _this.address = address;
            _this.coins = new Coins_1.Coins(coinsInput);
            return _this;
        }
        Input.prototype.toAmino = function (_) {
            _;
            var _a = this, address = _a.address, coins = _a.coins;
            return {
                address: address,
                coins: coins.toAmino(),
            };
        };
        Input.fromAmino = function (data, _) {
            _;
            var address = data.address, coins = data.coins;
            return new Input(address, Coins_1.Coins.fromAmino(coins));
        };
        Input.prototype.toData = function (_) {
            _;
            var _a = this, address = _a.address, coins = _a.coins;
            return {
                address: address,
                coins: coins.toData(),
            };
        };
        Input.fromData = function (data, _) {
            _;
            var address = data.address, coins = data.coins;
            return new Input(address, Coins_1.Coins.fromData(coins));
        };
        Input.prototype.toProto = function (_) {
            _;
            var _a = this, address = _a.address, coins = _a.coins;
            return bank_1.Input.fromPartial({
                address: address,
                coins: coins.toProto(),
            });
        };
        Input.fromProto = function (proto, _) {
            _;
            return new Input(proto.address, Coins_1.Coins.fromProto(proto.coins));
        };
        return Input;
    }(json_1.JSONSerializable));
    MsgMultiSend.Input = Input;
    var Output = /** @class */ (function (_super) {
        __extends(Output, _super);
        /**
         * @param address address
         * @param coinsOutput coins-compatible input
         */
        function Output(address, coinsInput) {
            var _this = _super.call(this) || this;
            _this.address = address;
            _this.coins = new Coins_1.Coins(coinsInput);
            return _this;
        }
        Output.prototype.toAmino = function (_) {
            _;
            var _a = this, address = _a.address, coins = _a.coins;
            return {
                address: address,
                coins: coins.toAmino(),
            };
        };
        Output.fromAmino = function (data, _) {
            _;
            var address = data.address, coins = data.coins;
            return new Output(address, Coins_1.Coins.fromAmino(coins));
        };
        Output.prototype.toData = function (_) {
            _;
            var _a = this, address = _a.address, coins = _a.coins;
            return {
                address: address,
                coins: coins.toData(),
            };
        };
        Output.fromData = function (data, _) {
            _;
            var address = data.address, coins = data.coins;
            return new Output(address, Coins_1.Coins.fromData(coins));
        };
        Output.prototype.toProto = function (_) {
            _;
            var _a = this, address = _a.address, coins = _a.coins;
            return bank_1.Output.fromPartial({
                address: address,
                coins: coins.toProto(),
            });
        };
        Output.fromProto = function (proto, _) {
            _;
            return new Output(proto.address, Coins_1.Coins.fromProto(proto.coins));
        };
        return Output;
    }(json_1.JSONSerializable));
    MsgMultiSend.Output = Output;
})(MsgMultiSend = exports.MsgMultiSend || (exports.MsgMultiSend = {}));
exports.MsgMultiSend = MsgMultiSend;
//# sourceMappingURL=MsgMultiSend.js.map