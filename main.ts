enum PingUnit {
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
}

enum RgbColors {
    //% block=red
    Red = 0xFF0000,
    //% block=orange
    Orange = 0xFFA500,
    //% block=yellow
    Yellow = 0xFFFF00,
    //% block=green
    Green = 0x00FF00,
    //% block=blue
    Blue = 0x0000FF,
    //% block=indigo
    Indigo = 0x4b0082,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xFF00FF,
    //% block=white
    White = 0xFFFFFF,
    //% block=black
    Black = 0x000000
}

enum RgbUltrasonics {
    //% block=left
    Left = 0x00,
    //% block=right
    Right = 0x01,
    //% block=all
    All = 0x02
}

enum ColorEffect {
    //% block=none
    None = 0x00,
    //% block=breathing
    Breathing = 0x01,
    //% block=rotate
    Rotate = 0x02,
    //% block=flash
    Flash = 0x03
}

enum rgb_ColorEffect {
    //% block=none
    None = 0x00,
    //% block=breathing
    Breathing = 0x01,
    //% block=flash
    Flash = 0x03
}

enum EM_DHT11Type {
    //% block="temperature(℃)" 
    EM_DHT11_temperature_C = 0,
    //% block="temperature(℉)"
    EM_DHT11_temperature_F = 1,
    //% block="humidity(0~100)"
    EM_DHT11_humidity = 2
}

enum _selectpin {
    //% block="Apin"
    Apin = 0,
    //% block="Bpin"
    Bpin = 1,
    //% block="Dpin"
    Dpin = 2,
}


enum waterpin {
    P0,
    P1,
    P2,
    P3,
    P4,
    P10,
}

enum _rockerpin {
    //% block="Xpin"
    Xpin = 0,
    //% block="Ypin"
    Ypin = 1
}

enum ledon_off {
    //% block="on"
    _on = 1,
    //% block="off"
    _off = 0,
}

enum on_off {

    //% block="on"
    _on = 1,
    //% block="off"
    _off = 0,
}

enum _selectlight {
    //% block="_yellow"
    _yellow = 0,
    //% block="_red"
    _red = 1,
    //% block="_green"
    _green = 2,
}

enum _selectcolor {
    //% block="_blue"
    _blue = 0,
    //% block="_red"
    _red = 1,
    //% block="_green"
    _green = 2,
}

enum run_turn {

    //% block="forward"
    forward = 0,
    //% block="reverse"
    reverse = 1,
}

enum LcdBacklight {
    //% block="on"
    _on = 1,
    //% block="off"
    _off = 0,
}

enum Item {
    //% block="on"
    _on = 1,
    //% block="off"
    _off = 2,
    //% block="clear"
    _clear = 3,
}

enum Select {
    //% block="on"
    _on = 0,
    //% block="off"
    _off = 1,
    //% block="clear"
    _clear = 2,
}



enum barb_fitting {
    //% block="LEFT"
    BUTOON_LEFT = 0,
    //% block="RIGHT" 
    BUTOON_RIGHT = 1,
    //% block="UP"
    BUTOON_UP = 2,
    //% block="DOWN"
    BUTOON_DOWN = 3,
    //% block="BUTTON"
    JOYSTICK_BUTTON = 4,
}

enum key_status {
    //% block="DOWN"
    PRESS_DOWN = 0,   //按下
    //% block="UP"
    PRESS_UP = 1,    //释放
    //% block="CLICK1"
    SINGLE_CLICK = 3,     //单击
    //% block="CLICK2"
    DOUBLE_CLICK = 4,    //双击
    //% block="HOLD"
    LONG_PRESS_HOLD = 6,    //长按
    //% block="PRESS"
    NONE_PRESS = 8,      //未按
}

enum Shaft {
    //% block="X"
    X_Shaft = 0,
    //% block="Y"
    Y_Shaft = 1,
}

enum Mode {
    //% block="LOOP"
    LOOP_MODE = 0,        // 循环模式
    //% block="BUTTON"
    BUTTON_MODE = 1,      // 按键模式
    //% block="KEYWORDS"
    KEYWORDS_MODE = 2,    // 关键字模式
    //% block="KEYWORDS_AND"
    KEYWORDS_AND_BUTTON = 3, //关键字加按键模式
}

//% color="#FFA500" weight=10 icon="\uf2c9" block="Peripheral:bit"
namespace peripheral {
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

    //% blockId=button block="Button |digital pin %pin"   group="按键模块"
    //% weight=70
    //% subcategory="基础输入模块"
    export function Button(pin: DigitalPin): boolean {
        //   pins.digitalWritePin(pin, 0)
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
        // pins.digitalWritePin(pin, 0)
        if (pins.digitalReadPin(pin) == 1) {
            return false;
        } else {
            return true;
        }
    }

    //% blockId=slideRheostat block="slideRheostat |analog pin %pin"   group="滑动变阻器模块"
    //% weight=70
    //% subcategory="基础输入模块"
    export function slideRheostat(pin: AnalogPin): number {
        let row = pins.analogReadPin(pin)
        return row
    }
}
