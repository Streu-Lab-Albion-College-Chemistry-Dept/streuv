import React from 'react';
import ProfileCard from '../components/ProfileCard';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import HeaderMenuBar from '../components/ui/HeaderBar';
import MainContent from '../components/ui/MainContent';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigationRef = createNavigationContainerRef()

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer ref={navigationRef}>
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <HeaderMenuBar />

      <View style={styles.main}>
        {/* <View style={styles.left}>
          <ProfileCard CurrentUser='Daniel Shunom'/>
        </View> */}

        <MainContent />
      </View>

    </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    padding: 8,
  },

  left: {
    flexDirection: 'column',
    gap: 8,
  },

});

export default App;
