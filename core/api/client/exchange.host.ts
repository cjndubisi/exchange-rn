import { ExchangeAPIClient, GetRateResponse, Rate } from '../client';

export interface EXHostGetRatesResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
  success: boolean;
}

const latestRates = async () => {
  const res = await fetch('https://api.exchangerate.host/latest');
  const body: EXHostGetRatesResponse = await res.json();
  return body;
};

const getRates = async (): Promise<GetRateResponse> => {
  const body = await latestRates();
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

const exhostClient: ExchangeAPIClient = {
  getRates,
};

export default exhostClient;
