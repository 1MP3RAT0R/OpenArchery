import AsyncStorage from "@react-native-community/async-storage";

import storageKeys from '../constants/storageKeys';

const DataService = {

    // load, delete and save ROUND data

    addRounds: async (newRounds) => {
        await AsyncStorage.getItem(storageKeys.rounds).then(result => {
            let oldresult = [];
            if (result !== null) {
                oldresult = JSON.parse(result);
            }
            let newresult = oldresult.concat(newRounds);
            AsyncStorage.setItem(storageKeys.rounds, JSON.stringify(newresult));
        })
    },

    getRounds: async () => {
        const result = await AsyncStorage.getItem(storageKeys.rounds);
        if (result !== null) {
            return JSON.parse(result);
        } else {
            return [];
        }
    },

    deleteRound: async (UUID) => {
        await AsyncStorage.getItem(storageKeys.rounds).then(result => {
            let newContent = [];
            if (result !== null) {
                result = JSON.parse(result);
                result.forEach(round => {
                    if (round.UUID != UUID) {
                        newContent.push(round);
                    }
                });
            }
            AsyncStorage.setItem(storageKeys.rounds, JSON.stringify(newContent));
        })
    },

    // load, delete and save SHOOTER data

    addShooters: async (newUser) => {
        await AsyncStorage.getItem(storageKeys.shooters).then(result => {
            let oldresult = [];
            if (result !== null) {
                oldresult = JSON.parse(result);
            }
            let newresult = oldresult.concat(newUser);
            AsyncStorage.setItem(storageKeys.shooters, JSON.stringify(newresult));
        })
    },

    getShooters: async () => {
        const result = await AsyncStorage.getItem(storageKeys.shooters);
        if (result !== null) {
            return JSON.parse(result);
        } else {
            return [];
        }
    },

    deleteShooter: async (UUID) => {
        await AsyncStorage.getItem(storageKeys.shooters).then(result => {
            let newContent = [];
            if (result !== null) {
                result = JSON.parse(result);
                result.forEach(shooter => {
                    if (shooter.UUID != UUID) {
                        newContent.push(shooter);
                    }
                });
            }
            AsyncStorage.setItem(storageKeys.shooters, JSON.stringify(newContent));
        })
    },

    // load, delete and save POINTS data

    addPointages: async (newPointages) => {
        await AsyncStorage.getItem(storageKeys.pointages).then(result => {
            let oldresult = [];
            if (result !== null) {
                oldresult = JSON.parse(result);
            }
            let newresult = oldresult.concat(newPointages);
            AsyncStorage.setItem(storageKeys.pointages, JSON.stringify(newresult));
        })
    },

    getPointages: async () => {
        const result = await AsyncStorage.getItem(storageKeys.pointages);
        if (result !== null) {
            return JSON.parse(result);
        } else {
            return [];
        }
    },

    deletePointage: async (UUID) => {
        await AsyncStorage.getItem(storageKeys.pointages).then(result => {
            let newContent = [];
            if (result !== null) {
                result = JSON.parse(result);
                result.forEach(pointage => {
                    if (pointage.UUID != UUID) {
                        newContent.push(pointage);
                    }
                });
            }
            AsyncStorage.setItem(storageKeys.pointages, JSON.stringify(newContent));
        })
    },

    // get and set User

    getUser: async () => {
        const result = await AsyncStorage.getItem(storageKeys.user);
        if (result !== null) {
            return JSON.parse(result);
        } else {
            return null;
        }
    },

    setUser: async (user) => {
        return await AsyncStorage.setItem(storageKeys.user, JSON.stringify(user));
    }
}

export default DataService;