"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertAccessTypeFromJSON = void 0;
var types_1 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/types");
// core v2 returns human-friendly string like 'Everybody' by wasm/type/params.go
// but accessTypeFromJSON requires "ACCESS_TYPE_EVERYBODY"
// this function is a wrapper to get AccessType from JSON
function convertAccessTypeFromJSON(accessType) {
    var converted = accessType;
    switch (accessType) {
        case 'Everybody':
            converted = 'ACCESS_TYPE_EVERYBODY';
            break;
        case 'Nobody':
            converted = 'ACCESS_TYPE_NOBODY';
            break;
        case 'OnlyAddress':
            converted = 'ACCESS_TYPE_ONLY_ADDRESS';
            break;
        case 'Unspecified':
            converted = 'ACCESS_TYPE_UNSPECIFIED';
            break;
    }
    return (0, types_1.accessTypeFromJSON)(converted);
}
exports.convertAccessTypeFromJSON = convertAccessTypeFromJSON;
//# sourceMappingURL=util.js.map