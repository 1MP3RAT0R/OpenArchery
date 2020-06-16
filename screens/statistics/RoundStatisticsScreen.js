import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';

import DataService from '../../services/DataService';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';
import sizes from '../../constants/sizes';

import HeaderComponent from '../../components/general/HeaderComponent';
import PointageComponent from '../../components/pointage/PointageComponent';
import AppButton from '../../components/general/AppButton';
import PointageDetailComponent from '../../components/pointage/PointageDetailComponent';

const RoundStatisticsScreen = props => {

    const [firstRound, setFirstRound] = useState(true);
    const [pointsChartsData, setPointsChartsData] = useState([]);

    if (firstRound) {

        let tmpPointsChartData = [];
        for (let s = 0; s < props.round.shooters.length; s++) {
            let tmpShooterObject = {
                shooter: props.round.shooters[s].UUID,
                shooterName: props.round.shooters[s].name,
                pointsData: []
            }
            for (let i = 0; i < props.round.targets.length; i++) {
                let pointTargetSum = 0;
                let targetShots = props.round.targets[i].hits.find(hitsObj => hitsObj.shooter === props.round.shooters[s].UUID).shots;
                for (let ts = 0; ts < targetShots.length; ts++) {
                    pointTargetSum += targetShots[ts].points;
                }
                tmpShooterObject.pointsData.push(pointTargetSum);
            }
            tmpPointsChartData.push(JSON.parse(JSON.stringify(tmpShooterObject)));
        }
        setPointsChartsData(tmpPointsChartData);

        setFirstRound(false);
    }

    let pointsChartsView = <View></View>;

    if (pointsChartsData.length > 0) {

        pointsChartsView = (
            <View style={styles.content}>
                {pointsChartsData.map(pointsObj => (
                    <View key={pointsObj.shooter}>
                        <Text style={styles.shooterName}>{pointsObj.shooterName}</Text>
                        <View style={styles.pointsLineChart}>
                            <LineChart
                                style={{ flex: 1 }}
                                data={pointsObj.pointsData}
                                gridMin={0}
                                contentInset={{ top: 10, bottom: 10 }}
                                svg={{ stroke: 'rgb(134, 65, 244)' }}
                            >
                                <Grid />
                            </LineChart>
                            <XAxis
                                style={{ marginHorizontal: -10 }}
                                data={pointsObj.pointsData}
                                formatLabel={(value, index) => { return index + 1 }}
                                contentInset={{ left: 10, right: 10 }}
                                svg={{ fontSize: 10, fill: 'black' }}
                            />
                        </View>
                    </View>
                ))}
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <HeaderComponent
                title={strings.statisticsTitle}
                changeScreen={props.changeScreen}
                backScreen={screens.main}
            />
            <View style={styles.contentWrapper}>
                <ScrollView>
                    {pointsChartsView}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%'
    },
    contentWrapper: {
        paddingTop: 20,
        paddingBottom: 115
    },
    content: {
        paddingRight: 20,
        paddingLeft: 20
    },
    pointsLineChart: {
        
    },
    shooterName: {
        fontSize: sizes.fonts.large
    }
});

export default RoundStatisticsScreen;