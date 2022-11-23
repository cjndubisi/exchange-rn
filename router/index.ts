import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Currency } from 'dinero.js';
import { useCallback } from 'react';
import { ExchangeCurrency } from '../core/api/client';

const useRouter = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const showSelectCurrency = async (currencies: ExchangeCurrency[]) => {
    // show and dismiss currency option on select.
    return new Promise<Currency | null>((resolve, _reject) => {
      navigation.navigate('SelectCurrencyScreen', {
        currencies,
        onSelect: (currency?: Currency) => {
          resolve(currency);
        },
      });
    });
  };
  return {
    showSelectCurrency,
  };
};

export default useRouter;
