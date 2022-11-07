
/**
 * 
 * @param {*} buffer 
 */
function buffer2datetime(buffer: Buffer): Date {
    let array: number[] = [];
    for (let i = 0; i < buffer.length; i++) {
        array[i] = buffer[i];
    }
    return Array2datetime(array);

}
function Array2datetime(buffer: number[]): Date {
    buffer = buffer || [];
    buffer.length = 7;
    buffer = buffer.map(x => x || 0);
    const milliseconds = (buffer[5] << 8) | buffer[6]
        , minute = (buffer[4] & 0x3F)
        , hour = (buffer[3] & 0x1F)
        , day = (buffer[2] & 0x1F)
        , month = (buffer[1] & 0x0F)
        , year = (buffer[0] & 0x7F)
        ;
    const d = new Date();
    d.setFullYear(2000 + year);
    d.setMonth(month - 1);
    d.setDate(day);
    d.setHours(hour);
    d.setMinutes(minute);
    d.setSeconds(Math.floor(milliseconds / 1000));
    d.setMilliseconds(milliseconds % 1000);
    return d;
}
function datetime2buffer(date: Date | CP56Time2a): Buffer {
    return Buffer.from(datetime2Array(date));
}
function datetime2Array(date: Date | CP56Time2a): number[] {
    const year = date.getFullYear() - 2000
        , month = date.getMonth() + 1
        , day = date.getDate(), weekday = date.getDay()
        , hour = date.getHours()
        , minute = date.getMinutes()
        , milliseconds = date.getMilliseconds() + date.getSeconds() * 1000;
    return [year, month, (weekday << 5) | day, hour, minute, (milliseconds >> 8) & 0xFF, milliseconds & 0xFF];

}
class CP56Time2a extends Date {
    constructor(date?: Date | Buffer | number[]) {
        let d = new Date();
        if (!date) {
            super(d);
        }
        else if (date instanceof Date) {
            super(date);
            d = new Date(date)
        }
        else if (Buffer.isBuffer(date)) {
            d = buffer2datetime(date)
            super(d)
        }
        else if (Array.isArray(date)) {
            d = Array2datetime(date)
            super(d)
        }
        d.toBuffer = function () {
            return datetime2buffer(this);
        }
        d.toArray=function(){
            return datetime2Array(this);
        }
        return d;
    }
    toBuffer(): Buffer {
        return datetime2buffer(this);
    }
    toArray(): number[] {
        return datetime2Array(this);
    }
    static IsCP56Time2a(v?: CP56Time2a | Date): boolean {
        if (!v) return false;
        if (v instanceof Date) return true;
        return false;
    }
}

export default CP56Time2a;