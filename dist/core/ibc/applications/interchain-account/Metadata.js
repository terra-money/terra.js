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
var metadata_1 = require("@terra-money/terra.proto/ibc/applications/interchain_accounts/v1/metadata");
var json_1 = require("../../../../util/json");
/**
 * Metadata defines a set of protocol specific data encoded into the ICS27 channel version bytestring
 * See ICS004: https://github.com/cosmos/ibc/tree/master/spec/core/ics-004-channel-and-packet-semantics#Versioning
 */
var Metadata = /** @class */ (function (_super) {
    __extends(Metadata, _super);
    /**
     * @param version defines the ICS27 protocol version
     * @param controller_connection_id is the connection identifier associated with the controller chain
     * @param host_connection_id is the connection identifier associated with the host chain
     * @param address defines the interchain account address to be fulfilled upon the OnChanOpenTry handshake step ( NOTE: the address field is empty on the OnChanOpenInit handshake step)
     * @param encoding defines the supported codec format
     * @param tx_type defines the type of transactions the interchain account can execute
     */
    function Metadata(version, controller_connection_id, host_connection_id, address, encoding, tx_type) {
        var _this = _super.call(this) || this;
        _this.version = version;
        _this.controller_connection_id = controller_connection_id;
        _this.host_connection_id = host_connection_id;
        _this.address = address;
        _this.encoding = encoding;
        _this.tx_type = tx_type;
        return _this;
    }
    Metadata.fromAmino = function (data) {
        var version = data.version, controller_connection_id = data.controller_connection_id, host_connection_id = data.host_connection_id, address = data.address, encoding = data.encoding, tx_type = data.tx_type;
        return new Metadata(version, controller_connection_id, host_connection_id, address, encoding, tx_type);
    };
    Metadata.prototype.toAmino = function () {
        var _a = this, version = _a.version, controller_connection_id = _a.controller_connection_id, host_connection_id = _a.host_connection_id, address = _a.address, encoding = _a.encoding, tx_type = _a.tx_type;
        var res = {
            version: version,
            controller_connection_id: controller_connection_id,
            host_connection_id: host_connection_id,
            address: address,
            encoding: encoding,
            tx_type: tx_type
        };
        return res;
    };
    Metadata.fromData = function (data) {
        var version = data.version, controller_connection_id = data.controller_connection_id, host_connection_id = data.host_connection_id, address = data.address, encoding = data.encoding, tx_type = data.tx_type;
        return new Metadata(version, controller_connection_id, host_connection_id, address, encoding, tx_type);
    };
    Metadata.prototype.toData = function () {
        var _a = this, version = _a.version, controller_connection_id = _a.controller_connection_id, host_connection_id = _a.host_connection_id, address = _a.address, encoding = _a.encoding, tx_type = _a.tx_type;
        var res = {
            version: version,
            controller_connection_id: controller_connection_id,
            host_connection_id: host_connection_id,
            address: address,
            encoding: encoding,
            tx_type: tx_type
        };
        return res;
    };
    Metadata.fromProto = function (proto) {
        return new Metadata(proto.version, proto.controllerConnectionId, proto.hostConnectionId, proto.address, proto.encoding, proto.txType);
    };
    Metadata.prototype.toProto = function () {
        var _a = this, version = _a.version, controller_connection_id = _a.controller_connection_id, host_connection_id = _a.host_connection_id, address = _a.address, encoding = _a.encoding, tx_type = _a.tx_type;
        return metadata_1.Metadata.fromPartial({
            version: version,
            controllerConnectionId: controller_connection_id,
            hostConnectionId: host_connection_id,
            address: address,
            encoding: encoding,
            txType: tx_type,
        });
    };
    return Metadata;
}(json_1.JSONSerializable));
exports.Metadata = Metadata;
//# sourceMappingURL=Metadata.js.map