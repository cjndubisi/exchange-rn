import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CurrencyInput from '../../component/CurrencyInput';
import useConvertScreenViewModel from './hooks/useConvertViewModel';
import { Fontisto } from '@expo/vector-icons';
import { Strings } from '../../resource';

const ConvertScreenHome = () => {
  const {
    currentRate,
    focusBase,
    updateFrom,
    updateTo,
    fromValue,
    toValue,
    convert,
    toCurrency,
    fromCurrency,
    totalCost,
    transactionFee,
  } = useConvertScreenViewModel();

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}>
      <View style={style.switchContainer}>
        <Text style={[style.switchStyle, { paddingRight: 4 }]}>{Strings.switch}</Text>
        <TouchableOpacity>
          <Fontisto
            style={[{ transform: [{ rotate: '90deg' }] }]}
            name="arrow-swap"
            size={18}
            color="blue"
          />
        </TouchableOpacity>
      </View>
      <View>
        <CurrencyInput
          currency={fromCurrency}
          disabled={fromCurrency !== focusBase}
          onChangeCurrency={updateFrom}
          onTextChange={(text) => convert(text, 'from')}
          value={fromValue}
        />
      </View>
      <CurrencyInput
        style={style.toCurrencyStyle}
        currency={toCurrency}
        disabled={toCurrency !== focusBase}
        onChangeCurrency={updateTo}
        onTextChange={(text) => convert(text, 'to')}
        value={toValue}
      />

      <View style={style.rateContainer}>
        <View style={style.infoRow}>
          <Text style={style.infoText}>{Strings.exchangeRate}</Text>
          <Text style={style.infoText}>{currentRate}</Text>
        </View>
        <View style={style.infoRow}>
          <Text style={style.infoText}>{Strings.transactionFee}</Text>
          <Text style={style.infoText}>{transactionFee}</Text>
        </View>
      </View>
      <View style={{ flex: 1, width: '100%' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={style.totalTextStyle}>{Strings.totalCost.toUpperCase()}</Text>
          <Text style={style.totalTextStyle}>
            {fromCurrency} {totalCost}
          </Text>
        </View>
        <TouchableOpacity style={style.buttonStyle}>
          <Text style={style.buttonTextStyle}>{Strings.exchange}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  toCurrencyStyle: {
    marginTop: 8,
  },
  rateContainer: {
    marginBottom: 12,
    marginTop: 12,
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '400',
  },
  buttonStyle: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    color: 'blue',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  switchStyle: {
    fontSize: 14,
    color: 'blue',
    fontWeight: '700',
  },
  switchContainer: {
    flex: 0,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
  totalTextStyle: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default ConvertScreenHome;
