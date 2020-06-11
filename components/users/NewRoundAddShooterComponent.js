import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';
import AppButton from '../general/AppButton';
import ShooterListItem from '../users/ShooterListItem';
import DataService from '../../services/DataService';
import CreateShooterComponent from './CreateShooterComponent';

const NewRoundSelectPointageComponent = props => {

    const [firstRound, setFirstRound] = useState(true);
    const [knownShooters, setKnownShooters] = useState([]);
    const [createShooterModal, setCreateShooterModal] = useState(false);

    if (firstRound) {
        DataService.getShooters().then(result => {
            let tmpKnownShooters = [];
            for (let r = 0; r < result.length; r++) {
                let alreadyUsed = false;
                for (let s = 0; s < props.shooterList; s++) {
                    if (result[r].UUID == props.shooterList[s].UUID) {
                        alreadyUsed = true;
                    }
                }
                if (!alreadyUsed) {
                    tmpKnownShooters.push(result[r]);
                }
            }
            setKnownShooters(tmpKnownShooters.reverse());
        })
        setFirstRound(false);
    }

    const showCreateShooterModal = () => {
        setCreateShooterModal(true);
    }

    const hideCreateShooterModal = () => {
        setFirstRound(true);
        setCreateShooterModal(false);
    }

    const shooterSelectedHandler = (shooter) => {
        props.onSelected(shooter);
        props.onClose();
    }

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.screen}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => props.onClose()} activeOpacity={0.9}>
                        <Image
                            style={styles.button}
                            source={require('../../assets/images/back-button-black.png')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>{strings.shooterSelectionHeader}</Text>
                </View>

                <View style={styles.buttonWrapper}>
                    <AppButton
                        title={strings.createShooterButton}
                        onPress={showCreateShooterModal}
                    />
                </View>
                <CreateShooterComponent
                    visibleStatus={createShooterModal}
                    backPress={hideCreateShooterModal}
                />
                <ScrollView>
                    <View style={styles.content}>
                        {knownShooters.map(shooterObject => <ShooterListItem onTouched={shooterSelectedHandler} key={shooterObject.UUID} shooterItem={shooterObject} />)}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    screen: {

    },
    header: {
        padding: 15,
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: 'flex-start'
    },
    button: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        margin: 15
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 10,
        paddingBottom: 20
    },
    content: {
        paddingTop: 15,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 140
    },
    buttonWrapper: {
        paddingLeft: 30,
        paddingRight: 30
    }
});

export default NewRoundSelectPointageComponent;