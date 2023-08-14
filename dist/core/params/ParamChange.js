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
exports.ParamChange = exports.ParamChanges = void 0;
var json_1 = require("../../util/json");
var params_1 = require("@terra-money/terra.proto/cosmos/params/v1beta1/params");
var ParamChanges = /** @class */ (function (_super) {
    __extends(ParamChanges, _super);
    function ParamChanges(paramChanges) {
        var _this = _super.call(this) || this;
        _this.paramChanges = paramChanges;
        return _this;
    }
    ParamChanges.fromAmino = function (proto) {
        return new ParamChanges((proto !== null && proto !== void 0 ? proto : []).map(ParamChange.fromAmino));
    };
    ParamChanges.prototype.toAmino = function () {
        return this.paramChanges.map(function (c) { return c.toAmino(); });
    };
    ParamChanges.fromData = function (proto) {
        return new ParamChanges((proto !== null && proto !== void 0 ? proto : []).map(ParamChange.fromData));
    };
    ParamChanges.prototype.toData = function () {
        return this.paramChanges.map(function (c) { return c.toData(); });
    };
    ParamChanges.fromProto = function (proto) {
        return new ParamChanges((proto !== null && proto !== void 0 ? proto : []).map(ParamChange.fromProto));
    };
    ParamChanges.prototype.toProto = function () {
        return this.paramChanges.map(function (c) { return c.toProto(); });
    };
    return ParamChanges;
}(json_1.JSONSerializable));
exports.ParamChanges = ParamChanges;
var ParamChange = /** @class */ (function (_super) {
    __extends(ParamChange, _super);
    function ParamChange(subspace, key, value) {
        var _this = _super.call(this) || this;
        _this.subspace = subspace;
        _this.key = key;
        _this.value = value;
        return _this;
    }
    ParamChange.fromAmino = function (data) {
        var subspace = data.subspace, key = data.key, value = data.value;
        return new ParamChange(subspace, key, value);
    };
    ParamChange.prototype.toAmino = function () {
        var _a = this, subspace = _a.subspace, key = _a.key, value = _a.value;
        return {
            subspace: subspace,
            key: key,
            value: value,
        };
    };
    ParamChange.fromData = function (data) {
        var subspace = data.subspace, key = data.key, value = data.value;
        return new ParamChange(subspace, key, value);
    };
    ParamChange.prototype.toData = function () {
        var _a = this, subspace = _a.subspace, key = _a.key, value = _a.value;
        return {
            subspace: subspace,
            key: key,
            value: value,
        };
    };
    ParamChange.fromProto = function (proto) {
        return new ParamChange(proto.subspace, proto.key, proto.value);
    };
    ParamChange.prototype.toProto = function () {
        var _a = this, subspace = _a.subspace, key = _a.key, value = _a.value;
        return params_1.ParamChange.fromPartial({
            key: key,
            subspace: subspace,
            value: value,
        });
    };
    return ParamChange;
}(json_1.JSONSerializable));
exports.ParamChange = ParamChange;
//# sourceMappingURL=ParamChange.js.map