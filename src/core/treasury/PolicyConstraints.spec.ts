import { PolicyConstraints } from './PolicyConstraints';
import { Coin } from '../Coin';
import { Dec } from '../numeric';

describe('PolicyConstraints', () => {
  it('clamp', () => {
    const pc = new PolicyConstraints(
      Dec.withPrec(5, 4),
      Dec.withPrec(1, 2),
      new Coin('usdr', 1),
      Dec.withPrec(25, 5)
    );

    const tr = Dec.withPrec(1, 3);

    let prevRate = tr;
    let newRate = prevRate.add(pc.change_rate_max.mul(2));
    let clampedRate = pc.clamp(prevRate, newRate);
    expect(prevRate.add(pc.change_rate_max)).toEqual(clampedRate);

    prevRate = tr;
    newRate = prevRate.sub(pc.change_rate_max.mul(2));
    clampedRate = pc.clamp(prevRate, newRate);
    expect(prevRate.sub(pc.change_rate_max)).toEqual(clampedRate);

    prevRate = pc.rate_max;
    newRate = prevRate.add(Dec.withPrec(1, 3));
    clampedRate = pc.clamp(prevRate, newRate);
    expect(pc.rate_max).toEqual(clampedRate);

    prevRate = pc.rate_min;
    newRate = pc.rate_min.sub(Dec.withPrec(1, 3));
    clampedRate = pc.clamp(prevRate, newRate);
    expect(pc.rate_min).toEqual(clampedRate);
  });
});
