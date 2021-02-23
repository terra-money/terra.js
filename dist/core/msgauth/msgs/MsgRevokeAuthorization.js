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
exports.MsgRevokeAuthorization = void 0;
var json_1 = require("../../../util/json");
var MsgRevokeAuthorization = /** @class */ (function (_super) {
    __extends(MsgRevokeAuthorization, _super);
    /**
     * @param granter authorization granter
     * @param grantee authorization grantee
     * @param authorization_msg_type type of message to revoke
     */
    function MsgRevokeAuthorization(granter, grantee, authorization_msg_type) {
        var _this = _super.call(this) || this;
        _this.granter = granter;
        _this.grantee = grantee;
        _this.authorization_msg_type = authorization_msg_type;
        return _this;
    }
    MsgRevokeAuthorization.fromData = function (data) {
        var _a = data.value, granter = _a.granter, grantee = _a.grantee, authorization_msg_type = _a.authorization_msg_type;
        return new MsgRevokeAuthorization(granter, grantee, authorization_msg_type);
    };
    MsgRevokeAuthorization.prototype.toData = function () {
        var _a = this, granter = _a.granter, grantee = _a.grantee, authorization_msg_type = _a.authorization_msg_type;
        return {
            type: 'msgauth/MsgRevokeAuthorization',
            value: {
                granter: granter,
                grantee: grantee,
                authorization_msg_type: authorization_msg_type,
            },
        };
    };
    return MsgRevokeAuthorization;
}(json_1.JSONSerializable));
exports.MsgRevokeAuthorization = MsgRevokeAuthorization;
//# sourceMappingURL=MsgRevokeAuthorization.js.map