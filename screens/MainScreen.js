import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import strings from '../constants/strings';
import screens from '../constants/screens';
import AppButton from '../components/general/AppButton';
import DataService from '../services/DataService';
import RoundListItem from '../components/round/RoundListItem';

const MainScreen = props => {

    const [roundsList, setRoundsList] = useState([]);

    DataService.getRounds().then(result => {
        setRoundsList(result.reverse());
    })

    const roundListTouchHandler = (touchedRound) => {
        console.log(touchedRound);
    }

    return (
        <View style={styles.screen}>
            <View style={styles.halfWrapperTop}>
                <View style={styles.startButtonWrapper}>
                    <AppButton
                        title={strings.mainScreenStartButton}
                        onPress={() => props.changeScreen(screens.startEvent)}
                    />
                </View>
                <View style={styles.configurePointsButtonWrapper}>
                    <AppButton
                        title={strings.mainScreenConfigurePointsButton}
                        onPress={() => props.changeScreen(screens.configurePoints)}
                    />
                </View>
            </View>
            <View style={styles.halfWrapperBottom}>
                <Text style={styles.listTitle}>{strings.mainScreenListTitle}</Text>
                <ScrollView>
                    {roundsList.map(round => <RoundListItem key={round.UUID} round={round} onTouched={roundListTouchHandler} />)}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        padding: 30
    },
    halfWrapperTop: {
        height: '40%',
        width: '100%',
        justifyContent: 'center',
    },
    halfWrapperBottom: {
        height: '60%',
        width: '100%',
        justifyContent: 'center'
    },
    startButtonWrapper: {
        padding: 5
    },
    configurePointsButtonWrapper: {
        padding: 5
    },
    listTitle: {
        fontSize: 20,
        padding: 5,
        fontWeight: 'bold'
    }
});

export default MainScreen;