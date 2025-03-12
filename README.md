# LoRaBAC, an open-source LoRaWAN to BACnet interface
- [LoRaBAC, an open-source LoRaWAN to BACnet interface](#lorabac-an-open-source-lorawan-to-bacnet-interface)
  - [1. LoRaBAC](#1-lorabac)
    - [1.1. What is LoRaBAC ?](#11-what-is-lorabac-)
    - [1.2. Why LoRaBAC is different from other LoRaWAN-BACnet interfaces](#12-why-lorabac-is-different-from-other-lorawan-bacnet-interfaces)
    - [1.3. Support](#13-support)
  - [2. Prerequisites](#2-prerequisites)
    - [2.1. LoRaWAN end-device](#21-lorawan-end-device)
    - [2.2. MQTT broker](#22-mqtt-broker)
    - [2.3. Node-RED](#23-node-red)
  - [3. Getting Started](#3-getting-started)
    - [3.1. LoRaWAN Network Server configuration](#31-lorawan-network-server-configuration)
    - [3.2 LoRaBAC configuration for uplink](#32-lorabac-configuration-for-uplink)
    - [3.3. LoRaWAN payload and BACnet instance number](#33-lorawan-payload-and-bacnet-instance-number)
    - [3.4. LoRaBAC configuration for downlink](#34-lorabac-configuration-for-downlink)
  - [4. The device list](#4-the-device-list)
    - [4.1. Introduction](#41-introduction)
    - [4.2. Device type description](#42-device-type-description)
    - [4.3. Specific information about the Network Server](#43-specific-information-about-the-network-server)
    - [4.4. BACnet object description](#44-bacnet-object-description)
    - [4.5. Examples](#45-examples)

## 1. LoRaBAC
### 1.1. What is LoRaBAC ?
LoRaBAC is a simple Node-RED application that aims to interface LoRaWAN end-devices with one or several BACnet controllers. It runs on either the controller itself or on the same local network.

// ADD an image

It works with :
- [x] All LoRaWAN end-devices.
- [x] All LoRaWAN Gateways.
- [x] ChirpStack, Actility or The Thing Stack (The Things Network / The Things Industries) Network Servers.
- [x] All BACnet controllers when using native BACnet (only Distech-Controls controllers when using API Rest).

LoRaBAC works in both ways :
- [x] It writes LoRaWAN payload in a specific BACnet object in your BACnet controller (uplink)
- [x] It reads a BACnet object from your BACnet controller and sends it to your LoRaWAN end-Device (downlink).

LoRaBAC has been tested with many Smart Building uses cases :
- [x] Thermostatic valves
- [x] Temperature and humidity sensors
- [x] Air quality sensors
- [x] Current monitoring sensors
- [x] Pilot wired electric heater controller


### 1.2. Why LoRaBAC is different from other LoRaWAN-BACnet interfaces
There are many LoRaWAN to BACnet interfaces available on the market. Most of them work really well but LoRaBAC has been design with a complete different mindset :

**Advantages** :

1. **LoRaBAC is a BACnet client** : while all LoRaWAN-BACnet interfaces are server like application (as far as I know) , LoRaBAC is a BACnet client that reads and writes commands to the controller. These read/write commands are launched only when a LoRaWAN payload has arrived.

2. **LoRaBAC can be installed anywhere** : while all LoRaWAN-BACnet interfaces are set up in the LoRaWAN Gateway itself with its embeded LoRaWAN Network Server, LoRaBAC can be installed anywhere : in the LoRaWAN Gateway, in the local network, or in the controller itself. 

3. **LoRaWAN is free and open source** : while all LoRaWAN-BACnet interfaces are proprietary applications, LoRaWAN is free and open-source under the MIT Licence.

**Drawbacks** :

1. Most LoRaWAN-BACnet interfaces available on the market answer to the "Who-is" service that can be useful if you program your controller when the BACnet object is already stored on the interface. **That is not the case with LoRaBAC**.

2. Most LoRaWAN-BACnet interfaces available on the market have a predifined number of "ready to use" LoRaWAN end-device. In that case, you don't have any configuration to do and it should be "Plug and Play". **This is not the case with LoRaBAC** as each new LoRaWAN end-device type needs a configuration. 

### 1.3. Support
To get support on LoRaWAN or LoRaBAC, please refers to the followings ressources, or [reach us](https://www.univ-smb.fr/lorawan/en/contact/) out.

:tv: Webinar Replay: [LoRaWAN and BACnet interfaces for Smart Building]()

:notebook: Free ebook available here:[LoRaWAN for beginers books](https://www.univ-smb.fr/lorawan/en/free-book/)

:tv: E-learning platform available here: [LoRaWAN for beginers videos](https://www.udemy.com/course/lora-lorawan-internet-of-things/?referralCode=21DED0F1021F4E261955)

:tv: E-learning platform for Advanced users here: [LoRaWAN for Advanced users videos](https://www.udemy.com/course/lorawan-for-advanced-users/?referralCode=BA4A670560916E1AED77)

:bulb: 2 days training sessions available here: [LoRaWAN and IoT Training](https://www.univ-smb.fr/lorawan/avada_portfolio/formation-distanciel/)

## 2. Prerequisites

### 2.1. LoRaWAN end-device
To use LoRaBAC, you need LoRaWAN end-devices provisionned on a Network Server with their payload decoders enable. If you want to use the downlink capability, then you also need the payload encoder. These 2 scripts should be provided by your end-device manufacturer.

### 2.2. MQTT broker
LoRaBAC subscribes and publishes to a MQTT broker. TTS, ChirpStack and ThingPark provide one as part as their Network Server, but you can also use your own if you prefer. 

### 2.3. Node-RED 
LoRaBAC is a Node-RED flow so you need a Node-RED instance in order to run this application. The following packages (palette) need to be installed :
- node-red-contrib-bacnet

If you use ChirpStackV4 and you want to use the "Flush Downlink queue" capability, than you also need these two packages :
- @grpc/grpc-js
- @chirpstack/chirpstack-api

We provide a Node-RED docker application is ready to use with all packages on [Docker Hub](https://hub.docker.com/r/montagny/node-red/tags).



## 3. Getting Started

### 3.1. LoRaWAN Network Server configuration
1. **Provision your end-device:**
    * Log in to your LoRaWAN Network Server (LNS)
    * Add a new end-device following the naming pattern `xxxxx-NUM` (e.g., mclimate-vicki-1, micropelt-mlr003-3...)
    * Configure the **payload decoder** for this end-device. If downlink is required, also configure the **payload encoder**.
2. **MQTT integration:**
    * Note down the server address, login, password and topic.

### 3.2 LoRaBAC configuration for uplink
1. **Import LoRaBAC:**
    * Open Node-RED and got to `Menu > Import`
    * Select the LoRaBAC.json file from the [GitHub repository](https://github.com/SylvainMontagny)
2. **Connect the MQTT client:**
    * In Node-RED, locate the MQTT client subscriber node (on the left).
    * Enter the MQTT broker details (server address, login, password).
    * Set the topic to subscribe to (see the comment panel in your flow).
3. **Deploy and test:**
    * Click `Deploy` in Node-RED.
    * Check your MQTT subscriber (should be connected and green).

> :bulb: At this point, each time your LoRaWAN end-device sends an uplink, LoRaBAC should throw an error in the Debug window : **"This Device Type doesn't belong to the Device List"**. This is a normal behavior as the device list is still empty.


1. **Add your device to the device list:**
    * If you want to use the list of supported end-devices, copy the content of configuration.js file from the [GitHub repository](https://github.com/SylvainMontagny). Open the "TO CONFIGURE" node and paste the content in the "TO CONFIGURE" section.
    * If your end-device is not natively supported by the solution, you need to follow the [Device List section](#4-the-device-list) to add a new end-device type in the device list.

2. **Adjust properties:**
    * Modify the properties in the `deviceList` JSON object to match your requirements.

> :bulb: **Second test**  
> At this point, each time your LoRaWAN end-device sends an uplink, LoRaBAC should write the LoRaWAN paylaod in the corresponding BACnet object in the controller. 


### 3.3. LoRaWAN payload and BACnet instance number
The `number` in the end-device name determines the BACnet object instance number.

Example: For the device type `usmb-valve` with an `instanceRange=10` and `offset=0`.

For **usmb-valve-1**:
- 1st BACnet object will be written at instance 10.
- 2de BACnet object will be written at instance 11.
- 3rd BACnet object will be written at instance 11.
- ...

For **usmb-valve-2**:
- 1st BACnet object will be written at instance 20.
- 2de BACnet object will be written at instance 21.
- 3rd BACnet object will be written at instance 21.
- ...

For **usmb-valve-51**:
- 1st BACnet object will be written at instance 510.
- 2de BACnet object will be written at instance 511.
- 3rd BACnet object will be written at instance 512.
- ...


### 3.4. LoRaBAC configuration for downlink
1. **Connect the MQTT publisher:**
    *  Click `Deploy` in Node-RED.
    *  Locate the MQTT client publisher node in Node-RED (on the right).
    *  Enter the MQTT broker details (server address, login, password).
    * /!\ **Do not set a topic**.
2. **Deploy and test**:
    * Check your MQTT publisher (should be `connected` and `green`).
4. **Add Downlink Section:**
   * In the `Downlink Strategies` node, add a new case in the switch-case statement for your downlink needs.



## 4. The device list
 
### 4.1. Introduction
The list of device supported is provided thanks to a JSON object called "deviceList" that contains an infinite number of devices types. For example, if your use case has 200 "thermostatic-valve" and 300 "temperature-sensor", then you need to configure 2 device types and the device list should look like as follows :

```javascript
let deviceList = {
    "thermostatic-valve": {
        // Description for all "thermostatic-valve"
    },
    
    "temperature-sensor": {
         // Description for all "temperature-sensor"
    }
}
```

LoRaBAC comes with the support of the following LoRaWAN device types :
```javascript
let deviceList = {
    "usmb-valve": {},           // Thermostatic valve simulator (useful to test LoRaBAC application).
    "dragino-lht65": {},        // Temperature and Humidity sensor.
    "watteco-tempo": {},        // Temperature and humidity sensor
    "atim-thaq": {},            // Temperature, humidity, CO2
    "elsys-ers2co2": {},        // Temperature, humidity, CO2
    "mclimate-vicki": {},       // Thermostatic valve
    "milesight-wt101": {},      // Thermostatic valve
    "micropelt-mlr003": {},     // Thermostatic valve
    "atim-egreen": {},          // Current sensor
    "milesight-ct103": {}       // Current sensor
}
```

Please, [reach us](https://www.univ-smb.fr/lorawan/en/contact/) out if you need us to configure LoRaBAC for your LoRaWAN end-device. 


### 4.2. Device type description
Each device type in the deviceList is a JSON object with its complete configuration. Here are the properties that need to be completed.

| Property   | Type     | Description                          | Required |
|------------|----------|--------------------------------------|----------|
| `controller` | Object | Information about the controller                          | Yes      |
| `lorawan`    | Object | Information about the LoRaWAN Network Server              | Yes      |
| `bacnet`     | Object | Correspondence beetween LoRaWAN payload and BACnet object | Yes      |
<br><br>

**Details of the `controller` property:**

The values in brackets [ ] are the available possibilities.

| Property   | Type     | Description                          | Required |
|------------|----------|--------------------------------------|----------|
| `debug`    | String | Debug level: [null, "all", "forceOn", "up", "down", "creation", "txTime"]         | No                            |
| `model`    | String | Controller's model: ["distechControlsV2"]                               | Only if using RestAPI         |
| `protocol` | String | Type of protocol: ["restAPIBacnet", "bacnet"]                         | Yes                           |
| `ipAddress`| String | IP address of the controller : "X.Y.W.Z"            | Yes                           |
| `login`    | String | Login of the controller                             |  Only if using RestAPI        |
| `password` | String | Password of the controller                          |  Only if using RestAPI        |

**Debug level:**
- **null**: No debug
- **"all"**: Most verbose level
- **"up"**: Debug the uplink part only
- **"down"**: Debug the downlink part only
- **"creation"**: Debug the BACnet object creation part only
- **"txTime"**: Debug the Transmission time part only
- **"forceOn"** : Used to force a debug function whatever the debug level
<br><br>

**Details of the `lorawan` property:**
| Property   | Type     | Description                          | Required |
|------------|----------|--------------------------------------|----------|
| `networkServer`   | String | Network Server used: ["tts", "chirpstack", "actility"]         | Yes                            |
| `downlinkPort`    | Number | Downlink port used for downlink                               | Only if using downlink         |
| `flushDownlinkQueue` | Boolean | Enable "Flush Downlink Queue": [true, false]                         | Only if using downlink                          |
| `chirpstack`| Object | [ChirpStack specific information](#43-specific-information-about-the-network-server)            | Only if using ChirpStack AND Flush downlink Queue capability                           |
| `actility`    | Object | [Actility specific information](#43-specific-information-about-the-network-server)        |  Only if using Actility AND downlink       |
| `tts` | Object | [TTS specific information](#43-specific-information-about-the-network-server)   |  Only if using TTS        |
<br><br>



**Details of the `bacnet` property:**
| Property   | Type     | Description                          | Required |
|------------|----------|--------------------------------------|----------|
| `offset`          | Number | Beginning of instance range                  | Yes                            |
| `instanceRange`   | Number | Number of BACnet object to store             | Yes         |
| `objects`         | Object | [LoRaWAN payload and BACnet object correspondence](#44-bacnet-object-description)  | Yes                      |



### 4.3. Specific information about the Network Server
Depending on the LoRaWAN Network Server, there might be some specific configuration. They are store within the following properties.

- Details for the `actility` property:
When using downlink, ThingPark needs information to retrieve the payload encoder. In ThingPark, the payload decoder are called drivers and have 3 identifiers : pID, mID and ver.
```json
"actility": {
    "driver": {
        "pId": "TO_CONFIGURE_IF_USING_ACTILITY_AND_DOWNLINK",
        "mId": "TO_CONFIGURE_IF_USING_ACTILITY_AND_DOWNLINK",
        "ver": "TO_CONFIGURE_IF_USING_ACTILITY_AND_DOWNLINK"
    }
}
```
- Details for the `chirpstack` property:
When using downlink as well as the "Flush Downlink Queue" capability, LoRaBAC uses the ChirpStack's grpc API to flush the queue. Therefore, we need to provide the API Key generated by ChirpStack.  
```json
"chirpstack": {
    "grpcApikey": chirpstackGrpcApikey
}
```
- Details for the `tts` property:
There is no use for the `tts`property yet. This is Reserved for Future just in case.

### 4.4. BACnet object description
The `objects` is a JSON object that describes the association between all LoRaWAN payload and its corresponding BACnet objects. The association is described as follows. All properties are required:
```json
"objects": {
    "BACNET_OBJECT_NAME_1": {       // String, name of the BACnet object to write in the controller
        "lorawanPayloadName": "LORAWAN_PAYLOAD_NAME", // String, name of the LoRaWAN paylaod as provided by the payload decoder
        "objectType": "OBJECT_TYPE",    // String, BACnet type: ["analogValue", "binaryValue"]
        "instanceNum": INSTANCE_NUM,    // Number, BACnet object instance number
        "dataDirection": "DIRECTION",   // String, Direction of the BACnet Object: ["uplink", "downlink"]
        "value": null                   // Number, LoRaWAN payload value <> BACnet object present value. 
        },
    "BACNET_OBJECT_NAME_2": {
        ...
    },
    ...
}
```



### 4.5. Examples 
**First example**: A **"temperaturesensor"** that works with **any controllers** using **native BACnet**, **TTN**, 1 BACnet object, object instance **starts at 1000**, **no downlink**.

```json
  "temperaturesensor": {
        "controller": {
            "debug": ["all"],
            "interface": "bacnet",
            "ipAddress": "ipAddress",
        },
        "lorawan": {
            "networkServer": "tts",
        },
        "bacnet": {
            "offset": 1000,
            "instanceRange": 1,
            "objects": {
                "temperature": { "lorawanPayloadName": "TempC_SHT", "objectType": "analogValue", "instanceNum": 0, "dataDirection": "uplink", "value": null },
            }
        }
    }
```



**Second example**: A "valve" LoRaWAN device connected to a **Distech-Controls** controller using **Rest API**, **ChirpStack**, 3 BACnet objects (2 uplink and 1 downlink), object instances **start at 0**, downlink port used is **30**.

```json
    "valve": {
        "controller": {
            "debug": ["all"],
            "model": "distechControlsV2",
            "interface": "restAPIBacnet",
            "ipAddress": "X.Y.W.Z",
            "login": "YOUR_LOGIN",
            "password": "YOUR_PASSWORD",
        },
        "lorawan": {
            "networkServer": "chirpstack",
            "downlinkPort": 30
        },
        "bacnet": {
            "offset": 0,
            "instanceRange": 3,
            "objects": {
                "valveSetpoint": { "lorawanPayloadName": "valveSetpoint", "objectType": "analogValue", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "valveTemperature": { "lorawanPayloadName": "valveTemperature", "objectType": "analogValue", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "controllerSetpoint": { "lorawanPayloadName": "controllerSetpoint", "objectType": "analogValue", "instanceNum": 2, "dataDirection": "downlink", "value": 20 }
            }
        }
    }
```

