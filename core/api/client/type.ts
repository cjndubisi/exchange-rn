export type Rate = {
  base: string;
  destination: string;
  rate: number;
};

export interface ExchangeAPIClient {
  getRates(): Promise<GetRateResponse>;
}

export type GetRateResponse = {
  base: string;
  rates: Rate[];
  timestamp: string;
};
