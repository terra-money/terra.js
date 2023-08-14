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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgConnectionOpenInit = void 0;
var json_1 = require("../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var Counterparty_1 = require("../../core/connection/Counterparty");
var Version_1 = require("../../core/connection/Version");
var tx_1 = require("@terra-money/terra.proto/ibc/core/connection/v1/tx");
var long_1 = __importDefault(require("long"));
/**
 * MsgConnectionOpenInit defines the msg sent by an account on Chain A to initialize a connection with Chain B.
 */
var MsgConnectionOpenInit = /** @class */ (function (_super) {
    __extends(MsgConnectionOpenInit, _super);
    /**
     * @param client_id identifier of the port to use
     * @param counterparty
     * @param version
     * @param delay_period
     * @param signer signer address
     */
    function MsgConnectionOpenInit(client_id, delay_period, signer, counterparty, version) {
        var _this = _super.call(this) || this;
        _this.client_id = client_id;
        _this.delay_period = delay_period;
        _this.signer = signer;
        _this.counterparty = counterparty;
        _this.version = version;
        return _this;
    }
    MsgConnectionOpenInit.fromAmino = function (_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    };
    MsgConnectionOpenInit.prototype.toAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    MsgConnectionOpenInit.fromData = function (data, _) {
        _;
        var client_id = data.client_id, counterparty = data.counterparty, version = data.version, delay_period = data.delay_period, signer = data.signer;
        return new MsgConnectionOpenInit(client_id, Number.parseInt(delay_period), signer, counterparty ? Counterparty_1.Counterparty.fromData(counterparty) : undefined, version ? Version_1.Version.fromData(version) : undefined);
    };
    MsgConnectionOpenInit.prototype.toData = function (_) {
        _;
        var _a = this, client_id = _a.client_id, counterparty = _a.counterparty, version = _a.version, delay_period = _a.delay_period, signer = _a.signer;
        return {
            '@type': '/ibc.core.connection.v1.MsgConnectionOpenInit',
            client_id: client_id,
            delay_period: delay_period.toFixed(),
            signer: signer,
            counterparty: counterparty ? counterparty.toData() : undefined,
            version: version ? version.toData() : undefined,
        };
    };
    MsgConnectionOpenInit.fromProto = function (proto, _) {
        _;
        return new MsgConnectionOpenInit(proto.clientId, proto.delayPeriod.toNumber(), proto.signer, proto.counterparty
            ? Counterparty_1.Counterparty.fromProto(proto.counterparty)
            : undefined, proto.version ? Version_1.Version.fromProto(proto.version) : undefined);
    };
    MsgConnectionOpenInit.prototype.toProto = function (_) {
        _;
        var _a = this, client_id = _a.client_id, counterparty = _a.counterparty, version = _a.version, delay_period = _a.delay_period, signer = _a.signer;
        return tx_1.MsgConnectionOpenInit.fromPartial({
            clientId: client_id,
            delayPeriod: long_1.default.fromNumber(delay_period),
            signer: signer,
            counterparty: counterparty ? counterparty.toProto() : undefined,
            version: version ? version.toProto() : undefined,
        });
    };
    MsgConnectionOpenInit.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenInit',
            value: tx_1.MsgConnectionOpenInit.encode(this.toProto()).finish(),
        });
    };
    MsgConnectionOpenInit.unpackAny = function (msgAny, _) {
        _;
        return MsgConnectionOpenInit.fromProto(tx_1.MsgConnectionOpenInit.decode(msgAny.value));
    };
    return MsgConnectionOpenInit;
}(json_1.JSONSerializable));
exports.MsgConnectionOpenInit = MsgConnectionOpenInit;
//# sourceMappingURL=MsgConnectionOpenInit.js.map