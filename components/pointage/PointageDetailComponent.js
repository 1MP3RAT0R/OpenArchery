import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button, ScrollView } from 'react-native';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';
import sizes from '../../constants/sizes';

import AppButton from '../general/AppButton';
import AppButtonDeny from '../general/AppButtonDeny';
import DataService from '../../services/DataService';
import PointageConfirmDeleteComponent from './PointageConfirmDeleteComponent';

const PointageDetailComponent = props => {

    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

    const showConfirmDeleteModal = () => {
        setConfirmDeleteModal(true);
    }

    const hideConfirmDeleteModal = () => {
        setConfirmDeleteModal(false);
    }

    let firstHitCountsContent = strings.allHitsCountString;

    const deleteCurrentItem = () => {
        hideConfirmDeleteModal();
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
                    <AppButtonDeny title={strings.deleteButton} onPress={showConfirmDeleteModal} />
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
                <PointageConfirmDeleteComponent 
                    visibleStatus={confirmDeleteModal}
                    itemName={props.currentItem.name}
                    onDelete={deleteCurrentItem}
                    onAbort={hideConfirmDeleteModal}
                />
                <Text style={styles.title}>{props.currentItem.name}</Text>
                <View style={styles.generalInfos}>
                    <View style={styles.sectionTitleWrapper}>
                        <Text style={styles.sectionTitle}>{strings.generalInfosTitle}</Text>
                    </View>
                    <View style={styles.attributeTupel}>
                        <Text style={styles.attributeTag}>{strings.pointageArrowsTag}</Text>
                        <Text style={styles.attributeTag}>{props.currentItem.arrows}</Text>
                    </View>
                    <View style={styles.attributeTupel}>
                        <Text style={styles.attributeTag}>{strings.pointageZonesTag}</Text>
                        <Text style={styles.attributeTag}>{props.currentItem.hitZones}</Text>
                    </View>
                    <View style={styles.attributeTupel}>
                        <Text style={styles.attributeTag}>{strings.pointageMaxPointsTag}</Text>
                        <Text style={styles.attributeTag}>{props.currentItem.targetMaxPoints}</Text>
                    </View>
                    <Text style={styles.attributeTag}>{firstHitCountsContent}</Text>
                </View>
                <View>
                    <View style={styles.sectionTitleWrapper}>
                        <Text style={styles.sectionTitle}>{strings.pointageShowTitle}</Text>
                    </View>
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
        fontSize: sizes.fonts.xlarge,
        paddingBottom: 10,
        fontWeight: "bold",
        borderBottomWidth: 1
    },
    sectionTitle: {
        fontSize: sizes.fonts.large,
        fontWeight: "bold",
        padding: 10
    },
    generalInfos: {
        borderBottomWidth: 1
    },
    attributeTag: {
        fontSize: sizes.fonts.medium,
        paddingTop: 5,
        paddingBottom: 5
    },
    buttonWrapper: {
        paddingBottom: 10
    },
    outerButtonWrapper: {
        paddingBottom: 30,
        paddingTop: 10
    },
    arrowWrapper: {
        paddingTop: 5,
        paddingBottom: 5
    },
    arrowTag: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: sizes.fonts.medium,
        fontWeight: 'bold'
    },
    zoneWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    zoneTag: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: sizes.fonts.medium
    },
    attributeTupel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    sectionTitleWrapper: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default PointageDetailComponent;