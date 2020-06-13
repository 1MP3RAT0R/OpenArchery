import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button, ScrollView } from 'react-native';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';

import AppButton from '../general/AppButton';
import PointageInputField from './PointageInputField';

const PointageDetailComponent = props => {

    const data = [];
    props.arrowsArray.forEach((arrow, index) => {
        let arrowData = {
            arrow: arrow + 1,
            points: []
        };
        props.zonesArray.forEach((zone, index) => {
            arrowData.points.push({
                zone: zone + 1,
                points: 0
            })
        });
        data.push(arrowData);
    });
    props.reportData(data);

    const onValueChange = (arrowObj) => {
        let newData = data;
        newData.forEach((arrow, index) => {
            if (arrow.arrow == arrowObj.arrow) {
                newData[index] = arrowObj;
            }
        });
        props.reportData(newData);
    }

    const onSave = () => {
        props.onSave();
    }

    const onAbort = () => {
        props.close()
    }

    return (
        <Modal
            visible={props.visible}
            animationType='slide'
        >
            <View style={styles.content}>
                <Text style={styles.pointsTitle}>{strings.addPointagePointsTitle}</Text>
                <ScrollView>
                    {props.arrowsArray.map(arrow => <PointageInputField key={arrow} arrowObj={data.find(dataobj => dataobj.arrow == arrow + 1)} onChange={onValueChange} />)}
                    <View style={styles.saveButtonWrapper}>
                        <AppButton title={strings.saveNewPointageButton} onPress={onSave} />
                    </View>
                    <View style={styles.abortButtonWrapper}>
                        <AppButton title={strings.abortButton} onPress={onAbort} />
                    </View>
                </ScrollView>
                
            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    content: {
        padding: 20
    },
    pointsTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    saveButtonWrapper: {
        paddingBottom: 10
    },
    abortButtonWrapper: {
        paddingBottom: 40
    }
});

export default PointageDetailComponent;