import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button, ScrollView } from 'react-native';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';

import AppButton from '../general/AppButton';
import AppButtonDeny from '../general/AppButtonDeny';
import DataService from '../../services/DataService';

const PointageDetailComponent = props => {

    let firstHitCountsContent = strings.allHitsCountString;

    const deleteCurrentItem = () => {
        DataService.deletePointage(props.currentItem.UUID);
        props.backPress();
    }

    if (props.currentItem.firstHitCounts) {
        firstHitCountsContent = strings.firstHitCountsString;
    }

    let buttons = (
        <View>
            <View style={styles.buttonWrapper}>
                <AppButton title={strings.closeButton} onPress={props.backPress} />
            </View>
        </View>);

    if (props.currentItem.deletable) {
        buttons = (
            <View>
                <View style={styles.buttonWrapper}>
                    <AppButton title={strings.closeButton} onPress={props.backPress} />
                </View>
                <View style={styles.buttonWrapper}>
                    <AppButtonDeny title={strings.deleteButton} onPress={deleteCurrentItem} />
                </View>
            </View>);
    }

    let pointageDisplay = <View></View>;

    if (props.currentItem.pointage && props.currentItem.pointage.length > 0) {
        pointageDisplay = props.currentItem.pointage.map(arrowItem => (
            <View key={arrowItem.arrow} style={styles.arrowWrapper}>
                <Text style={styles.arrowTag}>{arrowItem.arrow}. {strings.arrowDisplayTag}</Text>
                {arrowItem.points.map(zone => (
                    <View key={zone.zone} style={styles.zoneWrapper}>
                        <Text style={styles.zoneTag}>{strings.zoneDisplayTag} {zone.zone}:</Text>
                        <Text style={styles.zoneTag}>{zone.points}</Text>
                    </View>
                ))}
            </View>
        ))
    }

    return (
        <Modal visible={props.visibleStatus} animationType='slide'>
            <ScrollView style={styles.content}>
                <Text style={styles.title}>{props.currentItem.name}</Text>
                <View style={styles.generalInfos}>
                    <Text style={styles.sectionTitle}>{strings.generalInfosTitle}</Text>
                    <Text style={styles.attributeTag}>{strings.pointageArrowsTag} {props.currentItem.arrows}</Text>
                    <Text style={styles.attributeTag}>{strings.pointageZonesTag} {props.currentItem.hitZones}</Text>
                    <Text style={styles.attributeTag}>{firstHitCountsContent}</Text>
                </View>
                <View>
                    <Text style={styles.sectionTitle}>{strings.pointageShowTitle}</Text>
                    {pointageDisplay}
                </View>
                <View style={styles.outerButtonWrapper}>
                    {buttons}
                </View>
            </ScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    content: {
        padding: 20
    },
    title: {
        fontSize: 25,
        paddingBottom: 10,
        fontWeight: "bold",
        borderBottomWidth: 1
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 10
    },
    generalInfos: {
        borderBottomWidth: 1
    },
    attributeTag: {
        fontSize: 20,
        padding: 5
    },
    buttonWrapper: {
        paddingBottom: 10
    },
    outerButtonWrapper: {
        paddingBottom: 30,
        paddingTop: 10
    },
    arrowWrapper: {
        padding: 5
    },
    arrowTag: {
        padding: 5,
        fontSize: 20
    },
    zoneWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    zoneTag: {
        padding: 5,
        fontSize: 20
    }
});

export default PointageDetailComponent;