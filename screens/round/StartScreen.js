import React, { useState } from 'react';
import { StyleSheet, Switch, View, Text, TextInput, Image, NativeModules, ScrollView, TouchableOpacity } from 'react-native';

import uuid from 'react-native-uuid';

import screens from '../../constants/screens';
import HeaderComponent from '../../components/general/HeaderComponent';
import NewRoundSelectPointageComponent from '../../components/round/NewRoundSelectPointageComponent';
import NewRoundAddShooterComponent from '../../components/users/NewRoundAddShooterComponent';
import strings from '../../constants/strings';
import roundStates from '../../constants/roundStates';

import DataService from '../../services/DataService';
import AppButton from '../../components/general/AppButton';
import colors from '../../constants/colors';
import ShooterList from '../../components/users/ShooterList';

const StartScreen = props => {

    const noUUID = 'nan';

    const [pointagesList, setPointagesList] = useState([]);
    const [firstround, setFirstround] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [userObj, setUserObj] = useState({});
    const [userToggle, setUserToggle] = useState(true);
    const [shootersArray, setShootersArray] = useState([]); const [targetCount, setTargetCount] = useState(0);
    const [pointage, setPointage] = useState({ name: strings.noPointageSelected, UUID: noUUID });
    const [selectPointageModal, setSelectPointageModal] = useState(false);
    const [addShooterModal, setAddShooterModal] = useState(false);

    const removeShooter = (shooterObj) => {
        let tmpShooters = [];
        for (let i = 0; i < shootersArray.length; i++) {
            if (shooterObj.UUID != shootersArray[i].UUID) {
                tmpShooters.push(shootersArray[i]);
            }
        }
        setShootersArray(tmpShooters);
    }

    const addShooter = (shooterObj) => {
        shooterObj.pointSum = 0;
        setShootersArray(shootersArray.concat([shooterObj]));
    }

    const toggleUser = () => {
        if (!userToggle) {
            setUserToggle(!userToggle);
            addShooter(userObj);
        } else {
            setUserToggle(!userToggle);
            removeShooter(userObj);
        }
    }

    const createRound = () => {

        console.log(pointage, shootersArray, targetCount);

        if (targetCount > 0) {
            if (pointage.UUID !== noUUID) {
                if (shootersArray.length > 0) {

                    setErrorMessage('');

                    let dateObj = new Date();
                    let date = dateObj.getDate();
                    let month = dateObj.getMonth() + 1;
                    let year = dateObj.getFullYear();
                    let hours = dateObj.getHours();
                    let min = dateObj.getMinutes();
                    let sec = dateObj.getSeconds();

                    let timestamp = date + "." + month + "." + year + " " + hours + ":" + min + ":" + sec;

                    let targetsArray = [];

                    for (let j = 0; j < targetCount; j++) {

                        let targetobj = {};
                        targetobj.number = j + 1;
                        targetobj.hits = [];

                        for (let s = 0; s < shootersArray.length; s++) {
                            targetobj.hits.push({
                                shooter: shootersArray[s].UUID,
                                shooterName: shootersArray[s].name,
                                shots: []
                            })
                        }

                        targetsArray.push(targetobj);
                    }

                    const newRound = {
                        UUID: uuid.v4(),
                        timestamp: timestamp,
                        targetCount: targetCount,
                        pointageName: pointage.name,
                        pointageUUID: pointage.UUID,
                        status: roundStates.begun,
                        currentRound: 1,
                        shooters: shootersArray,
                        targets: targetsArray
                    }

                    DataService.addRounds([newRound]).then(result => {
                        props.changeScreen(screens.main);
                    })
                } else {
                    setErrorMessage(strings.newRoundNoShootersError);
                }
            } else {
                setErrorMessage(strings.newRoundNoPointageSelectedError);
            }
        } else {
            setErrorMessage(strings.newRoundNoTargetsError);
        }
    }

    if (firstround) {
        DataService.getUser().then(userObject => {
            setUserObj(userObject);
            addShooter(userObject);
        })
        DataService.getPointages().then(pointageListArray => {
            setPointagesList(pointageListArray);
        })
        setFirstround(false);
    }

    const changeTargetCountHandler = (text) => { setTargetCount(text) }

    const pointageChangePressed = (pointage) => {
        console.log(pointage);
        setPointage(pointage);
        hidePointageModalHandler();
    }

    const showPointageModalHandler = () => { setSelectPointageModal(true) }
    const hidePointageModalHandler = () => { setSelectPointageModal(false) }

    const deleteShooterHandler = (UUID) => {
        let shootersArrayTMP = [];
        shootersArray.forEach(shooter => {
            if (shooter.UUID != UUID) {
                shootersArrayTMP.push(shooter);
            }
        });
        setShootersArray(shootersArrayTMP);
    }

    const showAddShooterModalHandler = () => {
        setAddShooterModal(true);
    }

    const hideAddShooterModalHandler = () => {
        setAddShooterModal(false);
    }

    const addShooterHandler = (newShooter) => {
        let alreadyAddedShooter = false;
        for (let aas = 0; aas < shootersArray.length; aas++) {
            if (shootersArray[aas].UUID === newShooter.UUID) {
                alreadyAddedShooter = true;
            }
        }
        if (!alreadyAddedShooter) {
            let shootersArrayTMP = shootersArray;
            shootersArrayTMP.push(newShooter);
            setShootersArray(shootersArrayTMP);
        }
    }

    return (
        <View>
            <HeaderComponent
                title={strings.addRoundScreenTitle}
                changeScreen={props.changeScreen}
                backScreen={screens.main}
            />
            <View style={styles.contentWrapper}>
                <ScrollView>
                    <View style={styles.inputBlock}>
                        <Text style={styles.inputBlockTitle}>{strings.addRoundGeneralBlockTitle}</Text>
                        <View style={styles.inputRow}>
                            <Text style={styles.inputLabel}>{strings.targetCountInputTag}</Text>
                            <TextInput
                                style={styles.inputField}
                                keyboardType='numeric'
                                onChangeText={value => changeTargetCountHandler(value)}
                                value={targetCount.toString()}
                            />
                        </View>
                        <View style={styles.inputColumn}>
                            <Text style={styles.inputLabel}>{strings.pointageSelectionTag}</Text>
                            <TouchableOpacity
                                style={styles.pointageItemWrapper}
                                onPress={() => showPointageModalHandler()}
                                activeOpacity={0.9}
                            >
                                <View style={styles.pointageItem}>
                                    <Text style={styles.pointageItemName}>{pointage.name}</Text>
                                    <Image
                                        style={styles.changePointageIcon}
                                        source={require('../../assets/images/next-button-black.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                            <NewRoundSelectPointageComponent
                                pointages={pointagesList}
                                visible={selectPointageModal}
                                onClose={hidePointageModalHandler}
                                onSelected={pointageChangePressed}
                                shooterList={shootersArray}
                            />
                        </View>
                    </View>
                    <View style={styles.inputBlock}>
                        <Text style={styles.inputBlockTitle}>{strings.addRoundShooterBlockTitle}</Text>
                        <View style={styles.inputRow}>
                            <Text style={styles.inputLabel}>{strings.userHimselfToggleTag}</Text>
                            <Switch
                                onValueChange={toggleUser}
                                value={userToggle}
                            />
                        </View>
                        <View style={styles.addShooterButtonWrapper}>
                            <AppButton
                                title={strings.newRoundAddShooterButton}
                                onPress={showAddShooterModalHandler}
                            />
                        </View>
                        <NewRoundAddShooterComponent 
                            visible={addShooterModal}
                            onClose={hideAddShooterModalHandler}
                            onSelected={addShooterHandler}
                        />
                        <View style={styles.shooterList}>
                            <ShooterList
                                shooters={shootersArray}
                                user={userObj}
                                onDelete={deleteShooterHandler}
                            />
                        </View>
                    </View>
                    <Text>{errorMessage}</Text>
                    <AppButton
                        title="save"
                        onPress={createRound}
                    />
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contentWrapper: {
        padding: 20
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        padding: 5
    },
    inputBlockTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 5
    },
    inputLabel: {
        fontSize: 20
    },
    inputBlock: {
        padding: 5
    },
    inputField: {
        borderColor: 'grey',
        borderBottomWidth: 1,
        fontSize: 20,
        width: '50%'
    },
    inputColumn: {
        padding: 5
    },
    pointageItemWrapper: {
        paddingTop: 10
    },
    pointageItem: {
        backgroundColor: colors.selectedPointageBackground,
        borderRadius: 5,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    changePointageIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    pointageItemName: {
        fontSize: 20
    },
    shooterList: {
        paddingTop: 5,
        paddingBottom: 5
    },
    addShooterButtonWrapper: {
        paddingTop: 10,
        paddingBottom: 10
    }
});

export default StartScreen;