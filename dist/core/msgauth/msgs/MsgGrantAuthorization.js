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
exports.MsgGrantAuthorization = void 0;
var json_1 = require("../../../util/json");
var numeric_1 = require("../../numeric");
var Authorization_1 = require("../Authorization");
var MsgGrantAuthorization = /** @class */ (function (_super) {
    __extends(MsgGrantAuthorization, _super);
    /**
     * @param depositor depositor's account address
     * @param amount coins to fund the community pool
     */
    function MsgGrantAuthorization(granter, grantee, authorization, period) {
        var _this = _super.call(this) || this;
        _this.granter = granter;
        _this.grantee = grantee;
        _this.authorization = authorization;
        _this.period = period;
        return _this;
    }
    MsgGrantAuthorization.fromData = function (data) {
        var _a = data.value, granter = _a.granter, grantee = _a.grantee, authorization = _a.authorization, period = _a.period;
        return new MsgGrantAuthorization(granter, grantee, Authorization_1.Authorization.fromData(authorization), new numeric_1.Int(period));
    };
    MsgGrantAuthorization.prototype.toData = function () {
        var _a = this, granter = _a.granter, grantee = _a.grantee, authorization = _a.authorization, period = _a.period;
        return {
            type: 'msgauth/MsgGrantAuthorization',
            value: {
                granter: granter,
                grantee: grantee,
                authorization: authorization.toData(),
                period: period.toFixed(),
            },
        };
    };
    return MsgGrantAuthorization;
}(json_1.JSONSerializable));
exports.MsgGrantAuthorization = MsgGrantAuthorization;
//# sourceMappingURL=MsgGrantAuthorization.js.map