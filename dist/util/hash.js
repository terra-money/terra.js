"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ripemd160 = exports.sha256 = exports.hashToHex = void 0;
var SHA256_1 = require("jscrypto/SHA256");
var RIPEMD160_1 = require("jscrypto/RIPEMD160");
var Base64_1 = require("jscrypto/Base64");
var jscrypto_1 = require("jscrypto");
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
 * @param data Amino-encoded string (base64)
 */
function hashToHex(data) {
    return SHA256_1.SHA256.hash(Base64_1.Base64.parse(data)).toString().toUpperCase();
}
exports.hashToHex = hashToHex;
/**
 * Calculates the transaction hash from Amino-encoded string.
 * @param data raw bytes
 */
function sha256(data) {
    return SHA256_1.SHA256.hash(new jscrypto_1.Word32Array(data)).toUint8Array();
}
exports.sha256 = sha256;
function ripemd160(data) {
    return RIPEMD160_1.RIPEMD160.hash(new jscrypto_1.Word32Array(data)).toUint8Array();
}
exports.ripemd160 = ripemd160;
//# sourceMappingURL=hash.js.map