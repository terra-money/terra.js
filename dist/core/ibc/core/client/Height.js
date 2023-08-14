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
exports.Height = void 0;
var client_1 = require("@terra-money/terra.proto/ibc/core/client/v1/client");
var Long = __importStar(require("long"));
var json_1 = require("../../../../util/json");
/**
 * Height is a monotonically increasing data type
 * that can be compared against another Height for the purposes of updating and
 * freezing clients
 *
 * Normally the RevisionHeight is incremented at each height while keeping
 * RevisionNumber the same. However some consensus algorithms may choose to
 * reset the height in certain conditions e.g. hard forks, state-machine
 * breaking changes In these cases, the RevisionNumber is incremented so that
 * height continues to be monitonically increasing even as the RevisionHeight
 * gets reset
 */
var Height = /** @class */ (function (_super) {
    __extends(Height, _super);
    /**
     * @param revision_number the revision that the client is currently on
     * @param revision_height the height within the given revision
     */
    function Height(revision_number, revision_height) {
        var _this = _super.call(this) || this;
        _this.revision_number = revision_number;
        _this.revision_height = revision_height;
        return _this;
    }
    Height.fromAmino = function (data) {
        var revision_number = data.revision_number, revision_height = data.revision_height;
        return new Height(parseInt(revision_number || '0'), parseInt(revision_height || '0'));
    };
    Height.prototype.toAmino = function () {
        var _a = this, revision_number = _a.revision_number, revision_height = _a.revision_height;
        var res = {
            revision_number: revision_number > 0 ? revision_number.toFixed() : undefined,
            revision_height: revision_height > 0 ? revision_height.toFixed() : undefined,
        };
        return res;
    };
    Height.fromData = function (data) {
        var revision_number = data.revision_number, revision_height = data.revision_height;
        return new Height(Number.parseInt(revision_number), Number.parseInt(revision_height));
    };
    Height.prototype.toData = function () {
        var _a = this, revision_number = _a.revision_number, revision_height = _a.revision_height;
        var res = {
            revision_number: revision_number.toFixed(),
            revision_height: revision_height.toFixed(),
        };
        return res;
    };
    Height.fromProto = function (proto) {
        return new Height(proto.revisionNumber.toNumber(), proto.revisionHeight.toNumber());
    };
    Height.prototype.toProto = function () {
        var _a = this, revision_number = _a.revision_number, revision_height = _a.revision_height;
        return client_1.Height.fromPartial({
            revisionNumber: Long.fromNumber(revision_number),
            revisionHeight: Long.fromNumber(revision_height),
        });
    };
    return Height;
}(json_1.JSONSerializable));
exports.Height = Height;
//# sourceMappingURL=Height.js.map