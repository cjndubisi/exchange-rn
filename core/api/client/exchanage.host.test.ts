import rateClient from '.';
import { mockSuccesfulResponse } from '../../util/test-util';
import { getRateSubResponse, getSupportedCurreniesStubResponse } from './exchange.host/fixture';

describe('Exchange.Host API', () => {
  it('get rates', async () => {
    mockSuccesfulResponse(200, 'GET', getRateSubResponse);

    const rates = await rateClient.getRates('NGN');
    const rateKeys = Object.keys(getRateSubResponse.rates);

    expect(rates.rates.length).toEqual(Object.keys(getRateSubResponse.rates).length);
    expect(rateKeys.join(',')).toEqual(rates.rates.map((rate) => rate.destination).join(','));
  });

  it('get supported supported currencies', async () => {
    mockSuccesfulResponse(200, 'GET', getSupportedCurreniesStubResponse);
    const currencies = await rateClient.getSupportedCurrencies();
    const symbols = Object.keys(getSupportedCurreniesStubResponse.symbols);
    expect(currencies.length).toEqual(
      Object.keys(getSupportedCurreniesStubResponse.symbols).length
    );
    expect(symbols.join(',')).toEqual(currencies.map((cur) => cur.symbol).join(','));
  });
});
