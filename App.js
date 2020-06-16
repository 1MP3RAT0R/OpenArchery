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
import RoundScreen from './screens/round/RoundScreen';
import RoundStatisticsScreen from './screens/statistics/RoundStatisticsScreen';


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
  const [currentRound, setCurrentRound] = useState({});

  const startRound = (roundObj) => {
    setCurrentRound(roundObj);
    setCurrentView(screens.roundInProgess);
  }

  const showStatistics = (roundObj) => {
    setCurrentRound(roundObj);
    setCurrentView(screens.roundStatistics);
  }

  let content = <MainScreen changeScreen={setCurrentView} startRound={startRound} showStatistics={showStatistics} />;

  if (currentView == screens.startEvent) {
    content = <StartScreen changeScreen={setCurrentView} startRound={startRound} />;
  } else if (currentView == screens.configurePoints) {
    content = <ConfigurePointsScreen changeScreen={setCurrentView} />
  } else if (currentView == screens.addPointage) {
    content = <AddPointageScreen changeScreen={setCurrentView} />
  } else if (currentView == screens.userConfigs) {
    content = <UserScreen changeScreen={setCurrentView} />
  } else if (currentView == screens.roundInProgess) {
    content = <RoundScreen changeScreen={setCurrentView} round={currentRound} />
  } else if (currentView == screens.roundStatistics) {
    content = <RoundStatisticsScreen changeScreen={setCurrentView} round={currentRound} />
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
