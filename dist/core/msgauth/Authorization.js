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
exports.GenericAuthorization = exports.SendAuthorization = exports.Authorization = exports.AuthorizationGrant = void 0;
var json_1 = require("../../util/json");
var Coins_1 = require("../Coins");
var AuthorizationGrant = /** @class */ (function (_super) {
    __extends(AuthorizationGrant, _super);
    function AuthorizationGrant(authorization, expiration) {
        var _this = _super.call(this) || this;
        _this.authorization = authorization;
        _this.expiration = expiration;
        return _this;
    }
    AuthorizationGrant.fromData = function (data) {
        var authorization = data.authorization, expiration = data.expiration;
        return new AuthorizationGrant(Authorization.fromData(authorization), new Date(expiration));
    };
    AuthorizationGrant.prototype.toData = function () {
        var _a = this, authorization = _a.authorization, expiration = _a.expiration;
        return {
            authorization: authorization.toData(),
            expiration: expiration.toISOString(),
        };
    };
    return AuthorizationGrant;
}(json_1.JSONSerializable));
exports.AuthorizationGrant = AuthorizationGrant;
var Authorization;
(function (Authorization) {
    function fromData(data) {
        switch (data.type) {
            case 'msgauth/SendAuthorization':
                return SendAuthorization.fromData(data);
            case 'msgauth/GenericAuthorization':
                return GenericAuthorization.fromData(data);
        }
    }
    Authorization.fromData = fromData;
})(Authorization = exports.Authorization || (exports.Authorization = {}));
var SendAuthorization = /** @class */ (function (_super) {
    __extends(SendAuthorization, _super);
    function SendAuthorization(spend_limit) {
        var _this = _super.call(this) || this;
        _this.spend_limit = new Coins_1.Coins(spend_limit);
        return _this;
    }
    SendAuthorization.fromData = function (data) {
        return new SendAuthorization(Coins_1.Coins.fromData(data.value.spend_limit));
    };
    SendAuthorization.prototype.toData = function () {
        var spend_limit = this.spend_limit;
        return {
            type: 'msgauth/SendAuthorization',
            value: {
                spend_limit: spend_limit.toData(),
            },
        };
    };
    return SendAuthorization;
}(json_1.JSONSerializable));
exports.SendAuthorization = SendAuthorization;
var GenericAuthorization = /** @class */ (function (_super) {
    __extends(GenericAuthorization, _super);
    function GenericAuthorization(grant_msg_type) {
        var _this = _super.call(this) || this;
        _this.grant_msg_type = grant_msg_type;
        return _this;
    }
    GenericAuthorization.fromData = function (data) {
        return new GenericAuthorization(data.value.grant_msg_type);
    };
    GenericAuthorization.prototype.toData = function () {
        var grant_msg_type = this.grant_msg_type;
        return {
            type: 'msgauth/GenericAuthorization',
            value: {
                grant_msg_type: grant_msg_type,
            },
        };
    };
    return GenericAuthorization;
}(json_1.JSONSerializable));
exports.GenericAuthorization = GenericAuthorization;
//# sourceMappingURL=Authorization.js.map