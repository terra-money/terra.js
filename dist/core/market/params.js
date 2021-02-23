"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketParamChanges = void 0;
var convert_1 = require("../../util/convert");
var MarketParamChanges;
(function (MarketParamChanges) {
    MarketParamChanges.ConversionTable = {
        market: {
            poolrecoveryperiod: [convert_1.Convert.toNumber, convert_1.Convert.toFixed],
            basepool: [convert_1.Convert.toDec, convert_1.Convert.toString],
            minstabilityspread: [convert_1.Convert.toDec, convert_1.Convert.toString],
        },
    };
})(MarketParamChanges = exports.MarketParamChanges || (exports.MarketParamChanges = {}));
//# sourceMappingURL=params.js.map