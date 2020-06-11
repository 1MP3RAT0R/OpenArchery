import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';
import AppButton from '../general/AppButton';
import PointageComponent from '../pointage/PointageComponent';

const NewRoundSelectPointageComponent = props => {
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
                    <Text style={styles.headerText}>{strings.pointageSelectionHeader}</Text>
                </View>
                <ScrollView>
                    <View style={styles.content}>
                        {props.pointages.map(pointage => <PointageComponent onTouched={props.onSelected} key={pointage.UUID} pointageItem={pointage} />)}
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
        padding: 20,
        paddingBottom: 110
    }
});

export default NewRoundSelectPointageComponent;