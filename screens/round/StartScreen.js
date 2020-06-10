import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Modal, NativeModules } from 'react-native';

import screens from '../../constants/screens';
import HeaderComponent from '../../components/general/HeaderComponent';

const StartScreen = props => {
    return (
        <View>
            <HeaderComponent
                title="TODO"
                changeScreen={props.changeScreen}
                backScreen={screens.main}
            />
            <Text>START SCREEN TODO</Text>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default StartScreen;