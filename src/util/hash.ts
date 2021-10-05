import { SHA256 } from 'jscrypto/SHA256';
import { RIPEMD160 } from 'jscrypto/RIPEMD160';
import { Base64 } from 'jscrypto/Base64';
import { Word32Array } from 'jscrypto';
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
export function hashToHex(data: string): string {
  return SHA256.hash(Base64.parse(data)).toString().toUpperCase();
}

/**
 * Calculates the transaction hash from Amino-encoded string.
 * @param data raw bytes
 */
export function sha256(data: Uint8Array): Uint8Array {
  return SHA256.hash(new Word32Array(data)).toUint8Array();
}

export function ripemd160(data: Uint8Array): Uint8Array {
  return RIPEMD160.hash(new Word32Array(data)).toUint8Array();
}
