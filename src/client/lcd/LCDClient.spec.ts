import { LCDClient } from './LCDClient';

describe('LCDClient', () => {
  it('runs', async () => {
    const terra = new LCDClient({
      chainID: 'columbus-3',
      URL: 'https://lcd.terra.dev',
    });
  });
});
