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
exports.GenericAuthorization = void 0;
var json_1 = require("../../../util/json");
var authz_1 = require("@terra-money/terra.proto/cosmos/authz/v1beta1/authz");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var GenericAuthorization = /** @class */ (function (_super) {
    __extends(GenericAuthorization, _super);
    function GenericAuthorization(msg) {
        var _this = _super.call(this) || this;
        _this.msg = msg;
        return _this;
    }
    GenericAuthorization.fromAmino = function (data, _) {
        _;
        return new GenericAuthorization(data.value.msg);
    };
    GenericAuthorization.prototype.toAmino = function (isClassic) {
        var msg = this.msg;
        return {
            type: isClassic
                ? 'msgauth/GenericAuthorization'
                : 'cosmos-sdk/GenericAuthorization',
            value: {
                msg: msg,
            },
        };
    };
    GenericAuthorization.fromData = function (data, _) {
        _;
        return new GenericAuthorization(data.msg);
    };
    GenericAuthorization.prototype.toData = function (_) {
        _;
        var msg = this.msg;
        return {
            '@type': '/cosmos.authz.v1beta1.GenericAuthorization',
            msg: msg,
        };
    };
    GenericAuthorization.fromProto = function (data, _) {
        _;
        return new GenericAuthorization(data.msg);
    };
    GenericAuthorization.prototype.toProto = function (_) {
        _;
        return authz_1.GenericAuthorization.fromPartial({
            msg: this.msg,
        });
    };
    GenericAuthorization.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.authz.v1beta1.GenericAuthorization',
            value: authz_1.GenericAuthorization.encode(this.toProto(isClassic)).finish(),
        });
    };
    GenericAuthorization.unpackAny = function (msgAny, isClassic) {
        return GenericAuthorization.fromProto(authz_1.GenericAuthorization.decode(msgAny.value), isClassic);
    };
    return GenericAuthorization;
}(json_1.JSONSerializable));
exports.GenericAuthorization = GenericAuthorization;
//# sourceMappingURL=GenericAuthorization.js.map