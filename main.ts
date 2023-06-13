enum LED_ON_OFF {
    //% block="ON"
    LED_ON = 1,
    //% block="OFF"
    LED_OFF = 0,
}

enum EM_DHT11_TYPE {
    //% block="Temperature(℃)" 
    EM_DHT11_TEMPERATURE_C = 0,
    //% block="Temperature(℉)"
    EM_DHT11_TEMPERATURE_F = 1,
    //% block="Humidity(0~100)"
    EM_DHT11_HUMIDITY = 2
}

enum ROCKER_PIN {
    //% block="X_PIN"
    X_PIN = 0,
    //% block="Y_PIN"
    Y_PIN = 1
}

//% color="#FFA500" weight=10 icon="\uf0ca" block="Peripheral:bit"
namespace peripheral {
    //% blockId=button block="Button |digital pin %pin"   group="按键模块"
    //% weight=70
    //% subcategory="基础输入模块"
    export function Button(pin: DigitalPin): boolean {        
        if (pins.digitalReadPin(pin) == 1) {
            return false;
        } else {
            return true;
        }
    }

    //% blockId=microswitch block="microswitch |digital pin %pin"   group="微型开关"
    //% weight=70
    //% subcategory="基础输入模块"
    export function microswitch(pin: DigitalPin): boolean {    
        if (pins.digitalReadPin(pin) == 1) {
            return false;
        } else {
            return true;
        }
    }

    //% blockId=crashbutton block="crashButton |digital pin %pin"   group="触碰模块"
    //% weight=70
    //% subcategory="基础输入模块"
    export function crashButton(pin: DigitalPin): boolean {
        if (pins.digitalReadPin(pin) == 1) {
            return false;
        } else {
            return true;
        }
    }

    //% blockId=potentiometer block="potentiometer |analog pin %pin" group="电位器模块"
    //% weight=70
    //% subcategory="基础输入模块"
    export function potentiometer(pin: AnalogPin): number {
        let row = pins.analogReadPin(pin)
        return row

    }

    //% blockId=touchbutton block="touch |digital pin %pin"   group="触摸模块"
    //% weight=70
    //% subcategory="基础输入模块"
    export function touchButton(pin: DigitalPin): boolean {        
        if (pins.digitalReadPin(pin) == 1) {
            return true;
        } else {
            return false;
        }
    }

    let Xpin = 0
    let Ypin = 0
    let Bpin = 0
    //% blockId=rockerPin block="rockerPin setup | pinX %pinx|pinY %piny|pinB %pinb" group="摇杆模块"
    //% weight=70
    //% subcategory="基础输入模块"
    export function rockerPin(pinx: AnalogPin, piny: AnalogPin, pinb: DigitalPin): void {
        Xpin = pinx
        Ypin = piny
        Bpin = pinb
    }

    //% blockId=_analogRead block="select analog pin  %selectpin" group="摇杆模块"
    //% weight=69
    //% subcategory="基础输入模块"
    export function _analogRead(selectpin: ROCKER_PIN): number {
        let a
        if (selectpin == ROCKER_PIN.X_PIN)
            a = Xpin
        else if (selectpin == ROCKER_PIN.Y_PIN)
            a = Ypin
        return pins.analogReadPin(a)
    }

    //% blockId=_digitalRead block="Is the rocker module pressed?" group="摇杆模块"
    //% weight=68
    //% subcategory="基础输入模块"
    export function _digitalRead(): boolean {
        if (pins.digitalReadPin(Bpin) == 1) {
            return false;
        } else {
            return true;
        }
    }

    //% blockId=sensor_infrared block="Pin %pin reads the digital value of the infrared sensor" group="红外传感器"
    //% weight=70
    //% inlineInputMode=inline
    //% subcategory="传感器"
    export function sensor_infrared(pin: DigitalPin): boolean {
        if (pins.digitalReadPin(pin) == 1) {
            return true;
        } else {
            return false;
        }
    }

    //% blockId=sensor_vibration block="sensor_vibration pin |digitalpin %pin" group="震动传感器"
    //% weight=70
    //% inlineInputMode=inline
    //% subcategory="传感器"
    export function sensor_vibration(pin: DigitalPin): boolean {
        if (pins.digitalReadPin(pin) == 1) {
            return false;
        } else {
            return true;
        }
    }

    //% blockId=sensor_vibration_analog block="sensor_vibration pin |digitalpin %pin" group="震动传感器"
    //% weight=70
    //% inlineInputMode=inline
    //% subcategory="传感器"
    export function sensor_vibration_analog(pin: AnalogPin): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=sensor_illumination block="sensor_illumination pin |analogpin %pin" group="光敏传感器"
    //% weight=70
    //% inlineInputMode=inline
    //% subcategory="传感器"
    export function sensor_illumination(pin: AnalogPin): number {
        return pins.analogReadPin(pin)
    }

    let em_dht11Temperature = 0;
    let em_dht11Humidity = 0;
    //% blockId="dht11value" block="value of dht11 %dht11type at pin %dht11pin"  group="DHT11温湿度传感器"
    //% subcategory="传感器"
    //% inlineInputMode=inline
    //% weight=72
    export function dht11value(dht11pin: DigitalPin, dht11type: EM_DHT11_TYPE): number {
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
            em_dht11Humidity = data[0] + data[1] * 0.1
            em_dht11Temperature = data[2] + data[3] * 0.1
        }

        switch (dht11type) {
            case EM_DHT11_TYPE.EM_DHT11_TEMPERATURE_C:
                return em_dht11Temperature
            case EM_DHT11_TYPE.EM_DHT11_TEMPERATURE_F:
                return (em_dht11Temperature * 1.8) + 32
            case EM_DHT11_TYPE.EM_DHT11_HUMIDITY:
                return em_dht11Humidity
        }
    }

    //% blockId=sensor_temperature block="Pin %pin reads the analog value"  group="温度传感器"
    //% weight=70
    //% inlineInputMode=inline
    //% subcategory="传感器"
    export function sensor_temperature(pin: AnalogPin): number {
        let temp = (pins.analogReadPin(pin) / 1023) * 3.3 * 100;
        return temp

    }

    //% blockId=sensor_hall block="Pin %pin reads the analog value"  group="霍尔传感器"
    //% weight=70
    //% inlineInputMode=inline
    //% subcategory="传感器"
    export function sensor_hall(pin: AnalogPin): number {
        return pins.analogReadPin(pin);
    }

    //% blockId=sensor_tracking block="Pin %pin reads the digital value of the tracking sensor" group="循迹传感器"
    //% weight=70
    //% inlineInputMode=inline
    //% subcategory="传感器"
    export function sensor_tracking(pin: DigitalPin): boolean {
        if (pins.digitalReadPin(pin) == 1) {
            return true;
        } else {
            return false;
        }
    }

    //% blockId=setled block="set led %lpin|status %lstatus"   group="LED灯"
    //% weight=70
    //% subcategory="显示器"
    export function setled(lpin: DigitalPin, lstatus: LED_ON_OFF): void {
        pins.digitalWritePin(lpin, lstatus)
    }

    let _Rpins = 0
    let _Gpins = 0
    let _Bpins = 0
    //% blockId=setrgbpin block="set RGBlight pin|r %_RPin|g %_GPin|b %_BPin"   group="三色灯"
    //% weight=71
    //% subcategory="显示器"
    export function setRGBpin(_GPin: AnalogPin, _BPin: AnalogPin, _RPin: AnalogPin): void {
        _Gpins = _GPin
        _Bpins = _BPin
        _Rpins = _RPin
    }

    //% blockId=yledon block="set color pin|r_color %r_color|g_color %g_color|b_color %b_color"   group="三色灯"
    //% r_color.min=0  r_color.max=255
    //% g_color.min=0  g_color.max=255
    //% b_color.min=0  b_color.max=255
    //% weight=70
    //% subcategory="显示器"
    export function selectcolor(r_color: number, g_color: number, b_color: number): void {
        pins.analogWritePin(_Rpins, r_color)
        pins.analogWritePin(_Gpins, g_color)
        pins.analogWritePin(_Bpins, b_color)
    }

    //% blockId=actuator_buzzer block="actuator_buzzer pin %pin|freq %freq"   group="蜂鸣器"
    //% weight=70
    //% subcategory="执行器"
    export function actuator_buzzer(pin: AnalogPin, freq: number): void {
        pins.analogWritePin(pin, freq)
    }
}
