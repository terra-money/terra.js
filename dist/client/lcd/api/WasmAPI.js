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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.WasmAPI = void 0;
var BaseAPI_1 = require("./BaseAPI");
var HistoryEntry_1 = require("../../../core/wasm/HistoryEntry");
var AbsoluteTxPosition_1 = require("../../../core/wasm/AbsoluteTxPosition");
var wasm_1 = require("../../../core/wasm");
var WasmAPI = /** @class */ (function (_super) {
    __extends(WasmAPI, _super);
    function WasmAPI(lcd) {
        var _this = _super.call(this, lcd.apiRequester) || this;
        _this.lcd = lcd;
        return _this;
    }
    WasmAPI.prototype.codeInfo = function (codeID, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                endpoint = "/cosmwasm/wasm/v1/code/".concat(codeID);
                return [2 /*return*/, this.c
                        .get(endpoint, params)
                        .then(function (_a) {
                        var d = _a.code_info;
                        return ({
                            code_id: +d.code_id,
                            code_hash: d.data_hash,
                            creator: d.creator,
                            instantiate_permission: d.instantiate_permission
                                ? wasm_1.AccessConfig.fromData(d.instantiate_permission)
                                : undefined,
                        });
                    })];
            });
        });
    };
    WasmAPI.prototype.contractInfo = function (contractAddress, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var historyEntry, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contractHistory(contractAddress)];
                    case 1:
                        historyEntry = (_a.sent())[0];
                        endpoint = "/cosmwasm/wasm/v1/contract/".concat(contractAddress);
                        return [2 /*return*/, this.c
                                .get(endpoint, params)
                                .then(function (_a) {
                                var d = _a.contract_info;
                                return ({
                                    code_id: Number.parseInt(d.code_id),
                                    address: contractAddress,
                                    creator: d.creator,
                                    admin: d.admin !== '' ? d.admin : undefined,
                                    label: d.label !== '' ? d.label : undefined,
                                    init_msg: historyEntry[0].msg,
                                    created: d.created ? AbsoluteTxPosition_1.AbsoluteTxPosition.fromData(d.created) : undefined,
                                    ibc_port_id: d.ibc_port_id !== '' ? d.ibc_port_id : undefined,
                                });
                            })];
                }
            });
        });
    };
    WasmAPI.prototype.contractQuery = function (contractAddress, query, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var query_msg, endpoint;
            return __generator(this, function (_a) {
                query_msg = Buffer.from(JSON.stringify(query), 'utf-8').toString('base64');
                endpoint = "/cosmwasm/wasm/v1/contract/".concat(contractAddress, "/smart/").concat(query_msg);
                return [2 /*return*/, this.c
                        .get(endpoint, __assign({}, params))
                        .then(function (d) { return d.data; })];
            });
        });
    };
    WasmAPI.prototype.parameters = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/terra/wasm/v1beta1/params", params)
                        .then(function (_a) {
                        var d = _a.params;
                        return ({
                            max_contract_size: Number.parseInt(d.max_contract_size),
                            max_contract_gas: Number.parseInt(d.max_contract_gas),
                            max_contract_msg_size: Number.parseInt(d.max_contract_msg_size),
                        });
                    })];
            });
        });
    };
    WasmAPI.prototype.pinnedCodes = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmwasm/wasm/v1/codes/pinned", params)
                        .then(function (_a) {
                        var d = _a.pinned_code;
                        return ({
                            code_ids: d.code_ids.map(function (code_id) { return Number.parseInt(code_id); }),
                        });
                    })];
            });
        });
    };
    WasmAPI.prototype.rawContractState = function (contractAddress, query_data, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmwasm/wasm/v1/contract/".concat(contractAddress, "/raw/").concat(Buffer.from(query_data, 'utf-8').toString('base64')), params)
                        .then(function (_a) {
                        var d = _a.result;
                        return ({
                            data: Buffer.from(d.data, 'base64').toString(),
                        });
                    })];
            });
        });
    };
    WasmAPI.prototype.smartContractState = function (contractAddress, query_data, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmwasm/wasm/v1/contract/".concat(contractAddress, "/smart/").concat(Buffer.from(JSON.stringify(query_data), 'utf-8').toString('base64')), params)
                        .then(function (_a) {
                        var d = _a.result;
                        return ({
                            data: d.data,
                        });
                    })];
            });
        });
    };
    WasmAPI.prototype.contractHistory = function (contractAddress, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmwasm/wasm/v1/contract/".concat(contractAddress, "/history"), params)
                        .then(function (d) { return [
                        d.entries.map(function (entry) { return HistoryEntry_1.HistoryEntry.fromData(entry); }),
                        d.pagination,
                    ]; })];
            });
        });
    };
    WasmAPI.prototype.contractStates = function (contractAddress, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmwasm/wasm/v1/contract/".concat(contractAddress, "/state"), params)
                        .then(function (d) { return [
                        d.models.map(function (model) {
                            return {
                                key: model.key,
                                value: model.value,
                            };
                        }),
                        d.pagination,
                    ]; })];
            });
        });
    };
    WasmAPI.prototype.allCodes = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmwasm/wasm/v1/code", params)
                        .then(function (d) { return [
                        d.codeInfos.map(function (codeInfo) {
                            return {
                                code_id: +codeInfo.code_id,
                                code_hash: codeInfo.data_hash,
                                creator: codeInfo.creator,
                                instantiate_permission: codeInfo.instantiate_permission
                                    ? wasm_1.AccessConfig.fromData(codeInfo.instantiate_permission)
                                    : undefined,
                            };
                        }),
                        d.pagination,
                    ]; })];
            });
        });
    };
    return WasmAPI;
}(BaseAPI_1.BaseAPI));
exports.WasmAPI = WasmAPI;
//# sourceMappingURL=WasmAPI.js.map