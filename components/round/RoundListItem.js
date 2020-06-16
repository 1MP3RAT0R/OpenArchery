import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';
import roundStates from '../../constants/roundStates';
import sizes from '../../constants/sizes';

const RoundListItem = props => {

    let status = "";

    if (props.round.status == roundStates.begun) {
        status = strings.roundStatusBegun;
    } else if (props.round.status == roundStates.done) {
        status = strings.roundStatusDone;
    } else if (props.round.status == roundStates.aborted) {
        status = strings.roundStatusAborted;
    }
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={() => { props.onTouched(props.round) } } activeOpacity={1}>
                <View style={styles.listItem}>
                    <Text style={styles.itemText}>{props.round.timestamp}</Text>
                    <Text style={styles.itemText}>{status}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20
    },
    listItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        padding: 15,
        borderRadius: 3,
        backgroundColor: colors.listItemBackground
    },
    itemText: {
        color: colors.listItemText,
        fontSize: sizes.fonts.medium
    }
});

export default RoundListItem;