import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TextInput } from 'react-native';

import strings from '../constants/strings';
import screens from '../constants/screens';
import AppButton from '../components/general/AppButton';
import DataService from '../services/DataService';
import RoundListItem from '../components/round/RoundListItem';

const UserScreen = props => {

    const [usernameInput, setUsernameInput] = useState('');

    const startApp = () => {
        if (usernameInput != '') {
            props.changeScreen(screens.main);
        }
    }

    const changeUsernameHandler = (text) => {
        setUsernameInput(text);
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.inputTag}>{strings.inputUsernameMessage}</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={text => changeUsernameHandler(text)} 
                value={usernameInput}
            />
            <AppButton 
                title={strings.userScreenButton}
                onPress={startApp}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 30
    },
    input: {
        borderColor: 'grey',
        borderBottomWidth: 1,
        fontSize: 20,
        width: '100%'
    },
    inputTag: {
        fontSize: 20
    }
});

export default UserScreen;