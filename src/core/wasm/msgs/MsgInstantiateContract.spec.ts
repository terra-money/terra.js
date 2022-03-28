import { MsgInstantiateContract } from './MsgInstantiateContract';

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
  it('amino', () => {
    const aminoWithAdmin = msgWithAdmin.toAmino();
    expect(aminoWithAdmin.value.admin).toEqual(msgWithAdmin.admin);

    const aminoWithoutAdmin = msgWithoutAdmin.toAmino();
    expect(aminoWithoutAdmin.value.admin).toEqual(msgWithoutAdmin.admin);

    const aminoWithInitString = msgWithInitString.toAmino();
    expect(aminoWithInitString.value.init_msg).toEqual(
      msgWithInitString.init_msg
    );
  });

  it('proto', () => {
    const protoWithAdmin = msgWithAdmin.toProto();
    expect(protoWithAdmin.admin).toEqual(msgWithAdmin.admin);

    const protoWithoutAdmin = msgWithoutAdmin.toProto();
    expect(protoWithoutAdmin.admin).toEqual('');

    const protoWithInitString = msgWithInitString.toProto();
    expect(protoWithInitString.initMsg.toString()).toEqual(
      JSON.stringify(msgWithInitString.init_msg)
    );
  });

  it('data', () => {
    const dataWithAdmin = msgWithAdmin.toData();
    expect(dataWithAdmin.admin).toEqual(msgWithAdmin.admin);

    const dataWithoutAdmin = msgWithoutAdmin.toData();
    expect(dataWithoutAdmin.admin).toEqual('');

    const dataWithInitString = msgWithInitString.toData();
    expect(dataWithInitString.init_msg).toEqual(msgWithInitString.init_msg);
  });
});
