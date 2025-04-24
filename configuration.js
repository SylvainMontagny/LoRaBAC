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
        "identity":{
            "maxDevNum": 10
        },
        "lorawan": {
            "class": "C",
            "networkServer": networkServer,
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
            "offsetAV": 0,
            "offsetBV": 0,
            "instanceRangeAV": 10,
            "instanceRangeBV": 0,
            "objects": {
                "valveSetpoint": { "lorawanPayloadName": "valveSetpoint", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "valveTemperature": { "lorawanPayloadName": "valveTemperature", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "controllerSetpoint": { "lorawanPayloadName": "controllerSetpoint", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 2, "dataDirection": "downlink", "downlinkPort": 30, "downlinkPortPriority": "low", "downlinkStrategie": "onChangeOfValueWithinRange", "range":[15,16], "value": 20 },
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
        "identity":{
            "maxDevNum": 10
        },
        "lorawan": {
            "class": "A",
            "networkServer": networkServer
        },
        "bacnet": {
            "offsetAV": 200,
            "offsetBV": 5,
            "instanceRangeAV": 10,
            "instanceRangeBV": 0,
            "objects": {
                "temperature": { "lorawanPayloadName": "TempC_SHT", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "humidity": { "lorawanPayloadName": "Hum_SHT", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "batteryVoltage": { "lorawanPayloadName": "BatV", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 2, "dataDirection": "uplink", "value": null }
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
        "identity":{
            "maxDevNum": 5
        },
        "lorawan": {
            "class": "A",
            "networkServer": networkServer,
            "flushDownlinkQueue": false,
        },
        "bacnet": {
            "offsetAV": 800,
            "offsetBV": 51,
            "instanceRangeAV": 12,
            "instanceRangeBV": 5,
            "objects": {
                ///////////////// UPLINKS /////////////////////
                "valveSetpoint": { "lorawanPayloadName": "User_Value", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "valveTemperature": { "lorawanPayloadName": "Ambient_Temperature", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "usedTemperature": { "lorawanPayloadName": "Used_Temperature", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 11, "dataDirection": "uplink", "value": null },
                "currentConsumed": { "lorawanPayloadName": "Average_Current_Consumed", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 2, "dataDirection": "uplink", "value": null },
                "currentGenerated": { "lorawanPayloadName": "Average_Current_Generated", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 3, "dataDirection": "uplink", "value": null }, 
                "valvePosition": { "lorawanPayloadName": "Current_Valve_Position", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 4, "dataDirection": "uplink", "value": null },
                "valveFlowTemperature": { "lorawanPayloadName": "Flow_Temperature", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 5, "dataDirection": "uplink", "value": null },
                "batteryVoltage": { "lorawanPayloadName": "Storage_Voltage", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 6, "dataDirection": "uplink", "value": null },
                "ackError": { "lorawanPayloadName": "Radio_Communication_Error", "objectType": "binaryValue", "assignementMode":"auto", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                //////////////// DOWNLINKS ////////////////////
                "controllerSetpoint": { "lorawanPayloadName": "setValue", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 7, "dataDirection": "downlink", "downlinkPort": 1, "downlinkPortPriority": "high", "downlinkStrategie": "compareToUplinkValue","uplinkToCompareWith": "valveSetpoint", "value": 20 },
                "userMode": { "lorawanPayloadName": "userMode", "objectType": "binaryValue", "assignementMode":"auto", "instanceNum": 1, "dataDirection": "downlink", "downlinkPort": 1, "downlinkPortPriority": "high", "downlinkStrategie": "noDownlink", "value": 1 },
                "safetyMode": { "lorawanPayloadName": "safetyMode", "objectType": "binaryValue", "assignementMode":"auto", "instanceNum": 2, "dataDirection": "downlink", "downlinkPort": 1, "downlinkPortPriority": "high", "downlinkStrategie": "noDownlink", "value": 1 },
                "safetyValue": { "lorawanPayloadName": "safetyValue", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 8, "dataDirection": "downlink", "downlinkPort": 1, "downlinkPortPriority": "high", "downlinkStrategie": "noDownlink", "value": 20 },
                "Room_Temperature": { "lorawanPayloadName": "Room_Temperature", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 9, "dataDirection": "downlink", "downlinkPort": 10, "downlinkPortPriority": "low", "downlinkStrategie": "compareToUplinkValue","uplinkToCompareWith": "usedTemperature", "value": 0 },
                "radioInterval": { "lorawanPayloadName": "radioInterval", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 10, "dataDirection": "downlink", "downlinkPort": 1, "downlinkPortPriority": "high", "downlinkStrategie": "noDownlink", "value": 10 }
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
        "identity":{
            "class": "A",
            "maxDevNum": 10
        },
        "lorawan": {
            "networkServer": networkServer
        },
        "bacnet": {
            "offsetAV": 300,
            "offsetBV": 5,
            "instanceRangeAV": 10,
            "instanceRangeBV": 0,
            "objects": {
                "temperature": { "lorawanPayloadName": "data[5].value", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "humidity": { "lorawanPayloadName": "data[11].value", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 1, "dataDirection": "uplink", "value": null }
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
        "identity":{
            "maxDevNum": 10
        },
        "lorawan": {
            "class": "A",
            "networkServer": networkServer
        },
        "bacnet": {
            "offsetAV": 400,
            "offsetBV": 5,
            "instanceRangeAV": 10,
            "instanceRangeBV": 0,
            "objects": {
                "co2": { "lorawanPayloadName": "C02.value[0]", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "humidity": { "lorawanPayloadName": "humidity0.value[0]", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "cov": { "lorawanPayloadName": "COV.value[0]", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 2, "dataDirection": "uplink", "value": null },
                "temperature": { "lorawanPayloadName": "temperature0.value[0]", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 3, "dataDirection": "uplink", "value": null }
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
        "identity":{
            "maxDevNum": 10
        },
        "lorawan": {
            "class": "A",
            "networkServer": networkServer
        },
        "bacnet": {
            "offsetAV": 500,
            "offsetBV": 5,
            "instanceRangeAV": 10,
            "instanceRangeBV": 0,
            "objects": {
                "co2": { "lorawanPayloadName": "co2", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "people": { "lorawanPayloadName": "motion", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "humidity": { "lorawanPayloadName": "humidity", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 2, "dataDirection": "uplink", "value": null },
                "temperature": { "lorawanPayloadName": "temperature", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 3, "dataDirection": "uplink", "value": null },
                "batteryVoltage": { "lorawanPayloadName": "vdd", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 4, "dataDirection": "uplink", "value": null },
                "light": { "lorawanPayloadName": "light", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 5, "dataDirection": "uplink", "value": null }
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
        "identity":{
            "maxDevNum": 5
        },
        "lorawan": {
            "class": "A",
            "networkServer": networkServer,
            "flushDownlinkQueue": false
        },
        "bacnet": {
            "offsetAV": 600,
            "offsetBV": 5,
            "instanceRangeAV": 10,
            "instanceRangeBV": 5,
            "objects": {
                "valveSetpoint": { "lorawanPayloadName": "targetTemperature", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "valveTemperature": { "lorawanPayloadName": "sensorTemperature", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "controllerSetpoint": { "lorawanPayloadName": "setTargetTemperature", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 2, "dataDirection": "downlink","downlinkPort": 1, "downlinkPortPriority": "low", "downlinkStrategie": "compareToUplinkValue","uplinkToCompareWith": "valveSetpoint", "value": 21 },
                "valvePosition": { "lorawanPayloadName": "valveOpenness", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 3, "dataDirection": "uplink", "value": null },
                "valveChildLock": { "lorawanPayloadName": "childLock", "objectType": "binaryValue", "assignementMode":"auto", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "controllerChildLock": { "lorawanPayloadName": "setChildLock", "objectType": "binaryValue", "assignementMode":"auto", "instanceNum": 1, "dataDirection": "downlink","downlinkPort": 1, "downlinkPortPriority": "low", "downlinkStrategie": "compareToUplinkValue","uplinkToCompareWith": "valveChildLock", "value": true },
                "batteryVoltage": { "lorawanPayloadName": "batteryVoltage", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 4, "dataDirection": "uplink", "value": null },
                "openWindownDetection": { "lorawanPayloadName": "openWindow", "objectType": "binaryValue", "assignementMode":"auto", "instanceNum": 2, "dataDirection": "uplink", "value": null },
                "valveHumidity": { "lorawanPayloadName": "relativeHumidity", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 5, "dataDirection": "uplink", "value": null },

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
        "identity":{
            "maxDevNum": 10
        },
        "lorawan": {
            "class": "A",
            "networkServer": networkServer,
            "flushDownlinkQueue": false
        },
        "bacnet": {
            "offsetAV": 700,
            "offsetBV": 50,
            "instanceRangeAV": 10,
            "instanceRangeBV": 0,
            "objects": {
                "valveSetpoint": { "lorawanPayloadName": "temperature_target", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "valveTemperature": { "lorawanPayloadName": "temperature", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "controllerSetpoint": { "lorawanPayloadName": "temperature_target", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 2, "dataDirection": "downlink","downlinkPort": 85, "downlinkPortPriority": "low", "downlinkStrategie": "compareToUplinkValue","uplinkToCompareWith": "valveSetpoint", "value": 20 },
                "controllerSetpointError": { "lorawanPayloadName": "temperature_error", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 3, "dataDirection": "downlink","downlinkPort": 85, "downlinkPortPriority": "low", "downlinkStrategie": "noDownlink", "value": 0.5 }
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
        "identity":{
            "maxDevNum": 10
        },
        "lorawan": {
            "class": "A",
            "networkServer": networkServer
        },
        "bacnet": {
            "offsetAV": 900,
            "offsetBV": 100,
            "instanceRangeAV": 10,
            "instanceRangeBV": 0,
            "objects": {
                "batteryVoltage": { "lorawanPayloadName": "tension.value[0]", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "temperature": { "lorawanPayloadName": "temperature0.value[0]", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "current": { "lorawanPayloadName": "courant.value[0]", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 2, "dataDirection": "uplink", "value": null }
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
        "identity":{
            "class": "A",
            "maxDevNum": 10
        },
        "lorawan": {
            "networkServer": networkServer,
            "flushDownlinkQueue": false
        },
        "bacnet": {
            "offsetAV": 1000,
            "offsetBV": 100,
            "instanceRangeAV": 10,
            "instanceRangeBV": 0,
            "objects": {
                "totalCurrent": { "lorawanPayloadName": "total_current", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "current": { "lorawanPayloadName": "current", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "temperature": { "lorawanPayloadName": "temperature", "objectType": "analogValue", "assignementMode":"auto", "instanceNum": 2, "dataDirection": "uplink", "value": null }
            }
        }
    }

}