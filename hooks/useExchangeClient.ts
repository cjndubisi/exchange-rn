import { useQuery } from '@tanstack/react-query';
import { Currency } from 'dinero.js';
import { useState } from 'react';

import exhostClient from '../core/api/client';

// NOTE: This should be moved in a context should it be used in
// multiple screens. For now it's only used in ConvertScreen
export const useExchangeClient = (base: Currency) => {
  const [reqError, setRequestError] = useState<Error | null>(null);

  const {
    isLoading,
    data: rates,
    refetch: refetchRates,
  } = useQuery([base], () => exhostClient.getRates(base), {
    onError: (error: Error) => setRequestError(error),
  });

  const {
    isLoading: isFetchingCurrencies,
    data: currencies,
    refetch: refetchCurrency,
  } = useQuery([], () => exhostClient.getSupportedCurrencies(), {
    onError: (error: Error) => setRequestError(error),
  });

  return {
    client: exhostClient,
    rates,
    currencies,
    loadingExchange: isLoading || isFetchingCurrencies,
    exchangeError: reqError,
    retry: () => {
      setRequestError(null);
      refetchRates();
      refetchCurrency();
    },
  };
};

export default useExchangeClient;
