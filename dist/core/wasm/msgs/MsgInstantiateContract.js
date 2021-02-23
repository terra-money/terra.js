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
exports.MsgInstantiateContract = void 0;
var json_1 = require("../../../util/json");
var Coins_1 = require("../../Coins");
var MsgInstantiateContract = /** @class */ (function (_super) {
    __extends(MsgInstantiateContract, _super);
    /**
     * @param owner contract owner
     * @param code_id reference to the code on the blockchain
     * @param init_msg message to configure the initial state of the contract
     * @param init_coins initial amount of coins to be sent to the contract's address
     * @param migratable defines to be migratable or not
     */
    function MsgInstantiateContract(owner, code_id, init_msg, init_coins, migratable) {
        if (init_coins === void 0) { init_coins = {}; }
        if (migratable === void 0) { migratable = false; }
        var _this = _super.call(this) || this;
        _this.owner = owner;
        _this.code_id = code_id;
        _this.init_msg = init_msg;
        _this.migratable = migratable;
        _this.init_coins = new Coins_1.Coins(init_coins);
        return _this;
    }
    MsgInstantiateContract.fromData = function (data) {
        var _a = data.value, owner = _a.owner, code_id = _a.code_id, init_msg = _a.init_msg, init_coins = _a.init_coins, migratable = _a.migratable;
        return new MsgInstantiateContract(owner, Number.parseInt(code_id), JSON.parse(Buffer.from(init_msg, 'base64').toString()), Coins_1.Coins.fromData(init_coins), migratable);
    };
    MsgInstantiateContract.prototype.toData = function () {
        var _a = this, owner = _a.owner, code_id = _a.code_id, init_msg = _a.init_msg, init_coins = _a.init_coins, migratable = _a.migratable;
        return {
            type: 'wasm/MsgInstantiateContract',
            value: {
                owner: owner,
                code_id: code_id.toFixed(),
                init_msg: Buffer.from(JSON.stringify(init_msg)).toString('base64'),
                init_coins: init_coins.toData(),
                migratable: migratable,
            },
        };
    };
    return MsgInstantiateContract;
}(json_1.JSONSerializable));
exports.MsgInstantiateContract = MsgInstantiateContract;
//# sourceMappingURL=MsgInstantiateContract.js.map