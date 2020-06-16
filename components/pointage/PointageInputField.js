import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button, ScrollView } from 'react-native';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';
import sizes from '../../constants/sizes';

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

    let content = (
        <View>
            <Text style={styles.title}>{strings.arrowAllHitCountTitle}</Text>
            <View style={styles.list}>
                {props.arrowObj.points.map(zone => <PointageZoneInputField key={zone.zone} zoneData={zone} onChange={onValueChange} />)}
            </View>
        </View>
    );

    if (props.firstArrow) {
        content = (
            <View>
                <Text style={styles.title}>{strings.arrowTitle} {props.arrowObj.arrow}</Text>
                <View style={styles.list}>
                    {props.arrowObj.points.map(zone => <PointageZoneInputField key={zone.zone} zoneData={zone} onChange={onValueChange} />)}
                </View>
            </View>
        );
    }

    return (
        <View>
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: sizes.fonts.large
    },
    list: {
        paddingTop: 10,
        paddingBottom: 20
    }
});

export default PointageInputField;