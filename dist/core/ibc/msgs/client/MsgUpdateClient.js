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
exports.MsgUpdateClient = void 0;
var json_1 = require("../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/ibc/core/client/v1/tx");
var Header_1 = require("../../lightclient/tendermint/Header");
/**
 * MsgUpdateClient defines an sdk.Msg to update a IBC client state using the given header
 */
var MsgUpdateClient = /** @class */ (function (_super) {
    __extends(MsgUpdateClient, _super);
    /**
     * @param client_id client unique identifier
     * @param header header to update the light client
     * @param signer signer address
     */
    function MsgUpdateClient(client_id, header, signer) {
        var _this = _super.call(this) || this;
        _this.client_id = client_id;
        _this.header = header;
        _this.signer = signer;
        return _this;
    }
    MsgUpdateClient.fromAmino = function (_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    };
    MsgUpdateClient.prototype.toAmino = function () {
        throw new Error('Amino not supported');
    };
    MsgUpdateClient.fromData = function (data, _) {
        _;
        var client_id = data.client_id, header = data.header, signer = data.signer;
        return new MsgUpdateClient(client_id, header ? Header_1.Header.fromData(header) : undefined, signer);
    };
    MsgUpdateClient.prototype.toData = function (_) {
        _;
        var _a = this, client_id = _a.client_id, header = _a.header, signer = _a.signer;
        return {
            '@type': '/ibc.core.client.v1.MsgUpdateClient',
            client_id: client_id,
            header: (header === null || header === void 0 ? void 0 : header.toData()) || undefined,
            signer: signer,
        };
    };
    MsgUpdateClient.fromProto = function (proto, _) {
        _;
        return new MsgUpdateClient(proto.clientId, proto.header ? Header_1.Header.unpackAny(proto.header) : undefined, proto.signer);
    };
    MsgUpdateClient.prototype.toProto = function (_) {
        _;
        var _a = this, client_id = _a.client_id, header = _a.header, signer = _a.signer;
        return tx_1.MsgUpdateClient.fromPartial({
            clientId: client_id,
            header: (header === null || header === void 0 ? void 0 : header.packAny()) || undefined,
            signer: signer,
        });
    };
    MsgUpdateClient.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.client.v1.MsgUpdateClient',
            value: tx_1.MsgUpdateClient.encode(this.toProto()).finish(),
        });
    };
    MsgUpdateClient.unpackAny = function (msgAny, _) {
        _;
        return MsgUpdateClient.fromProto(tx_1.MsgUpdateClient.decode(msgAny.value));
    };
    return MsgUpdateClient;
}(json_1.JSONSerializable));
exports.MsgUpdateClient = MsgUpdateClient;
//# sourceMappingURL=MsgUpdateClient.js.map