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

const AbortConfirmationComponent = props => {
    return (
        <Modal visible={props.visibleStatus} animationType='fade'>
            <View style={styles.screen}>
                <View style={styles.wrapper}>
                    <Text style={styles.label}>{strings.abortRoundLabel}</Text>
                </View>
                <View style={styles.wrapper}>
                    <AppButtonDeny
                        title={strings.yesButtonText}
                        onPress={props.abortRoundHandler}
                    />
                </View>
                <View style={styles.wrapper}>
                    <AppButton
                        title={strings.noButtonText}
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
        justifyContent: 'center',
        padding: 20
    },
    label: {
        fontSize: sizes.fonts.large
    },
    wrapper: {
        paddingTop: 5,
        paddingBottom: 5
    }
});

export default AbortConfirmationComponent;