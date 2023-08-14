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
exports.Counterparty = void 0;
var channel_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/channel");
var json_1 = require("../../../../util/json");
/** Counterparty defines a channel end counterparty */
var Counterparty = /** @class */ (function (_super) {
    __extends(Counterparty, _super);
    /**
     * @param port_id port on the counterparty chain which owns the other end of the channel.
     * @param channel_id channel end on the counterparty chain
     */
    function Counterparty(port_id, channel_id) {
        var _this = _super.call(this) || this;
        _this.port_id = port_id;
        _this.channel_id = channel_id;
        return _this;
    }
    Counterparty.fromAmino = function (data) {
        var port_id = data.port_id, channel_id = data.channel_id;
        return new Counterparty(port_id, channel_id);
    };
    Counterparty.prototype.toAmino = function () {
        var _a = this, port_id = _a.port_id, channel_id = _a.channel_id;
        var res = {
            port_id: port_id,
            channel_id: channel_id,
        };
        return res;
    };
    Counterparty.fromData = function (data) {
        var port_id = data.port_id, channel_id = data.channel_id;
        return new Counterparty(port_id, channel_id);
    };
    Counterparty.prototype.toData = function () {
        var _a = this, port_id = _a.port_id, channel_id = _a.channel_id;
        var res = {
            port_id: port_id,
            channel_id: channel_id,
        };
        return res;
    };
    Counterparty.fromProto = function (proto) {
        return new Counterparty(proto.portId, proto.channelId);
    };
    Counterparty.prototype.toProto = function () {
        var _a = this, port_id = _a.port_id, channel_id = _a.channel_id;
        return channel_1.Counterparty.fromPartial({
            portId: port_id,
            channelId: channel_id,
        });
    };
    return Counterparty;
}(json_1.JSONSerializable));
exports.Counterparty = Counterparty;
//# sourceMappingURL=Counterparty.js.map