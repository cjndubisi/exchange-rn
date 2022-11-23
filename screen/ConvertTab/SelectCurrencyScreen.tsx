import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Currency } from 'dinero.js';
import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Button, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ExchangeCurrency } from '../../core/api/client';

type SelectCurrencyRouteParams = {
  onSelect: (currency?: string) => void;
  currencies: ExchangeCurrency[];
};

const SelectCurrencyScreen = ({
  navigation,
  route,
}: StackScreenProps<SelectCurrencyRouteParams>) => {
  const currencies = (route.params as any)?.currencies ?? ([] as ExchangeCurrency[]);
  // Resolve Push Promise for getting selected data
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        goBack(null);
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [])
  );

  const goBack = (currency: Currency | null): void => {
    if (!navigation.canGoBack()) {
      return;
    }
    const params: any = route.params;
    params?.onSelect(currency);
    navigation.goBack();
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '5%',
        }}
      />
    );
  };

  return (
    <FlatList
      data={currencies}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.symbol}
          testID={`select-currency-${item.symbol}`}
          onPress={() => goBack(item.symbol)}>
          <View
            style={{
              flexDirection: 'row',
              padding: 16,
              alignItems: 'center',
            }}>
            <Text>{item.symbol} - </Text>
            <Text>{item.description}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.symbol}
      ItemSeparatorComponent={renderSeparator}
    />
  );
};

export default SelectCurrencyScreen;
