import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import strings from '../constants/strings';
import screens from '../constants/screens';
import sizes from '../constants/sizes';
import AppButton from '../components/general/AppButton';
import DataService from '../services/DataService';
import RoundListItem from '../components/round/RoundListItem';
import UserFirstCreateComponent from '../components/users/UserFirstCreateComponent';
import RoundDetailsComponent from '../components/round/RoundDetailsComponent';
import AppButtonSuccess from '../components/general/AppButtonSuccess';

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

    const startRound = (round) => {
        props.startRound(JSON.parse(JSON.stringify(round)));
    }

    const changeToStatistics = (round) => {
        props.showStatistics(JSON.parse(JSON.stringify(round)));
    }

    return (
        <View style={styles.screen}>
            <UserFirstCreateComponent visibleStatus={userSet} onAdded={userAddedHandler} />
            <View style={styles.halfWrapperTop}>
                <View style={styles.startButtonWrapper}>
                    <AppButtonSuccess
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
                <View style={styles.configureUsersButtonWrapper}>
                    <AppButton
                        title={strings.mainScreenConfigureShootersButton}
                        onPress={() => props.changeScreen(screens.userConfigs)}
                    />
                </View>
            </View>
            <View style={styles.halfWrapperBottom}>
                <RoundDetailsComponent
                    visible={roundDetailsModal}
                    onClose={closeRoundDetailsHandler}
                    round={currentRound}
                    onContinueRound={startRound}
                    changeToStatistics={changeToStatistics}
                />
                <Text style={styles.listTitle}>{strings.mainScreenListTitle}</Text>
                <View style={styles.roundListWrapper}>
                    <ScrollView>
                        {roundsList.map(round => <RoundListItem key={round.UUID} round={round} onTouched={roundListTouchHandler} />)}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    halfWrapperTop: {
        height: '40%',
        width: '100%',
        justifyContent: 'center',
        padding: 20
    },
    halfWrapperBottom: {
        flex: 1,
        width: '100%',
        justifyContent: 'center'
    },
    startButtonWrapper: {
        paddingTop: 5,
        paddingBottom: 5
    },
    configurePointsButtonWrapper: {
        paddingTop: 5,
        paddingBottom: 5
    },
    configureUsersButtonWrapper: {
        paddingTop: 5,
        paddingBottom: 5
    },
    listTitle: {
        fontSize: sizes.fonts.large,
        paddingLeft: 20,
        padding: 10,
        fontWeight: 'bold'
    },
    roundListWrapper: {
        flex: 1,
        paddingBottom: 20
    }
});

export default MainScreen;