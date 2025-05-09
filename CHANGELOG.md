# Library Changelog
#### Author: Sylvain Montagny & Sacha Faure & Quentin Casagranda 


## Known limitations
* only tested with class A  and class C (only from v1.5.0) devices (LoRaBAC does not support class B).

## Version: V1.7.0 | 2025-05-09

### Modified
- The downlink strategies have been changed and are now :
    - **`compareToUplinkObject`**
    - **`compareToUplinkObjectWithinRange`** 
    - **`onChangeOfThisObjectValue`** 
    - **`onChangeOfThisObjectValueWithinRange`** 
- Now the the flow do not stop after the création of the missing BACnet objects
- The test for the overlap of manualy assigned BACnet objects has been removed
- The TO CONFIGURE node is now inside the node called `Create Device Object (On Start TO CONFIGURE)` in the "On Start" tab.

### Fixed
- the native BACnet nodes were perviously used with a hard coded IP address. Now the IP address used is the one we set in the configuration node.

## Version: V1.6.0 | 2025-04-24

### Added
- A "defaultValuesForDownlink" property has been added in the lorawan property of each device type of the device list to set static values for downlink.
- A description has been added inside the information tab of the MQTT subscriber node.
- Some tests has been added to ensure that the configuration is correct and that instances don't overlap another.

### Modified
- There is now only one subflow for restAPI in which we can choose if we **write** `Uplinks` on the controller or if we **read** the `Downlinks` from the controller.    

## Version: V1.5.0 | 2025-04-24

### Added
- A "polling of class C devices's downlink bacnet objects" group has been added to manage downlinks of class C devices.
- Another group used to manage errors has been added this one allow the user to have more precision on where and why the error happened.
- A new downlink strategie has been added. The "onChangeOfValueWithinRange" strategie that allow the user to choose a range within which the value will be updated, if the value is out of this range no downlink will be sent to the device.

### Modified
- The "oldvalues" flow context variable is now "previousValues".
- The two subflows used for native bacnet communication have been replaced by two equivalent function nodes 

## Version: V1.4.1 | 2025-04-16

### Fixed
- The downlink strategies node that wasn't working correctly has been fixed by adding two missing lines


## Version: V1.4.0 | 2025-04-16

### Added
- A "downlink strategie" field has been added to the downlink BACnet objects description to choose a downlink strategie for each object for more refer to the readme part related to the downlink strategie.
- A flow variable has been added to store the previous values of the downlink objects.
- A node has been added to update this variable once the downlik message has been sent. 

### Modified
- The "objectToCompareWith" property is now "uplinkToCompareWith".

## Version: V1.3.0 | 2025-04-15

### Added
- An "assignement mode" field has been added to the downlink BACnet objects description to choose if the instance Number is Automatically or manually set.

### Modified
- The identity propriety which was automatically added before is now to include inside the device list object with its child property, "maxDevNum" that has to be configured. 

## Version: V1.2.0 | 2025-04-14

### Added
- An "uplink object to compare with" field has been added to the downlink BACnet objects description to use the downlink strategie correctly.
- A downlink priority has been added to the downlink BACnet objects description.

### Modified
- The LoRaWAN downlink port is now in the downlink BACnet objects description (previously in lorawan property of the device).
- The downlink strategie can now be used with any device as long as it has an uplink value to compare with the downlink value.


## Version: V1.1.0 | 2025-04-14

### Modified
- Separation of the offset and instanceRange value in two parts. One for the analog values (offsetAV and instanceRangeAV) and one for the binary value (offsetBV and instanceRangeBV).


## Version: V1.0.0 | 2025-03-25

### First version features:

#### Update BACnet objects from a loraWAN frame (Native BACnet / Rest API):
- Native BACnet : Works only if object already exist in the controller. 
- Rest API : Works only with compatible controllers.

#### Supported network servers:
- The things network or the things stack
- Chirpstack
- Actillity