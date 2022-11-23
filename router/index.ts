import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Currency } from 'dinero.js';
import { useCallback } from 'react';

const useRouter = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const showSelectCurrency = useCallback(async () => {
    // show and dismiss currency option on select.
    return new Promise<Currency | null>((resolve, _reject) => {
      navigation.navigate('SelectCurrencyScreen', {
        onSelect: (currency?: Currency) => {
          resolve(currency);
        },
      });
    });
  }, []);

  return {
    showSelectCurrency,
  };
};

export default useRouter;
