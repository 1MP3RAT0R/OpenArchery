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
    
    const deleteShooterHandler = () => {
        DataService.deleteShooter(props.shooter.UUID).then(result => {
            props.onDeleted();
            props.backPress();
        })
    }

    return (
        <Modal visible={props.visibleStatus} animationType='fade'>
            <View style={styles.screen}>
                <View style={styles.wrapper}>
                    <Text style={styles.label}>{strings.deleteShooterTag}</Text>
                </View>
                <View style={styles.nameWrapper}>
                    <Text style={styles.name}>{props.shooter.name}</Text>
                </View>
                <View style={styles.wrapper}>
                    <AppButtonDeny
                        title={strings.deleteButton}
                        onPress={deleteShooterHandler}
                    />
                </View>
                <View style={styles.wrapper}>
                    <AppButton
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
    name: {
        fontSize: 20
    },
    wrapper: {
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20
    },
    nameWrapper: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold'
    }
});

export default UserFirstCreateComponent;