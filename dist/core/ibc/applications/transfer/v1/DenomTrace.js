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
exports.DenomTrace = void 0;
var transfer_1 = require("@terra-money/terra.proto/ibc/applications/transfer/v1/transfer");
var json_1 = require("../../../../../util/json");
/**
 * DenomTrace is a monotonically increasing data type
 * that can be compared against another DenomTrace for the purposes of updating and
 * freezing clients
 *
 * Normally the RevisionDenomTrace is incremented at each height while keeping
 * RevisionNumber the same. However some consensus algorithms may choose to
 * reset the height in certain conditions e.g. hard forks, state-machine
 * breaking changes In these cases, the RevisionNumber is incremented so that
 * height continues to be monitonically increasing even as the RevisionDenomTrace
 * gets reset
 */
var DenomTrace = /** @class */ (function (_super) {
    __extends(DenomTrace, _super);
    /**
     * @param path the revision that the client is currently on
     * @param base_denom the height within the given revision
     */
    function DenomTrace(path, base_denom) {
        var _this = _super.call(this) || this;
        _this.path = path;
        _this.base_denom = base_denom;
        return _this;
    }
    DenomTrace.fromAmino = function (data) {
        var path = data.path, base_denom = data.base_denom;
        return new DenomTrace(path, base_denom);
    };
    DenomTrace.prototype.toAmino = function () {
        var _a = this, path = _a.path, base_denom = _a.base_denom;
        var res = {
            path: path,
            base_denom: base_denom,
        };
        return res;
    };
    DenomTrace.fromData = function (data) {
        var path = data.path, base_denom = data.base_denom;
        return new DenomTrace(path, base_denom);
    };
    DenomTrace.prototype.toData = function () {
        var _a = this, path = _a.path, base_denom = _a.base_denom;
        var res = {
            path: path,
            base_denom: base_denom,
        };
        return res;
    };
    DenomTrace.fromProto = function (proto) {
        return new DenomTrace(proto.path, proto.baseDenom);
    };
    DenomTrace.prototype.toProto = function () {
        var _a = this, path = _a.path, base_denom = _a.base_denom;
        return transfer_1.DenomTrace.fromPartial({ path: path, baseDenom: base_denom });
    };
    return DenomTrace;
}(json_1.JSONSerializable));
exports.DenomTrace = DenomTrace;
//# sourceMappingURL=DenomTrace.js.map