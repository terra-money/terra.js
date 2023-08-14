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
exports.MsgClearContractAdmin = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/tx");
var MsgClearContractAdmin = /** @class */ (function (_super) {
    __extends(MsgClearContractAdmin, _super);
    /**
     * @param admin contract admin
     * @param contract contract address
     */
    function MsgClearContractAdmin(admin, contract) {
        var _this = _super.call(this) || this;
        _this.admin = admin;
        _this.contract = contract;
        return _this;
    }
    MsgClearContractAdmin.fromAmino = function (data, _) {
        var _a = data.value, sender = _a.sender, contract = _a.contract;
        return new MsgClearContractAdmin(sender, contract);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MsgClearContractAdmin.prototype.toAmino = function (_) {
        var _a = this, admin = _a.admin, contract = _a.contract;
        return {
            type: 'wasm/MsgClearAdmin',
            value: {
                sender: admin,
                contract: contract,
            },
        };
    };
    MsgClearContractAdmin.fromProto = function (data, _) {
        var _a = data, sender = _a.sender, contract = _a.contract;
        return new MsgClearContractAdmin(sender, contract);
    };
    MsgClearContractAdmin.prototype.toProto = function (_) {
        return tx_1.MsgClearAdmin.fromPartial({
            sender: this.admin,
            contract: this.contract,
        });
    };
    MsgClearContractAdmin.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.MsgClearAdmin',
            value: tx_1.MsgClearAdmin.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgClearContractAdmin.unpackAny = function (msgAny, isClassic) {
        return MsgClearContractAdmin.fromProto(tx_1.MsgClearAdmin.decode(msgAny.value), isClassic);
    };
    MsgClearContractAdmin.fromData = function (data, _) {
        var _a = data, sender = _a.sender, contract = _a.contract;
        return new MsgClearContractAdmin(sender, contract);
    };
    MsgClearContractAdmin.prototype.toData = function (_) {
        return {
            '@type': '/cosmwasm.wasm.v1.MsgClearAdmin',
            sender: this.admin,
            contract: this.contract,
        };
    };
    return MsgClearContractAdmin;
}(json_1.JSONSerializable));
exports.MsgClearContractAdmin = MsgClearContractAdmin;
//# sourceMappingURL=MsgClearContractAdmin.js.map