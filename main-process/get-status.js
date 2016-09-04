const exec = require('child_process').exec
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

ipc.on('send-status', function(event, pid) {
  process.hashcat.stdin.write("s")
  if(typeof process.buffer != "undefined")
      dialog.showErrorBox("status", process.buffer)
  event.returnValue = "OK!"
})
