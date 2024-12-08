# LoRaBAC, an open-source LoRaWAN to BACnet interface

## 1. LoRaBAC
### 1.1. What is LoRaBAC ?
LoRaBAC is a simple Node-RED application that aim to interface LoRaWAN end-devices with one or several BACnet controllers.
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

:notebook: Free ebook available here:[LoRaWAN for beginers books](https://www.univ-smb.fr/lorawan/en/free-book/)

:tv: E-learning platform available here: [LoRaWAN for beginers videos](https://www.udemy.com/course/lora-lorawan-internet-of-things/?referralCode=21DED0F1021F4E261955)

:tv: E-learning platform for Advanced users here: [LoRaWAN for Advanced users videos](https://www.udemy.com/course/lorawan-for-advanced-users/?referralCode=BA4A670560916E1AED77)

:bulb: 2 days training sessions available here: [LoRaWAN and IoT Training](https://www.univ-smb.fr/lorawan/avada_portfolio/formation-distanciel/)

## 2. Rrerequisites

### 2.1. LoRaWAN end-device
To use LoRaBAC, you need LoRaWAN end-devices provisionned on a Network Server with their payload decoder enable. If you want to use the downlink capability, then you also need the paylaod encoder. These 2 scripts should be provided by your end-device manufacturer.

### 2.2. MQTT broker
LoRaBAC subscribes and publishes to a MQTT broker. TTS or ChirpStack provides one as part as their Network Server, but Actility doesn't. In the latter case, you need to build your own. 

### 2.3. Node-RED 
LoRaBAC is a Node-RED flow so you need a Node-RED instance in order to run this application. 

## 3. LoRaBAC configuration
 
## 3.1. The device list
The LoRaBAC Node-RED configuration is done thanks to a JSON object called "deviceList" taht contains an infinite number of device types. For example, if your use case has 200 thermostatic valves and 300 temperatures sensors, then you need to configure 2 device types.

**deviceList :**
1. thermostatic_valve_type
2. temperature_sensor_type
<br><br>

The corresponding JSON object should look like as follows :
```javascript
let deviceList = {
    "thermostatic_valve_type": {
    
        // Device type description for "thermostatic_valve_type"
    
    },
    
    "temperature_sensor_type": {

        // Device type description for "temperature_sensor_type"
    
    }
}
```

LoRaBAC comes with the support of the following LoRaWAN device types :
1. Savoie Mont Blanc University : Thermostatic valve simulator (useful to test LoRaBAC application)
2. ATIM : Green sensors (current sensor)
3. WATTECO : Temp'o, pilote wire (Temperature and humidity sensor)
4. MCLIMATE : Vicki (Thermostatic valve)
5. MICROPELT : MLR003 (Thermostatic valve)
6. DRAGINO : LHT65 (Temperature and Humidity sensor)


So, the corresponding deviceList JSON object when you use LoRaBAC for the first time looks like as follows :

```javascript
let deviceList = {
    "valve": {},
    "vicki": {},
    "greensensor": {},
    "tempo": {},
    "lht65": {},
}
```
Please, [reach us](https://www.univ-smb.fr/lorawan/en/contact/) out if you need us to configure LoRaBAC for your LoRaWAN end-device. 


## 3.2. Device type description
Each device type in the deviceList is a JSON object with the complete configuration of this device type. Here are the values that need to be completed.

The values in brackets [ ] are the available possibilities.

<ul>
    <li><strong>identity</strong> : DO NOT MODIFY.</li>
    <li><strong>controller</strong> : THIS SECTION IS YOUR CONTROLLER INFORMATION.
        <ul>
            <li><strong>debug</strong> : Personalized debug. ["all", "up", "down", "creation", "txTime"] </li>
            <li><strong>model</strong> : Controller model. Complete this section only when using API Rest. [null, distechControls*] </li>
            <li><strong>interface</strong> : Interface type between LoRaBAC and the controller. [restAPI, bacnet]</li>
            <li><strong>ipAddress</strong> : Controller's IP address.</li>
            <li><strong>login</strong> : Controller's login when using Rest API interface.</li>
            <li><strong>password</strong> : Controller's Password when using Rest API interface</li>
        </ul>
    </li>
    <li><strong>lorawan</strong> : THIS SECTION IS YOUR LORAWAN SERVER INFORMATION.
        <ul>
            <li><strong>networkServer</strong> : LoRaWAN Network Server used. [ actility, chirpstack, tts]</li>
            <li><strong>downlinkPort</strong> : Complete this field with the downlink application port used if your LoRaWAN end-device receives downlinks.</li>
            <li><strong>flushDownlinkQueue</strong> : If your LoRaWAN end-device receives downlinks, you need to specify if the message will be queued or if you want to flush the present queue. [true, false] </li>
            <li><strong>chirpstack</strong> : Complete this object with ChirpStack API Key only if you use ChirpStack.</li>
            <li><strong>actility</strong> : Complete this object with the actility driver only if you use Actility and your LoRaWAN end device receives downlinks.</li>
        </ul>
    </li>
    <li><strong>bacnet</strong> : THIS SECTION IS YOUR BACNET INFORMATION
        <ul> 
            <li><strong>offset </strong>: This is the starting instance object number for this device type</li>
            <li><strong>instanceRange </strong>: this is the maximum number of BACnet object that each LoRaWAN end-device will store in the BACnet controller.</il>
            <li><strong>objects </strong> : This is the list of all BACnet objects that will be written or read from the controller.
            </li>
        </ul>
    </li>
    <li><strong>mqtt</strong> : DO NOT MODIFY.</li>
</ul>

## 3.3. BACnet object description
In the "bacnet" section of the device type description, there is a property called "objects" that describes the link between the LoRaWAN payload and the BACnet object. "objects" has the followwing properties :

<ul>  
    <li><strong>lorawanPayloadName</strong> : This is the payload name returned by the LoRaWAN payload decoder.</li> 
    <li><strong>objectType</strong> : This is the BACnet object type. [analogValue, binaryValue]</li> 
    <li><strong>instanceNum</strong> : This is the instance number that you want to assign to this BACnet object. [ 0 to instanceRange ] </li> 
    <li><strong>dataDirection</strong> : This value specify whether this object is written to the controller (uplink) or read from the controller (downlink). [uplink, downlink]</li> 
    <li><strong>value</strong> : This is the value of your BACnet object. You can leave it to "null" for uplink. You can set the default value for downlink</li> 
</ul>

## 3.4. Examples 
**First example** : Distech-Controls, Rest API, ChirpStack, 3 BACnet objects (2 uplink and 1 downlink), object instances start at 0.

```json
    "valve": {
        "identity": {},
        "controller": {
            "debug": ["all"],
            "model": "distechControls",
            "interface": "restAPI",
            "ipAddress": "X.Y.W.Z",
            "login": "YOUR_LOGIN",
            "password": "YOUR_PASSWORD",
        },
        "lorawan": {
            "networkServer": "chirpstack",
            "downlinkPort": 30,
            "flushDownlinkQueue": true,
            "chirpstack": {
                "grpcApikey": "YOUR_CHIRPSTACK_API_KEY"
            }
        },
        "bacnet": {
            "offset": 0,
            "instanceRange": 3,
            "objects": {
                "valveSetpoint": { "lorawanPayloadName": "valveSetpoint", "objectType": "analogValue", "instanceNum": 0, "dataDirection": "uplink", "value": null },
                "valveTemperature": { "lorawanPayloadName": "valveTemperature", "objectType": "analogValue", "instanceNum": 1, "dataDirection": "uplink", "value": null },
                "controllerSetpoint": { "lorawanPayloadName": "controllerSetpoint", "objectType": "analogValue", "instanceNum": 2, "dataDirection": "downlink", "value": 20 }
            }
        },
        "mqtt": {
            "topicDownlink": {},
        }
    }
```
**Second example** : Native BACnet, TTN, 1 BACnet object, object instance starts at 1000.

```json
  "temperaturesensor": {
        "identity": {},
        "controller": {
            "debug": ["all"],
            "model": null,
            "interface": "bacnet",
            "ipAddress": "ipAddress",
            "login": null,
            "password": null,
        },
        "lorawan": {
            "networkServer": "tts",
            "downlinkPort": null,
            "flushDownlinkQueue": true,
        },
        "bacnet": {
            "offset": 1000,
            "instanceRange": 1,
            "objects": {
                "temperature": { "lorawanPayloadName": "TempC_SHT", "objectType": "analogValue", "instanceNum": 0, "dataDirection": "uplink", "value": null },
            }
        },
        "mqtt": {
            "topicDownlink": {},
        }
    }
```


## 4. Getting Started

### 4.1. Uplink LoRaWAN end-device

**LoRaWAN**
1. Provision your LoRaWAN end-device on your Network Server. The end-device name (or end-device id) have to follow the pattern xxxxx-NUM :
    * xxxxx is one of the device type present in the deviceList. 
    * NUM is a number from 1 to infinite.

i.e : valve-1, valve-2, valve-3, valve-4...

2. Provide the uplink decoder given by your device manufacturer, ie : [MClimate Vicki decoder](https://docs.mclimate.eu/mclimate-lorawan-devices/devices/mclimate-vicki-lorawan/vicki-uplink-decoder).
3. Check your decoded payload on your Application Server.  

Here is the output payload decoder for the MClimate Vicki. 
```json
{
    "targetTemperatureFloat": 16,
    "lowMotorConsumption": false,
    "reason": 81,
    "batteryVoltage": 3.5,
    "openWindow": false,
    "calibrationFailed": false,
    "targetTemperature": 16,
    "brokenSensor": false,
    "motorPosition": 480,
    "motorRange": 480,
    "antiFreezeProtection": false,
    "valveOpenness": 0,
    "relativeHumidity": 43.36,
    "sensorTemperature": 20.41,
    "childLock": true,
    "perceiveAsOnline": true,
    "highMotorConsumption": false,
    "attachedBackplate": true
}
```

**Setting up LoRaBAC**
1. Import LoRaBAC flows in NodeRED from this GitHub repository : Node-RED > Menu > Import > Select the file > LoRaBAC.json.
the2. Connect the MQTT client subscriber (on the left) to your MQTT Broker. You need to provide :
    * The server address, login, password.
    * The Topic to subscribe.
1. Deploy the flow and check the MQTT client connection (green - connected).

> :information_source: If you haven't completed the deviceList yet, at each LoRaWAN uplink you should see a warning stating : "device : this Device Type doesn't belong to the Device List".

**LoRaBAC deviceList**
1. Open the Configuration Node.
2. Complete your deviceList with the information from your LoRaWAN Network Server, your controller and the BACnet objects.
3. Deploy your flow

> :information_source: Every uplink should be written to your controller at the desired object instance number.
 
### 4.2. LoRaWAN payload and BACnet instance number
The number provided in the LoRaWAN end-device name is directly related to the BACnet object instance number.

Example for "valve" device type with 10 BACnet objects (offset 0, instanceRange 10).

For **valve-1** :
- 1st BACnet object will be written at instance 10.
- 2de BACnet object will be written at instance 11.
- 3rd BACnet object will be written at instance 11.
- ...

For **valve-2** :
- 1st BACnet object will be written at instance 20.
- 2de BACnet object will be written at instance 21.
- 3rd BACnet object will be written at instance 21.
- ...

For **valve-51** :
- 1st BACnet object will be written at instance 510.
- 2de BACnet object will be written at instance 511.
- 3rd BACnet object will be written at instance 512.

...


### 4.3. Donwlink LoRaWAN end-device
1. Connect the MQTT client subscriber (on the left) to the MQTT Broker. You need to provide :
    * The server address, login, password.
    * **NO TOPIC** SHOULD BE PROVIDED ON THE PUBLISHER.
2. Deploy the flow and check the MQTT client connection (green - connected).
3. Provide the downlink encoded given by your device manufacturer, ie : [MClimate Vicki encoder](https://docs.mclimate.eu/mclimate-lorawan-devices/devices/mclimate-vicki-lorawan/downlink-encoder).
3. Add a section in the switch-case statement of the "Downlink Strategies" node according to your donwlink needs and the downlink encoder. ie, if you need to downlink a new set point to your Vicki Thermostatic Valve you should return :

```javascript
{
        "controllerSetpoint": bacnetObjects["controllerSetpoint"].value
}
```



