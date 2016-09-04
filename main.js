const path = require('path')
const glob = require('glob')
const electron = require('electron')
const windowManager = require('electron-window-manager')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function initialize () {

    loadOthers()

    function createWindow () {
        // Create the browser window.
        mainWindow = new BrowserWindow({width: 800, height: 600})

        // and load the index.html of the app.
        mainWindow.loadURL(`file://${__dirname}/index.html`)

        mainWindow.on('closed', function() {
          mainWindow = null
        })
    }

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', function() {
        createWindow()
    })

    // Quit when all windows are closed.
    app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) {
            createWindow()
        }
    })
}

// Require each JS file in the main-process dir
function loadOthers () {
    var files = glob.sync(path.join(__dirname, 'main-process/*.js'))
    files.forEach(function (file) {
        require(file)
    })
}

initialize()
