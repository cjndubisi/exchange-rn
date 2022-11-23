export type Rate = {
  base: string;
  destination: string;
  rate: number;
};

export interface ExchangeAPIClient {
  getRates(base: string): Promise<ExchangeRates>;
  getSupportedCurrencies(): Promise<ExchangeCurrency[]>
}

export type ExchangeRates = {
  base: string;
  rates: Rate[];
  timestamp: string;
};

export type ExchangeCurrency = {
  symbol: string;
  description: string;
};
