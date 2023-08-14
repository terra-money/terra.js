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
exports.ClientConsensusStates = void 0;
var client_1 = require("@terra-money/terra.proto/ibc/core/client/v1/client");
var json_1 = require("../../../../util/json");
var ConsensusStateWithHeight_1 = require("./ConsensusStateWithHeight");
/**
 * ClientConsensusStates defines all the stored consensus states for a given client/
 */
var ClientConsensusStates = /** @class */ (function (_super) {
    __extends(ClientConsensusStates, _super);
    /**
     * @param client_id client identifier
     * @param consensus_states consensus states and their heights associated with the client
     */
    function ClientConsensusStates(client_id, consensus_states) {
        var _this = _super.call(this) || this;
        _this.client_id = client_id;
        _this.consensus_states = consensus_states;
        return _this;
    }
    ClientConsensusStates.fromAmino = function (data) {
        var client_id = data.client_id, consensus_states = data.consensus_states;
        return new ClientConsensusStates(client_id, consensus_states.map(function (state) { return ConsensusStateWithHeight_1.ConsensusStateWithHeight.fromAmino(state); }));
    };
    ClientConsensusStates.prototype.toAmino = function () {
        var _a = this, client_id = _a.client_id, consensus_states = _a.consensus_states;
        var res = {
            client_id: client_id,
            consensus_states: consensus_states.map(function (state) { return state.toAmino(); }),
        };
        return res;
    };
    ClientConsensusStates.fromData = function (data) {
        var client_id = data.client_id, consensus_states = data.consensus_states;
        return new ClientConsensusStates(client_id, consensus_states.map(function (state) { return ConsensusStateWithHeight_1.ConsensusStateWithHeight.fromData(state); }));
    };
    ClientConsensusStates.prototype.toData = function () {
        var _a = this, client_id = _a.client_id, consensus_states = _a.consensus_states;
        var res = {
            client_id: client_id,
            consensus_states: consensus_states.map(function (state) { return state.toData(); }),
        };
        return res;
    };
    ClientConsensusStates.fromProto = function (proto) {
        return new ClientConsensusStates(proto.clientId, proto.consensusStates.map(function (state) {
            return ConsensusStateWithHeight_1.ConsensusStateWithHeight.fromProto(state);
        }));
    };
    ClientConsensusStates.prototype.toProto = function () {
        var _a = this, client_id = _a.client_id, consensus_states = _a.consensus_states;
        return client_1.ClientConsensusStates.fromPartial({
            clientId: client_id,
            consensusStates: consensus_states.map(function (state) { return state.toProto(); }),
        });
    };
    return ClientConsensusStates;
}(json_1.JSONSerializable));
exports.ClientConsensusStates = ClientConsensusStates;
//# sourceMappingURL=ClientConsensusStates.js.map