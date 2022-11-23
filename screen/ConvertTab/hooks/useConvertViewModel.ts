import { Currency } from 'dinero.js';
import { useEffect, useMemo, useState } from 'react';
import { useExchangeClient } from '.';
import exhostClient from '../../../core/api/client';
import dineroConverter from '../../../core/services/converter/dinero';
import useRouter from '../../../router';

const useConvertScreenViewModel = () => {
  const converter = dineroConverter.withClient(exhostClient);
  const [from, setFrom] = useState<Currency>('NGN');
  const [to, setTo] = useState<Currency>('USD');
  const [toValue, setToValue] = useState<string>('100');
  const [fromValue, setFromValue] = useState<string>('100');
  const { showSelectCurrency } = useRouter();
  const [loadingConversion, setLoadingConversion] = useState(false);
  const [clientBase, setClientBase] = useState<Currency>(from);
  const [focusBase, setFocusBase] = useState(from);
  const [totalCost, setTotalCost] = useState('100');
  const { rates, currencies, loadingExchange, exchangeError, retry } = useExchangeClient(
    exhostClient,
    from
  );

  const convert = (value: string, source: 'from' | 'to') => {
    const startConversion = async () => {
      const result = await converter.convert(
        {
          from: source === 'from' ? from : to,
          to: source === 'from' ? to : from,
          amount: floatValue,
        },
        { processPercent: 0.03 }
      );
      if (source === 'from') {
        setFromValue(value);
        setToValue(result.price);
      } else if (source === 'to') {
        setToValue(value);
        setFromValue(result.price);
      }
      setTotalCost(result.plusFees);
    };
    const convertionBase = source === 'from' ? from : to;
    if (convertionBase !== clientBase) {
      // setClientBase(convertionBase);
      return;
    }
    if (loadingExchange) {
      return;
    }
    const floatValue = parseFloat(value);
    if (isNaN(floatValue)) {
      console.log('failed to parse value', value, 'source', source, from);
      return;
    }
    try {
      startConversion();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    convert(fromValue, 'from');
  }, []);

  const updateFrom = () => {
    showSelectCurrency(currencies).then((currency) => {
      if (currency === to) {
        return;
      }
      setFrom(currency ?? from);
    });
  };

  const updateTo = () => {
    showSelectCurrency(currencies).then((currency) => {
      if (currency === from) {
        return;
      }
      setTo(currency ?? to);
    });
  };
  const currentRate = useMemo(
    () => rates?.rates.find((rate) => rate.destination === to),
    [to, from, rates]
  );
  return {
    currentRate: currentRate?.rate,
    transactionFee: 0.03,
    totalCost,
    focusBase,
    updateFrom,
    updateTo,
    fromValue,
    toValue,
    convert,
    fromCurrency: from,
    toCurrency: to,
  };
};

export default useConvertScreenViewModel;
