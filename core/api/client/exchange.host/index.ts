import { ExchangeAPIClient, ExchangeCurrency, ExchangeRates, Rate } from '../index.d';
import { latestRates, supportedCurrencies } from './api';

const getRates = async (base: string): Promise<ExchangeRates> => {
  const body = await latestRates(base);
  const rates = Object.entries(body.rates).map(([key, value]): Rate => {
    return {
      base: body.base,
      destination: key,
      rate: value,
    };
  });

  return {
    base: body.base,
    rates,
    timestamp: body.date,
  };
};

const getSupportedCurrencies = async (): Promise<ExchangeCurrency[]> => {
  const currencies = await supportedCurrencies();
  return Object.entries(currencies.symbols).map(([_, { code, description }]): ExchangeCurrency => {
    return {
      symbol: code,
      description,
    };
  });
};

const exhostClient: ExchangeAPIClient = {
  getRates,
  getSupportedCurrencies,
};

export default exhostClient;
