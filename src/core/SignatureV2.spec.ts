import { CompactBitArray } from './CompactBitArray';
import { SimplePublicKey } from './PublicKey';
import { SignatureV2 } from './SignatureV2';

describe('SignatureV2', () => {
  it('conversion: sigle sign', () => {
    const sequence = 1234;
    //const data = new SignatureV2.Descriptor(
    const signMode = SignatureV2.SignMode.SIGN_MODE_DIRECT;
    const signature = 'fakesignature';

    const sigv2 = new SignatureV2(
      new SimplePublicKey('A/PwvW/JLEnhb0/o5g+AnOqMN+FFT24gjJfDtA1tBsBv'),
      new SignatureV2.Descriptor(
        new SignatureV2.Descriptor.Single(signMode, signature)
      ),
      sequence
    );

    const toData = sigv2.toData();
    //console.log(`toData : ${JSON.stringify(toData)}`);
    const fromData = SignatureV2.fromData(toData);
    //console.log(`fromData : ${JSON.stringify(fromData)}`);
    const toData2 = fromData.toData();
    //console.log(`toData2 : ${JSON.stringify(toData2)}`);

    expect(toData.public_key).toEqual(toData2.public_key);
    expect(toData.sequence).toEqual(toData2.sequence);
    expect(toData.data).toEqual(toData2.data);
  });

  it('conversion: multi sign', () => {
    const sequence = 1234;
    //const data = new SignatureV2.Descriptor(
    const signMode = SignatureV2.SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
    const signature = 'fakesignature';
    const single = new SignatureV2.Descriptor(
      new SignatureV2.Descriptor.Single(signMode, signature)
    );

    const sigv2 = new SignatureV2(
      new SimplePublicKey('A/PwvW/JLEnhb0/o5g+AnOqMN+FFT24gjJfDtA1tBsBv'),
      new SignatureV2.Descriptor(
        new SignatureV2.Descriptor.Multi(CompactBitArray.fromBits(2), [
          single,
          single,
        ])
      ),
      sequence
    );

    const toData = sigv2.toData();
    //console.log(`toData : ${JSON.stringify(toData)}`);
    const fromData = SignatureV2.fromData(toData);
    //console.log(`fromData : ${JSON.stringify(fromData)}`);
    const toData2 = fromData.toData();
    //console.log(`toData2 : ${JSON.stringify(toData2)}`);

    expect(toData.public_key).toEqual(toData2.public_key);
    expect(toData.sequence).toEqual(toData2.sequence);
    expect(toData.data).toEqual(toData2.data);
  });
});
