/**
 * electron load js
 * @authors Orz
 * @date    2016-04-18 15:30:58
 * @version $Id$
 */

'use strict';
global.ROOT           = __dirname;
const electron        = require('electron');
const {BrowserWindow} = electron;
const {app}           = electron;
const ipcMain         = require('electron').ipcMain;
var mainWindow        = null;

// 生成窗口
app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height:          770,
        width:           770,
        autoHideMenuBar: true,
        useContentSize:  true,
        frame:           false,
        resizable:       true,
        title:           "Kaner",
    });
    // 载入主显示文件
    mainWindow.loadURL('file://' + __dirname + '/views/index.html');
    mainWindow.center();
});


// 获取窗口大小
ipcMain.on('get-window-size', function (event, arg) {
    event.returnValue = mainWindow.getSize();
});

// 关闭窗口
ipcMain.on('close-main-window', function (event) {
    mainWindow.close();
});

// 最小化窗口
ipcMain.on('minimize-main-window', function (event) {
    mainWindow.minimize();
});

// 最大化窗口
ipcMain.on('maximize-main-window', function (event) {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    }else {
        mainWindow.maximize();
    }

});

// 获取版本号
ipcMain.on('get-pro-version', function (event, arg) {
  event.returnValue = app.getVersion();
});
