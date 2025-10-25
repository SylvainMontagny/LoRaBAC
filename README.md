# LoRaBAC, an open-source LoRaWAN to BACnet interface
LoRaBAC is a **Node-RED-based application** that acts as a bridge between **LoRaWAN end-devices** and **BACnet controllers**. It enables a seamless communication, supporting both **uplink** (from LoRaWAN to BACnet) and **downlink** (from BACnet to LoRaWAN). LoRaBAC is based on the [LoRaBAC node](https://flows.nodered.org/node/@montagny/node-red-contrib-lorawan-bacnet) In this repository, you will find the NodeRED flow that need to be used in order to run the application.


- [LoRaBAC, an open-source LoRaWAN to BACnet interface](#lorabac-an-open-source-lorawan-to-bacnet-interface)
  - [**1. Overview**](#1-overview)
    - [**1.1. What is LoRaBAC?**](#11-what-is-lorabac)
      - [**Key Features:**](#key-features)
    - [**1.2. What Makes LoRaBAC Unique?**](#12-what-makes-lorabac-unique)
      - [**Drawbacks:**](#drawbacks)
    - [**1.3. Support**](#13-support)
  - [**2. Prerequisites**](#2-prerequisites)
    - [**2.1. LoRaWAN End-Device**](#21-lorawan-end-device)
    - [**2.2. MQTT Broker**](#22-mqtt-broker)
    - [**2.3. Node-RED Setup**](#23-node-red-setup)
      - [**Additional Packages for ChirpStackV4:**](#additional-packages-for-chirpstackv4)
      - [**Quick Start with Docker:**](#quick-start-with-docker)
  - [**3. Getting Started**](#3-getting-started)
    - [**3.1. LoRaWAN Network Server configuration**](#31-lorawan-network-server-configuration)
    - [**3.2 LoRaBAC flow configuration for uplink**](#32-lorabac-flow-configuration-for-uplink)
    - [**3.3. LoRaBAC flow configuration for downlink**](#33-lorabac-flow-configuration-for-downlink)
  - [**4. LoRaBAC node configuration**](#4-lorabac-node-configuration)
    - [**4.1. Introduction**](#41-introduction)
    - [**4.2. Global configuration**](#42-global-configuration)
    - [**4.3. Device list**](#43-device-list)
      - [**4.3.1. Device type configuration:**](#431-device-type-configuration)
    - [**4.3.2. Instance Num configuration**](#432-instance-num-configuration)
    - [**4.3.3. BACnet Object list configuration**](#433-bacnet-object-list-configuration)
    - [**4.4. Examples**](#44-examples)
    - [**4.4.1. Assignation example**](#441-assignation-example)
      - [**4.4.2. Configuration example 1**:](#442-configuration-example-1)
      - [**4.4.3. Configuration example 2**:](#443-configuration-example-2)
  - [APPENDIX A: **Downlink strategies**](#appendix-a-downlink-strategies)
    - [A.1. The **On compare to the following uplink object** strategy](#a1-the-on-compare-to-the-following-uplink-object-strategy)
    - [A.2. The **On compare to following uplink object within range"** strategy](#a2-the-on-compare-to-following-uplink-object-within-range-strategy)
    - [A.3. The \*\*On change of this value on the BMS"](#a3-the-on-change-of-this-value-on-the-bms)
    - [A.4. The **On change of this value within range** strategy](#a4-the-on-change-of-this-value-within-range-strategy)
  - [APPENDIX B: **Specific information about the Network Server**](#appendix-b-specific-information-about-the-network-server)
    - [B.1. Details for `actility`:](#b1-details-for-actility)
    - [B.2. Details for `chirpstack`:](#b2-details-for-chirpstack)

## **1. Overview**
### **1.1. What is LoRaBAC?**
LoRaBAC is open-source application built on **Node-RED**. It allows you to integrate LoRaWAN devices with BACnet controllers, making it ideal for **smart building applications**.

![alt text](images/lorabac.png)
#### **Key Features:**
- **Universal Compatibility:**
  - [x] Works with **all LoRaWAN end-devices** and **gateways**.
  - [x] Supports **ChirpStack**, **Actility**, and **The Things Stack** (The Things Network / The Things Industries) Network Servers.
  - [x] Integrates with **all BACnet controllers** using native BACnet protocols (or **Distech-Controls controllers** when using API Rest).

- **Bidirectional Communication:**
  - [x] **Uplink:** Writes LoRaWAN payloads to specific BACnet objects.
  - [x] **Downlink:** Reads BACnet objects and sends data to LoRaWAN devices.

- **Proven Use Cases:**
  - [x] Thermostatic valves
  - [x] Temperature and humidity sensors
  - [x] Air quality sensors
  - [x] Current monitoring sensors
  - [x] Pilot wired electric heater controller


### **1.2. What Makes LoRaBAC Unique?**
LoRaBAC is designed with a **different approach** compared to other LoRaWAN-BACnet interfaces. Here’s why it stands out:

**Advantages** :

1. **BACnet Client Architecture:**
   - Unlike most interfaces that act as **BACnet servers**, LoRaBAC operates as a **BACnet client**. It only interacts with the controller when a LoRaWAN payload is received, reducing unnecessary traffic.

2. **Flexible Deployment:**
   - LoRaBAC can be installed **anywhere**:
     - On the **LoRaWAN Gateway**.
     - Within the **local network**.
     - Directly on the **BACnet controller**.

3. **Open Source and Free:**
   - LoRaBAC is **free to use** and **open-source** under the **MIT License**, offering full transparency and customization.

#### **Drawbacks:**
1. **No "Who-is" Service Support:**
   - LoRaBAC does not respond to the **"Who-is" service**, which can be useful for discovering BACnet devices in some setups.

2. **Manual Configuration Required:**
   - Each new LoRaWAN device type requires **manual configuration**. It is not a "Plug and Play" solution.

### **1.3. Support**
To get support on LoRaWAN or LoRaBAC, please refers to the followings ressources, or [reach us](https://www.univ-smb.fr/lorawan/en/contact/) out.

:tv: Webinar Replay: [LoRaWAN and BACnet interfaces for Smart Building]()

:notebook: Free ebook:[LoRaWAN for beginers books](https://www.univ-smb.fr/lorawan/en/free-book/)

:tv: E-learning platform: [LoRaWAN for beginers videos](https://www.udemy.com/course/lora-lorawan-internet-of-things/?referralCode=21DED0F1021F4E261955)

:tv: E-learning platform for Advanced users: [LoRaWAN for Advanced users videos](https://www.udemy.com/course/lorawan-for-advanced-users/?referralCode=BA4A670560916E1AED77)

:bulb: 2 days training sessions: [LoRaWAN and IoT Training](https://www.univ-smb.fr/lorawan/avada_portfolio/formation-distanciel/)

## **2. Prerequisites**

### **2.1. LoRaWAN End-Device**
To use LoRaBAC, ensure your LoRaWAN devices are:
- Provisioned on a **Network Server**.
- Configured with a **payload decoders** (for uplink).
- Configured with a **payload encoders** (for downlink, if needed).

Payload decoder and encoders should be provided by your device manufacturer, however, in this repository you will find the payload codec of the tested devices.


### **2.2. MQTT Broker**
LoRaBAC relies on an **MQTT broker** for communication. You can use:
- The built-in MQTT broker provided by **ChirpStack**, **Actility**, or **The Things Stack**.
- Your own **custom MQTT broker**.


### **2.3. Node-RED Setup**
LoRaBAC is a **Node-RED flow**, so you need a **Node-RED instance** to run it. Ensure the following packages are installed:

- @montagny/node-red-contrib-lorawan-bacnet

#### **Additional Packages for ChirpStackV4:**
If you’re using **ChirpStackV4** and want to enable the **"Flush Downlink Queue"** feature, install:
- `@grpc/grpc-js`
- `@chirpstack/chirpstack-api`

#### **Quick Start with Docker:**
A pre-configured **Node-RED Docker image** is available on [Docker Hub](https://hub.docker.com/r/montagny/node-red/tags). It includes all required packages for easy deployment.


## **3. Getting Started**

### **3.1. LoRaWAN Network Server configuration**
1. **Provision your end-device:**
    * Log in to your LoRaWAN Network Server (LNS)
    * Add a new end-device following the naming pattern `xxxxx-NUM` (e.g., mclimate-vicki-1, micropelt-mlr003-3...)
    * Configure the **payload decoder** for this end-device. If downlink is required, also configure the **payload encoder**.
2. **MQTT integration:**
    * Note down the MQTT broker address, login, password and topic.

### **3.2 LoRaBAC flow configuration for uplink**
1. **Install LoRaBAC node**
    * Open Node-RED and go to `Menu > Manage Palette`.
    * On the `Install` tab, search for @montagny/node-red-contrib-lorawan-bacnet palette and install it.
2. **Import LoRaBAC flow:**
    * Go to `Menu > Import`
    * Select the LoRaBAC.json file from this repository.
    
3. **Connect the MQTT client:**
    * In Node-RED, locate the MQTT client subscriber node (on the left).
    * Enter the MQTT broker details (broker address, login, password).
    * Set the topic to subscribe to (see the information panel of the MQTT subscriber node in your flow).
4. **Deploy and test:**
    * Click `Deploy` in Node-RED.
    * Check your MQTT subscriber (should be connected and green).

> :bulb: At this point, each time your LoRaWAN end-device sends an uplink, LoRaBAC should throw an error in the Debug window : **"This Device Type doesn't belong to the Device List"**. This is a normal behavior as the device list is still empty.


### **3.3. LoRaBAC flow configuration for downlink**
1. **Connect the MQTT publisher:**
    *  Click `Deploy` in Node-RED.
    *  Locate the MQTT client publisher node in Node-RED (on the right).
    *  Select the MQTT broker.
    * /!\ **Do not set a topic**.
2. **Deploy and test**:
    * Check your MQTT publisher (should be `connected` and `green`).



## **4. LoRaBAC node configuration**
 
### **4.1. Introduction**
The LoRaBAC node needs to be configured with 2 sections: 
1.  **Global configuration**: controller IP address, LoRaWAN Network Server, protocol.
2.  **Device list**: device types used with LoRaBAC.

Please, [reach us](https://www.univ-smb.fr/lorawan/en/contact/) out if you need us to configure LoRaBAC for your LoRaWAN end-device. 

### **4.2. Global configuration**
The global configuration has 3 items :
1. BMS IP Address : controller IP adress on the local network.
2. Network Server : LoRaWAN Network Server used (ChirpStack, The Things Stack or Actility). 
3. Protocol : Native BACnet of BACnet Rest API (only Distech-Controls REST API is supported).

When using REST API, you need to provide the login and password of your controller.

### **4.3. Device list**
The device list is the list of each device type used with LoRaBAC. For example, if your use case has 200 "thermostatic-valve" and 300 "temperature-sensor", then you need to configure 2 device types and the device list should look like as follows :

METTRE L'IMAGE CORRESPONDANCE

Existing configuration for some end-devices can be imported thanks to a json file from this repository under the `devices` directory. For this you need to use  the `Import from JSON` button. 

LoRaBAC comes with the support of the following LoRaWAN device types: usmb-valve (simulation of a thermostatic valve using a NUCLEO_WL55), dragino-lht65, watteco-tempo, atim-thaq, elsys-ers2co2, mclimate-vicki, milesight-wt101, micropelt-mlr003, atim-egreen, milesight-ct103. 


#### **4.3.1. Device type configuration:**
1. Debug level :
- **"All event"**: Most verbose level
- **"Uplink events"**: Print only uplink events
- **"Downlink events"**: Print only downlink events
- **"Creation events"**: Print only object creation event
- **"Print TX Time"**: Print transmission time only
<br>
1. LoRaWAN device class: A, B or C.
2. Maximum Device Number: the maximum number of device for this device type. This field is helpful to detect if BACnet objects overlap.
3. Flush Downlink Queue: This allows to force to flush the downlink queue on the LNS when sending a downlink.

### **4.3.2. Instance Num configuration**
LoRaBAC handles automatic assignement between the LoRaWAN payload and the BACnet instance number. This assignement is based on the device number NUM given in the LoRaWAN device name (xxxxx-NUM). 
* Offset AV: This is where all BACnet Analog Value will be written for this device type.
* Offset BV: This is where all BACnet Binary Value will be written for this device type.
* Instance Range AV: This is range allocated for the Analog Value for each device.
* Instance Range BV: This is range allocated for the Binary Value for each device.

So at which instance number the BACnet object will be written? They will be written at : Offset AV + (Instance Range AV * NUM). NUM is the device number. 

### **4.3.3. BACnet Object list configuration**
Whithin the allocated range, we need to assign the LoRaWAN payload with the corresponding BACnet object. 
First, we need to list all BACnet object that need to be stored on the controller. For example, if you want to transform three LoRaWAN payload into three BACnet object called valveTemperature, valveSetpoint and controllerSetpoint, you will have the following configuration :

IMAGE FROM LORABAC

Then for each BACnet object, we need to provide :
**LoRaWAN Payload name**: The corresponding LoRaWAN payload name as it is in your LoRaWAN codec.
**Object type**: Object type (Analog Value, Binary Value).
**Assignation mode**: Automatic (it's what you want), but you can also assign an absolute instance Number if you want to bypass the assignement based on the device NUM.
**Instance Num Offset**: Instance number offset withing the `Instance Range`.
**Data direction**: Uplink if you transform a LoRaWAN payload to a BACnet object. Downlink if you transform a BACnet object to a LoRaWAN payload.

When chosing downlink, we have another set of configuration to provide :
**Downlink FPort**: The LoRaWAN payload port to use for downlink.
**Priority**: If you have several downlink configured, which one do you consider as a priority.
**Downlink strategies**: Choose your downlink strategy. Please refer to the Appendix to know more about the downlink strategy proposed in LoRaBAC.
**Uplink object name**: If the downlink strategy is based on another BACnet object.
**Default Value**: Default value of the BACnet object when creating it with the REST API.

### **4.4. Examples**
### **4.4.1. Assignation example**
For the device type `usmb-valve` with an `Instance Range Analog Value = 10`, an `Instance Range Binary Value = 5`, an `Offset Analog Value = 0` and `Offset Binary Value = 0`.

For the device **usmb-valve-1**:
- the 1st `analog value` BACnet object will be written at instance **10**.
- the 2de `analog value` BACnet object will be written at instance **11**.
- the 3rd `analog value` BACnet object will be written at instance **13**.
- the 1st `binary value` BACnet object will be written at instance **5**.
- the 2de `binary value` BACnet object will be written at instance **6**.
- the 3rd `binary value` BACnet object will be written at instance **7**.
- ...

For the device **usmb-valve-2**:
- the 1st `analog value` BACnet object will be written at instance **20**.
- the 2de `analog value` BACnet object will be written at instance **21**.
- the 3rd `analog value` BACnet object will be written at instance **22**.
- the 1st `binary value` BACnet object will be written at instance **10**.
- the 2de `binary value` BACnet object will be written at instance **11**.
- the 3rd `binary value` BACnet object will be written at instance **12**.
- ...

For the device **usmb-valve-51**:
- the 1st `analog value` BACnet object will be written at instance **510**.
- the 2de `analog value` BACnet object will be written at instance **511**.
- the 3rd `analog value` BACnet object will be written at instance **512**.
- the 1st `binary value` BACnet object will be written at instance **255**.
- the 2de `binary value` BACnet object will be written at instance **256**.
- the 3rd `binary value` BACnet object will be written at instance **257**.
- ...

The general rule is that the BACnet instance of the Analog Value is `offsetAV + (instanceRangeAV * NUM) + instanceNumOffset` for `usmb-valve-NUM`. 
* NUM is the device Number.
* instanceNumOffset is the instance NUM offset assigned in the section 4.3.3.  


#### **4.4.2. Configuration example 1**: 
15 `temperature-sensor` LoRaWAN devices send a LoRaWAN payload called `TempC`. We want to transform this `TempC` LoRaWAN payload into an Analog Value BACnet object called `temperature`. We want all Analog Value to start at 1000.
The configuration should as follows:

IMAGE !!!


In this example, the LoRaWAN payload `TempC` will be written in an `analog value` BACnet object called `temperature` with the following instance numbers :
- `1001` for `temperature-sensor-1`
- `1002` for `temperature-sensor-2`
- `1003` for `temperature-sensor-3`
- `offsetAV + (instanceRangeAV * NUM) + instanceNumOffset` for `temperature-sensor-NUM`. 

#### **4.4.3. Configuration example 2**: 
50 `thermostatic-valve` LoRaWAN devices send LoRaWAN payloads called `temp` and `setpoint`. We want to transform `temp` LoRaWAN payload into an Analog Value BACnet object called `valveTemperature`. In the same way, we want to transform `setpoint` LoRaWAN payload into an Analog values BACnet object called `valveSetpoint`. 

The `thermostatic-valve` also need to transform an Analog Value called `controllerSetpoint` into a LoRaWAN payload called `userSetpoint`. In order to prevent useless downlinks, the downlinks will be sent only when the `valveSetpoint` is different from `controllerSetpoint`. This downlink has to be sent on port `30`.

We want all Analog Value to start at 2000.


The following instance number will be used for the BACnet object:

|                   | valveSetpoint   | valveTemperature | controllerSetpoint |
|-------------------|:---------------:|:----------------:|:------------------:|
| `thermostatic-valve-1`  |        2003        |        2004         |         2005          |
| `thermostatic-valve-2`  |        2006        |        2007         |         2008          |
| `thermostatic-valve-3`  |        2009        |       2010         |        2011          |
| `thermostatic-valve-x`  |         `offsetAV + (instanceRangeAV * NUM) + instanceNumOffset` |   `offsetAV + (instanceRangeAV * NUM) + instanceNumOffset`  | `offsetAV + (instanceRangeAV * NUM) + instanceNumOffset`  |    


## APPENDIX A: **Downlink strategies**
Interfacing uplink LoRaWAN payload with BACNet object is quite simple, however it's more challenging to send downlink from BACnet object to LoRaWAN end-device as we need to define a strategy. The strategy describes when and how the downlink message should be sent.

Right now, in the LoRaBAC application, there are four dowlink strategies that can cover almost all use cases.  

### A.1. The **On compare to the following uplink object** strategy
On each uplink, the BACnet object value is compared to the BACnet object configured. 
* If the values are different, the object value is sent to the device with a downlink message.
* If the values are the same, no action is taken.

### A.2. The **On compare to following uplink object within range"** strategy
On each uplink, the BACnet object value is compared to the BACnet object configured. 
* If the values are equal within the margin (range), than no action is taken.
* If the values are different and outside the margin (range), than a downlink is scheduled.

### A.3. The **On change of this value on the BMS"
On each uplink (or polling time for class C end-devices), the BACnet object value is compared to its previous value (from the previous downlink). 
* If the values are different, a downlink is scheduled.
* If the values are the same, no action is taken.

### A.4. The **On change of this value within range** strategy
On each uplink (or polling time for class C end-devices), the BACnet object value is compared to its previous value (from the previous downlink).
* If the values are equal within the margin (range), than no action is taken.
* If the values are different and outside the margin (range), than a downlink is scheduled.



## APPENDIX B: **Specific information about the Network Server**
Depending on the LoRaWAN Network Server, there might be some specific configuration.

### B.1. Details for `actility`:
When using downlink, ThingPark needs information to retrieve the payload encoder. In ThingPark, the payload decoder are called drivers and have 3 identifiers : pID, mID and ver.

### B.2. Details for `chirpstack`:
When using downlink as well as the "Flush Downlink Queue" capability, LoRaBAC uses the ChirpStack's grpc API to flush the queue. Therefore, we need to provide the API Key generated by ChirpStack.  
