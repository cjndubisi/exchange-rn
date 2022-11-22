import { getRateSubResponse } from '../../api/client/exchanage.host.fixture';
import exhostClient from '../../api/client/exchange.host';
import { mockSuccesfulResponse } from '../../util/test-util';
import dineroConverter from './dinero';

describe('Dinero', () => {
  it('converts with exchange client', async (done) => {
    mockSuccesfulResponse(200, 'GET', getRateSubResponse);
    const converter = dineroConverter.withExchange(exhostClient);
    try {
      const { result } = await converter.convert({
        from: 'EUR',
        to: 'AMD',
        amount: 50,
      });
      expect(result).toEqual('0.2042');
      done();
    } catch (error) {
      done(error);
    }
  });
});
