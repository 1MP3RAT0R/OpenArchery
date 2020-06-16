import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button, ScrollView, TextInput } from 'react-native';

import uuid from 'react-native-uuid';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';

import AppButton from '../general/AppButton';
import AppButtonDeny from '../general/AppButtonDeny';
import DataService from '../../services/DataService';
import sizes from '../../constants/sizes';

const UserFirstCreateComponent = props => {

    const [shooterName, setShooterName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const createShooterHandler = () => {
        if (shooterName.length > 2) {
            setErrorMessage('');
            DataService.addShooters([{
                UUID: uuid.v4(),
                name: shooterName
            }]).then(result => props.backPress())
        } else {
            setErrorMessage(strings.createShooterErrorTooShort);
        }
    }

    const changeShooterNameHandler = (text) => {
        if (text.length > 10) {
            text = text.substring(0, 10);
        }
        setShooterName(text);
    }

    let errorMessageBox = <View></View>;

    if (errorMessage !== '') {
        errorMessageBox = (
            <View style={styles.errorMessageWrapper}>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
        );
    }

    return (
        <Modal visible={props.visibleStatus} animationType='fade'>
            <View style={styles.screen}>
                <View style={styles.wrapper}>
                    <Text style={styles.label}>{strings.createShooterNameTag}</Text>
                </View>
                <View style={styles.wrapper}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => changeShooterNameHandler(text)}
                            value={shooterName}
                        />
                    </View>
                </View>
                {errorMessageBox}
                <View style={styles.wrapper}>
                    <AppButton
                        title={strings.createShooterButton}
                        onPress={createShooterHandler}
                    />
                </View>
                <View style={styles.wrapper}>
                    <AppButtonDeny
                        title={strings.abortButton}
                        onPress={props.backPress}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: sizes.fonts.medium
    },
    inputWrapper: {
        paddingBottom: 5
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        fontSize: sizes.fonts.medium
    },
    wrapper: {
        padding: 5,
        paddingRight: 20,
        paddingLeft: 20
    },
    errorMessageWrapper: {
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    errorMessage: {
        fontSize: sizes.fonts.medium,
        color: colors.errorMessage
    }
});

export default UserFirstCreateComponent;