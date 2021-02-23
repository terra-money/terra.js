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
exports.MsgUnjail = void 0;
var json_1 = require("../../../util/json");
/**
 * A validator can be jailed by the blockchain if misbehavior is detected, such as
 * double-signing or having missed too many vote periods in the Oracle ballot.
 *
 * This is done to protect delegators' funds from getting slashed further, until the
 * validator's issues have been addressed. A jailed validator cannot participate in
 * block rewards, and must be manually unjailed by submitting this message.
 */
var MsgUnjail = /** @class */ (function (_super) {
    __extends(MsgUnjail, _super);
    /**
     * @param address validator's operator address
     */
    function MsgUnjail(address) {
        var _this = _super.call(this) || this;
        _this.address = address;
        return _this;
    }
    MsgUnjail.fromData = function (data) {
        var address = data.value.address;
        return new MsgUnjail(address);
    };
    MsgUnjail.prototype.toData = function () {
        var address = this.address;
        return {
            type: 'slashing/MsgUnjail',
            value: {
                address: address,
            },
        };
    };
    return MsgUnjail;
}(json_1.JSONSerializable));
exports.MsgUnjail = MsgUnjail;
//# sourceMappingURL=MsgUnjail.js.map