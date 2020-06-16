import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { BarChart, YAxis, XAxis, Grid, Line, Decorator } from 'react-native-svg-charts';
import * as scale from 'd3-scale';

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
                tmpShooterObject.pointsData.push({
                    label: String(i + 1),
                    value: pointTargetSum
                });
            }
            tmpPointsChartData.push(JSON.parse(JSON.stringify(tmpShooterObject)));
        }
        setPointsChartsData(tmpPointsChartData);
        console.log(JSON.stringify(tmpPointsChartData));
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
                            <BarChart
                                style={{ flex: 1, marginLeft: 8 }}
                                data={pointsObj.pointsData}
                                horizontal={true}
                                yAccessor={({ item }) => item.value}
                                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                                contentInset={{ top: 10, bottom: 10 }}
                                spacing={0.2}
                                gridMin={0}
                            >
                                <Grid direction={Grid.Direction.VERTICAL} />
                            </BarChart>
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
    pointsLineChartInner: {
        height: 200,
        flexDirection: 'row'
    },
    pointsLineChart: {
        flexDirection: 'row',
        height: 200,
        paddingVertical: 16
    },
    shooterName: {
        fontSize: sizes.fonts.large,
        paddingBottom: 10
    },
    yAxis: {
        top: 20,
        bottom: 20
    },
    xAxisWrapper: {
        paddingLeft: 18
    }
});

export default RoundStatisticsScreen;