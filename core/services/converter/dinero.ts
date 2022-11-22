import Dinero from 'dinero.js';
import { ConverterCreator } from '.';
import { Converter } from '../../type';

const makeConverter: ConverterCreator['withExchange'] = (client) => {
  const convert = async (req: Converter.Request) => {
    const result = await Dinero({
      amount: req.amount,
      currency: req.from as Parameters<typeof Dinero>[0]['currency'],
      precision: 5,
    }).convert(req.to, {
      endpoint: client.getRates().then((res) => {
        return {
          /// map to Dinero response type { rates: { EUR: 0.23, ... } }
          rates: {
            ...res.rates.reduce(
              (acc, next) => ({ ...acc, [next.destination]: next.rate }),
              {} as Record<string, number>
            ),
          },
        };
      }),
    });
    return {
      request: req,
      result: result.toFormat('0.0000'),
    };
  };
  return {
    convert,
  };
};

const dineroConverter: ConverterCreator = {
  withExchange: makeConverter,
};

export default dineroConverter;
