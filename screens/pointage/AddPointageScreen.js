import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, Switch, Modal } from 'react-native';

import DataService from '../../services/DataService';
import uuid from 'react-native-uuid';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';

import HeaderComponent from '../../components/general/HeaderComponent';
import AppButton from '../../components/general/AppButton';
import PointageInputComponent from '../../components/pointage/PointageInputComponent';

const AddPointageScreen = props => {
    const [pointageName, setPointageName] = useState('');
    const [pointageArrows, setPointageArrows] = useState(0);
    const [pointageZones, setPointageZones] = useState(0);
    const [pointageFirstArrow, setPointageFirstArrow] = useState(false);
    const [configurePointageModal, setConfigurePointageModal] = useState(false);
    const [arrowsArray, setArrowsArray] = useState([]);
    const [zonesArray, setZonesArray] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    let pointageData = [];

    const changePointName = (text) => {
        if (text.length > 15) {
            text = text.substring(0, 15);
        }
        setPointageName(text) 
    };

    const changePointArrows = (value) => {
        setPointageArrows(value);
        if (parseInt(value) > 0) {
            setArrowsArray([...Array(parseInt(value)).keys()]);
        }
    };

    const changePointZones = (value) => {
        setPointageZones(value);
        if (parseInt(value) > 0) {
            setZonesArray([...Array(parseInt(value)).keys()]);
        }
    };

    const changePointFirstArrow = (value) => { setPointageFirstArrow(value) };

    const configurePointageHandler = () => {
        if (pointageArrows > 0 && pointageArrows < 5) {
            if (pointageZones > 0 && pointageZones < 5) {
                setErrorMessage('');
                setConfigurePointageModal(true);
            } else {
                setErrorMessage(strings.pointageZonesErrorMessage);
            }
        } else {
            setErrorMessage(strings.pointageArrowsErrorMessage);
        }
    }

    const reportedData = (data) => {
        pointageData = data;
    }

    const closeConfigurePointageHandler = () => {
        setConfigurePointageModal(false);
    }

    const saveNewPointage = () => {
        const pointageObject = {
            UUID: uuid.v4() + "-" + Math.random(),
            name: pointageName,
            arrows: pointageArrows,
            hitZones: pointageZones,
            firstHitCounts: pointageFirstArrow,
            deletable: true,
            pointage: pointageData
        }
        setConfigurePointageModal(false);
        DataService.addPointages([pointageObject]).then(
            props.changeScreen(screens.configurePoints)
        )
    }

    let footer = (
        <AppButton
            title={strings.addPointageContinueButton}
            onPress={() => configurePointageHandler()}
        />
    );

    if (errorMessage != '') {
        footer = (
            <View>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <AppButton
                    title={strings.addPointageContinueButton}
                    onPress={() => configurePointageHandler()}
                />
            </View>
        );
    }

    return (
        <View>
            <HeaderComponent
                title={strings.addPointageScreenTitle}
                changeScreen={props.changeScreen}
                backScreen={screens.configurePoints}
            />
            <View style={styles.content}>
                <ScrollView>
                    <View style={styles.inputRow}>
                        <Text style={styles.inputTag}>{strings.inputTagName}</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => changePointName(text)}
                            value={pointageName}
                        />
                    </View>
                    <View style={styles.inputRow}>
                        <Text style={styles.inputTag}>{strings.inputTagArrows}</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            onChangeText={value => changePointArrows(value)}
                            value={pointageArrows.toString()}
                        />
                    </View>
                    <View style={styles.inputRow}>
                        <Text style={styles.inputTag}>{strings.inputTagZones}</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            onChangeText={value => changePointZones(value)}
                            value={pointageZones.toString()}
                        />
                    </View>
                    <View style={styles.inputRow}>
                        <Text style={styles.inputTag}>{strings.inputTagFirstArrow}</Text>
                        <Switch
                            onValueChange={value => changePointFirstArrow(value)}
                            value={pointageFirstArrow}
                        />
                    </View>
                    {footer}
                </ScrollView>
                <PointageInputComponent
                    visible={configurePointageModal}
                    close={closeConfigurePointageHandler}
                    onSave={saveNewPointage}
                    reportData={reportedData}
                    arrowsArray={arrowsArray}
                    zonesArray={zonesArray}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        padding: 30
    },
    input: {
        borderColor: 'grey',
        borderBottomWidth: 1,
        fontSize: 20,
        width: '50%'
    },
    inputTag: {
        fontSize: 20
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    errorMessage: {
        paddingBottom: 10,
        fontSize: 15,
        color: colors.errorMessage
    }
});

export default AddPointageScreen;