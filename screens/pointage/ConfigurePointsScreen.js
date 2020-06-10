import React, { useState } from 'react';
import { StyleSheet, View, Button, ScrollView } from 'react-native';

import DataService from '../../services/DataService';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';

import HeaderComponent from '../../components/general/HeaderComponent';
import PointageComponent from '../../components/pointage/PointageComponent';
import AppButton from '../../components/general/AppButton';
import PointageDetailComponent from '../../components/pointage/PointageDetailComponent';

const ConfigurePointsScreen = props => {
    const [pointageList, setPointageList] = useState([]);
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    DataService.getPointages().then(result => {
        setPointageList(result);
    })

    const listPress = (item) => {
        setSelectedItem(item);
        setDetailsVisible(true);
    }

    const addPointageHandler = () => {
        props.changeScreen(screens.addPointage);
    }

    const detailsExitHandler = () => {
        setDetailsVisible(false);
    }

    return (
        <View style={styles.screen}>
            <HeaderComponent
                title={strings.configurePointageScreenTitle}
                changeScreen={props.changeScreen}
                backScreen={screens.main}
            />
            <PointageDetailComponent
                visibleStatus={detailsVisible}
                backPress={detailsExitHandler}
                currentItem={selectedItem}
            />
            <View style={styles.content}>
                <AppButton
                    title={strings.configurePointageScreenAddPointageButton}
                    onPress={addPointageHandler}
                />
                <View style={styles.listWrapper}>
                    <ScrollView>
                        {pointageList.map(pointage => <PointageComponent onTouched={listPress} key={pointage.UUID} pointageItem={pointage} />)}
                    </ScrollView>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%'
    },
    listWrapper: {
        marginTop: 10,
        alignSelf: 'stretch'
    },
    content: {
        height: '100%',
        padding: 20,
        flex: 1,
        paddingBottom: 40
    }
});

export default ConfigurePointsScreen;