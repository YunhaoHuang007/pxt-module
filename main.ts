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
}
