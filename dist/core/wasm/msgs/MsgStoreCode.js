"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgStoreCode = void 0;
var json_1 = require("../../../util/json");
var MsgStoreCode = /** @class */ (function (_super) {
    __extends(MsgStoreCode, _super);
    /**
     * @param sender contract creator
     * @param wasm_byte_code base64-encoded bytecode contents
     */
    function MsgStoreCode(sender, wasm_byte_code) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        _this.wasm_byte_code = wasm_byte_code;
        return _this;
    }
    MsgStoreCode.fromData = function (data) {
        var _a = data.value, sender = _a.sender, wasm_byte_code = _a.wasm_byte_code;
        return new MsgStoreCode(sender, wasm_byte_code);
    };
    MsgStoreCode.prototype.toData = function () {
        var _a = this, sender = _a.sender, wasm_byte_code = _a.wasm_byte_code;
        return {
            type: 'wasm/MsgStoreCode',
            value: {
                sender: sender,
                wasm_byte_code: wasm_byte_code,
            },
        };
    };
    return MsgStoreCode;
}(json_1.JSONSerializable));
exports.MsgStoreCode = MsgStoreCode;
//# sourceMappingURL=MsgStoreCode.js.map