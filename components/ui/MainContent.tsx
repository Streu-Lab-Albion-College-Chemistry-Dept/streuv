import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  View,
  StyleSheet,
} from 'react-native'
import TabButton from '../TabButton'
import DashBoard from './DashBoard/DashBoard'
import ExperimentSetup from './ExperimentSetup'

type MainStackParamList = {
  Dashboard: undefined;
  ExperimentSetup: undefined;
};

const Stack = createStackNavigator<MainStackParamList>()
export default function MainContent(): React.JSX.Element {
  const navigator = useNavigation<NavigationProp<MainStackParamList>>()
  const navigateTo = (path: string) => {
    navigator.navigate(path as typeof navigator.navigate.arguments)
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.tabTray}>
        <TabButton title='Demo' action={() => navigateTo('Dashboard')}/>
        <TabButton title='Test' action={() => navigateTo('ExperimentSetup')}/>
      </View>

      <View style={styles.maincontent}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Dashboard' component={DashBoard}/>
          <Stack.Screen name='ExperimentSetup' component={ExperimentSetup}/>
        </Stack.Navigator>
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 8,
  },

  tabTray: {
    flexDirection: 'row',
    gap: 4,
  },

  maincontent: {
    flex: 1,
    borderRadius: 6,
  }

})
