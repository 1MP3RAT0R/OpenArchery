import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';
import sizes from '../../constants/sizes';

const ShooterListItem = props => {
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={() => { props.onTouched(props.shooterItem) } } activeOpacity={1}>
                <View style={styles.listItem}>
                    <Text style={styles.itemText}>{props.shooterItem.name}</Text>
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
        paddingLeft: 20,
        borderRadius: 3,
        backgroundColor: colors.listItemBackground
    },
    itemText: {
        color: colors.listItemText,
        fontSize: sizes.fonts.medium
    }
});

export default ShooterListItem;