"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WasmParamChanges = void 0;
var convert_1 = require("../../util/convert");
var WasmParamChanges;
(function (WasmParamChanges) {
    WasmParamChanges.ConversionTable = {
        wasm: {
            maxcontractsize: [convert_1.Convert.toNumber, convert_1.Convert.toFixed],
            maxcontractgas: [convert_1.Convert.toNumber, convert_1.Convert.toFixed],
            maxcontractmsgsize: [convert_1.Convert.toNumber, convert_1.Convert.toFixed],
        },
    };
})(WasmParamChanges = exports.WasmParamChanges || (exports.WasmParamChanges = {}));
//# sourceMappingURL=params.js.map