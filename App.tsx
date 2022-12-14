import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LogBox } from 'react-native';

import { ConvertScreenTab } from './screen';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <ConvertScreenTab />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
