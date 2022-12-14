import { createStackNavigator } from '@react-navigation/stack';

import ConvertScreen from './ConvertScreen';
import SelectCurrencyScreen from './SelectCurrencyScreen';

const Screens = {
  Convert: {
    name: 'Convert',
    component: ConvertScreen,
    screenOptions: {
      title: 'Exchange',
    },
  },
  SelectCurrencyScreen: {
    name: 'SelectCurrencyScreen',
    component: SelectCurrencyScreen,
    screenOptions: {
      title: 'Select Currency',
    },
  },
};

const Stack = createStackNavigator();

const ConvertScreenTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'card',
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: 'white',
        headerBackTitle: '',
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: 'normal',
        },
      }}>
      {Object.values(Screens).map((screen) => {
        return (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={screen.screenOptions}
          />
        );
      })}
      {/* <Stack.Screen name="SelectCurrencyScreen" component={SelectCurrencyScreen} /> */}
    </Stack.Navigator>
  );
};

export default ConvertScreenTab;
