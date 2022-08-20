
/**
 * 
 * @param {*} buffer 
 */
function buffer2datetime(buffer: Buffer) {
    buffer = buffer || Buffer.alloc(7);
    if (buffer.length > 7) {
        buffer = buffer.slice(0, 7);
    }
    else if (buffer.length < 7) {
        buffer = Buffer.concat([buffer, Buffer.alloc(7 - buffer.length)]);
    }
    const milliseconds = buffer.readUInt16BE(5)
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
function datetime2buffer(date: Date | CP56Time2a) {
    const year = date.getFullYear() - 2000
        , month = date.getMonth() + 1
        , day = date.getDate(), weekday = date.getDay()
        , hour = date.getHours()
        , minute = date.getMinutes()
        , milliseconds = date.getMilliseconds() + date.getSeconds() * 1000;
    const buffer = Buffer.from([year, month, (weekday << 4) | day, hour, minute, 0x00, 0x00]);
    buffer.writeUInt16BE(milliseconds, 5);

    return buffer;
}
class CP56Time2a extends Date {
    constructor(date?: Date | Buffer) {
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
        d.toBuffer = function () {
            return datetime2buffer(this);
        }
        return d;
    }
    toBuffer(): Buffer {
        return datetime2buffer(this);
    }
    static IsCP56Time2a(v?: CP56Time2a | Date): boolean {
        if (!v) return false;
        if (v instanceof Date) return true;
        return false;
    }
}

export default CP56Time2a;