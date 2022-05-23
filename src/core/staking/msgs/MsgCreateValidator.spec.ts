import { MsgCreateValidator } from './MsgCreateValidator';
import { Validator } from '../Validator';
const MsgCreateValidatorAmino = require('./MsgCreateValidator.data.json');

describe('MsgCreateValidator', () => {
  it('legacy deserialize', () => {
    MsgCreateValidatorAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'staking/MsgCreateValidator') {
          const e = MsgCreateValidator.fromAmino(msg);
          expect(e.toAmino(true)).toEqual(msg);
        }
      });
    });
  });

  it('deserialize amino', () => {
    const description: Validator.Description.Amino = {
      moniker: 'test',
      website: 'test',
      identity: 'test',
      details: 'test',
      security_contact: 'test',
    };
    const send = MsgCreateValidator.fromAmino({
      type: 'cosmos-sdk/MsgCreateValidator',
      value: {
        description: Validator.Description.fromAmino(description),
        commission: {
          rate: '0.100000000000000000',
          max_rate: '0.200000000000000000',
          max_change_rate: '0.010000000000000000',
        },
        min_self_delegation: '1',
        delegator_address: 'terra1r2kcrnsq8jfu5zyeyqygrj80x6chf82ae50ed5',
        validator_address:
          'terravaloper1r2kcrnsq8jfu5zyeyqygrj80x6chf82aemrya8',
        pubkey: {
          type: 'tendermint/PubKeyEd25519',
          value: 'b8RizVY2WHFTHLU/8HVaJApMAw5bhvdNuJtXPVAS5LA=',
        },
        value: {
          denom: 'uluna',
          amount: '10000000',
        },
      },
    });

    expect(send.toAmino()).toMatchObject({
      type: 'cosmos-sdk/MsgCreateValidator',
      value: {
        description: Validator.Description.fromAmino(description),
        commission: {
          rate: '0.100000000000000000',
          max_rate: '0.200000000000000000',
          max_change_rate: '0.010000000000000000',
        },
        min_self_delegation: '1',
        delegator_address: 'terra1r2kcrnsq8jfu5zyeyqygrj80x6chf82ae50ed5',
        validator_address:
          'terravaloper1r2kcrnsq8jfu5zyeyqygrj80x6chf82aemrya8',
        pubkey: {
          type: 'tendermint/PubKeyEd25519',
          value: 'b8RizVY2WHFTHLU/8HVaJApMAw5bhvdNuJtXPVAS5LA=',
        },
        value: {
          denom: 'uluna',
          amount: '10000000',
        },
      },
    });
  });
});
