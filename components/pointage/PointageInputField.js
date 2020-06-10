import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button, ScrollView } from 'react-native';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';

import PointageZoneInputField from './PointageZoneInputField';

const PointageInputField = props => {

    const onValueChange = (zoneNumber, value) => {
        let newArrowObj = props.arrowObj;
        newArrowObj.points.forEach((zone, index) => {
            if (zone.zone == zoneNumber) {
                newArrowObj.points[index].points = value;
            }
        });
        props.onChange(newArrowObj);
    }

    return (
        <View>
            <Text style={styles.title}>{strings.arrowTitle} {props.arrowObj.arrow}</Text>
            <View style={styles.list}>
                {props.arrowObj.points.map(zone => <PointageZoneInputField key={zone.zone} zoneData={zone} onChange={onValueChange} />)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 20
    },
    list: {
        padding: 10
    }
});

export default PointageInputField;