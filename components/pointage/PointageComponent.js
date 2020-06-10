import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';

const PointageComponent = props => {
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={() => { props.onTouched(props.pointageItem) } } activeOpacity={1}>
                <View style={styles.listItem}>
                    <Text style={styles.itemText}>{props.pointageItem.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 5,
        paddingBottom: 5
    },
    listItem: {
        width: '100%',
        alignContent: 'center',
        padding: 15,
        borderRadius: 3,
        backgroundColor: colors.listItemBackground
    },
    itemText: {
        color: colors.listItemText
    }
});

export default PointageComponent;