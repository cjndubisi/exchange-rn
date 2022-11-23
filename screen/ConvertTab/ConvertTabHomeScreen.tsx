import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CurrencyInput from '../../component/CurrencyInput';
import useConvertScreenViewModel from './hooks/useConvertViewModel';

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
  } = useConvertScreenViewModel();

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
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
          <Text style={style.infoText}>Exhange Rate</Text>
          <Text style={style.infoText}>{currentRate}</Text>
        </View>
        <View style={style.infoRow}>
          <Text style={style.infoText}>Transcation Fee</Text>
          <Text style={style.infoText}>{currentRate}</Text>
        </View>
      </View>
      <TouchableOpacity style={style.buttonStyle}>
        <Text style={style.buttonTextStyle}>Convert</Text>
      </TouchableOpacity>
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
  },
  buttonStyle: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    color: 'blue',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default ConvertScreenHome;
