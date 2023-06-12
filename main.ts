//% color="#CCFF33" weight=10 icon="\uf0ca" block="Peripheral:bit"
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
}
