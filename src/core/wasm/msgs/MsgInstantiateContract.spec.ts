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

describe('MsgInstantiateContract', () => {
  it('amino', () => {
    const aminoWithAdmin = msgWithAdmin.toAmino();
    expect(aminoWithAdmin.value.admin).toEqual(msgWithAdmin.admin);

    const aminoWithoutAmdin = msgWithoutAdmin.toAmino();
    expect(aminoWithoutAmdin.value.admin).toEqual(msgWithoutAdmin.admin);
  });

  it('proto', () => {
    const protoWithAdmin = msgWithAdmin.toProto();
    expect(protoWithAdmin.admin).toEqual(msgWithAdmin.admin);

    const protoWithoutAmdin = msgWithoutAdmin.toProto();
    expect(protoWithoutAmdin.admin).toEqual('');
  });

  it('data', () => {
    const dataWithAdmin = msgWithAdmin.toData();
    expect(dataWithAdmin.admin).toEqual(msgWithAdmin.admin);

    const dataWithoutAmdin = msgWithoutAdmin.toData();
    expect(dataWithoutAmdin.admin).toEqual('');
  });
});
