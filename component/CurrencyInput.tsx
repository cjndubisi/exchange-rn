import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import React, { useState } from 'react';
import { Currency } from 'dinero.js';
import { NumericFormat } from 'react-number-format';

type CurrencyInputProp = {
  currency: Currency;
  onChangeCurrency?: () => void;
  onTextChange: (text: string) => void;
  value: string;
  disabled: boolean;
  style?: any;
  autoFocus?:boolean;
};

const Input = ({
  currency,
  onChangeCurrency,
  value,
  onTextChange,
  disabled,
  style,
  autoFocus
}: CurrencyInputProp) => {
  const [isFocused, setIsFocus] = useState(false);
  const handleFocus = () => setIsFocus(true);
  const handleBlur = () => setIsFocus(false);

  return (
    <View
      style={[styles.container, { borderColor: isFocused ? 'blue' : 'gray' }, style]}
      testID={`container-input-${currency}`}>
      <TouchableOpacity style={styles.currency} onPress={onChangeCurrency}>
        <View>
          <Text style={styles.currencyText}>{currency}</Text>
        </View>
      </TouchableOpacity>
      <NumericFormat
        value={value}
        displayType="text"
        thousandSeparator={true}
        decimalSeparator="."
        decimalScale={2}
        disabled={disabled}
        renderText={(newValue) => {
          if (value.endsWith('.') && !newValue.includes('.')) {
            newValue = value + '.';
          }

          return (
            <TextInput
              testID={`input-${currency}`}
              style={[styles.input]}
              value={newValue}
              editable={!disabled}
              onChangeText={(text) => onTextChange(text.replace(/,/g, ''))}
              onFocus={handleFocus}
              onBlur={handleBlur}
              keyboardType="numeric"
              autoFocus
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    color: 'red',
    height: 50,
    maxHeight: 50,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
  },
  currency: {
    flexShrink: 0,
    flexBasis: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 24,
    borderRightWidth: 1,
    minWidth: 80,
  },
  input: {
    textAlign: 'right',
    flex: 3,
    paddingHorizontal: 12,
    fontSize: 24,
    color: 'black',
  },
  currencyText: {
    fontSize: 18,
  },
});

export default Input;
