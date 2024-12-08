
let deviceList = {
    //////////////////////////////////////////////////////////////////////////
    // valve simulation - STM32WL Nucleo
    /////////////////////////////////////////////////////////////////////////
    "valve": {
        "identity": {},
        "controller": {
            "debug": debugDefault,
            "model": "distechControls",
            "interface": interface,
            "ipAddress": ipAddress,
            "login": login,
            "password": password,

        },
        "lorawan": {
            "networkServer": networkServer,
            "downlinkPort": 30,
            "flushDownlinkQueue": true,
            "chirpstack": {
                "grpcApikey": chirpstackGrpcApikey
            },
            "actility": {
                "driver": {
                    "pId": "usmb",
                    "mId": "valve",
                    "ver": "1"
                }
            }
        },
        "bacnet": {
            "offset": 0,
            "instanceRange": 10,
            "objects": {
                "valveSetpoint": { "lorawanPayloadName": "valveSetpoint", "objectType": "analogValue", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "valveTemperature": { "lorawanPayloadName": "valveTemperature", "objectType": "analogValue", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "controllerSetpoint": { "lorawanPayloadName": "controllerSetpoint", "objectType": "analogValue", "instanceNum": 2, "dataDirection": "downlink", "value": 20 }
            }
        },
        "mqtt": {
            "topicDownlink": {},
        }
    },

    //////////////////////////////////////////////////////////////////////////
    // Temperature-Humidity sensor - LHT-65
    /////////////////////////////////////////////////////////////////////////

    "lht65": {
        "identity": {},
        "controller": {
            "debug": debugDefault,
            "model": "distechControls",
            "interface": interface,
            "ipAddress": ipAddress,
            "login": login,
            "password": password,
        },
        "lorawan": {
            "networkServer": networkServer,
            "downlinkPort": null,
            "flushDownlinkQueue": true,
            "chirpstack": {
                "grpcApikey": chirpstackGrpcApikey
            },
            "actility": {
                "driver": {
                    "pId": "TO_CONFIGURE_IF_USING_ACTILITY_AND_DOWNLINK",
                    "mId": "TO_CONFIGURE_IF_USING_ACTILITY_AND_DOWNLINK",
                    "ver": "TO_CONFIGURE_IF_USING_ACTILITY_AND_DOWNLINK"
                }
            }
        },
        "bacnet": {
            "offset": 1000,
            "instanceRange": 5,
            "objects": {
                "temperature": { "lorawanPayloadName": "TempC_SHT", "objectType": "analogValue", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "humidity": { "lorawanPayloadName": "Hum_SHT", "objectType": "analogValue", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "batteryVoltage": { "lorawanPayloadName": "BatV", "objectType": "analogValue", "instanceNum": 2, "dataDirection": "uplink", "value": null }
            }
        },
        "mqtt": {
            "topicDownlink": {},
        }
    },

    //////////////////////////////////////////////////////////////////////////
    // Thermostatic valve - MClimate Vicki
    /////////////////////////////////////////////////////////////////////////
    "vicki": {
        "identity": {},
        "controller": {
            "debug": debugDefault,
            "model": "distechControls",
            "interface": interface,
            "ipAddress": ipAddress,
            "login": login,
            "password": password,
        },
        "lorawan": {
            "networkServer": networkServer,
            "downlinkPort": 1,
            "flushDownlinkQueue": true,
            "chirpstack": {
                "grpcApikey": chirpstackGrpcApikey
            },
            "actility": {
                "driver": {
                    "pId": "TO_CONFIGURE_IF_USING_ACTILITY_AND_DOWNLINK",
                    "mId": "TO_CONFIGURE_IF_USING_ACTILITY_AND_DOWNLINK",
                    "ver": "TO_CONFIGURE_IF_USING_ACTILITY_AND_DOWNLINK"
                }
            }
        },
        "bacnet": {
            "offset": 3000,
            "instanceRange": 10,
            "objects": {
                "valveSetpoint": { "lorawanPayloadName": "targetTemperature", "objectType": "analogValue", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "valveTemperature": { "lorawanPayloadName": "sensorTemperature", "objectType": "analogValue", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "controllerSetpoint": { "lorawanPayloadName": "setTargetTemperature", "objectType": "analogValue", "instanceNum": 2, "dataDirection": "downlink", "value": 21 },
                "valvePosition": { "lorawanPayloadName": "valveOpenness", "objectType": "analogValue", "instanceNum": 3, "dataDirection": "uplink", "value": null },
                "valveChildLock": { "lorawanPayloadName": "childLock", "objectType": "binaryValue", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "controllerChildLock": { "lorawanPayloadName": "setChildLock", "objectType": "binaryValue", "instanceNum": 1, "dataDirection": "downlink", "value": true },
                "batteryVoltage": { "lorawanPayloadName": "batteryVoltage", "objectType": "analogValue", "instanceNum": 4, "dataDirection": "uplink", "value": null },
                "openWindownDetection": { "lorawanPayloadName": "openWindow", "objectType": "binaryValue", "instanceNum": 2, "dataDirection": "uplink", "value": null },
                "valveHumidity": { "lorawanPayloadName": "relativeHumidity", "objectType": "analogValue", "instanceNum": 5, "dataDirection": "uplink", "value": null },

            }
        },
        "mqtt": {
            "topicDownlink": {},
        }
    },

    //////////////////////////////////////////////////////////////////////////
    // Thermostatic Valve - Milesight - wt101
    /////////////////////////////////////////////////////////////////////////
    "wt101": {
        "identity": {},
        "controller": {
            "debug": debugDefault,
            "model": "distechControls",
            "interface": interface,
            "ipAddress": ipAddress,
            "login": login,
            "password": password,
        },
        "lorawan": {
            "networkServer": networkServer,
            "downlinkPort": 85,
            "flushDownlinkQueue": true,
            "chirpstack": {
                "grpcApikey": chirpstackGrpcApikey
            },
            "actility": {
                "driver": {
                    "pId": "usmb",
                    "mId": "valve",
                    "ver": "1"
                }
            }
        },
        "bacnet": {
            "offset": 4000,
            "instanceRange": 10,
            "objects": {
                "valveSetpoint": { "lorawanPayloadName": "temperature_target", "objectType": "analogValue", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "valveTemperature": { "lorawanPayloadName": "temperature", "objectType": "analogValue", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "controllerSetpoint": { "lorawanPayloadName": "temperature_target", "objectType": "analogValue", "instanceNum": 2, "dataDirection": "downlink", "value": 20 },
                "controllerSetpointError": { "lorawanPayloadName": "temperature_error", "objectType": "analogValue", "instanceNum": 3, "dataDirection": "downlink", "value": 0.1 }
            }
        },
        "mqtt": {
            "topicDownlink": {},
        }
    },

    //////////////////////////////////////////////////////////////////////////
    // Thermostatic valve - Micropelt MLR003
    /////////////////////////////////////////////////////////////////////////
    "mlr003": {
        "identity": {},
        "controller": {
            "debug": debugDefault,
            "model": "distechControls",
            "interface": interface,
            "ipAddress": ipAddress,
            "login": login,
            "password": password,
        },
        "lorawan": {
            "networkServer": networkServer,
            "downlinkPort": 1,
            "flushDownlinkQueue": true,
            "chirpstack": {
                "grpcApikey": chirpstackGrpcApikey
            },
            "actility": {
                "driver": {
                    "pId": "TO_CONFIGURE_IF_USING_ACTILITY_AND_DOWNLINK",
                    "mId": "TO_CONFIGURE_IF_USING_ACTILITY_AND_DOWNLINK",
                    "ver": "TO_CONFIGURE_IF_USING_ACTILITY_AND_DOWNLINK"
                }
            }
        },
        "bacnet": {
            "offset": 5000,
            "instanceRange": 10,
            "objects": {
                "valveSetpoint": { "lorawanPayloadName": "User_Value", "objectType": "analogValue", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "valveTemperature": { "lorawanPayloadName": "Ambient_Temperature", "objectType": "analogValue", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "controllerSetpoint": { "lorawanPayloadName": "controllerSetpoint", "objectType": "analogValue", "instanceNum": 2, "dataDirection": "downlink", "value": 20 },
                "userMode": { "lorawanPayloadName": "User_Mode", "objectType": "analogValue", "instanceNum": 3, "dataDirection": "uplink", "value": null },
                "currentConsumed": { "lorawanPayloadName": "Average_Current_Consumed", "objectType": "analogValue", "instanceNum": 4, "dataDirection": "uplink", "value": null },
                "currentGenerated": { "lorawanPayloadName": "Average_Current_Generated", "objectType": "analogValue", "instanceNum": 5, "dataDirection": "uplink", "value": null },
                "valvePosition": { "lorawanPayloadName": "Current_Valve_Position", "objectType": "analogValue", "instanceNum": 6, "dataDirection": "uplink", "value": null },
                "valveFlowTemperature": { "lorawanPayloadName": "Flow_Temperature", "objectType": "analogValue", "instanceNum": 7, "dataDirection": "uplink", "value": null },
                "batteryVoltage": { "lorawanPayloadName": "Storage_Voltage", "objectType": "analogValue", "instanceNum": 8, "dataDirection": "uplink", "value": null },
                "ackError": { "lorawanPayloadName": "Radio_Communication_Error", "objectType": "binaryValue", "instanceNum": 0, "dataDirection": "uplink", "value": null },
            }
        },
        "mqtt": {
            "topicDownlink": {},
        }
    },

    //////////////////////////////////////////////////////////////////////////
    // Current sensor - ATIM TCT e-green
    /////////////////////////////////////////////////////////////////////////
    "egreen": {
        "identity": {},
        "controller": {
            "debug": debugDefault,
            "model": "distechControls",
            "interface": interface,
            "ipAddress": ipAddress,
            "login": login,
            "password": password,
        },
        "lorawan": {
            "networkServer": networkServer,
            "downlinkPort": null,
            "flushDownlinkQueue": true,
            "chirpstack": {
                "grpcApikey": chirpstackGrpcApikey
            },
            "actility": {
                "driver": {
                    "pId": "TO_CONFIGURE_IF_USING_ACTILITY_AND_DOWNLINK",
                    "mId": "TO_CONFIGURE_IF_USING_ACTILITY_AND_DOWNLINK",
                    "ver": "TO_CONFIGURE_IF_USING_ACTILITY_AND_DOWNLINK"
                }
            }
        },
        "bacnet": {
            "offset": 6000,
            "instanceRange": 10,
            "objects": {
                "batteryVoltage": { "lorawanPayloadName": "tension.value[0]", "objectType": "analogValue", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "temperature": { "lorawanPayloadName": "temperature0.value[0]", "objectType": "analogValue", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "current": { "lorawanPayloadName": "courant.value[0]", "objectType": "analogValue", "instanceNum": 2, "dataDirection": "uplink", "value": null }
            }
        },
        "mqtt": {
            "topicDownlink": {},
        }
    },

}