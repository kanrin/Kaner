const ipcRenderer = require('electron').ipcRenderer
const $           = require("jquery");
const MWidth      = 120;
var   reader      = require('../lib/reader.js');


var start = 0;
var step = ($(window).height() - MWidth)*2.5;

// 关闭窗口
var closeEl = document.getElementById('close');
closeEl.addEventListener('click', function() {
    ipcRenderer.send('close-main-window');
});

// 最小化窗口
var miniEl = document.getElementById('minisize');
miniEl.addEventListener('click', function() {
    ipcRenderer.send('minimize-main-window');
});

// 最大化窗口
var maxEl = document.getElementById('maximize');
maxEl.addEventListener('click', function() {
    ipcRenderer.send('maximize-main-window');
});

// webview的监听大小修改
var webview = document.getElementById('main')
webview.addEventListener('dom-ready', function () {
    // 下面调试webview才需要取消注释
    // webview.openDevTools();
    WindowSize = ipcRenderer.sendSync('get-window-size');
    $('#main').width(WindowSize[0] - 100);
    $('#main').height(WindowSize[1] - MWidth);
});

reader.showTEXT('./1480.txt','gbk',start,start+step,function(str) {
    $('#main').text(str.split('�')[0]);
});

// 获取版本号
$('#ver').html(ipcRenderer.sendSync('get-pro-version'));
$('#status').text('python');

// 大小修改
function Win() {
    $('#main').width($(window).width() - 100 );
    $('#main').height($(window).height() - MWidth);
    step = ($(window).height() - MWidth)*2.5;
}
window.onresize = Win;

var next = document.getElementById('next');
next.addEventListener('click', function() {
    start = start + step;
    console.log(start);
    reader.showTEXT('./1480.txt','gbk',start,start+step,function(str) {
        $('#main').text(str);
    });
});

var pre = document.getElementById('pre');
pre.addEventListener('click', function() {
    start = start - step;
    console.log(start);
    if (start >= 0) {
        reader.showTEXT('./1480.txt','gbk',start,start+step,function(str) {
            $('#main').text(str);
        });
    }else {
        start = 0;
    }
});
