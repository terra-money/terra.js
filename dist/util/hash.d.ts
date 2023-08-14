/**
 * Calculates the transaction hash from Amino-encoded string.
 * @param data Amino-encoded string (base64)
 */
export declare function hashToHex(data: string): string;
/**
 * Calculates the transaction hash from Amino-encoded string.
 * @param data raw bytes
 */
export declare function sha256(data: Uint8Array): Uint8Array;
export declare function ripemd160(data: Uint8Array): Uint8Array;
