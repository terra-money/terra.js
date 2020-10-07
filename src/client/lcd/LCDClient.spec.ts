import { LCDClient } from './LCDClient';

describe('LCDClient', () => {
  it('runs', async () => {
    new LCDClient({
      chainID: 'columbus-4',
      URL: 'https://lcd.terra.dev',
    });
  });
});
