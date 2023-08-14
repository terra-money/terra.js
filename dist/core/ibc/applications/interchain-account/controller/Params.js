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
exports.Params = void 0;
var controller_1 = require("@terra-money/terra.proto/ibc/applications/interchain_accounts/controller/v1/controller");
var json_1 = require("../../../../../util/json");
/**
 *  Params defines the set of on-chain interchain accounts parameters.
 *  The following parameters may be used to disable the controller submodule.
 */
var Params = /** @class */ (function (_super) {
    __extends(Params, _super);
    /**
     * @param controller_enabled controller_enabled enables or disables the controller submodule
     */
    function Params(controller_enabled) {
        var _this = _super.call(this) || this;
        _this.controller_enabled = controller_enabled;
        return _this;
    }
    Params.fromAmino = function (data) {
        var controller_enabled = data.controller_enabled;
        return new Params(controller_enabled);
    };
    Params.prototype.toAmino = function () {
        var controller_enabled = this.controller_enabled;
        var res = {
            controller_enabled: controller_enabled,
        };
        return res;
    };
    Params.fromData = function (data) {
        var controller_enabled = data.controller_enabled;
        return new Params(controller_enabled);
    };
    Params.prototype.toData = function () {
        var controller_enabled = this.controller_enabled;
        var res = {
            controller_enabled: controller_enabled,
        };
        return res;
    };
    Params.fromProto = function (proto) {
        return new Params(proto.controllerEnabled);
    };
    Params.prototype.toProto = function () {
        var controller_enabled = this.controller_enabled;
        return controller_1.Params.fromPartial({
            controllerEnabled: controller_enabled,
        });
    };
    return Params;
}(json_1.JSONSerializable));
exports.Params = Params;
//# sourceMappingURL=Params.js.map