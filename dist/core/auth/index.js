"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVesting = void 0;
var LazyGradedVestingAccount_1 = require("./LazyGradedVestingAccount");
__exportStar(require("./Account"), exports);
__exportStar(require("./LazyGradedVestingAccount"), exports);
function isVesting(account) {
    return account instanceof LazyGradedVestingAccount_1.LazyGradedVestingAccount;
}
exports.isVesting = isVesting;
//# sourceMappingURL=index.js.map