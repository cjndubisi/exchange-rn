import { Currency } from 'dinero.js';
import { useEffect, useState } from 'react';
import exhostClient, {
  ExchangeAPIClient,
  ExchangeCurrency,
  ExchangeRates,
} from '../../../core/api/client';
import dineroConverter from '../../../core/services/converter/dinero';
import useRouter from '../../../router';

// NOTE: This should be moved in a context should it be used in
// multiple screens. For now it's only used in ConvertTab
export const useExchangeClient = (client: ExchangeAPIClient, base: Currency) => {
  const [currentBase, setCurrentBase] = useState(base);
  const [rates, setRates] = useState<ExchangeRates>();
  const [currencies, setCurrencies] = useState<ExchangeCurrency[]>();
  const [loading, setLoading] = useState(false);
  const [reqError, setRequestError] = useState<Error | null>(null);
  const [retry, setRetry] = useState<boolean>(true);

  useEffect(() => {
    if (!retry && base === currentBase) {
      return;
    }
    const request = async () => {
      try {
        setLoading(true);
        const [rates, currencies] = await Promise.all([
          client.getRates(base),
          client.getSupportedCurrencies(),
        ]);
        setRates(rates);
        setCurrencies(currencies);
        setCurrentBase(base);
        setRetry(false);
      } catch (error) {
        setRequestError(error);
      } finally {
        setLoading(false);
      }
    };
    request();
  }, [retry, base]);

  return {
    rates,
    currencies,
    loadingExchange: loading,
    exchangeError: reqError,
    retry: () => {
      setRequestError(null);
      setRetry(true);
    },
  };
};

