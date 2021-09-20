import { Plan } from './Plan';

describe('Plan', () => {
  it('deserializes', () => {
    const plan = Plan.fromAmino({
      name: `v0.5.2`,
      time: '2019-12-01T03:28:34.024363013Z',
      height: '5330001',
      info: 'testinfo',
      upgraded_client_state: 'deprecated',
    });

    expect(plan).toMatchObject({
      name: `v0.5.2`,
      time: new Date('2019-12-01T03:28:34.024363013Z'),
      height: '5330001',
      info: 'testinfo',
      upgraded_client_state: 'deprecated',
    });
  });
});
