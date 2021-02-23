"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashingParamChanges = void 0;
var convert_1 = require("../../util/convert");
var SlashingParamChanges;
(function (SlashingParamChanges) {
    SlashingParamChanges.ConversionTable = {
        slashing: {
            MaxEvidenceAge: [convert_1.Convert.toNumber, convert_1.Convert.toFixed],
            SignedBlocksWindow: [convert_1.Convert.toNumber, convert_1.Convert.toFixed],
            MinSignedPerWindow: [convert_1.Convert.toDec, convert_1.Convert.toString],
            DowntimeJailDuration: [convert_1.Convert.toNumber, convert_1.Convert.toString],
            SlashFractionDoubleSign: [convert_1.Convert.toDec, convert_1.Convert.toString],
            SlashFractionDowntime: [convert_1.Convert.toDec, convert_1.Convert.toString],
        },
    };
})(SlashingParamChanges = exports.SlashingParamChanges || (exports.SlashingParamChanges = {}));
//# sourceMappingURL=params.js.map