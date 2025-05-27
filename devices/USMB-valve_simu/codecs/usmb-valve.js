function decodeUplink(input) {
  return {
    data: {
      valveSetpoint: input.bytes[0]/2,
      valveTemperature: input.bytes[1]/2
    },
    warnings: [],
    errors: []
  };
}

function encodeDownlink(input) {
  return {
    bytes: [input.data.controllerSetpoint*2],
    fPort: input.fPort,
    warnings: [],
    errors: []
  };
}
