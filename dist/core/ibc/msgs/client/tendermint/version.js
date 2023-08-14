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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.Consensus = void 0;
var types_1 = require("@terra-money/terra.proto/tendermint/version/types");
var types_2 = require("@terra-money/terra.proto/tendermint/version/types");
var Long = __importStar(require("long"));
var json_1 = require("../../../../../util/json");
/**
 * Consensus captures the consensus rules for processing a block in the blockchain,
 * including all blockchain data structures and the rules of the application's
 * state transition machine.
 */
var Consensus = /** @class */ (function (_super) {
    __extends(Consensus, _super);
    /**
     * @param block
     * @param app
     */
    function Consensus(block, app) {
        var _this = _super.call(this) || this;
        _this.block = block;
        _this.app = app;
        return _this;
    }
    Consensus.fromAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    Consensus.prototype.toAmino = function () {
        throw new Error('Amino not supported');
    };
    Consensus.fromData = function (data) {
        var block = data.block, app = data.app;
        return new Consensus(Number.parseInt(block), Number.parseInt(app));
    };
    Consensus.prototype.toData = function () {
        var _a = this, block = _a.block, app = _a.app;
        var res = {
            block: block.toFixed(),
            app: app.toFixed(),
        };
        return res;
    };
    Consensus.fromProto = function (proto) {
        return new Consensus(proto.block.toNumber(), proto.app.toNumber());
    };
    Consensus.prototype.toProto = function () {
        var _a = this, block = _a.block, app = _a.app;
        return types_1.Consensus.fromPartial({
            block: Long.fromNumber(block),
            app: Long.fromNumber(app),
        });
    };
    return Consensus;
}(json_1.JSONSerializable));
exports.Consensus = Consensus;
/**
 * App captures the consensus rules for processing a block in the blockchain,
 * including all blockchain data structures and the rules of the application's
 * state transition machine.
 */
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    /**
     * @param protocol
     * @param software
     */
    function App(protocol, software) {
        var _this = _super.call(this) || this;
        _this.protocol = protocol;
        _this.software = software;
        return _this;
    }
    App.fromAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    App.prototype.toAmino = function () {
        throw new Error('Amino not supported');
    };
    App.fromData = function (data) {
        var protocol = data.protocol, software = data.software;
        return new App(Number.parseInt(protocol), software);
    };
    App.prototype.toData = function () {
        var _a = this, protocol = _a.protocol, software = _a.software;
        var res = {
            protocol: protocol.toFixed(),
            software: software,
        };
        return res;
    };
    App.fromProto = function (proto) {
        return new App(proto.protocol.toNumber(), proto.software);
    };
    App.prototype.toProto = function () {
        var _a = this, protocol = _a.protocol, software = _a.software;
        return types_2.App.fromPartial({
            protocol: Long.fromNumber(protocol),
            software: software,
        });
    };
    return App;
}(json_1.JSONSerializable));
exports.App = App;
//# sourceMappingURL=version.js.map