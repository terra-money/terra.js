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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IbcAPI = void 0;
var BaseAPI_1 = require("./BaseAPI");
var IdentifiedClient_1 = require("../../../core/ibc/core/client/IdentifiedClient");
//import { Params as ControllerParams } from '../../../core/ibc/applications/interchain-account/controller/Params';
var Params_1 = require("../../../core/ibc/applications/interchain-account/host/Params");
var channel_1 = require("../../../core/ibc/core/channel");
var connection_1 = require("../../../core/ibc/core/connection");
var Height_1 = require("../../../core/ibc/core/client/Height");
var IbcAPI = /** @class */ (function (_super) {
    __extends(IbcAPI, _super);
    function IbcAPI(lcd) {
        var _this = _super.call(this, lcd.apiRequester) || this;
        _this.lcd = lcd;
        return _this;
    }
    /**
     * query all the IBC channels of a chain
     */
    IbcAPI.prototype.channels = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/ibc/core/channel/v1/channels", params)
                        .then(function (d) { return [d.channels.map(channel_1.Channel.fromData), d.pagination]; })];
            });
        });
    };
    /**
     * query the information of the port at given channel
     * @param channel_id channel identifier
     * @param port_id port name
     */
    IbcAPI.prototype.port = function (channel_id, port_id, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/ibc/core/channel/v1/channels/".concat(channel_id, "/ports/").concat(port_id), params)
                        .then(function (d) {
                        return {
                            channel: channel_1.Channel.fromData(d.channel),
                            proof: d.proof,
                            proof_height: Height_1.Height.fromData(d.proof_height),
                        };
                    })];
            });
        });
    };
    /**
     *  query all the IBC connections of a chain
     */
    IbcAPI.prototype.connections = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/ibc/core/connection/v1/connections", params)
                        .then(function (d) { return [
                        d.connections.map(connection_1.IdentifiedConnection.fromData),
                        d.pagination,
                    ]; })];
            });
        });
    };
    /**
     * query an IBC connection end
     * @param connection_id connection unique identifier
     */
    IbcAPI.prototype.connection = function (connection_id, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/ibc/core/connection/v1/connections/".concat(connection_id), params)
                        .then(function (d) { return connection_1.IdentifiedConnection.fromData(d.connection); })];
            });
        });
    };
    /**
     * query all the channels associated with a connection end
     * @param connection_id connection unique identifier
     */
    IbcAPI.prototype.connectionChannels = function (connection_id, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/ibc/core/channel/v1/connections/".concat(connection_id, "/channels"), params)
                        .then(function (d) { return [
                        d.channels.map(channel_1.Channel.fromData),
                        Height_1.Height.fromData(d.height),
                        d.pagination,
                    ]; })];
            });
        });
    };
    /**
     * Gets the current transfer application parameters.
     */
    IbcAPI.prototype.parameters = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = this.lcd.config.isClassic
                    ? "/ibc/client/v1/params"
                    : "/ibc/core/client/v1/params";
                return [2 /*return*/, this.c
                        .get(url, params)
                        .then(function (_a) {
                        var d = _a.params;
                        return ({
                            allowed_clients: d.allowed_clients,
                        });
                    })];
            });
        });
    };
    /**
     * query all the IBC light clients of a chain
     */
    IbcAPI.prototype.clientStates = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/ibc/core/client/v1/client_states", params)
                        .then(function (d) { return [
                        d.client_states.map(IdentifiedClient_1.IdentifiedClientState.fromData),
                        d.pagination,
                    ]; })];
            });
        });
    };
    /**
     * query an IBC light client
     * @param client_id client state unique identifier
     * @returns
     */
    IbcAPI.prototype.clientState = function (client_id, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/ibc/core/client/v1/client_states/".concat(client_id), params)
                        .then(function (d) { return IdentifiedClient_1.IdentifiedClientState.fromData(d.client_state); })];
            });
        });
    };
    /**
     * query the status of an IBC light client
     * @param client_id client state unique identifier
     * @returns
     */
    IbcAPI.prototype.clientStatus = function (client_id, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/ibc/core/client/v1/client_status/".concat(client_id), params)
                        .then()];
            });
        });
    };
    /**
     * query all the consensus state associated with a given client
     * @param client_id client identifier
     * @returns
     */
    IbcAPI.prototype.consensusStates = function (client_id, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/ibc/core/client/v1/consensus_states/".concat(client_id), params)
                        .then()];
            });
        });
    };
    /**
     * Gets paramaters for interchain account controller.
     * NOTE: CURRENTLY LCD DOESN'T SERVE THE ENDPOINT
    /*
    public async interchainAccountControllerParameters(
      params: APIParams = {}
    ): Promise<ControllerParams> {
      return this.c
        .get<{ params: ControllerParams.Data }>(
          `/ibc/apps/interchain_accounts/controller/v1/params`,
          params
        )
        .then(({ params: d }) => ControllerParams.fromData(d));
    }
    */
    /**
     * Gets paramaters for interchain account host.
     */
    IbcAPI.prototype.interchainAccountHostParameters = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/ibc/apps/interchain_accounts/host/v1/params", params)
                        .then(function (_a) {
                        var d = _a.params;
                        return Params_1.Params.fromData(d);
                    })];
            });
        });
    };
    return IbcAPI;
}(BaseAPI_1.BaseAPI));
exports.IbcAPI = IbcAPI;
//# sourceMappingURL=IbcAPI.js.map