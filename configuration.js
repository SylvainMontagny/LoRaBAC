/////////////////////////////////////////////////////
////////////    TO CONFIGURE      ///////////////////
/////////////////////////////////////////////////////

const debugDefault = ["all"];   // ["all", "up", "down", "creation", "txTime"]
const ipAddress = "TO_CONFIGURE";               // "a.b.c.d"
const networkServer = "TO_CONFIGURE";           // tts, chirpstack, actility 
const protocol = "TO_CONFIGURE";               // restAPIBacnet, bacnet, later : restAPIModbus, modbus
const chirpstackGrpcApikey = "TO_CONFIGURE_IF_USING_CHIRPSTACK"     // chirpstack only
const login = "TO_CONFIGURE_IF_USING_restAPIBacnet";
const password = "TO_CONFIGURE_IF_USING_restAPIBacnet";


let deviceList = {
   
    //////////////////////////////////////////////////////////////////////////
    // valve simulation - STM32WL Nucleo
    /////////////////////////////////////////////////////////////////////////
    "usmb-valve": {
        "controller": {
            "debug": debugDefault,
            "model": "distechControlsV2",
            "protocol": protocol,
            "ipAddress": ipAddress,
            "login": login,
            "password": password,

        },
        "lorawan": {
            "networkServer": networkServer,
            "downlinkPort": 30,
            "flushDownlinkQueue": false,
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
        }
    },
    //////////////////////////////////////////////////////////////////////////
    // Temperature-Humidity sensor - LHT-65
    /////////////////////////////////////////////////////////////////////////

    "dragino-lht65": {
        "controller": {
            "debug": debugDefault,
            "model": "distechControlsV2",
            "protocol": protocol,
            "ipAddress": ipAddress,
            "login": login,
            "password": password,
        },
        "lorawan": {
            "networkServer": networkServer
        },
        "bacnet": {
            "offset": 1000,
            "instanceRange": 5,
            "objects": {
                "temperature": { "lorawanPayloadName": "TempC_SHT", "objectType": "analogValue", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "humidity": { "lorawanPayloadName": "Hum_SHT", "objectType": "analogValue", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "batteryVoltage": { "lorawanPayloadName": "BatV", "objectType": "analogValue", "instanceNum": 2, "dataDirection": "uplink", "value": null }
            }
        }
    },



    //////////////////////////////////////////////////////////////////////////
    // Temperature and Humidity sensor - WATTECO Tempo
    /////////////////////////////////////////////////////////////////////////
    "watteco-tempo": {
        "controller": {
            "debug": debugDefault, 
            "model": "distechControlsV2",
            "protocol": protocol,
            "ipAddress": ipAddress,
            "login": login,
            "password": password,
        },
        "lorawan": {
            "networkServer": networkServer
        },
        "bacnet": {
            "offset": 2000,
            "instanceRange": 5,
            "objects": {
                "temperature": { "lorawanPayloadName": "data[5].value", "objectType": "analogValue", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "humidity": { "lorawanPayloadName": "data[11].value", "objectType": "analogValue", "instanceNum": 1, "dataDirection": "uplink", "value": null }
            }
        }
    },

    //////////////////////////////////////////////////////////////////////////
    // C02 - Temperature - Humidity sensor - ATIM THAQ
    /////////////////////////////////////////////////////////////////////////
    "atim-thaq": {
        "controller": {
            "debug": debugDefault, 
            "model": "distechControlsV2",
            "protocol": protocol,
            "ipAddress": ipAddress,
            "login": login,
            "password": password,
        },
        "lorawan": {
            "networkServer": networkServer
        },
        "bacnet": {
            "offset": 2100,
            "instanceRange": 5,
            "objects": {
                "co2": { "lorawanPayloadName": "C02.value[0]", "objectType": "analogValue", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "humidity": { "lorawanPayloadName": "humidity0.value[0]", "objectType": "analogValue", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "cov": { "lorawanPayloadName": "COV.value[0]", "objectType": "analogValue", "instanceNum": 2, "dataDirection": "uplink", "value": null },
                "temperature": { "lorawanPayloadName": "temperature0.value[0]", "objectType": "analogValue", "instanceNum": 3, "dataDirection": "uplink", "value": null }
            }
        }
    },

    //////////////////////////////////////////////////////////////////////////
    // C02 - Temperature - Humidity sensor - ELSYS ERS2C02
    /////////////////////////////////////////////////////////////////////////
    "elsys-ers2co2": {
        "controller": {
            "debug": debugDefault,
            "model": "distechControlsV2",
            "protocol": protocol,
            "ipAddress": ipAddress,
            "login": login,
            "password": password,
        },
        "lorawan": {
            "networkServer": networkServer
        },
        "bacnet": {
            "offset": 2200,
            "instanceRange": 10,
            "objects": {
                "co2": { "lorawanPayloadName": "co2", "objectType": "analogValue", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "people": { "lorawanPayloadName": "motion", "objectType": "analogValue", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "humidity": { "lorawanPayloadName": "humidity", "objectType": "analogValue", "instanceNum": 2, "dataDirection": "uplink", "value": null },
                "temperature": { "lorawanPayloadName": "temperature", "objectType": "analogValue", "instanceNum": 3, "dataDirection": "uplink", "value": null },
                "batteryVoltage": { "lorawanPayloadName": "vdd", "objectType": "analogValue", "instanceNum": 4, "dataDirection": "uplink", "value": null },
                "light": { "lorawanPayloadName": "light", "objectType": "analogValue", "instanceNum": 5, "dataDirection": "uplink", "value": null }
            }
        }
    },

    //////////////////////////////////////////////////////////////////////////
    // Thermostatic valve - MClimate Vicki
    /////////////////////////////////////////////////////////////////////////
    "mclimate-vicki": {
        "controller": {
            "debug": debugDefault,
            "model": "distechControlsV2",
            "protocol": protocol,
            "ipAddress": ipAddress,
            "login": login,
            "password": password,
        },
        "lorawan": {
            "networkServer": networkServer,
            "downlinkPort": 1,
            "flushDownlinkQueue": false
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
        }
    },

    //////////////////////////////////////////////////////////////////////////
    // Thermostatic Valve - Milesight - wt101
    /////////////////////////////////////////////////////////////////////////
    "milesight-wt101": {
        "controller": {
            "debug": debugDefault,
            "model": "distechControlsV2",
            "protocol": protocol,
            "ipAddress": ipAddress,
            "login": login,
            "password": password,
        },
        "lorawan": {
            "networkServer": networkServer,
            "downlinkPort": 85,
            "flushDownlinkQueue": false
        },
        "bacnet": {
            "offset": 4000,
            "instanceRange": 10,
            "objects": {
                "valveSetpoint": { "lorawanPayloadName": "temperature_target", "objectType": "analogValue", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "valveTemperature": { "lorawanPayloadName": "temperature", "objectType": "analogValue", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "controllerSetpoint": { "lorawanPayloadName": "temperature_target", "objectType": "analogValue", "instanceNum": 2, "dataDirection": "downlink", "value": 20 },
                "controllerSetpointError": { "lorawanPayloadName": "temperature_error", "objectType": "analogValue", "instanceNum": 3, "dataDirection": "downlink", "value": 0.5 }
            }
        }
    },

    //////////////////////////////////////////////////////////////////////////
    // Thermostatic valve - Micropelt MLR003
    /////////////////////////////////////////////////////////////////////////
    "micropelt-mlr003": {
        "controller": {
            "debug": debugDefault,
            "model": "distechControlsV2",
            "protocol": protocol,
            "ipAddress": ipAddress,
            "login": login,
            "password": password,
        },
        "lorawan": {
            "networkServer": networkServer,
            "downlinkPort": 1,
            "flushDownlinkQueue": false,
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
        }
    },

    //////////////////////////////////////////////////////////////////////////
    // Current sensor - ATIM TCT e-green
    /////////////////////////////////////////////////////////////////////////
    "atim-egreen": {
        "controller": {
            "debug": debugDefault, 
            "model": "distechControlsV2",
            "protocol": protocol,
            "ipAddress": ipAddress,
            "login": login,
            "password": password,
        },
        "lorawan": {
            "networkServer": networkServer
        },
        "bacnet": {
            "offset": 6000,
            "instanceRange": 5,
            "objects": {
                "batteryVoltage": { "lorawanPayloadName": "tension.value[0]", "objectType": "analogValue", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "temperature": { "lorawanPayloadName": "temperature0.value[0]", "objectType": "analogValue", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "current": { "lorawanPayloadName": "courant.value[0]", "objectType": "analogValue", "instanceNum": 2, "dataDirection": "uplink", "value": null }
            }
        }
    },

    //////////////////////////////////////////////////////////////////////////
    // Current sensor - MILESIGHT CT103
    /////////////////////////////////////////////////////////////////////////
    "milesight-ct103": {
        "controller": {
            "debug": debugDefault, 
            "model": "distechControlsV2",
            "protocol": protocol,
            "ipAddress": ipAddress,
            "login": login,
            "password": password,
        },
        "lorawan": {
            "networkServer": networkServer,
            "downlinkPort": null,
            "flushDownlinkQueue": false
        },
        "bacnet": {
            "offset": 6100,
            "instanceRange": 5,
            "objects": {
                "totalCurrent": { "lorawanPayloadName": "total_current", "objectType": "analogValue", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "current": { "lorawanPayloadName": "current", "objectType": "analogValue", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "temperature": { "lorawanPayloadName": "temperature", "objectType": "analogValue", "instanceNum": 2, "dataDirection": "uplink", "value": null }
            }
        }
    }

}