import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import strings from '../../constants/strings';
import screens from '../../constants/screens';
import AppButton from '../../components/general/AppButton';
import DataService from '../../services/DataService';
import RoundListItem from '../../components/round/RoundListItem';
import UserFirstCreateComponent from '../../components/users/UserFirstCreateComponent';
import RoundDetailsComponent from '../../components/round/RoundDetailsComponent';
import HeaderComponent from '../../components/general/HeaderComponent';
import CreateShooterComponent from '../../components/users/CreateShooterComponent';
import ShooterListItem from '../../components/users/ShooterListItem';
import DeleteShooterComponent from '../../components/users/DeleteShooterComponent';

const UserScreen = props => {

    const [firstRound, setFirstRound] = useState(true);
    const [knownShooters, setKnownShooters] = useState([]);
    const [createShooterModal, setCreateShooterModal] = useState(false);
    const [deleteShooterModal, setDeleteShooterModal] = useState(false);
    const [selectedShooter, setSelectedShooter] = useState({ name: "not selected" })

    if (firstRound) {
        DataService.getShooters().then(result => {
            setKnownShooters(result);
        })
        setFirstRound(false);
    }

    const showCreateShooterModal = () => {
        setCreateShooterModal(true);
    }

    const hideCreateShooterModal = () => {
        setFirstRound(true);
        setCreateShooterModal(false);
    }

    const showDeleteShooterModal = () => {
        setDeleteShooterModal(true);
    }

    const hideDeleteShooterModal = () => {
        setDeleteShooterModal(false);
    }

    const shooterSelectedHandler = (shooter) => {
        setSelectedShooter(shooter);
        showDeleteShooterModal();
    }

    const deletedShooterHandler = () => {
        setFirstRound(true);
    }

    return (
        <View style={styles.screen}>
            <HeaderComponent
                title={strings.configureShootersScreenTitle}
                changeScreen={props.changeScreen}
                backScreen={screens.main}
            />
            <View style={styles.buttonWrapper}>
                <AppButton
                    title={strings.createShooterButton}
                    onPress={showCreateShooterModal}
                />
            </View>
            <CreateShooterComponent
                visibleStatus={createShooterModal}
                backPress={hideCreateShooterModal}
            />
            <DeleteShooterComponent
                visibleStatus={deleteShooterModal}
                backPress={hideDeleteShooterModal}
                shooter={selectedShooter}
                onDeleted={deletedShooterHandler}
            />
            <View sstyle={styles.contentWrapper}>
                <ScrollView>
                    <View style={styles.content}>
                        {knownShooters.map(shooterObject => (
                            <ShooterListItem
                                onTouched={shooterSelectedHandler}
                                key={shooterObject.UUID}
                                shooterItem={shooterObject}
                            />))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }, 
    buttonWrapper: {
        padding: 20
    },
    contentWrapper: {
        flex: 1
    },
    content: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 190
    }
});

export default UserScreen;