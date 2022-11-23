import { getSupportedCurreniesStubResponse, latestRatesByBase } from './fixture';

export interface EXHostGetRatesResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
  success: boolean;
}

export interface EXHostSupportCurreniesResponse {
  symbols: Record<string, { description: string; code: string }>;
  success: boolean;
}

export const latestRates = async (base: string) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(latestRatesByBase[base]);
    }, 500);
  });
};

export const supportedCurrencies = async () => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(getSupportedCurreniesStubResponse);
    }, 500);
  });
};
