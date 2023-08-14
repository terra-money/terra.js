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
exports.UpdateInstantiateConfigProposal = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var proposal_1 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/proposal");
var AccessConfigUpdate_1 = require("../AccessConfigUpdate");
/**
 * UpdateInstantiateConfigProposal gov proposal content type to pin a set of code ids in the
 * wasmvm cache.
 */
var UpdateInstantiateConfigProposal = /** @class */ (function (_super) {
    __extends(UpdateInstantiateConfigProposal, _super);
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param access_config_updates the address of the smart access_config_updates
     */
    function UpdateInstantiateConfigProposal(title, description, access_config_updates) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        _this.access_config_updates = access_config_updates;
        return _this;
    }
    UpdateInstantiateConfigProposal.fromAmino = function (data, _) {
        var _a = data.value, title = _a.title, description = _a.description, access_config_updates = _a.access_config_updates;
        return new UpdateInstantiateConfigProposal(title, description, access_config_updates.map(function (acu) { return AccessConfigUpdate_1.AccessConfigUpdate.fromAmino(acu); }));
    };
    UpdateInstantiateConfigProposal.prototype.toAmino = function (_) {
        var _a = this, title = _a.title, description = _a.description, access_config_updates = _a.access_config_updates;
        return {
            type: 'wasm/UpdateInstantiateConfigProposal',
            value: {
                title: title,
                description: description,
                access_config_updates: access_config_updates.map(function (acu) { return acu.toAmino(); }),
            },
        };
    };
    UpdateInstantiateConfigProposal.fromProto = function (proto, _) {
        return new UpdateInstantiateConfigProposal(proto.title, proto.description, proto.accessConfigUpdates.map(function (acu) { return AccessConfigUpdate_1.AccessConfigUpdate.fromProto(acu); }));
    };
    UpdateInstantiateConfigProposal.prototype.toProto = function (_) {
        var _a = this, title = _a.title, description = _a.description, access_config_updates = _a.access_config_updates;
        return proposal_1.UpdateInstantiateConfigProposal.fromPartial({
            title: title,
            description: description,
            accessConfigUpdates: access_config_updates.map(function (acu) { return acu.toProto(); }),
        });
    };
    UpdateInstantiateConfigProposal.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal',
            value: proposal_1.UpdateInstantiateConfigProposal.encode(this.toProto(isClassic)).finish(),
        });
    };
    UpdateInstantiateConfigProposal.unpackAny = function (msgAny, isClassic) {
        return UpdateInstantiateConfigProposal.fromProto(proposal_1.UpdateInstantiateConfigProposal.decode(msgAny.value), isClassic);
    };
    UpdateInstantiateConfigProposal.fromData = function (data, _) {
        var _a = data, title = _a.title, description = _a.description, access_config_updates = _a.access_config_updates;
        return new UpdateInstantiateConfigProposal(title, description, access_config_updates.map(function (acu) { return AccessConfigUpdate_1.AccessConfigUpdate.fromData(acu); }));
    };
    UpdateInstantiateConfigProposal.prototype.toData = function (_) {
        var _a = this, title = _a.title, description = _a.description, access_config_updates = _a.access_config_updates;
        return {
            '@type': '/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal',
            title: title,
            description: description,
            access_config_updates: access_config_updates.map(function (acu) { return acu.toData(); }),
        };
    };
    return UpdateInstantiateConfigProposal;
}(json_1.JSONSerializable));
exports.UpdateInstantiateConfigProposal = UpdateInstantiateConfigProposal;
//# sourceMappingURL=UpdateInstantiateConfigProposal.js.map