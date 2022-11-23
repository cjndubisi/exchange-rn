import { NativeScreenProps, createStackNavigator } from '@react-navigation/stack';
import SelectCurrencyScreen from './SelectCurrencyScreen';
import ConvertScreenHome from './ConvertTabHomeScreen';

const Stack = createStackNavigator();

const ConvertScreenTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'card',
        gestureEnabled: true,
      }}>
      <Stack.Screen name="Convert" component={ConvertScreenHome} />
      <Stack.Screen name="SelectCurrencyScreen" component={SelectCurrencyScreen} />
    </Stack.Navigator>
  );
};

export default ConvertScreenTab;
