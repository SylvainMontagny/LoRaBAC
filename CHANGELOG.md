# Library Changelog
#### Author: Sylvain Montagny & Sacha Faure & Quentin Casagranda 


## Known limitations
* only tested with class A devices.

## Version: V1.1.0 | 2025-04-14

### Modified
- Separation of the offset and instanceRange value in two parts one for the analog values (offsetAV and instanceRangeAV) and one for the binary value (offsetBV and instanceRangeBV).


## Version: V1.0.0 | 2025-03-25

### First version features:

#### Update BACnet objects from a loraWAN frame (Native BACnet / Rest API):
- Native BACnet : Works only if object already exist in the controller. 
- Rest API : Works only with compatible controllers.

#### Supported network servers:
- The things network or the things stack
- Chirpstack
- Actillity