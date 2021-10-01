import { LegacyAminoMultisigPublicKey, SimplePublicKey } from './PublicKey';

describe('MultisigPublicKey', () => {
  it('address', () => {
    const pubkey = new LegacyAminoMultisigPublicKey(2, [
      new SimplePublicKey('A/PwvW/JLEnhb0/o5g+AnOqMN+FFT24gjJfDtA1tBsBv'),
      new SimplePublicKey('A9XR3uRxAD5L9kkYotz094hH6ye92YLraSO/sGhWalxb'),
      new SimplePublicKey('AyETa9Y9ihObzeRPWMP0MBAa0Mqune3I+5KonOCPTtkv'),
    ]);

    expect(pubkey.address()).toEqual(
      'terra1gufrav46pnpwf03yu7xz76ylkmatsxtplrxnmc'
    );
  });
});
