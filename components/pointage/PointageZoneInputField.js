import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button, ScrollView, TextInput } from 'react-native';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';
import sizes from '../../constants/sizes';

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
        justifyContent: 'space-between',
        paddingBottom: 5
    },
    zoneInputTag: {
        fontSize: sizes.fonts.medium
    },
    inputField: {
        borderBottomWidth: 1,
        width: '50%',
        fontSize: sizes.fonts.medium
    }
});

export default PointageZoneInputField;