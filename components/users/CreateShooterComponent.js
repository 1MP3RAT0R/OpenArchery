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

    const [shooterName, setShooterName] = useState('');

    const createShooterHandler = () => {
        if (shooterName != '') {
            DataService.addShooters([{
                UUID: uuid.v4(),
                name: shooterName
            }]).then(result => props.backPress())
        }
    }

    const changeShooterNameHandler = (text) => {
        if (text.length > 10) {
            text = text.substring(0, 10);
        }
        setShooterName(text);
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
        fontSize: 20
    },
    inputWrapper: {
        paddingBottom: 5
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        fontSize: 20
    },
    wrapper: {
        padding: 5,
        paddingRight: 20,
        paddingLeft: 20
    }
});

export default UserFirstCreateComponent;