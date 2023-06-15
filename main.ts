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
    //% subcategory="传感器模块"
    //% blockId=SwitchModuleButton weight=100 blockGap=15
    //% block="Switch module button pin %pin detected button pressed?"
    export function SwitchModuleButton(pin: DigitalPin): boolean {
        if (pins.digitalReadPin(pin) == 1) {
            return false;
        } else {
            return true;
        }
    }

    //% subcategory="传感器模块"
    //% blockId=Microswitch weight=99 blockGap=15
    //% block="Microswitch pin %pin detected switch pressed?"
    export function Microswitch(pin: DigitalPin): boolean {
        if (pins.digitalReadPin(pin) == 1) {
            return false;
        } else {
            return true;
        }
    }

    //% subcategory="传感器模块"
    //% blockId=TouchButton weight=98 blockGap=15
    //% block="TouchButton pin %pin detected button pressed?"
    export function TouchButton(pin: DigitalPin): boolean {
        if (pins.digitalReadPin(pin) == 1) {
            return false;
        } else {
            return true;
        }
    }

    //% subcategory="传感器模块"
    //% blockId=TrackingSensor weight=79 blockGap=15
    //% block="Tracking sensor pin %pin black line detected?"
    export function TrackingSensor(pin: DigitalPin): boolean {
        if (pins.digitalReadPin(pin) == 1) {
            return false;
        } else {
            return true;
        }
    }

    //% subcategory="传感器模块"
    //% blockId=VibrationSensor weight=78 blockGap=15
    //% block="Vibration sensor pin %pin vibration detected?"
    export function VibrationSensor(pin: DigitalPin): boolean {
        if (pins.digitalReadPin(pin) == 1) {
            return false;
        } else {
            return true;
        }
    }

    //% subcategory="传感器模块"
    //% blockId=VibrationSensorAnalog weight=77 blockGap=15
    //% block="Vibration sensor pin %pin obtain vibration value"
    export function VibrationSensorAnalog(pin: AnalogPin): number {
        return pins.analogReadPin(pin);
    }

    //% subcategory="传感器模块"
    //% blockId=Potentiometer weight=76 blockGap=15
    //% block="Potentiometer sensor pin %pin obtain potential value"
    export function Potentiometer(pin: AnalogPin): number {
        return pins.analogReadPin(pin);
    }

    //% subcategory="传感器模块"
    //% blockId=IlluminationSensor weight=75 blockGap=15
    //% block="Illumination sensor pin %pin obtain value of light intensity"
    export function IlluminationSensor(pin: AnalogPin): number {
        return pins.analogReadPin(pin);
    }

    //% subcategory="传感器模块"
    //% blockId=HallSensor weight=74 blockGap=15
    //% block="Hall sensor pin %pin obtain simulated value"
    export function HallSensor(pin: AnalogPin): number {
        return pins.analogReadPin(pin);
    }

    //% subcategory="传感器模块"
    //% blockId=SensorTemperature weight=73 blockGap=15
    //% block="Temperature sensor %pin get the ambient temperature"
    //% inlineInputMode=inline
    export function SensorTemperature(pin: AnalogPin): number {
        let temp = (pins.analogReadPin(pin) / 1023) * 3.3 * 100;
        return temp;
    }

    //% subcategory="传感器模块"
    //% blockId=InfraredSensor weight=72 blockGap=15
    //% block="Infrared sensor pin %pin  get the code"
    export function InfraredSensor(pin: AnalogPin): number {
        return pins.analogReadPin(pin);
    }

    let rockerPinX = 0;
    let rockerPinY = 0;
    //% subcategory="传感器模块" group="摇杆"
    //% blockId=RockerPin weight=71 blockGap=15
    //% block="RockerPin setup | pinX %pinx|pinY %piny"
    export function RockerPin(pinx: AnalogPin, piny: AnalogPin): void {
        rockerPinX = pinx;
        rockerPinY = piny;
    }

    //% subcategory="传感器模块" group="摇杆"
    //% blockId=RockerAnalogRead weight=70 blockGap=15
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
    //% subcategory="传感器模块"
    //% blockId=DHT11Value weight=69 blockGap=15
    //% block="Value of DHT11 %dht11type at pin %dht11pin"
    //% inlineInputMode=inline    
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

    //% subcategory="输出模块"
    //% blockId=SetLED weight=50 blockGap=15
    //% block="Set LED %lpin|status %lstatus"    
    export function SetLED(lpin: DigitalPin, lstatus: LED_ON_OFF): void {
        pins.digitalWritePin(lpin, lstatus)
    }

    let pinR = 0
    let pinG = 0
    let pinB = 0
    //% subcategory="输出模块" group="RGB灯"
    //% blockId=SetRGBpin weight=49 blockGap=15
    //% block="Set RGB pin|R %Rpin|G %Gpin|B %Bpin"
    export function SetRGBpin(Rpin: AnalogPin, Gpin: AnalogPin, Bpin: AnalogPin): void {
        pinR = Rpin;
        pinG = Gpin;
        pinB = Bpin;
    }

    //% subcategory="输出模块" group="RGB灯"
    //% blockId=SelectColor weight=48 blockGap=15
    //% r_color.min=0  r_color.max=255
    //% g_color.min=0  g_color.max=255
    //% b_color.min=0  b_color.max=255
    //% block="Set color value|r_color %r_color|g_color %g_color|b_color %b_color"
    export function SelectColor(r_color: number, g_color: number, b_color: number): void {
        pins.analogWritePin(pinR, r_color)
        pins.analogWritePin(pinG, g_color)
        pins.analogWritePin(pinB, b_color)
    }

    //% subcategory="输出模块"
    //% blockId=ActuatorBuzzer weight=47 blockGap=15
    //% freq.min=0  freq.max=5000
    //% block="Buzzer pin %pin|freq %freq"
    export function ActuatorBuzzer(pin: AnalogPin, freq: number): void {
        pins.analogWritePin(pin, freq)
    }
}
