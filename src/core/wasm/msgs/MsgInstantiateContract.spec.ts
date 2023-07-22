import { MsgInstantiateContract } from './MsgInstantiateContract';
import { MsgInstantiateContract as MsgInstantiateContract_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';

const msgWithAdmin = new MsgInstantiateContract(
  'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  1,
  { count: 0 },
  { uluna: 120400 },
  ''
);

const msgWithoutAdmin = new MsgInstantiateContract(
  'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  undefined,
  1,
  { count: 0 },
  { uluna: 120400 },
  undefined
);

const msgWithInitString = new MsgInstantiateContract(
  'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  undefined,
  1,
  'msg_as_string',
  { uluna: 120400 },
  undefined
);

describe('MsgInstantiateContract', () => {
  it('amino', () => {
    const aminoWithAdmin = msgWithAdmin.toAmino();
    expect(aminoWithAdmin.value.admin).toEqual(msgWithAdmin.admin);

    const aminoWithoutAdmin = msgWithoutAdmin.toAmino();
    expect(aminoWithoutAdmin.value.admin).toEqual(msgWithoutAdmin.admin);

    const aminoWithInitString = msgWithInitString.toAmino();
    expect(aminoWithInitString.value.msg).toEqual(msgWithInitString.msg);
  });

  it('proto', () => {
    const protoWithAdmin = msgWithAdmin.toProto();
    expect(protoWithAdmin.admin).toEqual(msgWithAdmin.admin);

    const protoWithoutAdmin = msgWithoutAdmin.toProto();
    expect(protoWithoutAdmin.admin).toEqual('');

    const protoWithInitString =
      msgWithInitString.toProto() as MsgInstantiateContract_pb;
    expect(protoWithInitString.msg.toString()).toEqual(
      JSON.stringify(msgWithInitString.msg)
    );
  });

  it('data', () => {
    const dataWithAdmin2 = msgWithAdmin.toData();
    expect(dataWithAdmin2.admin).toEqual(msgWithAdmin.admin);

    const dataWithoutAdmin2 = msgWithoutAdmin.toData();
    expect(dataWithoutAdmin2.admin).toEqual('');

    const dataWithInitString2 = msgWithInitString.toData();
    expect(dataWithInitString2.msg).toEqual(msgWithInitString.msg);
  });
});
