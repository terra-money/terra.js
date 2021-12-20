import { MsgEditValidator } from './MsgEditValidator';
import MsgEditValidatorAmino from './MsgEditValidator.data.json';

describe('MsgEditValidator', () => {
  it('deserializes', () => {
    MsgEditValidatorAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'staking/MsgEditValidator') {
          const e = MsgEditValidator.fromAmino(msg);
          expect(e.toAmino()).toEqual(msg);
        }
      });
    });
  });
});
