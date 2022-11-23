import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Currency } from 'dinero.js';
import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Button, Text, View } from 'react-native';

const SelectCurrencyScreen = ({
  navigation,
  route,
}: StackScreenProps<{ onSelect: (currency?: string) => void }>) => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        goBack(null);
        return false;
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

  return (
    <View>
      <Text>Testing Push </Text>
      <Button title={'Go Back'} onPress={(_e) => goBack(null)} />
    </View>
  );
};

export default SelectCurrencyScreen;
