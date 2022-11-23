import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { ConvertScreenTab } from './screen';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
export default function App() {
  return (
    <NavigationContainer>
      <ConvertScreenTab />
    </NavigationContainer>
  );
}
