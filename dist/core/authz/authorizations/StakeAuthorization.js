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
exports.StakeAuthorizationValidators = exports.StakeAuthorization = void 0;
var json_1 = require("../../../util/json");
var Coin_1 = require("../../Coin");
var authz_1 = require("@terra-money/terra.proto/cosmos/staking/v1beta1/authz");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var StakeAuthorization = /** @class */ (function (_super) {
    __extends(StakeAuthorization, _super);
    function StakeAuthorization(authorization_type, max_tokens, allow_list, deny_list) {
        var _this = _super.call(this) || this;
        _this.authorization_type = authorization_type;
        _this.max_tokens = max_tokens;
        _this.allow_list = allow_list;
        _this.deny_list = deny_list;
        return _this;
    }
    StakeAuthorization.fromAmino = function (_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    };
    StakeAuthorization.prototype.toAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    StakeAuthorization.fromData = function (data, isClassic) {
        return new StakeAuthorization((0, authz_1.authorizationTypeFromJSON)(data.authorization_type), data.max_tokens ? Coin_1.Coin.fromProto(data.max_tokens) : undefined, data.allow_list
            ? StakeAuthorizationValidators.fromData(data.allow_list, isClassic)
            : undefined, data.deny_list
            ? StakeAuthorizationValidators.fromData(data.deny_list, isClassic)
            : undefined);
    };
    StakeAuthorization.prototype.toData = function (isClassic) {
        var _a = this, max_tokens = _a.max_tokens, allow_list = _a.allow_list, deny_list = _a.deny_list, authorization_type = _a.authorization_type;
        return {
            '@type': '/cosmos.staking.v1beta1.StakeAuthorization',
            authorization_type: (0, authz_1.authorizationTypeToJSON)(authorization_type),
            max_tokens: max_tokens === null || max_tokens === void 0 ? void 0 : max_tokens.toData(),
            allow_list: allow_list === null || allow_list === void 0 ? void 0 : allow_list.toData(isClassic),
            deny_list: deny_list === null || deny_list === void 0 ? void 0 : deny_list.toData(isClassic),
        };
    };
    StakeAuthorization.fromProto = function (proto, isClassic) {
        return new StakeAuthorization(proto.authorizationType, proto.maxTokens ? Coin_1.Coin.fromProto(proto.maxTokens) : undefined, proto.allowList
            ? StakeAuthorizationValidators.fromProto(proto.allowList, isClassic)
            : undefined, proto.denyList
            ? StakeAuthorizationValidators.fromProto(proto.denyList, isClassic)
            : undefined);
    };
    StakeAuthorization.prototype.toProto = function (isClassic) {
        var _a = this, max_tokens = _a.max_tokens, allow_list = _a.allow_list, deny_list = _a.deny_list, authorization_type = _a.authorization_type;
        return authz_1.StakeAuthorization.fromPartial({
            allowList: allow_list === null || allow_list === void 0 ? void 0 : allow_list.toProto(isClassic),
            authorizationType: authorization_type,
            denyList: deny_list === null || deny_list === void 0 ? void 0 : deny_list.toProto(isClassic),
            maxTokens: max_tokens === null || max_tokens === void 0 ? void 0 : max_tokens.toProto(),
        });
    };
    StakeAuthorization.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.staking.v1beta1.StakeAuthorization',
            value: authz_1.StakeAuthorization.encode(this.toProto(isClassic)).finish(),
        });
    };
    StakeAuthorization.unpackAny = function (msgAny, isClassic) {
        return StakeAuthorization.fromProto(authz_1.StakeAuthorization.decode(msgAny.value), isClassic);
    };
    return StakeAuthorization;
}(json_1.JSONSerializable));
exports.StakeAuthorization = StakeAuthorization;
var StakeAuthorizationValidators = /** @class */ (function (_super) {
    __extends(StakeAuthorizationValidators, _super);
    function StakeAuthorizationValidators(address) {
        var _this = _super.call(this) || this;
        _this.address = address;
        return _this;
    }
    StakeAuthorizationValidators.fromAmino = function (_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    };
    StakeAuthorizationValidators.prototype.toAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    StakeAuthorizationValidators.fromData = function (data, _) {
        _;
        return new StakeAuthorizationValidators(data.address);
    };
    StakeAuthorizationValidators.prototype.toData = function (_) {
        _;
        return {
            address: this.address,
        };
    };
    StakeAuthorizationValidators.fromProto = function (proto, _) {
        _;
        return new StakeAuthorizationValidators(proto.address);
    };
    StakeAuthorizationValidators.prototype.toProto = function (_) {
        _;
        return authz_1.StakeAuthorization_Validators.fromPartial({
            address: this.address,
        });
    };
    return StakeAuthorizationValidators;
}(json_1.JSONSerializable));
exports.StakeAuthorizationValidators = StakeAuthorizationValidators;
(function (StakeAuthorization) {
    StakeAuthorization.Type = authz_1.AuthorizationType;
})(StakeAuthorization = exports.StakeAuthorization || (exports.StakeAuthorization = {}));
exports.StakeAuthorization = StakeAuthorization;
//# sourceMappingURL=StakeAuthorization.js.map