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
exports.Metadata = void 0;
var metadata_1 = require("@terra-money/terra.proto/ibc/applications/fee/v1/metadata");
var json_1 = require("../../../../util/json");
/**
 * Metadata defines the ICS29 channel specific metadata encoded into the channel version bytestring
 * See ICS004: https://github.com/cosmos/ibc/tree/master/spec/core/ics-004-channel-and-packet-semantics#Versioning
 */
var Metadata = /** @class */ (function (_super) {
    __extends(Metadata, _super);
    /**
     * @param fee_version fee_version defines the ICS29 fee version
     * @param app_version app_version defines the underlying application version, which may or may not be a JSON encoded bytestring
     */
    function Metadata(fee_version, app_version) {
        var _this = _super.call(this) || this;
        _this.fee_version = fee_version;
        _this.app_version = app_version;
        return _this;
    }
    Metadata.fromAmino = function (data) {
        var fee_version = data.fee_version, app_version = data.app_version;
        return new Metadata(fee_version, app_version);
    };
    Metadata.prototype.toAmino = function () {
        var _a = this, fee_version = _a.fee_version, app_version = _a.app_version;
        var res = {
            fee_version: fee_version,
            app_version: app_version,
        };
        return res;
    };
    Metadata.fromData = function (data) {
        var fee_version = data.fee_version, app_version = data.app_version;
        return new Metadata(fee_version, app_version);
    };
    Metadata.prototype.toData = function () {
        var _a = this, fee_version = _a.fee_version, app_version = _a.app_version;
        var res = {
            fee_version: fee_version,
            app_version: app_version,
        };
        return res;
    };
    Metadata.fromProto = function (proto) {
        return new Metadata(proto.feeVersion, proto.appVersion);
    };
    Metadata.prototype.toProto = function () {
        var _a = this, fee_version = _a.fee_version, app_version = _a.app_version;
        return metadata_1.Metadata.fromPartial({
            feeVersion: fee_version,
            appVersion: app_version,
        });
    };
    return Metadata;
}(json_1.JSONSerializable));
exports.Metadata = Metadata;
//# sourceMappingURL=Metadata.js.map