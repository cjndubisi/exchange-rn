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
  const res = await fetch(
    `https://api.exchangerate.host/latest?base=${base}`,
    // cache api response as much as possible
    // TODO: Add cache expiration to 24hrs
    { cache: 'force-cache' }
  );
  const body: EXHostGetRatesResponse = await res.json();
  return body;
};

export const supportedCurrencies = async () => {
  const res = await fetch(
    'https://api.exchangerate.host/symbols',
    // cache api response as much as possible
    // TODO: Add cache expiration to 24hrs
    { cache: 'force-cache' }
  );
  const body: EXHostSupportCurreniesResponse = await res.json();
  return body;
};
