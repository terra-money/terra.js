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
exports.MsgExecAuthorized = void 0;
var json_1 = require("../../../util/json");
var Msg_1 = require("../../Msg");
var MsgExecAuthorized = /** @class */ (function (_super) {
    __extends(MsgExecAuthorized, _super);
    /**
     * @param grantee authorization grantee
     * @param msgs list of messages to execute
     */
    function MsgExecAuthorized(grantee, msgs) {
        var _this = _super.call(this) || this;
        _this.grantee = grantee;
        _this.msgs = msgs;
        return _this;
    }
    MsgExecAuthorized.fromData = function (data) {
        var _a = data.value, grantee = _a.grantee, msgs = _a.msgs;
        return new MsgExecAuthorized(grantee, msgs.map(function (x) { return Msg_1.Msg.fromData(x); }));
    };
    MsgExecAuthorized.prototype.toData = function () {
        var _a = this, grantee = _a.grantee, msgs = _a.msgs;
        return {
            type: 'msgauth/MsgExecAuthorized',
            value: {
                grantee: grantee,
                msgs: msgs.map(function (msg) { return msg.toData(); }),
            },
        };
    };
    return MsgExecAuthorized;
}(json_1.JSONSerializable));
exports.MsgExecAuthorized = MsgExecAuthorized;
//# sourceMappingURL=MsgExecAuthorized.js.map