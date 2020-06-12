import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import initialData from './data/initialData';
import DataService from './services/DataService';

import screens from './constants/screens';
import MainScreen from './screens/MainScreen';
import StartScreen from './screens/round/StartScreen';
import ConfigurePointsScreen from './screens/pointage/ConfigurePointsScreen';
import AsyncStorage from '@react-native-community/async-storage';
import AddPointageScreen from './screens/pointage/AddPointageScreen';
import UserScreen from './screens/users/UserScreen';


export default function App() {

  const [firstExec, setFirstExec] = useState(true);

  if (firstExec) {
    //AsyncStorage.clear();

    DataService.getPointages().then(result => {
      if (result.length == 0) {
        DataService.addPointages(initialData.pointages);
      }
    });
    setFirstExec(false);
  }

  const [currentView, setCurrentView] = useState(screens.main);

  let content = <MainScreen changeScreen={setCurrentView} />;

  if (currentView == screens.startEvent) {
    content = <StartScreen changeScreen={setCurrentView} />;
  } else if (currentView == screens.configurePoints) {
    content = <ConfigurePointsScreen changeScreen={setCurrentView} />
  } else if (currentView == screens.addPointage) {
    content = <AddPointageScreen changeScreen={setCurrentView} />
  } else if (currentView == screens.userConfigs) {
    content = <UserScreen changeScreen={setCurrentView} />
  }

  return (
    <View style={styles.screen}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%'
  }
});
