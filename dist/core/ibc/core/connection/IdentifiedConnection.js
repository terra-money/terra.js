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
exports.IdentifiedConnection = exports.stateToJSON = exports.stateFromJSON = exports.State = void 0;
var connection_1 = require("@terra-money/terra.proto/ibc/core/connection/v1/connection");
var json_1 = require("../../../../util/json");
var Version_1 = require("./Version");
var connection_2 = require("@terra-money/terra.proto/ibc/core/connection/v1/connection");
Object.defineProperty(exports, "State", { enumerable: true, get: function () { return connection_2.State; } });
Object.defineProperty(exports, "stateFromJSON", { enumerable: true, get: function () { return connection_2.stateFromJSON; } });
Object.defineProperty(exports, "stateToJSON", { enumerable: true, get: function () { return connection_2.stateToJSON; } });
var Counterparty_1 = require("./Counterparty");
var long_1 = __importDefault(require("long"));
/**
 * IdentifiedConnection defines a connection with additional connection identifier field
 */
var IdentifiedConnection = /** @class */ (function (_super) {
    __extends(IdentifiedConnection, _super);
    /**
     * @param id connection identifier
     * @param client_id client associated with this connection.
     * @param versions IBC version which can be utilised to determine encodings or protocols for channels or packets utilising this connection
     * @param state current state of the connection end
     * @param counterparty counterparty chain associated with this connection
     * @param delay_period delay period associated with this connection
     */
    function IdentifiedConnection(id, client_id, versions, state, counterparty, delay_period) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.client_id = client_id;
        _this.versions = versions;
        _this.state = state;
        _this.counterparty = counterparty;
        _this.delay_period = delay_period;
        return _this;
    }
    IdentifiedConnection.fromAmino = function (data) {
        var id = data.id, client_id = data.client_id, versions = data.versions, state = data.state, counterparty = data.counterparty, delay_period = data.delay_period;
        return new IdentifiedConnection(id, client_id, versions.map(Version_1.Version.fromAmino), (0, connection_2.stateFromJSON)(state), counterparty ? Counterparty_1.Counterparty.fromAmino(counterparty) : undefined, Number.parseInt(delay_period));
    };
    IdentifiedConnection.prototype.toAmino = function () {
        var _a = this, id = _a.id, client_id = _a.client_id, versions = _a.versions, state = _a.state, counterparty = _a.counterparty, delay_period = _a.delay_period;
        var res = {
            id: id,
            client_id: client_id,
            versions: versions.map(function (version) { return version.toAmino(); }),
            state: (0, connection_2.stateToJSON)(state),
            counterparty: counterparty === null || counterparty === void 0 ? void 0 : counterparty.toAmino(),
            delay_period: delay_period.toFixed(),
        };
        return res;
    };
    IdentifiedConnection.fromData = function (data) {
        var id = data.id, client_id = data.client_id, versions = data.versions, state = data.state, counterparty = data.counterparty, delay_period = data.delay_period;
        return new IdentifiedConnection(id, client_id, versions.map(Version_1.Version.fromData), (0, connection_2.stateFromJSON)(state), counterparty ? Counterparty_1.Counterparty.fromData(counterparty) : undefined, Number.parseInt(delay_period));
    };
    IdentifiedConnection.prototype.toData = function () {
        var _a = this, id = _a.id, client_id = _a.client_id, versions = _a.versions, state = _a.state, counterparty = _a.counterparty, delay_period = _a.delay_period;
        var res = {
            id: id,
            client_id: client_id,
            versions: versions.map(function (version) { return version.toData(); }),
            state: (0, connection_2.stateToJSON)(state),
            counterparty: counterparty === null || counterparty === void 0 ? void 0 : counterparty.toData(),
            delay_period: delay_period.toFixed(),
        };
        return res;
    };
    IdentifiedConnection.fromProto = function (proto) {
        return new IdentifiedConnection(proto.id, proto.clientId, proto.versions.map(Version_1.Version.fromProto), proto.state, proto.counterparty
            ? Counterparty_1.Counterparty.fromProto(proto.counterparty)
            : undefined, proto.delayPeriod.toNumber());
    };
    IdentifiedConnection.prototype.toProto = function () {
        var _a = this, id = _a.id, client_id = _a.client_id, versions = _a.versions, state = _a.state, counterparty = _a.counterparty, delay_period = _a.delay_period;
        return connection_1.IdentifiedConnection.fromPartial({
            id: id,
            clientId: client_id,
            versions: versions.map(function (v) { return v.toProto(); }),
            state: state,
            counterparty: counterparty === null || counterparty === void 0 ? void 0 : counterparty.toProto(),
            delayPeriod: long_1.default.fromNumber(delay_period),
        });
    };
    return IdentifiedConnection;
}(json_1.JSONSerializable));
exports.IdentifiedConnection = IdentifiedConnection;
//# sourceMappingURL=IdentifiedConnection.js.map