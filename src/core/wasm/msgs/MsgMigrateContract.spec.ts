import { MsgMigrateContract } from './MsgMigrateContract';
import { MsgMigrateContract as MsgMigrateContract_legacy_pb } from '@terra-money/legacy.proto/terra/wasm/v1beta1/tx';
import { MsgMigrateContract as MsgMigrateContract_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';

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
  it('legacy amino', () => {
    const aminoWithAdmin = msgWithAdmin.toAmino(true) as MsgMigrateContract.AminoV1;
    expect(aminoWithAdmin.value.admin).toEqual(msgWithAdmin.admin);

    const aminoWithMigrateString = msgWithMigrateString.toAmino(true) as MsgMigrateContract.AminoV1;
    expect(aminoWithMigrateString.value.migrate_msg).toEqual(
      msgWithMigrateString.migrate_msg
    );
  });

  it('legacy proto', () => {
    const protoWithAdmin = msgWithAdmin.toProto(true) as MsgMigrateContract_legacy_pb;
    expect(protoWithAdmin.admin).toEqual(msgWithAdmin.admin);

    const protoWithMigrateString = msgWithMigrateString.toProto(true) as MsgMigrateContract_legacy_pb;
    expect(protoWithMigrateString.migrateMsg.toString()).toEqual(
      JSON.stringify(msgWithMigrateString.migrate_msg)
    );
  });

  it('legacy data', () => {
    const dataWithAdmin = msgWithAdmin.toData(true) as MsgMigrateContract.DataV1;
    expect(dataWithAdmin.admin).toEqual(msgWithAdmin.admin);

    const dataWithMigrateString = msgWithMigrateString.toData(true) as MsgMigrateContract.DataV1;
    expect(dataWithMigrateString.migrate_msg).toEqual(
      msgWithMigrateString.migrate_msg
    );
  });


  it('amino', () => {
    const aminoWithAdmin = msgWithAdmin.toAmino(false) as MsgMigrateContract.AminoV2;
    expect(aminoWithAdmin.value.sender).toEqual(msgWithAdmin.admin);

    const aminoWithMigrateString = msgWithMigrateString.toAmino(false) as MsgMigrateContract.AminoV2;
    expect(aminoWithMigrateString.value.msg).toEqual(
      msgWithMigrateString.migrate_msg
    );
  });

  it('proto', () => {
    const protoWithAdmin = msgWithAdmin.toProto(false) as MsgMigrateContract_pb;
    expect(protoWithAdmin.sender).toEqual(msgWithAdmin.admin);

    const protoWithMigrateString = msgWithMigrateString.toProto(false) as MsgMigrateContract_pb;
    expect(protoWithMigrateString.msg.toString()).toEqual(
      JSON.stringify(msgWithMigrateString.migrate_msg)
    );
  });

  it('data', () => {
    const dataWithAdmin = msgWithAdmin.toData(false) as MsgMigrateContract.DataV2;
    expect(dataWithAdmin.sender).toEqual(msgWithAdmin.admin);

    const dataWithMigrateString = msgWithMigrateString.toData(false) as MsgMigrateContract.DataV2;
    expect(dataWithMigrateString.msg).toEqual(
      msgWithMigrateString.migrate_msg
    );
  });
});
