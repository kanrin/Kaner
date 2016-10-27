var fs = require('fs');
var iconv = require('iconv-lite');

var fileName = './1480.txt'
var readop = {
    flags: 'r',
    mode: 0666,
    autoClose: true,
    encode:'ascii',
    start: 0,
    end: 99,
}

readable = fs.createReadStream(fileName, readop);
readable.on('data', function(chunk) {
    var str = iconv.decode(chunk, 'gbk');
    console.log(str);
});
