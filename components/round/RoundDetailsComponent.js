import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';
import AppButton from '../general/AppButton';
import AppButtonDeny from '../general/AppButtonDeny';
import roundStates from '../../constants/roundStates';
import AppButtonSuccess from '../general/AppButtonSuccess';
import DataService from '../../services/DataService';
import DeleteConfirmationComponent from './DeleteConfirmationComponent';

const RoundDetailsComponent = props => {

    const [deleteRoundModal, setDeleteRoundModal] = useState(false);

    const deleteButtonHandler = () => {
        setDeleteRoundModal(true);
    }

    const hideDeleteRoundModal = () => {
        setDeleteRoundModal(false);
    }

    const deleteRoundHandler = () => {
        DataService.deleteRound(props.round.UUID).then(result => {
            setDeleteRoundModal(false);
            props.onClose();
        })
    }

    let status = '';

    if (props.round.status == roundStates.begun) {
        status = strings.roundStatusBegun;
    } else if (props.round.status == roundStates.done) {
        status = strings.roundStatusDone;
    } else if (props.round.status == roundStates.aborted) {
        status = strings.roundStatusAborted;
    }

    let buttons = (
        <View>
            <View style={styles.backButton}>
                <AppButton title={strings.backButton} onPress={() => props.onClose()} />
            </View>
            <View style={styles.deleteButton}>
                <AppButtonDeny title={strings.deleteButton} onPress={() => deleteButtonHandler()} />
            </View>
        </View>
    );

    if (props.round.status == roundStates.begun) {
        buttons = (
            <View>
                <DeleteConfirmationComponent
                    visibleStatus={deleteRoundModal}
                    deleteRoundHandler={deleteRoundHandler}
                    backPress={hideDeleteRoundModal}
                />
                <View style={styles.backButton}>
                    <AppButtonSuccess title={strings.continueRoundButton} onPress={() => props.onClose()} />
                </View>
                <View style={styles.backButton}>
                    <AppButton title={strings.backButton} onPress={() => props.onClose()} />
                </View>
                <View style={styles.deleteButton}>
                    <AppButtonDeny title={strings.deleteButton} onPress={() => deleteButtonHandler()} />
                </View>
            </View>
        );
    }

    let shooterInfos = <View></View>;

    if (props.round && props.round.shooters && props.round.shooters.length > 0) {
        shooterInfos = props.round.shooters.map(shooter => (
            <View key={shooter.UUID} style={styles.item}>
                <Text style={styles.itemText}>{shooter.name}</Text>
                <Text style={styles.itemText}>{shooter.pointSum}</Text>
            </View>
        ));
    }

    let content = <View></View>;

    if (props.round.pointage) {
        content = (
            <View style={styles.screen}>
                <Text style={styles.header}>{props.round.timestamp}</Text>
                <ScrollView>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{strings.statusLabel}</Text>
                        <Text style={styles.itemText}>{status}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{strings.pointeageUsedLabel}</Text>
                        <Text style={styles.itemText}>{props.round.pointage.name}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{strings.shotTargetsLabel}</Text>
                        <Text style={styles.itemText}>{props.round.completed}/{props.round.targetCount}</Text>
                    </View>
                    <Text style={styles.shootersHeader}>{strings.shootersHeaderLabel}</Text>
                    <View style={styles.shootersWrapper}>
                        {shooterInfos = props.round.shooters.map(shooter => (
                            <View key={shooter.UUID} style={styles.item}>
                                <Text style={styles.itemText}>{shooter.name}</Text>
                                <Text style={styles.itemText}>{shooter.pointSum}</Text>
                            </View>
                        ))}
                    </View>

                    {buttons}
                </ScrollView>
            </View>
        );
    }

    return (
        <Modal visible={props.visible} animationType='slide'>
            {content}
        </Modal>
    );
};

const styles = StyleSheet.create({
    screen: {
        padding: 30
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingBottom: 20
    },
    backButton: {
        paddingBottom: 5,
        paddingTop: 5
    },
    deleteButton: {
        paddingBottom: 40,
        paddingTop: 5
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    itemText: {
        fontSize: 20,
        padding: 5
    },
    shootersHeader: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 10,
        padding: 5
    },
    shootersWrapper: {
        paddingBottom: 10
    }
});

export default RoundDetailsComponent;