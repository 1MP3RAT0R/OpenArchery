import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button, ScrollView } from 'react-native';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';

import AppButton from '../general/AppButton';
import AppButtonDeny from '../general/AppButtonDeny';
import DataService from '../../services/DataService';

const PointageConfirmDeleteComponent = props => {
    return (
        <Modal visible={props.visibleStatus} animationType='fade'>
            <View style={styles.screen}>
                <Text>{strings.pointageDeleteMessagePre}{props.itemName}{strings.pointageDeleteMessageAfter}</Text>
                <AppButtonDeny 
                    title={strings.deleteButton}
                    onPress={props.onDelete}
                />
                <AppButton
                    title={strings.abortButton}
                    onPress={props.onAbort}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center'
    }
});

export default PointageConfirmDeleteComponent;