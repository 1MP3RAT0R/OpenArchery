import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import roundStates from '../../constants/roundStates';
import strings from '../../constants/strings';
import screens from '../../constants/screens';
import AppButton from '../../components/general/AppButton';
import DataService from '../../services/DataService';
import AppButtonSuccess from '../../components/general/AppButtonSuccess';
import colors from '../../constants/colors';
import AppButtonDeny from '../../components/general/AppButtonDeny';
import AbortConfirmationComponent from '../../components/round/AbortConfirmationComponent';
import sizes from '../../constants/sizes';

const RoundScreen = props => {

    const [roundData, setRoundData] = useState({});
    const [currentTargetNumber, setCurrentTargetNumber] = useState(0);
    const [firstExecute, setFirstExecute] = useState(true);
    const [selectedShooter, setSelectedShooter] = useState(' ')
    const [previousTargetNumberShow, setPreviousTargetNumberShow] = useState(' ');
    const [currentTargetNumberShow, setCurrentTargetNumberShow] = useState(' ');
    const [nextTargetNumberShow, setNextTargetNumberShow] = useState(' ');
    const [shootersGerneralArray, setShootersGeneralArray] = useState([]);
    const [abortConfirmationModal, setAbortConfirmationModal] = useState(false);

    const hideAbortConfirmationHandler = () => {
        setAbortConfirmationModal(false);
    }

    const showAbortConfirmationHandler = () => {
        setAbortConfirmationModal(true);
    }

    const saveRoundData = () => {
        return DataService.updateRound(roundData);
    }

    const changeToTargetNumber = (number) => {
        setCurrentTargetNumber(number);
        if (number == 1) {
            setPreviousTargetNumberShow(' ');
        } else {
            setPreviousTargetNumberShow(number - 1)
        }
        setCurrentTargetNumberShow(number)
        if (number == props.round.targetCount) {
            setNextTargetNumberShow(' ');
        } else {
            setNextTargetNumberShow(number + 1);
        }
    }

    const navigateToPreviousRound = () => {
        if (currentTargetNumber !== 1) {
            changeToTargetNumber(currentTargetNumber - 1);
            setSelectedShooter(props.round.shooters[0].UUID);
        }
    }

    const navigateToNextRound = () => {
        if (currentTargetNumber !== props.round.targetCount) {
            changeToTargetNumber(currentTargetNumber + 1);
            setSelectedShooter(props.round.shooters[0].UUID);
        }
    }

    const abortRound = () => {
        hideAbortConfirmationHandler()
        let tmpRound = roundData;
        tmpRound.status = roundStates.aborted;
        setRoundData(tmpRound);
        saveRoundData().then(resut => props.changeScreen(screens.main));
    }

    const endRound = () => {
        let tmpRound = roundData;

        let dateObj = new Date();
        let date = dateObj.getDate();
        let month = dateObj.getMonth() + 1;
        let year = dateObj.getFullYear();
        let hours = dateObj.getHours();
        let min = dateObj.getMinutes();
        let sec = dateObj.getSeconds();

        let timeArray = tmpRound.timestamp.split(' ')[1].split(':');
        let durHours = hours - timeArray[0];
        let durMin = min - timeArray[1];
        let durSec = sec - timeArray[2];
        tmpRound.duration = durHours + ":" + durMin + ":" + durSec

        tmpRound.status = roundStates.done;
        setRoundData(tmpRound);
        saveRoundData().then(resut => props.changeScreen(screens.main));
    }

    const pauseRound = () => {
        saveRoundData().then(resut => props.changeScreen(screens.main));
    }

    const changeSelectedUser = (UUID) => {
        setSelectedShooter(UUID)
    }

    const pointageWasShot = (arrow, zone) => {
        if (roundData.targets) {
            let shotsArray = roundData.targets.find(target => target.number == currentTargetNumber).hits.find(shooter => shooter.shooter === selectedShooter).shots;
            for (let x = 0; x < shotsArray.length; x++) {
                if (shotsArray[x].arrow == arrow && shotsArray[x].zone == zone) {
                    return true;
                }
            }
        }
        return false;
    }

    const goToNextUserOrScreen = (tmpRoundData) => {
        setTimeout(() => {
            let shotShooters = tmpRoundData.targets.find(target => target.number == currentTargetNumber).hits;
            for (let i = 0; i < shotShooters.length; i++) {
                if (!shotShooters[i].completed) {
                    changeSelectedUser(shotShooters[i].shooter);
                    return;
                }
            }
            if (!tmpRoundData.targets.find(target => target.number == currentTargetNumber).completed) {
                let tmpRound = JSON.parse(JSON.stringify(tmpRoundData));
                tmpRound.targets.find(target => target.number == currentTargetNumber).completed = true;
                tmpRound.completed += 1;
                setRoundData(JSON.parse(JSON.stringify(tmpRound)));
                saveRoundData();
            }
            navigateToNextRound();
        }, 300);
    }

    const shooterTargetComplete = (shotsArray) => {
        if (roundData.targets) {
            if (roundData.pointage.firstHitCounts) {
                if (shotsArray.length === 1) {
                    return true;
                }
            } else {
                if (shotsArray.length === roundData.pointage.arrows) {
                    return true;
                }
            }
        }
        return false;
    }

    const pointageClick = (arrow, zone, value) => {
        if (roundData.targets) {
            if (props.round.pointage.firstHitCounts) {
                let tmpShotArray = roundData.targets.find(target => target.number == currentTargetNumber).hits.find(shooter => shooter.shooter === selectedShooter).shots;
                if (tmpShotArray.length == 0) {
                    let tmpRound = JSON.parse(JSON.stringify(roundData));
                    tmpRound.targets.find(target => target.number == currentTargetNumber).hits.find(shooter => shooter.shooter === selectedShooter).shots.push({
                        arrow: arrow,
                        zone: zone,
                        points: value
                    });
                    tmpRound.shooters.find(shooter => shooter.UUID === selectedShooter).pointSum += value;
                    setShootersGeneralArray(tmpRound.shooters);
                    let completedFlag = (shooterTargetComplete(JSON.parse(JSON.stringify(tmpRound.targets.find(target => target.number == currentTargetNumber).hits.find(shooter => shooter.shooter === selectedShooter).shots))));
                    tmpRound.targets.find(target => target.number == currentTargetNumber).hits.find(shooter => shooter.shooter === selectedShooter).completed = completedFlag;
                    setRoundData(JSON.parse(JSON.stringify(tmpRound)));
                    if (completedFlag) {
                        goToNextUserOrScreen(JSON.parse(JSON.stringify(tmpRound)));
                    }
                }
            } else {
                let tmpShotArray = roundData.targets.find(target => target.number == currentTargetNumber).hits.find(shooter => shooter.shooter === selectedShooter).shots;
                if (typeof (tmpShotArray.find(shot => shot.arrow == arrow)) === 'undefined') {
                    let tmpRound = JSON.parse(JSON.stringify(roundData));
                    tmpRound.targets.find(target => target.number == currentTargetNumber).hits.find(shooter => shooter.shooter === selectedShooter).shots.push({
                        arrow: arrow,
                        zone: zone,
                        points: value
                    });
                    tmpRound.shooters.find(shooter => shooter.UUID === selectedShooter).pointSum += value;
                    setShootersGeneralArray(tmpRound.shooters);
                    let completedFlag = (shooterTargetComplete(JSON.parse(JSON.stringify(tmpRound.targets.find(target => target.number == currentTargetNumber).hits.find(shooter => shooter.shooter === selectedShooter).shots))));
                    tmpRound.targets.find(target => target.number == currentTargetNumber).hits.find(shooter => shooter.shooter === selectedShooter).completed = completedFlag;
                    setRoundData(JSON.parse(JSON.stringify(tmpRound)));
                    if (completedFlag) {
                        goToNextUserOrScreen(JSON.parse(JSON.stringify(tmpRound)));
                    }
                }
            }
            saveRoundData();
        }
    }

    const pointageHold = (arrow, zone, value) => {
        if (roundData.targets) {
            let tmpRound = JSON.parse(JSON.stringify(roundData));
            if (props.round.pointage.firstHitCounts) {
                let oldValue = tmpRound.targets.find(target => target.number == currentTargetNumber).hits.find(shooter => shooter.shooter === selectedShooter).shots[0].points;
                tmpRound.shooters.find(shooter => shooter.UUID === selectedShooter).pointSum = tmpRound.shooters.find(shooter => shooter.UUID === selectedShooter).pointSum - oldValue;
                tmpRound.targets.find(target => target.number == currentTargetNumber).hits.find(shooter => shooter.shooter === selectedShooter).shots = [{
                    arrow: arrow,
                    zone: zone,
                    points: value
                }];
                tmpRound.shooters.find(shooter => shooter.UUID === selectedShooter).pointSum += value;
                setShootersGeneralArray(tmpRound.shooters);
                let completedFlag = shooterTargetComplete(JSON.parse(JSON.stringify(tmpRound.targets.find(target => target.number == currentTargetNumber).hits.find(shooter => shooter.shooter === selectedShooter).shots)));
                tmpRound.targets.find(target => target.number == currentTargetNumber).hits.find(shooter => shooter.shooter === selectedShooter).completed = completedFlag;
                setRoundData(JSON.parse(JSON.stringify(tmpRound)));
                if (completedFlag) {
                    goToNextUserOrScreen(JSON.parse(JSON.stringify(tmpRound)));
                }
            } else {
                let oldValue = 0;
                let tmpShots = tmpRound.targets.find(target => target.number == currentTargetNumber).hits.find(shooter => shooter.shooter === selectedShooter).shots;
                let newShots = [];
                for (let ts = 0; ts < tmpShots.length; ts++) {
                    if (tmpShots[ts].arrow === arrow) {
                        oldValue = tmpShots[ts].points;
                    } else {
                        newShots.push(tmpShots[ts]);
                    }
                }
                tmpRound.shooters.find(shooter => shooter.UUID === selectedShooter).pointSum = tmpRound.shooters.find(shooter => shooter.UUID === selectedShooter).pointSum - oldValue;
                tmpRound.targets.find(target => target.number == currentTargetNumber).hits.find(shooter => shooter.shooter === selectedShooter).shots = newShots;
                tmpRound.targets.find(target => target.number == currentTargetNumber).hits.find(shooter => shooter.shooter === selectedShooter).shots.push({
                    arrow: arrow,
                    zone: zone,
                    points: value
                })
                tmpRound.shooters.find(shooter => shooter.UUID === selectedShooter).pointSum += value;
                setShootersGeneralArray(tmpRound.shooters);
                let completedFlag = (shooterTargetComplete(JSON.parse(JSON.stringify(tmpRound.targets.find(target => target.number == currentTargetNumber).hits.find(shooter => shooter.shooter === selectedShooter).shots))));
                tmpRound.targets.find(target => target.number == currentTargetNumber).hits.find(shooter => shooter.shooter === selectedShooter).completed = completedFlag;
                setRoundData(JSON.parse(JSON.stringify(tmpRound)));
                if (completedFlag) {
                    goToNextUserOrScreen(JSON.parse(JSON.stringify(tmpRound)));
                }
            }
            saveRoundData();
        }
    }

    if (firstExecute) {
        setRoundData(props.round);
        if (props.round.completed < props.round.targetCount) {
            changeToTargetNumber(props.round.completed + 1);
        } else {
            changeToTargetNumber(props.round.completed);
        }
        setSelectedShooter(props.round.shooters[0].UUID);
        setShootersGeneralArray(props.round.shooters);
        setFirstExecute(false);
    }

    let shooterList = (
        <View></View>
    );

    let hitSelector = (
        <View></View>
    );

    let headerButtons = (
        <View style={styles.headerRow}>
            <View style={styles.headerButtonWrapper}>
                <AppButtonDeny
                    title={strings.abortRunningRound}
                    onPress={showAbortConfirmationHandler}
                />
            </View>
            <View style={styles.headerButtonWrapper}>
                <AppButtonSuccess
                    title={strings.pauseRunningRound}
                    onPress={pauseRound}
                />
            </View>
        </View>
    );

    if (props.round) {
        if (roundData.completed == roundData.targetCount) {
            headerButtons = (
                <View style={styles.headerRow}>
                    <View style={styles.headerButtonWrapper}>
                        <AppButtonSuccess
                            title={strings.markRoundDoneButton}
                            onPress={endRound}
                        />
                    </View>
                </View>
            );
        }

        shooterList = shootersGerneralArray.map(shooter => (
            <View key={shooter.UUID} style={styles.shooterOuterWrapper}>
                <TouchableOpacity
                    onPress={() => changeSelectedUser(shooter.UUID)}
                    activeOpacity={0.9}
                >
                    <View style={[styles.shooterWrapper, shooter.UUID == selectedShooter ? styles.selectedShooter : {}]}>
                        <Text style={styles.shooterTag}>{shooter.name}</Text>
                        <Image
                            style={[styles.completeCheckBasic, roundData.targets.find(target => target.number == currentTargetNumber).hits.find(shooterObj => shooterObj.shooter === shooter.UUID).completed ? styles.completeCheckShow : styles.completeCheckHide]}
                            source={require('../../assets/images/green-check.png')}
                        />
                        <Text style={styles.shooterTag}>{roundData.shooters.find(shooterObj => shooter.UUID === shooterObj.UUID).pointSum}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        ));

        let innerZeroButton = (arrow) => { return (<View></View>); }
        let outerZeroButton = <View></View>;

        if (props.round.pointage.firstHitCounts) {
            outerZeroButton = (
                <View style={styles.pointageOuterZoneWrapperOuter}>
                    <TouchableOpacity
                        style={[styles.pointageZoneWrapperOuter, pointageWasShot(0, 0) ? styles.pointageSelectedZone : {}]}
                        onPress={() => pointageClick(0, 0, 0)}
                        onLongPress={() => pointageHold(0, 0, 0)}
                        activeOpacity={0.9}
                    >
                        <Text style={styles.pointageZonePointsTagOuter}>0</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            innerZeroButton = (arrow) => {
                return (
                    <View style={styles.pointageOuterZoneWrapper}>
                        <TouchableOpacity
                            style={[styles.pointageZoneWrapperOuter, pointageWasShot(arrow, 0) ? styles.pointageSelectedZone : {}]}
                            onPress={() => pointageClick(arrow, 0, 0)}
                            onLongPress={() => pointageHold(arrow, 0, 0)}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.pointageZonePointsTag}>0</Text>
                        </TouchableOpacity>
                    </View>
                )
            };
        }

        hitSelector = (
            <View style={styles.pointageGeneralOuterWrapper}>
                <View style={styles.pointageOuterWrapper}>
                    {props.round.pointage.pointage.map(arrow => (
                        <View key={arrow.arrow} style={styles.pointageColWrapper}>
                            {arrow.points.map(zone => (
                                <View key={zone.zone} style={styles.pointageOuterZoneWrapper}>
                                    <TouchableOpacity
                                        style={[styles.pointageZoneWrapper, pointageWasShot(arrow.arrow, zone.zone) ? styles.pointageSelectedZone : {}]}
                                        onPress={() => pointageClick(arrow.arrow, zone.zone, zone.points)}
                                        onLongPress={() => pointageHold(arrow.arrow, zone.zone, zone.points)}
                                        activeOpacity={0.9}
                                    >
                                        <Text style={styles.pointageZonePointsTag}>{zone.points}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                            {innerZeroButton(arrow.arrow)}
                        </View>
                    ))}
                </View>
                {outerZeroButton}
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <AbortConfirmationComponent
                    abortRoundHandler={abortRound}
                    visibleStatus={abortConfirmationModal}
                    backPress={hideAbortConfirmationHandler}
                />
                {headerButtons}
            </View>
            <View style={styles.targetNavigationRow}>
                <View style={styles.targetNavigationCol}>
                    <TouchableOpacity
                        onPress={() => navigateToPreviousRound()}
                        activeOpacity={0.9}
                    >
                        <Image
                            style={styles.targetButtonIcon}
                            source={require('../../assets/images/back-button-black.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.targetNavigationCol}>
                    <Text style={styles.targetNavigationNotCurrentNumber}>{previousTargetNumberShow}</Text>
                </View>
                <View style={styles.targetNavigationCol}>
                    <Text style={styles.targetNavigationCurrentNumber}>{currentTargetNumberShow}</Text>
                </View>
                <View style={styles.targetNavigationCol}>
                    <Text style={styles.targetNavigationNotCurrentNumber}>{nextTargetNumberShow}</Text>
                </View>
                <View style={styles.targetNavigationCol}>
                    <TouchableOpacity
                        onPress={() => navigateToNextRound()}
                        activeOpacity={0.9}
                    >
                        <Image
                            style={styles.targetButtonIcon}
                            source={require('../../assets/images/next-button-black.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.contentWrapper}>
                <ScrollView>
                    <View style={styles.shootersListWrapper}>
                        {shooterList}
                    </View>
                </ScrollView>
                <View style={styles.footerWrapper}>
                    {hitSelector}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    header: {
        backgroundColor: colors.headerBackground,
        height: 100,
        justifyContent: 'flex-end'
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    headerButtonWrapper: {
        flex: 1,
        padding: 10
    },
    targetNavigationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderTopWidth: 1
    },
    targetNavigationCol: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    targetNavigationCurrentNumber: {
        fontSize: sizes.fonts.large,
        fontWeight: 'bold'
    },
    targetNavigationNotCurrentNumber: {
        fontSize: sizes.fonts.medium
    },
    targetButtonIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    contentWrapper: {
        flex: 1
    },
    footerWrapper: {
        borderTopColor: 'black',
        borderTopWidth: 1
    },
    pointageGeneralOuterWrapper: {

    },
    pointageOuterWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    pointageColWrapper: {
        flex: 1
    },
    pointageOuterZoneWrapper: {
        flexDirection: 'row',
        padding: 5,
    },
    pointageZoneWrapper: {
        backgroundColor: colors.roundInputButtonsBackground,
        borderColor: colors.roundInputButtonsBackground,
        borderWidth: 3,
        borderRadius: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    pointageSelectedZone: {
        borderColor: colors.roundZoneSelectedBorder,
        backgroundColor: colors.roundZoneSelectedBackground
    },
    pointageZonePointsTag: {
        fontSize: sizes.fonts.large,
        padding: 10
    },
    pointageOuterZoneWrapperOuter: {
        flexDirection: 'row',
        padding: 5
    },
    pointageZoneWrapperOuter: {
        backgroundColor: colors.roundInputButtonsBackground,
        borderWidth: 3,
        borderColor: colors.roundInputButtonsBackground,
        borderRadius: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    pointageZonePointsTagOuter: {
        fontSize: sizes.fonts.large,
        padding: 10
    },
    shooterOuterWrapper: {
        padding: 5
    },
    shooterWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: colors.roundShooterRowBackground,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: colors.roundShooterRowBackground
    },
    selectedShooter: {
        borderColor: colors.roundShooterSelectedBorder,
        backgroundColor: colors.roundShooterSelectedBackground
    },
    shooterTag: {
        fontSize: sizes.fonts.medium
    },
    shootersListWrapper: {
        padding: 10
    },
    completeCheckBasic: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    completeCheckHide: {
        opacity: 0
    },
    completeCheckShow: {
        opacity: 1
    }
});

export default RoundScreen;