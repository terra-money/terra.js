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
exports.MsgUpdateContractAdmin = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/tx");
var MsgUpdateContractAdmin = /** @class */ (function (_super) {
    __extends(MsgUpdateContractAdmin, _super);
    /**
     * @param admin contract admin
     * @param new_admin new admin
     * @param contract contract address
     */
    function MsgUpdateContractAdmin(admin, new_admin, contract) {
        var _this = _super.call(this) || this;
        _this.admin = admin;
        _this.new_admin = new_admin;
        _this.contract = contract;
        return _this;
    }
    MsgUpdateContractAdmin.fromAmino = function (data, _) {
        var _a = data.value, sender = _a.sender, new_admin = _a.new_admin, contract = _a.contract;
        return new MsgUpdateContractAdmin(sender, new_admin, contract);
    };
    MsgUpdateContractAdmin.prototype.toAmino = function (_) {
        var _a = this, admin = _a.admin, new_admin = _a.new_admin, contract = _a.contract;
        return {
            type: 'wasm/MsgUpdateAdmin',
            value: {
                sender: admin,
                new_admin: new_admin,
                contract: contract,
            },
        };
    };
    MsgUpdateContractAdmin.fromProto = function (proto, _) {
        var p = proto;
        return new MsgUpdateContractAdmin(p.sender, p.newAdmin, p.contract);
    };
    MsgUpdateContractAdmin.prototype.toProto = function (_) {
        var _a = this, admin = _a.admin, new_admin = _a.new_admin, contract = _a.contract;
        return tx_1.MsgUpdateAdmin.fromPartial({
            sender: admin,
            contract: contract,
            newAdmin: new_admin,
        });
    };
    MsgUpdateContractAdmin.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.MsgUpdateAdmin',
            value: tx_1.MsgUpdateAdmin.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgUpdateContractAdmin.unpackAny = function (msgAny, isClassic) {
        return MsgUpdateContractAdmin.fromProto(tx_1.MsgUpdateAdmin.decode(msgAny.value), isClassic);
    };
    MsgUpdateContractAdmin.fromData = function (data, isClassic) {
        if (isClassic) {
            var _a = data, admin = _a.admin, new_admin = _a.new_admin, contract = _a.contract;
            return new MsgUpdateContractAdmin(admin, new_admin, contract);
        }
        else {
            var _b = data, sender = _b.sender, new_admin = _b.new_admin, contract = _b.contract;
            return new MsgUpdateContractAdmin(sender, new_admin, contract);
        }
    };
    MsgUpdateContractAdmin.prototype.toData = function (isClassic) {
        var _a = this, admin = _a.admin, new_admin = _a.new_admin, contract = _a.contract;
        if (isClassic) {
            return {
                '@type': '/terra.wasm.v1beta1.MsgUpdateContractAdmin',
                admin: admin,
                new_admin: new_admin,
                contract: contract,
            };
        }
        else {
            return {
                '@type': '/cosmwasm.wasm.v1.MsgUpdateAdmin',
                sender: admin,
                new_admin: new_admin,
                contract: contract,
            };
        }
    };
    return MsgUpdateContractAdmin;
}(json_1.JSONSerializable));
exports.MsgUpdateContractAdmin = MsgUpdateContractAdmin;
//# sourceMappingURL=MsgUpdateContractAdmin.js.map