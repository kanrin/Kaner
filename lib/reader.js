var fs = require('fs');
var iconv = require('iconv-lite');


exports.showTEXT = function (fileName,fileCode,start,end,callback) {
    console.time('showTEXT');
    var readop = {
        flags: 'r',
        mode: 0666,
        autoClose: true,
        start: start,
        end: end,
    }
    readable = fs.createReadStream(fileName, readop);
    readable.on('data', function(chunk) {
        var str = iconv.decode(chunk, fileCode);
        callback(str);
        console.timeEnd('showTEXT');
    });
}

// this.showTEXT('./1480.txt','gbk',1000001,1000999);
