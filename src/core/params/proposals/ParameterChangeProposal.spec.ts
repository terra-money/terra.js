import { ParameterChangeProposal } from './ParameterChangeProposal';
import { ParamChanges } from '../../params/ParamChange';

const pcpJSON2: ParameterChangeProposal.Data = {
  type: 'params/ParameterChangeProposal',
  value: {
    title: 'testing params',
    description: 'yay!',
    changes: [
      {
        subspace: 'distribution',
        key: 'communitytax',
        value: '"123"',
      },
      {
        subspace: 'mint',
        key: 'InflationMax',
        value: '"0.001"',
      },
    ],
  },
};

describe('ParameterChangeProposal', () => {
  it('parses StdTx parameter change proposals', () => {
    ParameterChangeProposal.fromData(pcpJSON2);
  });

  it('parses parameter change proposals', () => {
    const p = new ParameterChangeProposal(
      'testing params',
      'yay!',
      ParamChanges.fromData([
        {
          subspace: 'distribution',
          key: 'communitytax',
          value: '"123"',
        },
        {
          subspace: 'mint',
          key: 'InflationMax',
          value: '"0.001"',
        },
      ])
    );

    expect(ParameterChangeProposal.fromData(p.toData())).toEqual(p); // check that serialization / deserialization is consistent
    // check that output is consistent with Jigu's
    expect(p.toData()).toMatchObject(pcpJSON2);
  });
});
