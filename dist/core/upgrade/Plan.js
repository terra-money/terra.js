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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = void 0;
var json_1 = require("../../util/json");
var upgrade_1 = require("@terra-money/terra.proto/cosmos/upgrade/v1beta1/upgrade");
var long_1 = __importDefault(require("long"));
/*
 * Plan specifies information about a planned upgrade and when it should occur.
 */
var Plan = /** @class */ (function (_super) {
    __extends(Plan, _super);
    /**
     * @param name This name will be used by the upgraded  version of the software to apply any special "on-upgrade" commands during the first BeginBlock method after the upgrade is applied.
     * @param time Deprecated
     * @param height  The height at which the upgrade must be performed. Only used if Time is not set.
     * @param info Any application specific upgrade info to be included on-chain such as a git commit that validators could automatically upgrade to
     * @param upgraded_client_state Deprecated
     */
    function Plan(name, time, height, info, upgraded_client_state) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.time = time;
        _this.height = height;
        _this.info = info;
        _this.upgraded_client_state = upgraded_client_state;
        return _this;
    }
    Plan.fromAmino = function (data) {
        var name = data.name, time = data.time, height = data.height, info = data.info, upgraded_client_state = data.upgraded_client_state;
        return new Plan(name, time ? new Date(time) : undefined, height, info, upgraded_client_state);
    };
    Plan.prototype.toAmino = function () {
        var _a = this, name = _a.name, time = _a.time, height = _a.height, info = _a.info, upgraded_client_state = _a.upgraded_client_state;
        var res = {
            name: name,
            time: time ? time.toISOString().replace(/\.000Z$/, 'Z') : undefined,
            height: height,
            info: info,
            upgraded_client_state: upgraded_client_state,
        };
        return res;
    };
    Plan.fromData = function (data) {
        var name = data.name, time = data.time, height = data.height, info = data.info, upgraded_client_state = data.upgraded_client_state;
        return new Plan(name, time ? new Date(time) : undefined, height, info, upgraded_client_state);
    };
    Plan.prototype.toData = function () {
        var _a = this, name = _a.name, time = _a.time, height = _a.height, info = _a.info, upgraded_client_state = _a.upgraded_client_state;
        var res = {
            name: name,
            time: time ? time.toISOString().replace(/\.000Z$/, 'Z') : undefined,
            height: height,
            info: info,
            upgraded_client_state: upgraded_client_state,
        };
        return res;
    };
    Plan.fromProto = function (proto) {
        return new Plan(proto.name, proto.time, proto.height.toString(), proto.info, proto.upgradedClientState);
    };
    Plan.prototype.toProto = function () {
        var _a = this, name = _a.name, time = _a.time, height = _a.height, info = _a.info, upgraded_client_state = _a.upgraded_client_state;
        return upgrade_1.Plan.fromPartial({
            name: name,
            time: time,
            height: long_1.default.fromString(height),
            info: info,
            upgradedClientState: upgraded_client_state,
        });
    };
    return Plan;
}(json_1.JSONSerializable));
exports.Plan = Plan;
//# sourceMappingURL=Plan.js.map