import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import strings from '../constants/strings';
import screens from '../constants/screens';
import AppButton from '../components/general/AppButton';
import DataService from '../services/DataService';
import RoundListItem from '../components/round/RoundListItem';
import UserFirstCreateComponent from '../components/users/UserFirstCreateComponent';
import RoundDetailsComponent from '../components/round/RoundDetailsComponent';

const MainScreen = props => {

    const [userSet, setUserSet] = useState(false);
    const [firstQuery, setFirstQuery] = useState(true);

    const [roundDetailsModal, setRoundDetailsModal] = useState(false);
    const [currentRound, setCurrentRound] = useState({});

    const userAddedHandler = () => {
        setUserSet(false);
    }

    if (firstQuery) {
        DataService.getUser().then(result => {
            if (result == null) {
                setUserSet(true);
            }
        })
        setFirstQuery(false);
    }

    const [roundsList, setRoundsList] = useState([]);

    DataService.getRounds().then(result => {
        setRoundsList(result.reverse());
    })

    const roundListTouchHandler = (touchedRound) => {
        setCurrentRound(touchedRound);
        setRoundDetailsModal(true);
    }

    const closeRoundDetailsHandler = () => {
        setRoundDetailsModal(false);
    }

    return (
        <View style={styles.screen}>
            <UserFirstCreateComponent visibleStatus={userSet} onAdded={userAddedHandler} />
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
                <RoundDetailsComponent
                    visible={roundDetailsModal}
                    onClose={closeRoundDetailsHandler}
                    round={currentRound}
                />
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