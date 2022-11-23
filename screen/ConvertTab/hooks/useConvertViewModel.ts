import { Currency } from 'dinero.js';
import { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import logger from '../../../core/logger';
import dineroConverter from '../../../core/services/converter/dinero';
import useExchangeClient from '../../../hooks/useExchangeClient';
import useRouter from '../../../router';

const showAlert = () =>
  Alert.alert(
    'Ops!',
    'Not yet Implemented 😏',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
    }
  );

const useConvertScreenViewModel = () => {
  const [from, setFrom] = useState<Currency>('NGN');
  const [to, setTo] = useState<Currency>('USD');
  const [toValue, setToValue] = useState<string>('100');
  const [fromValue, setFromValue] = useState<string>('100');
  const { showSelectCurrency } = useRouter();
  const [clientBase, setClientBase] = useState<Currency>(from);
  const [totalCost, setTotalCost] = useState('100');
  const { client, rates, currencies, loadingExchange, exchangeError, retry } =
    useExchangeClient(clientBase);

  const convert = (value: string, source: 'from' | 'to') => {
    const startConversion = async () => {
      const converter = dineroConverter.withClient(client);
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
      logger.log('reload');
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
      logger.log(error);
    }
  };

  const currentRate = useMemo(
    () => rates?.rates.find((rate) => rate.destination === to),
    [to, from, rates]
  );
  useEffect(() => {
    convert(fromValue, 'from');
  }, [clientBase, loadingExchange, currentRate?.rate]);

  const updateFrom = () => {
    showSelectCurrency(currencies).then((currency) => {
      if (currency === to) {
        return;
      }
      if (!currency) {
        return;
      }
      setFrom(currency ?? from);
      setToValue('0');
      setClientBase(currency);
    });
  };

  const updateTo = () => {
    showSelectCurrency(currencies).then((currency) => {
      if (currency === from) {
        return;
      }
      setTo(currency ?? to);
      setToValue('0');
    });
  };
  const switchBases = () => {
    setFrom(to);
    setTo(from);
    setClientBase(to);
  };

  return {
    currentRate: currentRate?.rate,
    transactionFee: '3%',
    totalCost,
    focusBase: clientBase,
    updateFrom,
    updateTo,
    fromValue,
    toValue,
    convert,
    fromCurrency: from,
    toCurrency: to,
    switchBases,
    onExchange: showAlert,
  };
};

export default useConvertScreenViewModel;
