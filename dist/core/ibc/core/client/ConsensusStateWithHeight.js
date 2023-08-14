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
exports.ConsensusStateWithHeight = void 0;
var client_1 = require("@terra-money/terra.proto/ibc/core/client/v1/client");
var Height_1 = require("./Height");
var json_1 = require("../../../../util/json");
/**
 * ConsensusStateWithHeight defines a consensus state with an additional height field.
 */
var ConsensusStateWithHeight = /** @class */ (function (_super) {
    __extends(ConsensusStateWithHeight, _super);
    /**
     * @param height consensus state height
     * @param consensus_state consensus state
     */
    function ConsensusStateWithHeight(height, consensus_state) {
        var _this = _super.call(this) || this;
        _this.height = height;
        _this.consensus_state = consensus_state;
        return _this;
    }
    ConsensusStateWithHeight.fromAmino = function (data) {
        var height = data.height, consensus_state = data.consensus_state;
        return new ConsensusStateWithHeight(height ? Height_1.Height.fromAmino(height) : undefined, consensus_state);
    };
    ConsensusStateWithHeight.prototype.toAmino = function () {
        var _a = this, height = _a.height, consensus_state = _a.consensus_state;
        var res = {
            height: height ? height.toAmino() : undefined,
            consensus_state: consensus_state,
        };
        return res;
    };
    ConsensusStateWithHeight.fromData = function (data) {
        var height = data.height, consensus_state = data.consensus_state;
        return new ConsensusStateWithHeight(height ? Height_1.Height.fromData(height) : undefined, consensus_state);
    };
    ConsensusStateWithHeight.prototype.toData = function () {
        var _a = this, height = _a.height, consensus_state = _a.consensus_state;
        var res = {
            height: height ? height.toData() : undefined,
            consensus_state: consensus_state,
        };
        return res;
    };
    ConsensusStateWithHeight.fromProto = function (proto) {
        return new ConsensusStateWithHeight(proto.height ? Height_1.Height.fromProto(proto.height) : undefined, proto.consensusState);
    };
    ConsensusStateWithHeight.prototype.toProto = function () {
        var _a = this, height = _a.height, consensus_state = _a.consensus_state;
        return client_1.ConsensusStateWithHeight.fromPartial({
            height: height ? height.toProto() : undefined,
            consensusState: consensus_state,
        });
    };
    return ConsensusStateWithHeight;
}(json_1.JSONSerializable));
exports.ConsensusStateWithHeight = ConsensusStateWithHeight;
//# sourceMappingURL=ConsensusStateWithHeight.js.map