"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxLog = exports.EventsByType = exports.TxInfo = void 0;
var json_1 = require("../util/json");
var StdTx_1 = require("./StdTx");
/**
 * A TxInfo data structure is used to capture information from a transaction lookup for
 * a transaction already included in a block
 */
var TxInfo = /** @class */ (function (_super) {
    __extends(TxInfo, _super);
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
        var _this = _super.call(this) || this;
        _this.height = height;
        _this.txhash = txhash;
        _this.raw_log = raw_log;
        _this.logs = logs;
        _this.gas_wanted = gas_wanted;
        _this.gas_used = gas_used;
        _this.tx = tx;
        _this.timestamp = timestamp;
        _this.code = code;
        _this.codespace = codespace;
        return _this;
    }
    TxInfo.fromData = function (data) {
        return new TxInfo(Number.parseInt(data.height), data.txhash, data.raw_log, data.logs && data.logs.map(function (log) { return TxLog.fromData(log); }), Number.parseInt(data.gas_wanted), Number.parseInt(data.gas_used), StdTx_1.StdTx.fromData(data.tx), data.timestamp, data.code, data.codespace);
    };
    TxInfo.prototype.toData = function () {
        var data = {
            height: this.height.toFixed(),
            txhash: this.txhash,
            raw_log: this.raw_log,
            gas_wanted: this.gas_wanted.toFixed(),
            gas_used: this.gas_used.toFixed(),
            tx: this.tx.toData(),
            timestamp: this.timestamp,
        };
        if (this.logs) {
            data.logs = this.logs.map(function (log) { return log.toData(); });
        }
        if (this.code) {
            data.code = this.code;
        }
        if (this.codespace) {
            data.codespace = this.codespace;
        }
        return data;
    };
    return TxInfo;
}(json_1.JSONSerializable));
exports.TxInfo = TxInfo;
var EventsByType;
(function (EventsByType) {
    function parse(eventData) {
        var events = {};
        eventData.forEach(function (ev) {
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
var TxLog = /** @class */ (function (_super) {
    __extends(TxLog, _super);
    function TxLog(msg_index, log, events) {
        var _this = _super.call(this) || this;
        _this.msg_index = msg_index;
        _this.log = log;
        _this.events = events;
        _this.eventsByType = EventsByType.parse(_this.events);
        return _this;
    }
    TxLog.fromData = function (data) {
        var msg_index = data.msg_index, log = data.log, events = data.events;
        return new TxLog(msg_index, log, events);
    };
    TxLog.prototype.toData = function () {
        var _a = this, msg_index = _a.msg_index, log = _a.log, events = _a.events;
        return {
            msg_index: msg_index,
            log: log,
            events: events,
        };
    };
    return TxLog;
}(json_1.JSONSerializable));
exports.TxLog = TxLog;
//# sourceMappingURL=TxInfo.js.map