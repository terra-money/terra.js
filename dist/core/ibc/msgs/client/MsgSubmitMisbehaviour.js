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
exports.MsgSubmitMisbehaviour = void 0;
var json_1 = require("../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/ibc/core/client/v1/tx");
/**
 *  MsgSubmitMisbehaviour defines an sdk.Msg type that submits Evidence for light client misbehaviour.
 */
var MsgSubmitMisbehaviour = /** @class */ (function (_super) {
    __extends(MsgSubmitMisbehaviour, _super);
    /**
     * @param client_id client unique identifier
     * @param misbehaviour misbehaviour used for freezing the light client
     * @param signer signer address
     */
    function MsgSubmitMisbehaviour(client_id, misbehaviour, signer) {
        var _this = _super.call(this) || this;
        _this.client_id = client_id;
        _this.misbehaviour = misbehaviour;
        _this.signer = signer;
        return _this;
    }
    MsgSubmitMisbehaviour.fromAmino = function (_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    };
    MsgSubmitMisbehaviour.prototype.toAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    MsgSubmitMisbehaviour.fromData = function (data, _) {
        _;
        var client_id = data.client_id, misbehaviour = data.misbehaviour, signer = data.signer;
        return new MsgSubmitMisbehaviour(client_id, misbehaviour, signer);
    };
    MsgSubmitMisbehaviour.prototype.toData = function (_) {
        _;
        var _a = this, client_id = _a.client_id, misbehaviour = _a.misbehaviour, signer = _a.signer;
        return {
            '@type': '/ibc.core.client.v1.MsgSubmitMisbehaviour',
            client_id: client_id,
            misbehaviour: misbehaviour,
            signer: signer,
        };
    };
    MsgSubmitMisbehaviour.fromProto = function (proto, _) {
        _;
        return new MsgSubmitMisbehaviour(proto.clientId, proto.misbehaviour, proto.signer);
    };
    MsgSubmitMisbehaviour.prototype.toProto = function (_) {
        _;
        var _a = this, client_id = _a.client_id, misbehaviour = _a.misbehaviour, signer = _a.signer;
        return tx_1.MsgSubmitMisbehaviour.fromPartial({
            clientId: client_id,
            misbehaviour: misbehaviour,
            signer: signer,
        });
    };
    MsgSubmitMisbehaviour.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.client.v1.MsgSubmitMisbehaviour',
            value: tx_1.MsgSubmitMisbehaviour.encode(this.toProto()).finish(),
        });
    };
    MsgSubmitMisbehaviour.unpackAny = function (msgAny, _) {
        _;
        return MsgSubmitMisbehaviour.fromProto(tx_1.MsgSubmitMisbehaviour.decode(msgAny.value));
    };
    return MsgSubmitMisbehaviour;
}(json_1.JSONSerializable));
exports.MsgSubmitMisbehaviour = MsgSubmitMisbehaviour;
//# sourceMappingURL=MsgSubmitMisbehaviour.js.map