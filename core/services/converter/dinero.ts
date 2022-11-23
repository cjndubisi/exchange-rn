import Dinero from 'dinero.js';

import { ExchangeFactory, ExchangeType } from '.';

type Currency = Parameters<typeof Dinero>[0]['currency'];
const makeExchange: ExchangeFactory['withClient'] = (client) => {
  const convert: ExchangeType['convert'] = async (req, fees) => {
    const from = Dinero({
      amount: Math.floor(req.amount * 100),
      currency: req.from as Currency,
      precision: 2,
    });

    const rates = await client.getRates(req.from).then((res) => {
      return {
        /// map to Dinero response type { rates: { EUR: 0.23, ... } }
        rates: {
          ...res.rates.reduce(
            (acc, next) => ({ ...acc, [next.destination]: next.rate }),
            {} as Record<string, number>
          ),
        },
      };
    });
    const result = await from.convert(req.to, {
      endpoint: Promise.resolve(rates),
    });
    const processing = fees?.processPercent ? fees.processPercent * 100 : 0;

    const withFees = from.add(from.percentage(Math.floor(processing)));
    return {
      request: req,
      price: result.toFormat('0.00'),
      plusFees: withFees.toFormat('0.00'),
    };
  };
  return {
    convert,
  };
};

const dineroConverter: ExchangeFactory = {
  withClient: makeExchange,
};

export default dineroConverter;
