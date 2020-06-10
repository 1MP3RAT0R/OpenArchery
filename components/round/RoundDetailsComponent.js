import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';
import AppButton from '../general/AppButton';

const RoundListItem = props => {
    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.screen}>
                <Text>{JSON.stringify(props.round)}</Text>
                <AppButton title="back" onPress={() => props.onClose()} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    screen: {
        padding: 30
    }
});

export default RoundListItem;