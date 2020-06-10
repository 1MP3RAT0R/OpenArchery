import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button, ScrollView, TextInput } from 'react-native';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';

const PointageZoneInputField = props => {
    const [zonePoints, setZonePoints] = useState(props.zoneData.points);

    const changeZonePoints = (value) => {
        setZonePoints(value);
        props.onChange(props.zoneData.zone, parseInt(value));
    }

    return (
        <View style={styles.inputRow}>
            <Text style={styles.zoneInputTag}>{strings.zoneInputTag} {props.zoneData.zone}:</Text>
            <TextInput 
                style={styles.inputField}
                keyboardType='numeric'
                onChangeText={value => changeZonePoints(value)} 
                value={zonePoints.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    zoneInputTag: {

    },
    inputField: {
        borderBottomWidth: 1,
        width: '50%'
    }
});

export default PointageZoneInputField;