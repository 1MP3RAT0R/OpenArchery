export default {
    pointages: [
        {
            UUID: 'initial-1',
            name: "Bärs Runde",
            arrows: 3,
            hitZones: 3,
            firstHitCounts: false,
            deletable: false,
            pointage: [
                {
                    arrow: 1,
                    points: [
                        {
                            zone: 1,
                            points: 10
                        },
                        {
                            zone: 2,
                            points: 8
                        },
                        {
                            zone: 3,
                            points: 5
                        }
                    ]
                },
                {
                    arrow: 2,
                    points: [
                        {
                            zone: 1,
                            points: 10
                        },
                        {
                            zone: 2,
                            points: 8
                        },
                        {
                            zone: 3,
                            points: 5
                        }
                    ]
                },
                {
                    arrow: 3,
                    points: [
                        {
                            zone: 1,
                            points: 10
                        },
                        {
                            zone: 2,
                            points: 8
                        },
                        {
                            zone: 3,
                            points: 5
                        }
                    ]
                }
            ]
        },
        {
            UUID: 'initial-2',
            name: "Jagdrunde (3P 3Z)",
            arrows: 3,
            hitZones: 3,
            firstHitCounts: true,
            deletable: false,
            pointage: [
                {
                    arrow: 1,
                    points: [
                        {
                            zone: 1,
                            points: 20
                        },
                        {
                            zone: 2,
                            points: 18
                        },
                        {
                            zone: 3,
                            points: 16
                        }
                    ]
                },
                {
                    arrow: 2,
                    points: [
                        {
                            zone: 1,
                            points: 14
                        },
                        {
                            zone: 2,
                            points: 12
                        },
                        {
                            zone: 3,
                            points: 10
                        }
                    ]
                },
                {
                    arrow: 3,
                    points: [
                        {
                            zone: 1,
                            points: 8
                        },
                        {
                            zone: 2,
                            points: 6
                        },
                        {
                            zone: 3,
                            points: 4
                        }
                    ]
                }
            ]
        },
        {
            UUID: 'initial-3',
            name: "Hunterrunde (1P 3Z)",
            arrows: 1,
            hitZones: 3,
            firstHitCounts: true,
            deletable: false,
            pointage: [
                {
                    arrow: 1,
                    points: [
                        {
                            zone: 1,
                            points: 15
                        },
                        {
                            zone: 2,
                            points: 12
                        },
                        {
                            zone: 3,
                            points: 7
                        }
                    ]
                }
            ]
        },
        {
            UUID: 'initial-4',
            name: "Allgemein (3P 2Z)",
            arrows: 3,
            hitZones: 2,
            firstHitCounts: true,
            deletable: false,
            pointage: [
                {
                    arrow: 1,
                    points: [
                        {
                            zone: 1,
                            points: 20
                        },
                        {
                            zone: 2,
                            points: 16
                        }
                    ]
                },
                {
                    arrow: 2,
                    points: [
                        {
                            zone: 1,
                            points: 14
                        },
                        {
                            zone: 2,
                            points: 10
                        }
                    ]
                },
                {
                    arrow: 3,
                    points: [
                        {
                            zone: 1,
                            points: 8
                        },
                        {
                            zone: 2,
                            points: 4
                        }
                    ]
                }
            ]
        },
        {
            UUID: 'initial-5',
            name: "Waldrunde (3P 2Z)",
            arrows: 1,
            hitZones: 3,
            firstHitCounts: true,
            deletable: false,
            pointage: [
                {
                    arrow: 1,
                    points: [
                        {
                            zone: 1,
                            points: 15
                        },
                        {
                            zone: 2,
                            points: 12
                        }
                    ]
                },
                {
                    arrow: 2,
                    points: [
                        {
                            zone: 1,
                            points: 10
                        },
                        {
                            zone: 2,
                            points: 7
                        }
                    ]
                },
                {
                    arrow: 3,
                    points: [
                        {
                            zone: 1,
                            points: 5
                        },
                        {
                            zone: 2,
                            points: 2
                        }
                    ]
                }
            ]
        },
    ],
    rounds: [
        {
            UUID: "uuid",
            timestamp: "10.03.2018 10:20",
            targetCount: 2,
            pointageName: "Pointage Name",
            pointageUUID: "uuid",
            status: "begun",
            currentRound: 2,
            shooters: [
                {
                    uuid: "uuid",
                    name: "Bernd",
                    pointSum: 32
                },
                {
                    uuid: "uuid",
                    name: "Guido",
                    pointSum: 34
                }
            ],
            targets: [
                {
                    number: 1,
                    hits: [
                        {
                            shooter: "uuid",
                            shooterName: "Guido",
                            shots: [
                                {
                                    arrow: 1,
                                    zone: 1,
                                    points: 20
                                }
                            ]
                        },
                        {
                            shooter: "uuid",
                            shooterName: "Bernd",
                            shots: [
                                {
                                    arrow: 1,
                                    zone: 2,
                                    points: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    number: 2,
                    hits: [
                        {
                            shooter: "uuid",
                            shooterName: "Guido",
                            shots: [
                                {
                                    arrow: 2,
                                    zone: 1,
                                    points: 14
                                }
                            ]
                        },
                        {
                            shooter: "uuid",
                            shooterName: "Bernd",
                            shots: [
                                {
                                    arrow: 1,
                                    zone: 2,
                                    points: 16
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    shooters: [
        {
            name: "Guido",
            uuid: "uuid"
        },
        {
            name: "Elke",
            uuid: "uuid"
        }
    ]
}