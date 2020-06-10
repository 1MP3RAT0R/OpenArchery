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

    let pointageData = [];

    const changePointName = (text) => {setPointageName(text)};

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

    const changePointFirstArrow = (value) => {setPointageFirstArrow(value)};

    const configurePointageHandler = () => {
        if (pointageArrows == 0) {
            changePointArrows(1);
        }
        if (pointageZones == 0) {
            changePointZones(1);
        }
        setConfigurePointageModal(true);
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
                    <AppButton 
                        title={strings.addPointageContinueButton}
                        onPress={() => configurePointageHandler()}
                    />
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
        padding: 20
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
        justifyContent: 'space-evenly',
        paddingBottom: 20
    }
});

export default AddPointageScreen;