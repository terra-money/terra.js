import { MsgInstantiateContract } from './MsgInstantiateContract';
import { MsgInstantiateContract as MsgInstantiateContract_legacy_pb } from '@terra-money/legacy.proto/terra/wasm/v1beta1/tx';
import { MsgInstantiateContract as MsgInstantiateContract_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';

const msgWithAdmin = new MsgInstantiateContract(
  'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  1,
  { count: 0 },
  { uluna: 120400 }
);

const msgWithoutAdmin = new MsgInstantiateContract(
  'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  undefined,
  1,
  { count: 0 },
  { uluna: 120400 }
);

const msgWithInitString = new MsgInstantiateContract(
  'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  undefined,
  1,
  'init_msg_as_string',
  { uluna: 120400 }
);

describe('MsgInstantiateContract', () => {
  it('legacy amino', () => {
    const aminoWithAdmin = msgWithAdmin.toAmino(true);
    expect(aminoWithAdmin.value.admin).toEqual(msgWithAdmin.admin);

    const aminoWithoutAdmin = msgWithoutAdmin.toAmino(true);
    expect(aminoWithoutAdmin.value.admin).toEqual(msgWithoutAdmin.admin);

    const aminoWithInitString = msgWithInitString.toAmino(true) as MsgInstantiateContract.AminoV1;
    expect(aminoWithInitString.value.init_msg).toEqual(
      msgWithInitString.init_msg
    );
  });

  it('amino', () => {
    const aminoWithAdmin = msgWithAdmin.toAmino(false);
    expect(aminoWithAdmin.value.admin).toEqual(msgWithAdmin.admin);

    const aminoWithoutAdmin = msgWithoutAdmin.toAmino(false);
    expect(aminoWithoutAdmin.value.admin).toEqual(msgWithoutAdmin.admin);

    const aminoWithInitString = msgWithInitString.toAmino(false) as MsgInstantiateContract.AminoV2;
    expect(aminoWithInitString.value.msg).toEqual(
      msgWithInitString.init_msg
    );
  });

  it('legacy proto', () => {
    const protoWithAdmin = msgWithAdmin.toProto(true);
    expect(protoWithAdmin.admin).toEqual(msgWithAdmin.admin);

    const protoWithoutAdmin = msgWithoutAdmin.toProto(true);
    expect(protoWithoutAdmin.admin).toEqual('');

    const protoWithInitString = msgWithInitString.toProto(true) as MsgInstantiateContract_legacy_pb;
    expect(protoWithInitString.initMsg.toString()).toEqual(
      JSON.stringify(msgWithInitString.init_msg)
    );
  });

  it('proto', () => {
    const protoWithAdmin = msgWithAdmin.toProto();
    expect(protoWithAdmin.admin).toEqual(msgWithAdmin.admin);

    const protoWithoutAdmin = msgWithoutAdmin.toProto();
    expect(protoWithoutAdmin.admin).toEqual('');

    const protoWithInitString = msgWithInitString.toProto() as MsgInstantiateContract_pb;
    expect(protoWithInitString.msg.toString()).toEqual(
      JSON.stringify(msgWithInitString.init_msg)
    );
  });


  it('legacy data', () => {
    const dataWithAdmin = msgWithAdmin.toData(true);
    expect(dataWithAdmin.admin).toEqual(msgWithAdmin.admin);

    const dataWithoutAdmin = msgWithoutAdmin.toData(true);
    expect(dataWithoutAdmin.admin).toEqual('');

    const dataWithInitString = msgWithInitString.toData(true) as MsgInstantiateContract.DataV1;
    expect(dataWithInitString.init_msg).toEqual(msgWithInitString.init_msg);
  });

  it('data', () => {
    const dataWithAdmin2 = msgWithAdmin.toData(false);
    expect(dataWithAdmin2.admin).toEqual(msgWithAdmin.admin);

    const dataWithoutAdmin2 = msgWithoutAdmin.toData(false);
    expect(dataWithoutAdmin2.admin).toEqual('');

    const dataWithInitString2 = msgWithInitString.toData(false) as MsgInstantiateContract.DataV2;
    expect(dataWithInitString2.msg).toEqual(msgWithInitString.init_msg);
  });
});
