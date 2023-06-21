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

enum TM1650_OPT {
    //% block="TM1650_ON"
    TM1650_ON = 0,
    //% block="TM1650_OFF"
    TM1650_OFF = 1,
    //% block="TM1650_CLEAR"
    TM1650_CLEAR = 2,
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
    //% blockId=TrackingSensor weight=80 blockGap=15
    //% block="Tracking sensor pin %pin black line detected?"
    export function TrackingSensor(pin: DigitalPin): boolean {
        if (pins.digitalReadPin(pin) == 1) {
            return false;
        } else {
            return true;
        }
    }

    //% subcategory="传感器模块"
    //% blockId=HumanbodySensor weight=79 blockGap=15
    //% block="Humanbody sensor %pin humanbody detected?"
    export function HumanbodySensor(pin: DigitalPin): boolean {
        if (pins.digitalReadPin(pin) == 1) {
            return true;
        } else {
            return false;
        }
    }

    //% subcategory="传感器模块"
    //% blockId=VibrationSensor weight=78 blockGap=15
    //% block="Vibration sensor pin %pin vibration detected?"
    export function VibrationSensor(pin: DigitalPin): boolean {
        if (pins.digitalReadPin(pin) == 1) {
            return true;
        } else {
            return false;
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
    //% blockId=PhotosensSensorA weight=75 blockGap=15
    //% block="Photosensitive sensor pin %pin obtain value of light intensity"
    export function PhotosensSensorA(pin: AnalogPin): number {
        return pins.analogReadPin(pin);
    }

    //% subcategory="传感器模块"
    //% blockId=PhotosensSensorD weight=75 blockGap=15
    //% block="Photosensitive sensor pin %pin light detected?"
    export function PhotosensSensorD(pin: DigitalPin): boolean {
        if (pins.digitalReadPin(pin) == 1) {
            return false;
        } else {
            return true;
        }
    }

    //% subcategory="传感器模块"
    //% blockId=HallSensor weight=74 blockGap=15
    //% block="Hall sensor pin %pin magnetic field detected?"
    export function HallSensor(pin: DigitalPin): boolean {
        if (pins.digitalReadPin(pin) == 1) {
            return false;
        } else {
            return true;
        }
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
    //% block="DHT11 pin %dht11pin get value of %dht11type"
    //% inlineInputMode=inline
    export function DHT11Value(dht11pin: DigitalPin, dht11type: DHT11_TYPE): number {
        //initialize
        basic.pause(1000)

        const buffer = pins.createBuffer(40)
        const data = [0, 0, 0, 0, 0]

        pins.setPull(dht11pin, PinPullMode.PullUp)
        // 1.start signal
        pins.digitalWritePin(dht11pin, 0)
        basic.pause(18)

        // 2.pull up and wait 40us        
        pins.setPull(dht11pin, PinPullMode.PullUp)
        pins.digitalReadPin(dht11pin)
        control.waitMicros(40)

        // 3.read data		
        while (pins.digitalReadPin(dht11pin) === 0);
        while (pins.digitalReadPin(dht11pin) === 1);

        for (let index = 0; index < 40; index++) {
            while (pins.digitalReadPin(dht11pin) === 1);
            while (pins.digitalReadPin(dht11pin) === 0);
            control.waitMicros(28)
            if (pins.digitalReadPin(dht11pin) === 1) {
                buffer[index] = 1
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


    let COMMAND_I2C_ADDRESS = 0x24
    let DISPLAY_I2C_ADDRESS = 0x34
    let _SEG = [0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 0x7D, 0x07, 0x7F, 0x6F, 0x77, 0x7C, 0x39, 0x5E, 0x79, 0x71]

    let _intensity = 3
    let dbuf = [0, 0, 0, 0]

    function TM1650SendCmd(tmcmd: number) {
        pins.i2cWriteNumber(COMMAND_I2C_ADDRESS, tmcmd, NumberFormat.Int8BE)
    }

    function TM1650SendData(bit: number, tmdata: number) {
        pins.i2cWriteNumber(DISPLAY_I2C_ADDRESS + (bit % 4), tmdata, NumberFormat.Int8BE)
    }

    //% subcategory="输出模块" group="TM1650数码管"
    //% blockId=TM1650Control weight=81 blockGap=8    
    //% block="display control %tmcmd"
    export function TM1650Control(tmcmd: TM1650_OPT) {
        if (tmcmd == 0) {
            TM1650SendCmd(_intensity * 16 + 1)
        }
        if (tmcmd == 1) {
            _intensity = 0
            TM1650SendCmd(0)
        }
        if (tmcmd == 2) {
            TM1650SendData(0, 0)
            TM1650SendData(1, 0)
            TM1650SendData(2, 0)
            TM1650SendData(3, 0)
            dbuf = [0, 0, 0, 0]
        }
    }

    //% subcategory="输出模块" group="TM1650数码管"
    //% blockId=TM1650Digit weight=80 blockGap=8
    //% block="show digit %num | at %bit"
    //% num.max=15 num.min=0
    //% bit.max=3 bit.min=0
    export function TM1650Digit(num: number, bit: number) {
        dbuf[bit % 4] = _SEG[num % 16]
        TM1650SendData(bit, _SEG[num % 16])
    }

    //% subcategory="输出模块" group="TM1650数码管"
    //% blockId="TM1650ShowNumber" weight=80 blockGap=8    
    //% block="show number %num"
    export function TM1650ShowNumber(num: number) {
        if (num < 0) {
            TM1650SendData(0, 0x40) // '-'
            num = -num
        }
        else
            TM1650Digit(Math.idiv(num, 1000) % 10, 0)
        TM1650Digit(num % 10, 3)
        TM1650Digit(Math.idiv(num, 10) % 10, 2)
        TM1650Digit(Math.idiv(num, 100) % 10, 1)
    }

    //% subcategory="输出模块" group="TM1650数码管"
    //% block="show hex number %num"
    //% blockId="TM1650ShowHex" weight=80 blockGap=8
    export function TM1650ShowHex(num: number) {
        if (num < 0) {
            TM1650SendData(0, 0x40) // '-'
            num = -num
        }
        else
            TM1650Digit((num >> 12) % 16, 0)
        TM1650Digit(num % 16, 3)
        TM1650Digit((num >> 4) % 16, 2)
        TM1650Digit((num >> 8) % 16, 1)
    }

    //% subcategory="输出模块" group="TM1650数码管"
    //% blockId="TM1650ShowDp" weight=80 blockGap=8
    //% block="show dot point %bit|show %status"
    //% bit.max=3 bit.min=0
    export function TM1650ShowDp(bit: number, status: LED_ON_OFF) {
        let show = status == 1 ? true : false;
        if (show) TM1650SendData(bit, dbuf[bit % 4] | 0x80)
        else TM1650SendData(bit, dbuf[bit % 4] & 0x7F)
    }

    //% subcategory="输出模块" group="TM1650数码管"
    //% blockId=TM1650SetIntensity weight=80 blockGap=8
    //% block="set intensity %value"
    //% value.max=7 value.min=0
    export function TM1650SetIntensity(value: number) {
        if ((value < 0) || (value > 8)) {
            return
        }
        if (value == 0) {
            _intensity = 0
            TM1650SendCmd(0)
        }
        else {
            _intensity = value
            TM1650SendCmd((value << 4) | 0x01)
        }
    }
}
