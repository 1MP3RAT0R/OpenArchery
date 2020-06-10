import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity } from 'react-native';


import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';

const HeaderComponent = props => {
    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.changeScreen(props.backScreen)} activeOpacity={0.9}>
                    <Image
                        style={styles.button}
                        source={require('../../assets/images/back-button.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{props.title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 100,
        width: '100%',
        backgroundColor: colors.headerBackground,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30,
        paddingLeft: 30
    },
    title: {
        fontSize: 25,
        paddingLeft: 30,
        color: colors.headerText
    },
    button: {
        flex: 1,
        width: 25,
        resizeMode: 'contain'
    }
});

export default HeaderComponent;