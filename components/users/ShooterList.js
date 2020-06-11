import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import screens from '../../constants/screens';
import colors from '../../constants/colors';
import strings from '../../constants/strings';
import roundStates from '../../constants/roundStates';

const ShooterList = props => {

    const removeShooterHandler = (UUID) => {
        props.onDelete(UUID);
    }

    let content = <View style={styles.nanWrapper}><Text style={styles.nanText}>{strings.noShooterInListMessage}</Text></View>;

    if (props.shooters.length > 0) {

        let userIncluded = false;
        const otherShooters = [];

        for (let i = 0; i < props.shooters.length; i++) {
            if (props.shooters[i].UUID == props.user.UUID) {
                userIncluded = true;
            } else {
                otherShooters.push(props.shooters[i]);
            }
        }

        if (userIncluded) {
            content = (
                <View>
                    <View style={styles.shooterOuterWrapper}>
                        <View style={styles.shooterWrapper}>
                            <Text style={styles.shooterName}>{props.user.name} ({strings.theShooterIsMeTag})</Text>
                        </View>
                    </View>
                    {otherShooters.map(shooter => (
                        <View key={shooter.UUID + Math.random()} style={styles.shooterOuterWrapper}>
                            <View style={styles.shooterWrapper}>
                                <Text style={styles.shooterName}>{shooter.name}</Text>
                                <TouchableOpacity
                                    style={styles.removeShooterWrapper}
                                    onPress={() => removeShooterHandler(shooter.UUID)}
                                    activeOpacity={0.9}
                                >
                                    <Image
                                        style={styles.removeShooter}
                                        source={require('../../assets/images/minus-sign.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            );
        } else {
            content = (
                <View>
                    {otherShooters.map(shooter => (
                        <View key={shooter.UUID + Math.random()} style={styles.shooterOuterWrapper}>
                            <View style={styles.shooterWrapper}>
                                <Text style={styles.shooterName}>{shooter.name}</Text>
                                <TouchableOpacity
                                    style={styles.removeShooterWrapper}
                                    onPress={() => removeShooterHandler(shooter.UUID)}
                                    activeOpacity={0.9}
                                >
                                    <Image
                                        style={styles.removeShooter}
                                        source={require('../../assets/images/minus-sign.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            );
        }
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.listWrapper}>
                {content}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {

    },
    listWrapper: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 3,
        justifyContent: 'center',
        alignContent: 'center'
    },
    nanText: {
        fontSize: 15
    },
    nanWrapper: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: "center"
    },
    shooterOuterWrapper: {
        padding: 5
    },
    shooterWrapper: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: "center"
    },
    shooterName: {
        fontSize: 20
    },
    removeShooter: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    removeShooterWrapper: {

    }
});

export default ShooterList;