"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxLog = exports.EventsByType = exports.TxInfo = void 0;
var Tx_1 = require("./Tx");
var abci_1 = require("@terra-money/terra.proto/cosmos/base/abci/v1beta1/abci");
/**
 * A TxInfo data structure is used to capture information from a transaction lookup for
 * a transaction already included in a block
 */
var TxInfo = /** @class */ (function () {
    /**
     *
     * @param height height of the block in which the transaction was included.
     * @param txhash transaction's hash.
     * @param raw_log raw log information, as a string.
     * @param logs log information
     * @param gas_wanted gas limited submitted in fee
     * @param gas_used actual gas consumption
     * @param tx transaction content
     * @param timestamp time of inclusion
     * @param code error code
     */
    function TxInfo(height, txhash, raw_log, logs, gas_wanted, gas_used, tx, timestamp, code, codespace) {
        this.height = height;
        this.txhash = txhash;
        this.raw_log = raw_log;
        this.logs = logs;
        this.gas_wanted = gas_wanted;
        this.gas_used = gas_used;
        this.tx = tx;
        this.timestamp = timestamp;
        this.code = code;
        this.codespace = codespace;
    }
    TxInfo.fromProto = function (proto) {
        return new TxInfo(proto.height.toNumber(), proto.txhash, proto.rawLog, proto.logs.map(function (log) { return TxLog.fromProto(log); }), proto.gasWanted.toNumber(), proto.gasUsed.toNumber(), Tx_1.Tx.unpackAny(proto.tx), proto.timestamp, proto.code, proto.codespace);
    };
    TxInfo.fromData = function (data, isClassic) {
        return new TxInfo(Number.parseInt(data.height), data.txhash, data.raw_log, data.logs.map(function (log) { return TxLog.fromData(log); }), Number.parseInt(data.gas_wanted), Number.parseInt(data.gas_used), Tx_1.Tx.fromData(data.tx, isClassic), data.timestamp, data.code, data.codespace);
    };
    return TxInfo;
}());
exports.TxInfo = TxInfo;
var EventsByType;
(function (EventsByType) {
    function parse(eventAmino) {
        var events = {};
        eventAmino.forEach(function (ev) {
            ev.attributes.forEach(function (attr) {
                if (!(ev.type in events)) {
                    events[ev.type] = {};
                }
                if (!(attr.key in events[ev.type])) {
                    events[ev.type][attr.key] = [];
                }
                events[ev.type][attr.key].push(attr.value);
            });
        });
        return events;
    }
    EventsByType.parse = parse;
})(EventsByType = exports.EventsByType || (exports.EventsByType = {}));
var TxLog = /** @class */ (function () {
    function TxLog(msg_index, log, events) {
        this.msg_index = msg_index;
        this.log = log;
        this.events = events;
        this.eventsByType = EventsByType.parse(this.events);
    }
    TxLog.fromData = function (data) {
        return new TxLog(data.msg_index, data.log, data.events.map(function (e) {
            return {
                type: e.type,
                attributes: e.attributes.map(function (attr) {
                    return {
                        key: attr.key,
                        value: attr.value,
                    };
                }),
            };
        }));
    };
    TxLog.prototype.toData = function () {
        var _a = this, msg_index = _a.msg_index, log = _a.log, events = _a.events;
        return {
            msg_index: msg_index,
            log: log,
            events: events,
        };
    };
    TxLog.fromProto = function (proto) {
        return new TxLog(proto.msgIndex, proto.log, proto.events.map(function (e) {
            return {
                type: e.type,
                attributes: e.attributes.map(function (attr) {
                    return {
                        key: attr.key,
                        value: attr.value,
                    };
                }),
            };
        }));
    };
    TxLog.prototype.toProto = function () {
        var _a = this, msg_index = _a.msg_index, log = _a.log, events = _a.events;
        return abci_1.ABCIMessageLog.fromPartial({
            msgIndex: msg_index,
            log: log,
            events: events,
        });
    };
    return TxLog;
}());
exports.TxLog = TxLog;
//# sourceMappingURL=TxInfo.js.map