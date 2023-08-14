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
exports.MsgMigrateCode = void 0;
var json_1 = require("../../../util/json");
var MsgMigrateCode = /** @class */ (function (_super) {
    __extends(MsgMigrateCode, _super);
    /**
     * @param sender code migrator address
     * @param code_id reference to the code on the blockchain
     * @param wasm_byte_code base64-encoded bytecode contents
     */
    function MsgMigrateCode(sender, code_id, wasm_byte_code) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        _this.code_id = code_id;
        _this.wasm_byte_code = wasm_byte_code;
        return _this;
    }
    MsgMigrateCode.fromAmino = function (_data, _) {
        throw new Error('Not supported for the network');
    };
    MsgMigrateCode.prototype.toAmino = function (_) {
        throw new Error('Not supported for the network');
    };
    MsgMigrateCode.fromProto = function (_proto, _) {
        throw new Error('Not supported for the network');
    };
    MsgMigrateCode.prototype.toProto = function (_) {
        throw new Error('Not supported for the network');
    };
    MsgMigrateCode.prototype.packAny = function (_) {
        throw new Error('Not supported for the network');
    };
    MsgMigrateCode.unpackAny = function (_msgAny, _) {
        throw new Error('Not supported for the network');
    };
    MsgMigrateCode.fromData = function (_data, _) {
        throw new Error('Not supported for the network');
    };
    MsgMigrateCode.prototype.toData = function (_) {
        throw new Error('Not supported for the network');
    };
    return MsgMigrateCode;
}(json_1.JSONSerializable));
exports.MsgMigrateCode = MsgMigrateCode;
//# sourceMappingURL=MsgMigrateCode.js.map