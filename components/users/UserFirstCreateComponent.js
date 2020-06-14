import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button, ScrollView, TextInput } from 'react-native';

import uuid from 'react-native-uuid';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';

import AppButton from '../general/AppButton';
import AppButtonDeny from '../general/AppButtonDeny';
import DataService from '../../services/DataService';

const UserFirstCreateComponent = props => {

    const [userName, setUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const userAddHimselfHandler = () => {
        if (userName.length > 2) {
            setErrorMessage('');
            DataService.setUser({
                UUID: uuid.v4(),
                name: userName
            }).then(result => props.onAdded())
        } else {
            setErrorMessage(strings.userAddHimselfErrorTooShort);
        }
    }

    const changeUserNameHandler = (text) => {
        setUserName(text);
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
                <Text style={styles.label}>{strings.userAddHimselfLabel}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => changeUserNameHandler(text)}
                    value={userName}
                />
                {errorMessageBox}
                <AppButton
                    title={strings.userAddHimselfButton}
                    onPress={userAddHimselfHandler}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20
    },
    label: {
        fontSize: 20
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10
    },
    errorMessageWrapper: {
        paddingBottom: 10
    },
    errorMessage: {
        fontSize: 20,
        color: colors.errorMessage
    }
});

export default UserFirstCreateComponent;