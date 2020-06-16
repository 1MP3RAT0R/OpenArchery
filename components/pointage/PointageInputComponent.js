import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button, ScrollView } from 'react-native';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';
import sizes from '../../constants/sizes';

import AppButton from '../general/AppButton';
import AppButtonSuccess from '../general/AppButtonSuccess';
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
        if (props.firstArrowCounts) {
            newData.forEach((arrow, index) => {
                if (arrow.arrow == arrowObj.arrow) {
                    newData[index] = arrowObj;
                }
            });
        } else {
            newData.forEach((arrow, index) => {
                let tmpArrow = arrowObj;
                tmpArrow.arrow = arrow.arrow;
                newData[index] = JSON.parse(JSON.stringify(tmpArrow));
            });
        }
        props.reportData(newData);
    }

    const onSave = () => {
        props.onSave();
    }

    const onAbort = () => {
        props.close()
    }

    let inputFields = (
        <PointageInputField firstArrow={props.firstArrowCounts} arrowObj={data.find(dataobj => dataobj.arrow == 1)} onChange={onValueChange} />
    );

    if (props.firstArrowCounts) {
        inputFields = props.arrowsArray.map(arrow => {
            return (
                <PointageInputField key={arrow} firstArrow={props.firstArrowCounts} arrowObj={data.find(dataobj => dataobj.arrow == arrow + 1)} onChange={onValueChange} />
            );
        });
    }

    return (
        <Modal
            visible={props.visible}
            animationType='slide'
        >
            <View style={styles.content}>
                <Text style={styles.pointsTitle}>{strings.addPointagePointsTitle}</Text>
                <View style={styles.pointsExplenationWrapper}>
                    <Text style={styles.pointsExplenationTag}>{strings.addPointageConfigureExplenation}</Text>
                </View>
                <ScrollView>
                    {inputFields}
                    <View style={styles.saveButtonWrapper}>
                        <AppButtonSuccess title={strings.saveNewPointageButton} onPress={onSave} />
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
        fontSize: sizes.fonts.xlarge,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    saveButtonWrapper: {
        paddingBottom: 10
    },
    abortButtonWrapper: {
        paddingBottom: 40
    },
    pointsExplenationWrapper: {
        paddingBottom: 10
    },
    pointsExplenationTag: {
        fontSize: sizes.fonts.medium
    }
});

export default PointageDetailComponent;