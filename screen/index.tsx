import ConvertScreenTab from './ConvertTab';
import HomeScreen from './home';
import { Fontisto, Entypo, Ionicons } from '@expo/vector-icons';
import WalletScreen from './wallet';

const Screens = {
  Home: {
    component: HomeScreen,
    name: 'Home',
    tabIcon: (color: string, size: number) => <Entypo name="home" size={size} color={color} />,
  },
  ConvertTab: {
    component: ConvertScreenTab,
    name: 'ConvertTab',
    tabIcon: (color: string, size: number) => <Fontisto name="dollar" size={size} color={color} />,
  },
  Wallet: {
    component: WalletScreen,
    name: 'Wallet',
    tabIcon: (color: string, size: number) => <Entypo name="home" size={size} color={color} />,
  },
};

export default Screens;
