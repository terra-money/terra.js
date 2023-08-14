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
exports.Version = void 0;
var connection_1 = require("@terra-money/terra.proto/ibc/core/connection/v1/connection");
var json_1 = require("../../../../util/json");
/*
 * Version defines the versioning scheme used to negotiate the IBC verison in the connection handshake.
 */
var Version = /** @class */ (function (_super) {
    __extends(Version, _super);
    /**
     * @param identifier unique version identifier
     * @param features list of features compatible with the specified identifier
     */
    function Version(identifier, features) {
        var _this = _super.call(this) || this;
        _this.identifier = identifier;
        _this.features = features;
        return _this;
    }
    Version.fromAmino = function (data) {
        var identifier = data.identifier, features = data.features;
        return new Version(identifier, features);
    };
    Version.prototype.toAmino = function () {
        var _a = this, identifier = _a.identifier, features = _a.features;
        var res = {
            identifier: identifier,
            features: features,
        };
        return res;
    };
    Version.fromData = function (data) {
        var identifier = data.identifier, features = data.features;
        return new Version(identifier, features);
    };
    Version.prototype.toData = function () {
        var _a = this, identifier = _a.identifier, features = _a.features;
        var res = {
            identifier: identifier,
            features: features,
        };
        return res;
    };
    Version.fromProto = function (proto) {
        return new Version(proto.identifier, proto.features);
    };
    Version.prototype.toProto = function () {
        var _a = this, identifier = _a.identifier, features = _a.features;
        return connection_1.Version.fromPartial({ identifier: identifier, features: features });
    };
    return Version;
}(json_1.JSONSerializable));
exports.Version = Version;
//# sourceMappingURL=Version.js.map