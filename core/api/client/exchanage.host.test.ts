import { mockSuccesfulResponse } from '../../util/test-util';
import { getRateSubResponse } from './exchanage.host.fixture';
import exhostClient from './exchange.host';

describe('Exchange.Host API', () => {
  it('get rates', async (done) => {
    mockSuccesfulResponse(200, 'GET', getRateSubResponse);
    const rates = await exhostClient.getRates();
    const rateKeys = Object.keys(getRateSubResponse.rates);
    expect(rates.rates.length).toEqual(Object.keys(getRateSubResponse.rates).length);
    expect(rateKeys.join(',')).toEqual(rates.rates.map((rate) => rate.destination).join(','));
    done();
  });
});
