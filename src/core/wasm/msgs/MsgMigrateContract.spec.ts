import { MsgMigrateContract } from './MsgMigrateContract';

const msgWithAdmin = new MsgMigrateContract(
  'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  2,
  { count: 0 }
);

const msgWithMigrateString = new MsgMigrateContract(
  'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  2,
  'migrate_msg_as_string'
);

describe('MsgMigrateContract', () => {
  it('amino', () => {
    const aminoWithAdmin = msgWithAdmin.toAmino();
    expect(aminoWithAdmin.value.admin).toEqual(msgWithAdmin.admin);

    const aminoWithMigrateString = msgWithMigrateString.toAmino();
    expect(aminoWithMigrateString.value.migrate_msg).toEqual(
      msgWithMigrateString.migrate_msg
    );
  });

  it('proto', () => {
    const protoWithAdmin = msgWithAdmin.toProto();
    expect(protoWithAdmin.admin).toEqual(msgWithAdmin.admin);

    const protoWithMigrateString = msgWithMigrateString.toProto();
    expect(protoWithMigrateString.migrateMsg.toString()).toEqual(
      JSON.stringify(msgWithMigrateString.migrate_msg)
    );
  });

  it('data', () => {
    const dataWithAdmin = msgWithAdmin.toData();
    expect(dataWithAdmin.admin).toEqual(msgWithAdmin.admin);

    const dataWithMigrateString = msgWithMigrateString.toData();
    expect(dataWithMigrateString.migrate_msg).toEqual(
      msgWithMigrateString.migrate_msg
    );
  });
});
