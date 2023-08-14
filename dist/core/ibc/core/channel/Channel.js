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
exports.Channel = void 0;
var channel_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/channel");
var json_1 = require("../../../../util/json");
var Counterparty_1 = require("./Counterparty");
/**
 * Channel is a monotonically increasing data type
 * that can be compared against another Channel for the purposes of updating and
 * freezing clients
 *
 * Normally the RevisionChannel is incremented at each height while keeping
 * RevisionNumber the same. However some consensus algorithms may choose to
 * reset the height in certain conditions e.g. hard forks, state-machine
 * breaking changes In these cases, the RevisionNumber is incremented so that
 * height continues to be monitonically increasing even as the RevisionChannel
 * gets reset
 */
var Channel = /** @class */ (function (_super) {
    __extends(Channel, _super);
    /**
     * @param state current state of the channel end
     * @param ordering  whether the channel is ordered or unordered
     * @param counterparty counterparty channel end
     * @param connection_hops list of connection identifiers, in order, along which packets sent on this channel will travel
     * @param version opaque channel version, which is agreed upon during the handshake
     */
    function Channel(state, ordering, counterparty, connection_hops, version) {
        var _this = _super.call(this) || this;
        _this.state = state;
        _this.ordering = ordering;
        _this.counterparty = counterparty;
        _this.connection_hops = connection_hops;
        _this.version = version;
        return _this;
    }
    Channel.fromAmino = function (data) {
        var state = data.state, ordering = data.ordering, counterparty = data.counterparty, connection_hops = data.connection_hops, version = data.version;
        return new Channel(state, ordering, counterparty ? Counterparty_1.Counterparty.fromAmino(counterparty) : undefined, connection_hops, version);
    };
    Channel.prototype.toAmino = function () {
        var _a = this, state = _a.state, ordering = _a.ordering, counterparty = _a.counterparty, connection_hops = _a.connection_hops, version = _a.version;
        var res = {
            state: state,
            ordering: ordering,
            counterparty: counterparty ? counterparty.toAmino() : undefined,
            connection_hops: connection_hops,
            version: version,
        };
        return res;
    };
    Channel.fromData = function (data) {
        var state = data.state, ordering = data.ordering, counterparty = data.counterparty, connection_hops = data.connection_hops, version = data.version;
        return new Channel(state, ordering, counterparty ? Counterparty_1.Counterparty.fromData(counterparty) : undefined, connection_hops, version);
    };
    Channel.prototype.toData = function () {
        var _a = this, state = _a.state, ordering = _a.ordering, counterparty = _a.counterparty, connection_hops = _a.connection_hops, version = _a.version;
        var res = {
            state: state,
            ordering: ordering,
            counterparty: counterparty ? counterparty.toData() : undefined,
            connection_hops: connection_hops,
            version: version,
        };
        return res;
    };
    Channel.fromProto = function (proto) {
        return new Channel(proto.state, proto.ordering, proto.counterparty
            ? Counterparty_1.Counterparty.fromProto(proto.counterparty)
            : undefined, proto.connectionHops, proto.version);
    };
    Channel.prototype.toProto = function () {
        var _a = this, state = _a.state, ordering = _a.ordering, counterparty = _a.counterparty, connection_hops = _a.connection_hops, version = _a.version;
        return channel_1.Channel.fromPartial({
            state: state,
            ordering: ordering,
            counterparty: counterparty ? counterparty.toProto() : undefined,
            connectionHops: connection_hops,
            version: version,
        });
    };
    return Channel;
}(json_1.JSONSerializable));
exports.Channel = Channel;
//# sourceMappingURL=Channel.js.map