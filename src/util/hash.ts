import SHA256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';

function byteArrayToWordArray(ba: Uint8Array) {
  const wa: number[] = [];
  for (let i = 0; i < ba.length; i += 1) {
    wa[(i / 4) | 0] |= ba[i] << (24 - 8 * i);
  }
  return CryptoJS.lib.WordArray.create(wa);
}

/**
 * Calculates the transaction hash from Amino-encoded string.
 * @param txData Amino-encoded string (base64)
 */
export function hashAmino(txData: string): string {
  const wordArray = byteArrayToWordArray(
    new Uint8Array(Array.from(Buffer.from(txData, 'base64')))
  );

  return SHA256(wordArray).toString().toUpperCase();
}
