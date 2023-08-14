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
exports.Authorization = exports.AuthorizationGrant = void 0;
var json_1 = require("../../../util/json");
var GenericAuthorization_1 = require("./GenericAuthorization");
var SendAuthorization_1 = require("./SendAuthorization");
var StakeAuthorization_1 = require("./StakeAuthorization");
var authz_1 = require("@terra-money/terra.proto/cosmos/authz/v1beta1/authz");
var AuthorizationGrant = /** @class */ (function (_super) {
    __extends(AuthorizationGrant, _super);
    function AuthorizationGrant(authorization, expiration) {
        var _this = _super.call(this) || this;
        _this.authorization = authorization;
        _this.expiration = expiration;
        return _this;
    }
    AuthorizationGrant.fromAmino = function (amino, isClassic) {
        var authorization = amino.authorization, expiration = amino.expiration;
        return new AuthorizationGrant(Authorization.fromAmino(authorization, isClassic), new Date(expiration));
    };
    AuthorizationGrant.prototype.toAmino = function (isClassic) {
        var _a = this, authorization = _a.authorization, expiration = _a.expiration;
        return {
            authorization: authorization.toAmino(isClassic),
            expiration: expiration.toISOString().replace(/\.000Z$/, 'Z'),
        };
    };
    AuthorizationGrant.fromData = function (data, isClassic) {
        var authorization = data.authorization, expiration = data.expiration;
        return new AuthorizationGrant(Authorization.fromData(authorization, isClassic), new Date(expiration));
    };
    AuthorizationGrant.prototype.toData = function (isClassic) {
        var _a = this, authorization = _a.authorization, expiration = _a.expiration;
        return {
            authorization: authorization.toData(isClassic),
            expiration: expiration.toISOString().replace(/\.000Z$/, 'Z'),
        };
    };
    AuthorizationGrant.fromProto = function (proto, isClassic) {
        return new AuthorizationGrant(Authorization.fromProto(proto.authorization, isClassic), proto.expiration);
    };
    AuthorizationGrant.prototype.toProto = function (isClassic) {
        var _a = this, authorization = _a.authorization, expiration = _a.expiration;
        return authz_1.Grant.fromPartial({
            authorization: authorization.packAny(isClassic),
            expiration: expiration,
        });
    };
    return AuthorizationGrant;
}(json_1.JSONSerializable));
exports.AuthorizationGrant = AuthorizationGrant;
var Authorization;
(function (Authorization) {
    function fromAmino(data, isClassic) {
        switch (data.type) {
            case 'msgauth/SendAuthorization':
            case 'cosmos-sdk/SendAuthorization':
                return SendAuthorization_1.SendAuthorization.fromAmino(data, isClassic);
            case 'msgauth/GenericAuthorization':
            case 'cosmos-sdk/GenericAuthorization':
                return GenericAuthorization_1.GenericAuthorization.fromAmino(data, isClassic);
        }
    }
    Authorization.fromAmino = fromAmino;
    function fromData(data, isClassic) {
        switch (data['@type']) {
            case '/cosmos.authz.v1beta1.GenericAuthorization':
                return GenericAuthorization_1.GenericAuthorization.fromData(data, isClassic);
            case '/cosmos.bank.v1beta1.SendAuthorization':
                return SendAuthorization_1.SendAuthorization.fromData(data, isClassic);
            case '/cosmos.staking.v1beta1.StakeAuthorization':
                return StakeAuthorization_1.StakeAuthorization.fromData(data, isClassic);
        }
    }
    Authorization.fromData = fromData;
    function fromProto(proto, isClassic) {
        var typeUrl = proto.typeUrl;
        switch (typeUrl) {
            case '/cosmos.authz.v1beta1.GenericAuthorization':
                return GenericAuthorization_1.GenericAuthorization.unpackAny(proto, isClassic);
            case '/cosmos.bank.v1beta1.SendAuthorization':
                return SendAuthorization_1.SendAuthorization.unpackAny(proto, isClassic);
            case '/cosmos.staking.v1beta1.StakeAuthorization':
                return StakeAuthorization_1.StakeAuthorization.unpackAny(proto, isClassic);
        }
        throw new Error("Authorization type ".concat(typeUrl, " not recognized"));
    }
    Authorization.fromProto = fromProto;
})(Authorization = exports.Authorization || (exports.Authorization = {}));
//# sourceMappingURL=Authorization.js.map