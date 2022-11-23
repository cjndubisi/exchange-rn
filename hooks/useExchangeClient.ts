import { useQuery } from '@tanstack/react-query';
import { Currency } from 'dinero.js';
import { useEffect, useState } from 'react';

import exhostClient, { ExchangeCurrency, ExchangeRates } from '../core/api/client';

// NOTE: This should be moved in a context should it be used in
// multiple screens. For now it's only used in ConvertScreen
export const useExchangeClient = (base: Currency) => {
  const [rates, setRates] = useState<ExchangeRates>();
  const [currencies, setCurrencies] = useState<ExchangeCurrency[]>();
  const [reqError, setRequestError] = useState<Error | null>(null);
  const [retry, setRetry] = useState<boolean>(true);

  const { isLoading, error, data, refetch } = useQuery([base], () => exhostClient.getRates(base));

  useEffect(() => {
    if (!retry) {
      return;
    }
    const request = async () => {
      try {
        const currencies = await exhostClient.getSupportedCurrencies();
        setCurrencies(currencies);
        setRetry(false);
      } catch (error) {
        setRequestError(error);
      }
    };
    request();
  }, [retry, base]);
  useEffect(() => {
    setRates(data);
  }, [data, isLoading]);

  return {
    client: exhostClient,
    rates,
    currencies,
    loadingExchange: isLoading,
    exchangeError: reqError,
    retry: () => {
      setRequestError(null);
      setRetry(true);
      refetch();
    },
  };
};

export default useExchangeClient;
