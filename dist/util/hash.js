"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashAmino = void 0;
var sha256_1 = __importDefault(require("crypto-js/sha256"));
var enc_base64_1 = __importDefault(require("crypto-js/enc-base64"));
/*
DEPRECATED (was used by crypto-js)
function byteArrayToWordArray(ba: Uint8Array): CryptoJS.LibWordArray {
  const wa: number[] = [];
  for (let i = 0; i < ba.length; i += 1) {
    wa[(i / 4) | 0] |= ba[i] << (24 - 8 * i);
  }
  return crypto.lib.WordArray.create(wa);
}*/
/**
 * Calculates the transaction hash from Amino-encoded string.
 * @param txData Amino-encoded string (base64)
 */
function hashAmino(txData) {
    return sha256_1.default(enc_base64_1.default.parse(txData)).toString().toUpperCase();
}
exports.hashAmino = hashAmino;
//# sourceMappingURL=hash.js.map