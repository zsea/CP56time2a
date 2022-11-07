import CP56Time2a from '../src/index';
test('CP56Time2a', () => {
  let v = new Date()
    , s = new CP56Time2a(v).toLocaleString()
    ;
  expect(s).toEqual(v.toLocaleString());
});
test('toBuffer', () => {
  let v = new Date(1640966400000)
    , s = new CP56Time2a(v).toBuffer()
    ;
  expect(s.toJSON()).toEqual({ "data": [0x16, 0x01, 0xc1, 0x00, 0x00, 0x00, 0x00], "type": "Buffer" });
});
test('fromBuffer', () => {

  let v = new CP56Time2a(Buffer.from([0x16, 0x01, 0xc1, 0x00, 0x00, 0x00, 0x00]))
    , s = v.toUTCString()
    ;
  expect(s).toBe("Fri, 31 Dec 2021 16:00:00 GMT");
});
test('fromArray', () => {

  let v = new CP56Time2a([0x16, 0x01, 0xc1, 0x00, 0x00, 0x00, 0x00])
    , s = v.toUTCString()
    ;
  expect(s).toBe("Fri, 31 Dec 2021 16:00:00 GMT");
});
test('toArray', () => {
  let v = new Date(1640966400000)
    , s = new CP56Time2a(v).toArray()
    ;
    console.log(s);
  expect(s).toEqual([0x16, 0x01, 0xc1, 0x00, 0x00, 0x00, 0x00] );
});
