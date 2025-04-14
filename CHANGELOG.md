# Library Changelog
#### Author: Sylvain Montagny & Sacha Faure & Quentin Casagranda 


## Known limitations
* only tested with class A devices.

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