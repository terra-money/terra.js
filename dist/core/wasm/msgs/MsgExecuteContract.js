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
exports.MsgExecuteContract = void 0;
var json_1 = require("../../../util/json");
var Coins_1 = require("../../Coins");
var MsgExecuteContract = /** @class */ (function (_super) {
    __extends(MsgExecuteContract, _super);
    /**
     * @param sender contract user
     * @param contract contract address
     * @param msg HandleMsg to pass as arguments for contract invocation
     * @param coins coins to be sent to contract
     */
    function MsgExecuteContract(sender, contract, execute_msg, coins) {
        if (coins === void 0) { coins = {}; }
        var _this = _super.call(this) || this;
        _this.sender = sender;
        _this.contract = contract;
        _this.execute_msg = execute_msg;
        _this.coins = new Coins_1.Coins(coins);
        return _this;
    }
    MsgExecuteContract.fromData = function (data) {
        var _a = data.value, sender = _a.sender, contract = _a.contract, execute_msg = _a.execute_msg, coins = _a.coins;
        return new MsgExecuteContract(sender, contract, JSON.parse(Buffer.from(execute_msg, 'base64').toString()), Coins_1.Coins.fromData(coins));
    };
    MsgExecuteContract.prototype.toData = function () {
        var _a = this, sender = _a.sender, contract = _a.contract, execute_msg = _a.execute_msg, coins = _a.coins;
        return {
            type: 'wasm/MsgExecuteContract',
            value: {
                sender: sender,
                contract: contract,
                execute_msg: Buffer.from(JSON.stringify(execute_msg)).toString('base64'),
                coins: coins.toData(),
            },
        };
    };
    return MsgExecuteContract;
}(json_1.JSONSerializable));
exports.MsgExecuteContract = MsgExecuteContract;
//# sourceMappingURL=MsgExecuteContract.js.map