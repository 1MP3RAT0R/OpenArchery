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

    const userAddHimselfHandler = () => {
        DataService.setUser({
            UUID: uuid.v4(),
            name: userName
        }).then(result => props.onAdded())
    }

    const changeUserNameHandler = (text) => {
        setUserName(text);
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
        padding: 30
    },
    label: {
        fontSize: 20
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        fontSize: 20,
        margin: 5
    }
});

export default UserFirstCreateComponent;