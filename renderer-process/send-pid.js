const ipc = require('electron').ipcRenderer

const syncMsgBtn = document.getElementById('stop')

syncMsgBtn.addEventListener('click', function () {
  const pid = document.getElementById('pid').innerHTML
  
  ipc.sendSync('send-pid', parseInt(pid))
})
