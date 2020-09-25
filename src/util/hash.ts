import SHA256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

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
export function hashAmino(txData: string): string {
  return SHA256(Base64.parse(txData)).toString().toUpperCase();
}
