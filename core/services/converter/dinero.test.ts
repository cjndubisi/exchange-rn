import exhostClient from '../../api/client';
import { getRateSubResponse } from '../../api/client/exchange.host/fixture';
import { mockSuccesfulResponse } from '../../util/test-util';
import dineroConverter from './dinero';

describe('Dinero', () => {
  describe('with exchange client', () => {
    it('converts with exchange client', async (done) => {
      mockSuccesfulResponse(200, 'GET', getRateSubResponse);
      const converter = dineroConverter.withClient(exhostClient);
      try {
        const { price, plusFees } = await converter.convert({
          from: 'EUR',
          to: 'AMD',
          amount: 50,
        });
        expect(price).toEqual('20422.57');
        expect(plusFees).toEqual('50.0');
        done();
      } catch (error) {
        done(error);
      }
    });
    it('converts with fees', async (done) => {
      mockSuccesfulResponse(200, 'GET', getRateSubResponse);

      const converter = dineroConverter.withClient(exhostClient);
      const fees: Parameters<typeof converter.convert>[1] = {
        processPercent: 0.03,
      };

      try {
        const { price, plusFees } = await converter.convert(
          {
            from: 'EUR',
            to: 'AMD',
            amount: 50,
          },
          fees
        );

        expect(price).toEqual('20422.57');
        expect(plusFees).toEqual('51.50');
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
