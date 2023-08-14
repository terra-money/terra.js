"use strict";
//import { Account } from './Account';
//import { LazyGradedVestingAccount } from './LazyGradedVestingAccount';
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Account"), exports);
__exportStar(require("./BaseAccount"), exports);
__exportStar(require("./BaseVestingAccount"), exports);
__exportStar(require("./LazyGradedVestingAccount"), exports);
__exportStar(require("./ContinuousVestingAccount"), exports);
__exportStar(require("./DelayedVestingAccount"), exports);
__exportStar(require("./PeriodicVestingAccount"), exports);
// TODO : check whether used or not
// export function isVesting(
//   account: Account
// ): account is LazyGradedVestingAccount {
//   return account instanceof LazyGradedVestingAccount;
// }
//# sourceMappingURL=index.js.map