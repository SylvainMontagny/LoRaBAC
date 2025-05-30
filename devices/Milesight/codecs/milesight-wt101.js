
/**
 * Payload Decoder
 *
 * Copyright 2024 Milesight IoT
 *
 * @product WT101
 */
// Chirpstack v4
function decodeUplink(input) {
    var decoded = milesightDeviceDecode(input.bytes);
    return { data: decoded };
}

// Chirpstack v3
function Decode(fPort, bytes) {
    return milesightDeviceDecode(bytes);
}

// The Things Network
function Decoder(bytes, port) {
    return milesightDeviceDecode(bytes);
}

function milesightDeviceDecode(bytes) {
    var decoded = {};

    for (var i = 0; i < bytes.length; ) {
        var channel_id = bytes[i++];
        var channel_type = bytes[i++];

        // POWER STATUS
        if (channel_id === 0xff && channel_type === 0x0b) {
            decoded.power_status = "on";
            i += 1;
        }
        // IPSO VERSION
        else if (channel_id === 0xff && channel_type === 0x01) {
            decoded.ipso_version = readProtocolVersion(bytes[i]);
            i += 1;
        }
        // PRODUCT SERIAL NUMBER
        else if (channel_id === 0xff && channel_type === 0x16) {
            decoded.sn = readSerialNumber(bytes.slice(i, i + 8));
            i += 8;
        }
        // HARDWARE VERSION
        else if (channel_id === 0xff && channel_type === 0x09) {
            decoded.hardware_version = readHardwareVersion(bytes.slice(i, i + 2));
            i += 2;
        }
        // FIRMWARE VERSION
        else if (channel_id === 0xff && channel_type === 0x0a) {
            decoded.firmware_version = readFirmwareVersion(bytes.slice(i, i + 2));
            i += 2;
        }
        // LORAWAN CLASS TYPE
        else if (channel_id === 0xff && channel_type === 0x0f) {
            decoded.lorawan_class = readLoRaWANType(bytes[i]);
            i += 1;
        }
        // TSL VERSION
        else if (channel_id === 0xff && channel_type === 0xff) {
            decoded.tsl_version = readTslVersion(bytes.slice(i, i + 2));
            i += 2;
        }
        // BATTERY
        else if (channel_id === 0x01 && channel_type === 0x75) {
            decoded.battery = readUInt8(bytes[i]);
            i += 1;
        }
        // TEMPERATURE
        else if (channel_id === 0x03 && channel_type === 0x67) {
            decoded.temperature = readInt16LE(bytes.slice(i, i + 2)) / 10;
            i += 2;
        }
        // TEMPERATURE TARGET
        else if (channel_id === 0x04 && channel_type === 0x67) {
            decoded.temperature_target = readInt16LE(bytes.slice(i, i + 2)) / 10;
            i += 2;
        }
        // VALVE OPENING
        else if (channel_id === 0x05 && channel_type === 0x92) {
            decoded.valve_opening = readUInt8(bytes[i]);
            i += 1;
        }
        // TAMPER STATUS
        else if (channel_id === 0x06 && channel_type === 0x00) {
            decoded.tamper_status = bytes[i] === 0 ? "installed" : "uninstalled";
            i += 1;
        }
        // WINDOW DETECTION
        else if (channel_id === 0x07 && channel_type === 0x00) {
            decoded.window_detection = bytes[i] === 0 ? "normal" : "open";
            i += 1;
        }
        // MOTOR STROKE CALIBRATION RESULT
        else if (channel_id === 0x08 && channel_type === 0xe5) {
            decoded.motor_calibration_result = readMotorCalibration(bytes[i]);
            i += 1;
        }
        // MOTOR STROKE
        else if (channel_id === 0x09 && channel_type === 0x90) {
            decoded.motor_stroke = readUInt16LE(bytes.slice(i, i + 2));
            i += 2;
        }
        // FREEZE PROTECTION
        else if (channel_id === 0x0a && channel_type === 0x00) {
            decoded.freeze_protection = bytes[i] === 0 ? "normal" : "triggered";
            i += 1;
        }
        // MOTOR CURRENT POSITION
        else if (channel_id === 0x0b && channel_type === 0x90) {
            decoded.motor_position = readUInt16LE(bytes.slice(i, i + 2));
            i += 2;
        }
        // HEATING DATE
        else if (channel_id === 0xf9 && channel_type === 0x33) {
            decoded.heating_date = readHeatingDate(bytes.slice(i, i + 7));
            i += 7;
        }
        // HEATING SCHEDULE
        else if (channel_id === 0xf9 && channel_type === 0x34) {
            var heating_schedule = readHeatingSchedule(bytes.slice(i, i + 9));
            decoded.heating_schedule = decoded.heating_schedule || [];
            decoded.heating_schedule.push(heating_schedule);
            i += 9;
        }
        // DOWNLINK RESPONSE
        else if (channel_id === 0xfe) {
            result = handle_downlink_response(channel_type, bytes, i);
            decoded = Object.assign(decoded, result.data);
            i = result.offset;
        }
        // DOWNLINK RESPONSE
        else if (channel_id === 0xf8) {
            result = handle_downlink_response_ext(channel_type, bytes, i);
            decoded = Object.assign(decoded, result.data);
            i = result.offset;
        } else {
            break;
        }
    }

    return decoded;
}

function readUInt8(bytes) {
    return bytes & 0xff;
}

function readInt8(bytes) {
    var ref = readUInt8(bytes);
    return ref > 0x7f ? ref - 0x100 : ref;
}

function readUInt16LE(bytes) {
    var value = (bytes[1] << 8) + bytes[0];
    return value & 0xffff;
}

function readInt16LE(bytes) {
    var ref = readUInt16LE(bytes);
    return ref > 0x7fff ? ref - 0x10000 : ref;
}

function readProtocolVersion(bytes) {
    var major = (bytes & 0xf0) >> 4;
    var minor = bytes & 0x0f;
    return "v" + major + "." + minor;
}

function readHardwareVersion(bytes) {
    var major = bytes[0] & 0xff;
    var minor = (bytes[1] & 0xff) >> 4;
    return "v" + major + "." + minor;
}

function readFirmwareVersion(bytes) {
    var major = bytes[0] & 0xff;
    var minor = bytes[1] & 0xff;
    return "v" + major + "." + minor;
}

function readTslVersion(bytes) {
    var major = bytes[0] & 0xff;
    var minor = bytes[1] & 0xff;
    return "v" + major + "." + minor;
}

function readSerialNumber(bytes) {
    var temp = [];
    for (var idx = 0; idx < bytes.length; idx++) {
        temp.push(("0" + (bytes[idx] & 0xff).toString(16)).slice(-2));
    }
    return temp.join("");
}

function readLoRaWANType(type) {
    switch (type) {
        case 0x00:
            return "ClassA";
        case 0x01:
            return "ClassB";
        case 0x02:
            return "ClassC";
        case 0x03:
            return "ClassCtoB";
        default:
            return "Unknown";
    }
}

function readMotorCalibration(type) {
    switch (type) {
        case 0x00:
            return "success";
        case 0x01:
            return "fail: out of range";
        case 0x02:
            return "fail: uninstalled";
        case 0x03:
            return "calibration cleared";
        case 0x04:
            return "temperature control disabled";
        default:
            return "unknown";
    }
}

function readHeatingDate(bytes) {
    var heating_date = {};
    var offset = 0;
    heating_date.enable = readUInt8(bytes[offset]);
    heating_date.report_interval = readUInt16LE(bytes.slice(offset + 1, offset + 3));
    heating_date.start_month = readUInt8(bytes[offset + 3]);
    heating_date.start_day = readUInt8(bytes[offset + 4]);
    heating_date.end_month = readUInt8(bytes[offset + 5]);
    heating_date.end_day = readUInt8(bytes[offset + 6]);
    return heating_date;
}

function handle_downlink_response(channel_type, bytes, offset) {
    var decoded = {};

    switch (channel_type) {
        case 0x17: // timezone
            decoded.timezone = readInt16LE(bytes.slice(offset, offset + 2)) / 10;
            offset += 2;
            break;
        case 0x4a: // sync_time
            decoded.sync_time = 1;
            offset += 1;
            break;
        case 0x8e: // report_interval
            // ignore the first byte
            decoded.report_interval = readUInt16LE(bytes.slice(offset + 1, offset + 3));
            offset += 3;
            break;
        case 0x3b: // time_sync_enable
            decoded.time_sync_enable = readUInt8(bytes[offset]);
            offset += 1;
            break;
        case 0xb3: // temperature_control(enable)
            decoded.temperature_control = decoded.temperature_control || {};
            decoded.temperature_control.enable = bytes[offset];
            offset += 1;
            break;
        case 0xae: // temperature_control(mode)
            decoded.temperature_control = decoded.temperature_control || {};
            decoded.temperature_control.mode = bytes[offset];
            offset += 1;
            break;
        case 0xab: // temperature_calibration(enable, temperature)
            decoded.temperature_calibration = {};
            decoded.temperature_calibration.enable = bytes[offset];
            if (decoded.temperature_calibration.enable === 1) {
                decoded.temperature_calibration.temperature = readInt16LE(bytes.slice(offset + 1, offset + 3)) / 10;
            }
            offset += 3;
            break;
        case 0xb1: // temperature_target, temperature_error
            decoded.temperature_target = readInt8(bytes[offset]);
            decoded.temperature_error = readUInt16LE(bytes.slice(offset + 1, offset + 3)) / 10;
            offset += 3;
            break;
        case 0xac: // valve_control_algorithm
            decoded.valve_control_algorithm = readUInt8(bytes[offset]);
            offset += 1;
            break;
        case 0xb0: // freeze_protection_config(enable, temperature)
            decoded.freeze_protection_config = decoded.freeze_protection_config || {};
            decoded.freeze_protection_config.enable = readUInt8(bytes[offset]);
            if (decoded.freeze_protection_config.enable === 1) {
                decoded.freeze_protection_config.temperature = readInt16LE(bytes.slice(offset + 1, offset + 3)) / 10;
            }
            offset += 3;
            break;
        case 0xaf: // open_window_detection(enable, rate, time)
            decoded.open_window_detection = decoded.open_window_detection || {};
            decoded.open_window_detection.enable = readUInt8(bytes[offset]);
            if (decoded.open_window_detection.enable === 1) {
                decoded.open_window_detection.temperature_threshold = readInt8(bytes[offset + 1]) / 10;
                decoded.open_window_detection.time = readUInt16LE(bytes.slice(offset + 2, offset + 4));
            }
            offset += 4;
            break;
        case 0x57: // restore_open_window_detection
            decoded.restore_open_window_detection = 1;
            offset += 1;
            break;
        case 0xb4: // valve_opening
            decoded.valve_opening = readUInt8(bytes[offset]);
            offset += 1;
            break;
        case 0xad: // valve_calibration
            decoded.valve_calibration = 1;
            offset += 1;
            break;
        case 0x25: // child_lock_config
            decoded.child_lock_config = decoded.child_lock_config || {};
            decoded.child_lock_config.enable = readUInt8(bytes[offset]);
            offset += 1;
            break;
        case 0xc4: // outside_temperature_control
            decoded.outside_temperature_control = {};
            decoded.outside_temperature_control.enable = readUInt8(bytes[offset]);
            decoded.outside_temperature_control.timeout = readUInt8(bytes[offset + 1]);
            offset += 2;
            break;
        case 0xf8: // offline_control_mode
            decoded.offline_control_mode = readUInt8(bytes[offset]);
            offset += 1;
            break;
        case 0xbd:
            decoded.timezone = readInt16LE(bytes.slice(offset, offset + 2)) / 60;
            offset += 2;
            break;
        case 0xba: // dst_config
            decoded.dst_config = {};
            decoded.dst_config.enable = readUInt8(bytes[offset]);
            decoded.dst_config.offset = readInt8(bytes[offset + 1]);
            decoded.dst_config.start_time = {};
            decoded.dst_config.start_time.month = readUInt8(bytes[offset + 2]);
            decoded.dst_config.start_time.week = readUInt8(bytes[offset + 3]) >> 4;
            decoded.dst_config.start_time.weekday = readUInt8(bytes[offset + 3]) & 0x0f;
            var start_time = readUInt16LE(bytes.slice(offset + 4, offset + 6));
            decoded.dst_config.start_time.time = Math.floor(start_time / 60) + ":" + (start_time % 60);
            decoded.dst_config.end_time = {};
            decoded.dst_config.end_time.month = readUInt8(bytes[offset + 6]);
            decoded.dst_config.end_time.week = readUInt8(bytes[offset + 7]) >> 4;
            decoded.dst_config.end_time.weekday = readUInt8(bytes[offset + 7]) & 0x0f;
            var end_time = readUInt16LE(bytes.slice(offset + 8, offset + 10));
            decoded.dst_config.end_time.time = Math.floor(end_time / 60) + ":" + (end_time % 60);
            offset += 10;
            break;
        default:
            throw new Error("unknown downlink response");
    }

    return { data: decoded, offset: offset };
}

function handle_downlink_response_ext(channel_type, bytes, offset) {
    var decoded = {};

    switch (channel_type) {
        case 0x33:
            var heating_date_result = readUInt8(bytes[offset + 7]);
            if (heating_date_result === 0) {
                decoded.heating_date = readHeatingDate(bytes.slice(offset, offset + 7));
            }
            offset += 8;
            break;
        case 0x34:
            var heating_schedule_result = readUInt8(bytes[offset + 9]);
            if (heating_schedule_result === 0) {
                var heating_schedule = readHeatingSchedule(bytes.slice(offset, offset + 9));
                decoded.heating_schedule = decoded.heating_schedule || [];
                decoded.heating_schedule.push(heating_schedule);
            }
            offset += 10;
            break;
        case 0x35:
            var temperature_target_range_result = readUInt8(bytes[offset + 2]);
            if (temperature_target_range_result === 0) {
                decoded.temperature_target_range = {};
                decoded.temperature_target_range.min = readInt8(bytes[offset]);
                decoded.temperature_target_range.max = readInt8(bytes[offset + 1]);
            }
            offset += 3;
            break;
        case 0x36:
            var display_ambient_temperature_result = readUInt8(bytes[offset + 1]);
            if (display_ambient_temperature_result === 0) {
                decoded.display_ambient_temperature = readUInt8(bytes[offset]);
            }
            offset += 2;
            break;
        case 0x37:
            var window_detection_valve_strategy_result = readUInt8(bytes[offset + 1]);
            if (window_detection_valve_strategy_result === 0) {
                decoded.window_detection_valve_strategy = readUInt8(bytes[offset]);
            }
            offset += 2;
            break;
        case 0x38: // effective_stroke
            var effective_stroke_result = readUInt8(bytes[offset + 2]);
            if (effective_stroke_result === 0) {
                decoded.effective_stroke = {};
                decoded.effective_stroke.enable = readUInt8(bytes[offset]);
                decoded.effective_stroke.rate = readUInt8(bytes[offset + 1]);
            }
            offset += 3;
            break;
        case 0x3a: // change_report_enable
            var change_report_enable_result = readUInt8(bytes[offset + 1]);
            if (change_report_enable_result === 0) {
                decoded.change_report_enable = readUInt8(bytes[offset]);
            }
            offset += 2;
            break;
        default:
            throw new Error("unknown downlink response");
    }

    return { data: decoded, offset: offset };
}

if (!Object.assign) {
    Object.defineProperty(Object, "assign", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (target) {
            "use strict";
            if (target == null) {
                // TypeError if undefined or null
                throw new TypeError("Cannot convert first argument to object");
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource == null) {
                    // Skip over if undefined or null
                    continue;
                }
                nextSource = Object(nextSource);

                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        },
    });
}
function readHeatingSchedule(bytes) {
    var heating_schedule = {};
    var offset = 0;
    heating_schedule.index = readUInt8(bytes[offset]) + 1;
    heating_schedule.enable = readUInt8(bytes[offset + 1]);
    heating_schedule.temperature_control_mode = readUInt8(bytes[offset + 2]);
    heating_schedule.value = readUInt8(bytes[offset + 3]);
    heating_schedule.report_interval = readUInt16LE(bytes.slice(offset + 4, offset + 6));
    var time = readUInt16LE(bytes.slice(offset + 6, offset + 8));
    heating_schedule.execute_time = Math.floor(time / 60) + ":" + (time % 60);
    var day = readUInt8(bytes[offset + 8]);
    heating_schedule.week_recycle = [];
    for (var i = 1; i <= 7; i++) {
        if ((day >> i) & 0x01) {
            heating_schedule.week_recycle.push(i);
        }
    }
    return heating_schedule;
}


/**
 * Encode downlink function.
 * 
 * @param {object} input
 * @param {object} input.data Object representing the payload that must be encoded.
 * @param {Record<string, string>} input.variables Object containing the configured device variables.
 * 
 * @returns {{bytes: number[]}} Byte array containing the downlink payload.
 */
/**
 * Payload Encoder
 *
 * Copyright 2024 Milesight IoT
 *
 * @product WT101
 */
// Chirpstack v4
function encodeDownlink(input) {
    var encoded = milesightDeviceEncode(input.data);
    return { bytes: encoded };
}

// Chirpstack v3
function Encode(fPort, obj) {
    var encoded = milesightDeviceEncode(obj);
    return encoded;
}

// The Things Network
function Encoder(obj, port) {
    return milesightDeviceEncode(obj);
}

function milesightDeviceEncode(payload) {
    var encoded = [];

    if ("reboot" in payload) {
        encoded = encoded.concat(reboot(payload.reboot));
    }
    if ("report_status" in payload) {
        encoded = encoded.concat(reportStatus(payload.report_status));
    }
    if ("report_heating_date" in payload) {
        encoded = encoded.concat(reportHeatingDate(payload.report_heating_date));
    }
    if ("report_heating_schedule" in payload) {
        encoded = encoded.concat(reportHeatingSchedule(payload.report_heating_schedule));
    }
    if ("sync_time" in payload) {
        encoded = encoded.concat(syncTime(payload.sync_time));
    }
    if ("report_interval" in payload) {
        encoded = encoded.concat(setReportInterval(payload.report_interval));
    }
    if ("timezone" in payload) {
        encoded = encoded.concat(setTimeZone(payload.timezone));
    }
    if ("time_sync_enable" in payload) {
        encoded = encoded.concat(setTimeSyncEnable(payload.time_sync_enable));
    }
    if ("temperature_calibration" in payload) {
        encoded = encoded.concat(setTemperatureCalibration(payload.temperature_calibration.enable, payload.temperature_calibration.temperature));
    }
    if ("temperature_control" in payload && "enable" in payload.temperature_control) {
        encoded = encoded.concat(setTemperatureControl(payload.temperature_control.enable));
    }
    if ("temperature_control" in payload && "mode" in payload.temperature_control) {
        encoded = encoded.concat(setTemperatureControlMode(payload.temperature_control.mode));
    }
    if ("temperature_target" in payload) {
        encoded = encoded.concat(setTemperatureTarget(payload.temperature_target, payload.temperature_error));
    }
    if ("temperature_target_range" in payload) {
        encoded = encoded.concat(setTemperatureTargetRange(payload.temperature_target_range.min, payload.temperature_target_range.max));
    }
    if ("open_window_detection" in payload) {
        encoded = encoded.concat(setOpenWindowDetection(payload.open_window_detection.enable, payload.open_window_detection.temperature_threshold, payload.open_window_detection.time));
    }
    if ("restore_open_window_detection" in payload) {
        encoded = encoded.concat(restoreOpenWindowDetection(payload.restore_open_window_detection));
    }
    if ("valve_opening" in payload) {
        encoded = encoded.concat(setValveOpening(payload.valve_opening));
    }
    if ("valve_calibration" in payload) {
        encoded = encoded.concat(setValveCalibration(payload.valve_calibration));
    }
    if ("valve_control_algorithm" in payload) {
        encoded = encoded.concat(setValveControlAlgorithm(payload.valve_control_algorithm));
    }
    if ("freeze_protection_config" in payload) {
        encoded = encoded.concat(setFreezeProtection(payload.freeze_protection_config.enable, payload.freeze_protection_config.temperature));
    }
    if ("child_lock_config" in payload) {
        encoded = encoded.concat(setChildLockEnable(payload.child_lock_config.enable));
    }
    if ("offline_control_mode" in payload) {
        encoded = encoded.concat(setOfflineControlMode(payload.offline_control_mode));
    }
    if ("outside_temperature" in payload) {
        encoded = encoded.concat(setOutsideTemperature(payload.outside_temperature));
    }
    if ("outside_temperature_control" in payload) {
        encoded = encoded.concat(setOutsideTemperatureControl(payload.outside_temperature_control.enable, payload.outside_temperature_control.timeout));
    }
    if ("display_ambient_temperature" in payload) {
        encoded = encoded.concat(setDisplayAmbientTemperature(payload.display_ambient_temperature));
    }
    if ("window_detection_valve_strategy" in payload) {
        encoded = encoded.concat(setWindowDetectionValveStrategy(payload.window_detection_valve_strategy));
    }
    if ("dst_config" in payload) {
        encoded = encoded.concat(setDaylightSavingTime(payload.dst_config.enable, payload.dst_config.offset, payload.dst_config.start_time, payload.dst_config.end_time));
    }
    if ("effective_stroke" in payload) {
        encoded = encoded.concat(setEffectiveStroke(payload.effective_stroke.enable, payload.effective_stroke.rate));
    }
    if ("heating_date" in payload) {
        encoded = encoded.concat(setHeatingDate(payload.heating_date.enable, payload.heating_date.start_month, payload.heating_date.start_day, payload.heating_date.end_month, payload.heating_date.end_day, payload.heating_date.report_interval));
    }
    if ("heating_schedule" in payload) {
        for (var i = 0; i < payload.heating_schedule.length; i++) {
            var schedule = payload.heating_schedule[i];
            encoded = encoded.concat(setHeatingSchedule(schedule.index, schedule.enable, schedule.temperature_control_mode, schedule.value, schedule.report_interval, schedule.execute_time, schedule.week_recycle));
        }
    }
    if ("change_report_enable" in payload) {
        encoded = encoded.concat(setChangeReportEnable(payload.change_report_enable));
    }
    return encoded;
}

/**
 * device reboot
 * @param {number} reboot
 * @example { "reboot": 1 }
 */
function reboot(reboot) {
    var reboot_values = [0, 1];
    if (reboot_values.indexOf(reboot) == -1) {
        throw new Error("reboot must be one of " + reboot_values.join(", "));
    }

    if (reboot === 0) {
        return [];
    }
    return [0xff, 0x10, 0xff];
}

/**
 * sync time
 * @param {number} sync_time
 * @example { "sync_time": 1 }
 */
function syncTime(sync_time) {
    var sync_time_values = [0, 1];
    if (sync_time_values.indexOf(sync_time) === -1) {
        throw new Error("sync_time must be one of " + sync_time_values.join(", "));
    }

    if (sync_time === 0) {
        return [];
    }
    return [0xff, 0x4a, 0xff];
}

/**
 * report status
 * @param {number} report_status
 * @example { "report_status": 1 }
 */
function reportStatus(report_status) {
    var report_status_values = [0, 1];
    if (report_status_values.indexOf(report_status) == -1) {
        throw new Error("report_status must be one of " + report_status_values.join(", "));
    }

    if (report_status === 0) {
        return [];
    }
    return [0xff, 0x28, 0x00];
}

/**
 * report heating date
 * @param {number} report_heating_date values: (0: disable, 1: enable)
 * @example { "report_heating_date": 1 }
 */
function reportHeatingDate(report_heating_date) {
    var report_heating_date_values = [0, 1];
    if (report_heating_date_values.indexOf(report_heating_date) == -1) {
        throw new Error("report_heating_date must be one of " + report_heating_date_values.join(", "));
    }

    if (report_heating_date === 0) {
        return [];
    }
    return [0xff, 0x28, 0x01];
}

/**
 * report heating schedule
 * @param {number} report_heating_schedule values: (0: disable, 1: enable)
 * @example { "report_heating_schedule": 1 }
 */
function reportHeatingSchedule(report_heating_schedule) {
    var report_heating_schedule_values = [0, 1];
    if (report_heating_schedule_values.indexOf(report_heating_schedule) == -1) {
        throw new Error("report_heating_schedule must be one of " + report_heating_schedule_values.join(", "));
    }

    if (report_heating_schedule === 0) {
        return [];
    }
    return [0xff, 0x28, 0x02];
}

/**
 * report interval configuration
 * @param {number} report_interval uint: minute, range: [1, 1440]
 * @example { "report_interval": 10 }
 */
function setReportInterval(report_interval) {
    if (typeof report_interval !== "number") {
        throw new Error("report_interval must be a number");
    }
    if (report_interval < 1 || report_interval > 1440) {
        throw new Error("report_interval must be between 1 and 1440");
    }

    var buffer = new Buffer(5);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x8e);
    buffer.writeUInt8(0x00);
    buffer.writeUInt16LE(report_interval);
    return buffer.toBytes();
}

/**
 * time sync configuration
 * @param {number} time_sync_enable values: (0: disable, 1: enable)
 * @example { "time_sync_enable": 0 }
 */
function setTimeSyncEnable(time_sync_enable) {
    var time_sync_enable_values = [0, 1];
    if (time_sync_enable_values.indexOf(time_sync_enable) == -1) {
        throw new Error("time_sync_enable must be one of " + time_sync_enable_values.join(", "));
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x3b);
    buffer.writeUInt8(time_sync_enable ? 0x02 : 0x00);
    return buffer.toBytes();
}

/**
 * temperature calibration configuration
 * @param {number} enable
 * @param {number} temperature uint: Celsius
 * @example { "temperature_calibration": { "enable": 1, "temperature": 5 }}
 * @example { "temperature_calibration": { "enable": 1, "temperature": -5 }}
 * @example { "temperature_calibration": { "enable": 0 } }
 */
function setTemperatureCalibration(enable, temperature) {
    var temperature_calibration_enable_values = [0, 1];
    if (temperature_calibration_enable_values.indexOf(enable) == -1) {
        throw new Error("temperature_calibration.enable must be one of " + temperature_calibration_enable_values.join(", "));
    }
    if (enable && typeof temperature !== "number") {
        throw new Error("temperature_calibration.temperature must be a number");
    }

    var buffer = new Buffer(5);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0xab);
    buffer.writeUInt8(enable);
    buffer.writeInt16LE(temperature * 10);
    return buffer.toBytes();
}

/**
 * temperature control enable configuration
 * @param {number} enable
 * @example { "temperature_control": { "enable": 1 } }
 */
function setTemperatureControl(enable) {
    var temperature_control_enable_values = [0, 1];
    if (temperature_control_enable_values.indexOf(enable) == -1) {
        throw new Error("temperature_control.enable must be one of " + temperature_control_enable_values.join(", "));
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0xb3);
    buffer.writeUInt8(enable);
    return buffer.toBytes();
}

/**
 * temperature control mode configuration
 * @param {string} mode, values: (0: auto, 1: manual)
 * @example { "temperature_control": { "mode": 0 } }
 * @example { "temperature_control": { "mode": 1 } }
 */
function setTemperatureControlMode(mode) {
    var temperature_control_mode_values = [0, 1];
    if (temperature_control_mode_values.indexOf(mode) == -1) {
        throw new Error("temperature_control.mode must be one of " + temperature_control_mode_values.join(", "));
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0xae);
    buffer.writeUInt8(mode);
    return buffer.toBytes();
}

/**
 * temperature target configuration
 * @param {number} temperature_target uint: Celsius
 * @param {number} temperature_error uint: Celsius
 * @example { "temperature_target": 10, "temperature_error": 0.1 }
 * @example { "temperature_target": 28, "temperature_error": 5 }
 */
function setTemperatureTarget(temperature_target, temperature_error) {
    if (typeof temperature_target !== "number") {
        throw new Error("temperature_target must be a number");
    }
    if (typeof temperature_error !== "number") {
        throw new Error("temperature_error must be a number");
    }

    var buffer = new Buffer(4);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0xb1);
    buffer.writeInt8(temperature_target);
    buffer.writeUInt16LE(temperature_error * 10);
    return buffer.toBytes();
}

/**
 * set temperature target range
 * @param {number} min unit: Celsius, range: [5, 15]
 * @param {number} max unit: Celsius, range: [16, 35]
 * @since v1.3
 */
function setTemperatureTargetRange(min, max) {
    if (typeof min !== "number") {
        throw new Error("temperature_target_range.min must be a number");
    }
    if (min < 5 || min > 15) {
        throw new Error("temperature_target_range.min must be between 5 and 15");
    }
    if (typeof max !== "number") {
        throw new Error("temperature_target_range.max must be a number");
    }
    if (max < 16 || max > 35) {
        throw new Error("temperature_target_range.max must be between 16 and 35");
    }

    var buffer = new Buffer(4);
    buffer.writeUInt8(0xf9);
    buffer.writeUInt8(0x35);
    buffer.writeUInt8(min);
    buffer.writeUInt8(max);
    return buffer.toBytes();
}

/**
 * open window detection configuration *
 * @param {number} enable
 * @param {number} temperature_threshold uint: Celsius
 * @param {number} time uint: minute
 * @example { "open_window_detection": { "enable": 1, "temperature_threshold": 2, "time": 1 } }
 * @example { "open_window_detection": { "enable": 1, "temperature_threshold": 10, "time": 1440 } }
 * @example { "open_window_detection": { "enable": 0 } }
 */
function setOpenWindowDetection(enable, temperature_threshold, time) {
    var open_window_detection_enable_values = [0, 1];
    if (open_window_detection_enable_values.indexOf(enable) == -1) {
        throw new Error("open_window_detection.enable must be one of " + open_window_detection_enable_values.join(", "));
    }
    if (enable && typeof temperature_threshold !== "number") {
        throw new Error("open_window_detection.temperature_threshold must be a number");
    }
    if (enable && typeof time !== "number") {
        throw new Error("open_window_detection.time must be a number");
    }

    var buffer = new Buffer(6);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0xaf);
    buffer.writeUInt8(enable);
    buffer.writeInt8(temperature_threshold * 10);
    buffer.writeUInt16LE(time);
    return buffer.toBytes();
}

/**
 * restore open window detection status
 * @param {number} restore_open_window_detection
 * @example { "restore_open_window_detection": 1 }
 */
function restoreOpenWindowDetection(restore_open_window_detection) {
    var restore_open_window_detection_values = [0, 1];
    if (restore_open_window_detection_values.indexOf(restore_open_window_detection) == -1) {
        throw new Error("restore_open_window_detection must be one of " + restore_open_window_detection_values.join(", "));
    }

    if (restore_open_window_detection === 0) {
        return [];
    }
    return [0xff, 0x57, 0xff];
}

/**
 * valve opening configuration
 * @param {number} valve_opening uint: percentage, range: [0, 100]
 * @example { "valve_opening": 50 }
 */
function setValveOpening(valve_opening) {
    if (typeof valve_opening !== "number") {
        throw new Error("valve_opening must be a number");
    }
    if (valve_opening < 0 || valve_opening > 100) {
        throw new Error("valve_opening must be between 0 and 100");
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0xb4);
    buffer.writeUInt8(valve_opening);
    return buffer.toBytes();
}

/**
 * valve calibration
 * @param {number} valve_calibration
 * @example { "valve_calibration": 1 }
 */
function setValveCalibration(valve_calibration) {
    var valve_calibration_values = [0, 1];
    if (valve_calibration_values.indexOf(valve_calibration) == -1) {
        throw new Error("valve_calibration must be one of " + valve_calibration_values.join(", "));
    }

    if (valve_calibration === 0) {
        return [];
    }
    return [0xff, 0xad, 0xff];
}

/**
 * valve control algorithm
 * @param {string} valve_control_algorithm values: (0: rate, 1: pid)
 * @example { "valve_control_algorithm": 0 }
 */
function setValveControlAlgorithm(valve_control_algorithm) {
    var valve_control_algorithm_values = [0, 1];
    if (valve_control_algorithm_values.indexOf(valve_control_algorithm) == -1) {
        throw new Error("valve_control_algorithm must be one of " + valve_control_algorithm_values.join(", "));
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0xac);
    buffer.writeUInt8(valve_control_algorithm);
    return buffer.toBytes();
}

/**
 * freeze protection configuration
 * @param {number} enable
 * @param {number} temperature uint: Celsius
 * @example { "freeze_protection_config": { "enable": 1, "temperature": 5 } }
 * @example { "freeze_protection_config": { "enable": 0 } }
 */
function setFreezeProtection(enable, temperature) {
    var freeze_protection_enable_values = [0, 1];
    if (freeze_protection_enable_values.indexOf(enable) == -1) {
        throw new Error("freeze_protection_config.enable must be one of " + freeze_protection_enable_values.join(", "));
    }
    if (enable && typeof temperature !== "number") {
        throw new Error("freeze_protection_config.temperature must be a number");
    }

    var buffer = new Buffer(5);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0xb0);
    buffer.writeUInt8(enable);
    buffer.writeInt16LE(temperature * 10);
    return buffer.toBytes();
}

/**
 * child lock configuration
 * @param {number} enable values: (0: disable, 1: enable)
 * @example { "child_lock_config": { "enable": 1 } }
 */
function setChildLockEnable(enable) {
    var child_lock_enable_values = [0, 1];
    if (child_lock_enable_values.indexOf(enable) == -1) {
        throw new Error("child_lock_config.enable must be one of " + child_lock_enable_values.join(", "));
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x25);
    buffer.writeUInt8(enable);
    return buffer.toBytes();
}

/**
 * offline control mode configuration
 * @param {number} offline_control_mode values: (0: keep, 1: embedded temperature control, 2: off)
 * @example { "offline_control_mode": 0 }
 * @since v1.3
 */
function setOfflineControlMode(offline_control_mode) {
    var offline_control_mode_values = [0, 1, 2];
    if (offline_control_mode_values.indexOf(offline_control_mode) === -1) {
        throw new Error("offline_control_mode must be one of " + offline_control_mode_values.join(", "));
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0xf8);
    buffer.writeUInt8(offline_control_mode);
    return buffer.toBytes();
}

/**
 * set outside temperature
 * @param {number} outside_temperature, unit: celsius
 * @example { "outside_temperature": 25 }
 * @since v1.3
 */
function setOutsideTemperature(outside_temperature) {
    if (typeof outside_temperature !== "number") {
        throw new Error("outside_temperature must be a number");
    }

    var buffer = new Buffer(4);
    buffer.writeUInt8(0x03);
    buffer.writeInt16LE(outside_temperature * 10);
    buffer.writeUInt8(0xff);
    return buffer.toBytes();
}

/**
 * set outside temperature control
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} timeout, unit: minute, range: [3, 60]
 * @example { "outside_temperature_control": { "enable": 1, "timeout": 10 } }
 * @since v1.3
 */
function setOutsideTemperatureControl(enable, timeout) {
    var outside_temperature_control_enable_values = [0, 1];
    if (outside_temperature_control_enable_values.indexOf(enable) === -1) {
        throw new Error("outside_temperature_control.enable must be one of " + outside_temperature_control_enable_values.join(", "));
    }
    if (enable && typeof timeout !== "number") {
        throw new Error("outside_temperature_control.timeout must be a number");

        if (timeout < 3 || timeout > 60) {
            throw new Error("outside_temperature_control.timeout must be between 3 and 60");
        }
    }

    var buffer = new Buffer(4);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0xc4);
    buffer.writeUInt8(enable);
    buffer.writeUInt8(timeout);
    return buffer.toBytes();
}

/**
 * set display ambient temperature
 * @param {number} display_ambient_temperature values: (0: disable, 1: enable)
 * @example { "display_ambient_temperature": 1 }
 * @since v1.3
 */
function setDisplayAmbientTemperature(display_ambient_temperature) {
    var display_ambient_temperature_values = [0, 1];
    if (display_ambient_temperature_values.indexOf(display_ambient_temperature) === -1) {
        throw new Error("display_ambient_temperature must be one of " + display_ambient_temperature_values.join(", "));
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0xf9);
    buffer.writeUInt8(0x36);
    buffer.writeUInt8(display_ambient_temperature);
    return buffer.toBytes();
}

/**
 * set window detection valve strategy
 * @param {number} window_detection_valve_strategy values: (0: keep, 1: close)
 * @example { "window_detection_valve_strategy": 0 }
 * @since v1.3
 */
function setWindowDetectionValveStrategy(window_detection_valve_strategy) {
    var window_detection_valve_strategy_values = [0, 1];
    if (window_detection_valve_strategy_values.indexOf(window_detection_valve_strategy) === -1) {
        throw new Error("window_detection_valve_strategy must be one of " + window_detection_valve_strategy_values.join(", "));
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0xf9);
    buffer.writeUInt8(0x37);
    buffer.writeUInt8(window_detection_valve_strategy);
    return buffer.toBytes();
}

/**
 * set daylight saving time
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} offset, unit: minute
 * @param {object} start_time
 * @param {number} start_time.month, range: [1, 12]
 * @param {number} start_time.week, range: [1, 5]
 * @param {number} start_time.weekday, range: [1, 7]
 * @param {string} start_time.time, format: "hh:mm"
 * @param {object} end_time
 * @param {number} end_time.month, range: [1, 12]
 * @param {number} end_time.week, range: [1, 5]
 * @param {number} end_time.weekday, range: [1, 7]
 * @param {string} end_time.time, format: "hh:mm"
 * @example { "dst_config": { "enable": 1, "offset": 60, "start_time": { "month": 3, "week": 2, "weekday": 7, "time": "2:00" }, "end_time": { "month": 1, "week": 4, "weekday": 1, "time": "2:00" } } }
 * @since v1.3
 */
function setDaylightSavingTime(enable, offset, start_time, end_time) {
    var dst_config_enable_values = [0, 1];
    if (dst_config_enable_values.indexOf(enable) === -1) {
        throw new Error("dst_config.enable must be one of " + dst_config_enable_values.join(", "));
    }

    var buffer = new Buffer(12);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0xba);
    buffer.writeUInt8(enable);

    var start = start_time.time.split(":");
    var end = end_time.time.split(":");
    buffer.writeUInt8(offset);
    buffer.writeUInt8(start_time.month);
    buffer.writeUInt8((start_time.week << 4) | start_time.weekday);
    buffer.writeUInt16LE(parseInt(start[0]) * 60 + parseInt(start[1]));
    buffer.writeUInt8(end_time.month);
    buffer.writeUInt8((end_time.week << 4) | end_time.weekday);
    buffer.writeUInt16LE(parseInt(end[0]) * 60 + parseInt(end[1]));
    return buffer.toBytes();
}

/**
 * set timezone
 * @param {number} timezone
 * @example payload: { "timezone": 8 } output: FFBDE001
 * @example payload: { "timezone": -4 } output: FFBD10FF
 * @since v1.3
 */
function setTimeZone(timezone) {
    if (typeof timezone !== "number") {
        throw new Error("timezone must be a number");
    }

    var buffer = new Buffer(4);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0xbd);
    buffer.writeInt16LE(timezone * 60);
    return buffer.toBytes();
}

/**
 * set effective stroke rate
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} rate range: [0, 100]
 * @example { "effective_stroke": { "enable": 1, "rate": 50 } }
 * @since v1.3
 */
function setEffectiveStroke(enable, rate) {
    var effective_stroke_enable_values = [0, 1];
    if (effective_stroke_enable_values.indexOf(enable) === -1) {
        throw new Error("effective_stroke.enable must be one of " + effective_stroke_enable_values.join(", "));
    }
    if (enable && (rate < 0 || rate > 100)) {
        throw new Error("effective_stroke.rate must be between 0 and 100");
    }

    var buffer = new Buffer(4);
    buffer.writeUInt8(0xf9);
    buffer.writeUInt8(0x38);
    buffer.writeUInt8(enable);
    buffer.writeUInt8(rate);
    return buffer.toBytes();
}

/**
 * set heating date
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} start_month range: [1, 12]
 * @param {number} start_day range: [1, 31]
 * @param {number} end_month range: [1, 12]
 * @param {number} end_day range: [1, 31]
 * @example { "heating_date": { "enable": 1, "start_month": 10, "start_day": 1, "end_month": 4, "end_day": 30, "report_interval": 720 } }
 * @since v1.3
 */
function setHeatingDate(enable, start_month, start_day, end_month, end_day, report_interval) {
    var heating_date_enable_values = [0, 1];
    if (heating_date_enable_values.indexOf(enable) === -1) {
        throw new Error("heating_date.enable must be one of " + heating_date_enable_values.join(", "));
    }
    if (enable && (start_month < 1 || start_month > 12)) {
        throw new Error("heating_date.start_month must be between 1 and 12");
    }
    if (enable && (end_month < 1 || end_month > 12)) {
        throw new Error("heating_date.end_month must be between 1 and 12");
    }

    var buffer = new Buffer(9);
    buffer.writeUInt8(0xf9);
    buffer.writeUInt8(0x33);
    buffer.writeUInt8(enable);
    buffer.writeUInt16LE(report_interval);
    buffer.writeUInt8(start_month);
    buffer.writeUInt8(start_day);
    buffer.writeUInt8(end_month);
    buffer.writeUInt8(end_day);
    return buffer.toBytes();
}

/**
 * set heating schedule
 * @param {number} index range: [1, 16]
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} temperature_control_mode values: (0: auto, 1: manual)
 * @param {number} value temperature_control_mode=0, value means temperature_target, temperature_control_mode=1, value means valve_opening
 * @param {number} report_interval unit: minute
 * @param {string} execute_time format: "hh:mm"
 * @param {Array} week_recycle values: (1: Monday, 2: Tuesday, 3: Wednesday, 4: Thursday, 5: Friday, 6: Saturday, 7: Sunday)
 * @example { "heating_schedule": [{ "index": 1, "enable": 1, "temperature_control_mode": 0, "value": 20, "report_interval": 10, "execute_time": "08:00", "week_recycle": [1, 2, 3, 4, 5] }] }
 * @since v1.3
 */
function setHeatingSchedule(index, enable, temperature_control_mode, value, report_interval, execute_time, week_recycle) {
    if (index < 1 || index > 16) {
        throw new Error("heating_schedule[].index must be between 1 and 16");
    }
    var heating_schedule_enable_values = [0, 1];
    if (heating_schedule_enable_values.indexOf(enable) === -1) {
        throw new Error("heating_schedule[].enable must be one of " + heating_schedule_enable_values.join(", "));
    }
    var heating_schedule_temperature_control_mode_values = [0, 1];
    if (heating_schedule_temperature_control_mode_values.indexOf(temperature_control_mode) === -1) {
        throw new Error("heating_schedule[].temperature_control_mode must be one of " + heating_schedule_temperature_control_mode_values.join(", "));
    }
    if (enable && (report_interval < 1 || report_interval > 1440)) {
        throw new Error("heating_schedule[].report_interval must be between 1 and 1440");
    }
    var time = execute_time.split(":");
    if (time.length !== 2) {
        throw new Error("heating_schedule[].execute_time must be in the format of hh:mm");
    }
    var week_recycle_values = [0, 1, 2, 3, 4, 5, 6, 7];
    if (Array.isArray(week_recycle) === false) {
        throw new Error("heating_schedule[].week_recycle must be an array");
    }

    var days = 0x00;
    for (var i = 0; i < week_recycle.length; i++) {
        var day = week_recycle[i];
        if (week_recycle_values.indexOf(day) === -1) {
            throw new Error("heating_schedule[].week_recycle must be one of " + week_recycle_values.join(", "));
        }
        offset = week_recycle_values.indexOf(day);
        days |= 1 << offset;
    }

    var buffer = new Buffer(11);
    buffer.writeUInt8(0xf9);
    buffer.writeUInt8(0x34);
    buffer.writeUInt8(index - 1);
    buffer.writeUInt8(enable);
    buffer.writeUInt8(temperature_control_mode);
    buffer.writeUInt8(value);
    buffer.writeUInt16LE(report_interval);
    buffer.writeUInt16LE(parseInt(time[0]) * 60 + parseInt(time[1]));
    buffer.writeUInt8(days);
    return buffer.toBytes();
}

/**
 * set change reportable.
 * @description When the device status changes (temperature_target, valve_opening), the device will report the status to the server.
 * @param {number} change_report_enable values: (0: disable, 1: enable)
 * @example { "change_report_enable": 1 }
 * @since v1.3
 */
function setChangeReportEnable(change_report_enable) {
    var change_report_enable_values = [0, 1];
    if (change_report_enable_values.indexOf(change_report_enable) === -1) {
        throw new Error("change_report_enable must be one of " + change_report_enable_values.join(", "));
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0xf9);
    buffer.writeUInt8(0x3a);
    buffer.writeUInt8(change_report_enable);
    return buffer.toBytes();
}

function Buffer(size) {
    this.buffer = new Array(size);
    this.offset = 0;

    for (var i = 0; i < size; i++) {
        this.buffer[i] = 0;
    }
}

Buffer.prototype._write = function (value, byteLength, isLittleEndian) {
    for (var index = 0; index < byteLength; index++) {
        var shift = isLittleEndian ? index << 3 : (byteLength - 1 - index) << 3;
        this.buffer[this.offset + index] = (value & (0xff << shift)) >> shift;
    }
};

Buffer.prototype.writeUInt8 = function (value) {
    this._write(value, 1, true);
    this.offset += 1;
};

Buffer.prototype.writeInt8 = function (value) {
    this._write(value < 0 ? value + 0x100 : value, 1, true);
    this.offset += 1;
};

Buffer.prototype.writeUInt16LE = function (value) {
    this._write(value, 2, true);
    this.offset += 2;
};

Buffer.prototype.writeInt16LE = function (value) {
    this._write(value < 0 ? value + 0x10000 : value, 2, true);
    this.offset += 2;
};

Buffer.prototype.writeUInt32LE = function (value) {
    this._write(value, 4, true);
    this.offset += 4;
};

Buffer.prototype.writeInt32LE = function (value) {
    this._write(value < 0 ? value + 0x100000000 : value, 4, true);
    this.offset += 4;
};

Buffer.prototype.toBytes = function () {
    return this.buffer;
};
