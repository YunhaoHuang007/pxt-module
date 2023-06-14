enum SWITCH_MODULE {
    //% block="Button"
    BUTTON = 0x0,
    //% block="MicroSwitch"
    MICROSWITCH = 0x1,
    //% block="TouchButton"
    TOUCHBUTTON = 0x2,
}

enum DIGITAL_SENSOR {
    //% block="InfraredSensor"
    SENSOR_INFRARED = 0x0,
    //% block="TrackingSensor"
    SENSOR_TRACKING = 0x1,
    //% block="VibrationSensor"
    SENSOR_VIBRATION = 0x2,    
}

enum ANALOG_SENSOR {
    //% block="Potentiometer"
    POTENTIOMETER = 0x0,
    //% block="IlluminationSensor"
    SENSOR_ILLUMINATION = 0x1,
    //% block="HallSensor"
    SENSOR_HALL = 0x2,
    //% block="VibrationSensor"
    SENSOR_VIBRATION = 0x3,
}

enum LED_ON_OFF {
    //% block="ON"
    LED_ON = 1,
    //% block="OFF"
    LED_OFF = 0,
}

enum DHT11_TYPE {
    //% block="Temperature(℃)" 
    DHT11_TEMPERATURE_C = 0,
    //% block="Temperature(℉)"
    DHT11_TEMPERATURE_F = 1,
    //% block="Humidity(0~100%)"
    DHT11_HUMIDITY = 2,
}

enum ROCKER_PIN {
    //% block="ROCKER_PIN_X"
    ROCKER_PIN_X = 0,
    //% block="ROCKER_PIN_Y"
    ROCKER_PIN_Y = 1,
}


//% color="#6167d5" weight=10 icon="\uf0ca" block="Module"
namespace Module {
    let switchPin = 0;
    let switchModule = 0;
    //% subcategory="开关模块"
    //% blockId=ButtonModule weight=101 blockGap=15
    //% block="Module %swtm | connect to pin %pin"    
    export function SwitchModuleConnect(swtm: SWITCH_MODULE, pin: DigitalPin): void {
        switchModule = swtm;
        switchPin = pin;
    }

    //% subcategory="开关模块"
    //% blockId=SwitchButton weight=100 blockGap=15
    //% block="Is the switch pressed?"
    export function SwitchButton(): boolean {
        if (pins.digitalReadPin(switchPin) == 1) {
            return false;
        } else {
            return true;
        }
    }

    //% subcategory="传感器模块"
    //% blockId=DigitalSensor weight=100 blockGap=15
    //% block="Sensor %dsensor | connect to pin %pin"
    export function DigitalSensor(dsensor: DIGITAL_SENSOR, pin: DigitalPin): boolean {
        if (pins.digitalReadPin(pin) == 1) {
            return false;
        } else {
            return true;
        }
    }

    //% subcategory="传感器模块"
    //% blockId=AnalogSensor weight=100 blockGap=15
    //% block="Sensor %asensor | connect to pin %pin"
    export function AnalogSensor(asensor: ANALOG_SENSOR, pin: AnalogPin): number {
        let value = pins.analogReadPin(pin);
        return value;
    }

    //% subcategory="传感器模块"
    //% blockId=SensorTemperature weight=100 blockGap=15
    //% block="Temperature sensor %pin get the ambient temperature"
    //% inlineInputMode=inline
    export function SensorTemperature(pin: AnalogPin): number {
        let temp = (pins.analogReadPin(pin) / 1023) * 3.3 * 100;
        return temp;
    }

    let rockerPinX = 0;
    let rockerPinY = 0;
    //% subcategory="传感器模块" group="摇杆模块"
    //% blockId=RockerPin weight=81
    //block="RockerPin setup | pinX %pinx|pinY %piny"
    export function RockerPin(pinx: AnalogPin, piny: AnalogPin): void {
        rockerPinX = pinx;
        rockerPinY = piny;
    }

    //% subcategory="传感器模块" group="摇杆模块"
    //% blockId=RockerAnalogRead  weight=80
    //% block="Get rocker analog pin  %selectpin value"
    export function RockerAnalogRead(selectpin: ROCKER_PIN): number {
        let pinSelect;
        if (selectpin == ROCKER_PIN.ROCKER_PIN_X)
            pinSelect = rockerPinX;
        else if (selectpin == ROCKER_PIN.ROCKER_PIN_Y)
            pinSelect = rockerPinY;
        return pins.analogReadPin(pinSelect);
    }

    let dht11Temperature = 0;
    let dht11Humidity = 0;
    //% blockId=DHT11Value block="Value of DHT11 %dht11type at pin %dht11pin"  group="DHT11温湿度传感器"
    //% subcategory="传感器模块"
    //% inlineInputMode=inline
    //% weight=72
    export function DHT11Value(dht11pin: DigitalPin, dht11type: DHT11_TYPE): number {
        const DHT11_TIMEOUT = 100
        const buffer = pins.createBuffer(40)
        const data = [0, 0, 0, 0, 0]
        let startTime = control.micros()

        if (control.hardwareVersion().slice(0, 1) !== '1') { // V2
            // TODO: V2 bug
            pins.digitalReadPin(DigitalPin.P0);
            pins.digitalReadPin(DigitalPin.P1);
            pins.digitalReadPin(DigitalPin.P2);
            pins.digitalReadPin(DigitalPin.P3);
            pins.digitalReadPin(DigitalPin.P4);
            pins.digitalReadPin(DigitalPin.P10);

            // 1.start signal
            pins.digitalWritePin(dht11pin, 0)
            basic.pause(18)

            // 2.pull up and wait 40us
            pins.setPull(dht11pin, PinPullMode.PullUp)
            pins.digitalReadPin(dht11pin)
            control.waitMicros(40)

            // 3.read data
            startTime = control.micros()
            while (pins.digitalReadPin(dht11pin) === 0) {
                if (control.micros() - startTime > DHT11_TIMEOUT) break
            }
            startTime = control.micros()
            while (pins.digitalReadPin(dht11pin) === 1) {
                if (control.micros() - startTime > DHT11_TIMEOUT) break
            }

            for (let dataBits = 0; dataBits < 40; dataBits++) {
                startTime = control.micros()
                while (pins.digitalReadPin(dht11pin) === 1) {
                    if (control.micros() - startTime > DHT11_TIMEOUT) break
                }
                startTime = control.micros()
                while (pins.digitalReadPin(dht11pin) === 0) {
                    if (control.micros() - startTime > DHT11_TIMEOUT) break
                }
                control.waitMicros(28)
                if (pins.digitalReadPin(dht11pin) === 1) {
                    buffer[dataBits] = 1
                }
            }
        } else { // V1
            // 1.start signal
            pins.digitalWritePin(dht11pin, 0)
            basic.pause(18)

            // 2.pull up and wait 40us
            pins.setPull(dht11pin, PinPullMode.PullUp)
            pins.digitalReadPin(dht11pin)
            control.waitMicros(40)

            // 3.read data
            if (pins.digitalReadPin(dht11pin) === 0) {
                while (pins.digitalReadPin(dht11pin) === 0);
                while (pins.digitalReadPin(dht11pin) === 1);

                for (let dataBits = 0; dataBits < 40; dataBits++) {
                    while (pins.digitalReadPin(dht11pin) === 1);
                    while (pins.digitalReadPin(dht11pin) === 0);
                    control.waitMicros(28)
                    if (pins.digitalReadPin(dht11pin) === 1) {
                        buffer[dataBits] = 1
                    }
                }
            }
        }

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 8; j++) {
                if (buffer[8 * i + j] === 1) {
                    data[i] += 2 ** (7 - j)
                }
            }
        }

        if (((data[0] + data[1] + data[2] + data[3]) & 0xff) === data[4]) {
            dht11Humidity = data[0] + data[1] * 0.1
            dht11Temperature = data[2] + data[3] * 0.1
        }

        switch (dht11type) {
            case DHT11_TYPE.DHT11_TEMPERATURE_C:
                return dht11Temperature
            case DHT11_TYPE.DHT11_TEMPERATURE_F:
                return (dht11Temperature * 1.8) + 32
            case DHT11_TYPE.DHT11_HUMIDITY:
                return dht11Humidity
        }
    }

    //% blockId=SetLED block="Set LED %lpin|status %lstatus"   group="LED灯"
    //% weight=70
    //% subcategory="输出模块"
    export function SetLED(lpin: DigitalPin, lstatus: LED_ON_OFF): void {
        pins.digitalWritePin(lpin, lstatus)
    }

    let _Rpins = 0
    let _Gpins = 0
    let _Bpins = 0
    //% blockId=SetRGBpin block="Set RGBlight pin|r %_RPin|g %_GPin|b %_BPin"   group="三色灯"
    //% weight=71
    //% subcategory="输出模块"
    export function SetRGBpin(_GPin: AnalogPin, _BPin: AnalogPin, _RPin: AnalogPin): void {
        _Gpins = _GPin
        _Bpins = _BPin
        _Rpins = _RPin
    }

    //% blockId=SelectColor block="Set color pin|r_color %r_color|g_color %g_color|b_color %b_color"   group="三色灯"
    //% r_color.min=0  r_color.max=255
    //% g_color.min=0  g_color.max=255
    //% b_color.min=0  b_color.max=255
    //% weight=70
    //% subcategory="输出模块"
    export function SelectColor(r_color: number, g_color: number, b_color: number): void {
        pins.analogWritePin(_Rpins, r_color)
        pins.analogWritePin(_Gpins, g_color)
        pins.analogWritePin(_Bpins, b_color)
    }

    //% blockId=ActuatorBuzzer block="Buzzer pin %pin|freq %freq"   group="蜂鸣器"
    //% weight=70
    //% subcategory="输出模块"
    export function ActuatorBuzzer(pin: AnalogPin, freq: number): void {
        pins.analogWritePin(pin, freq)
    }
}
