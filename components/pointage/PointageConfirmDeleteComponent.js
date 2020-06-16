import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button, ScrollView } from 'react-native';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';
import sizes from '../../constants/sizes';

import AppButton from '../general/AppButton';
import AppButtonDeny from '../general/AppButtonDeny';
import DataService from '../../services/DataService';

const PointageConfirmDeleteComponent = props => {
    return (
        <Modal visible={props.visibleStatus} animationType='fade'>
            <View style={styles.screen}>
                <Text style={styles.deleteText}>{strings.pointageDeleteMessagePre}{props.itemName}{strings.pointageDeleteMessageAfter}</Text>
                <View style={styles.buttonWrapper}>
                    <AppButtonDeny
                        title={strings.deleteButton}
                        onPress={props.onDelete}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <AppButton
                        title={strings.abortButton}
                        onPress={props.onAbort}
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
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20
    },
    deleteText: {
        fontSize: sizes.fonts.large,
        paddingBottom: 15,
        paddingTop: 5
    },
    buttonWrapper: {
        paddingBottom: 5,
        paddingTop: 5
    }
});

export default PointageConfirmDeleteComponent;