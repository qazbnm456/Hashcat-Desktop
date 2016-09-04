const ipc = require('electron').ipcRenderer

const syncMsgBtn = document.getElementById('status')

syncMsgBtn.addEventListener('click', function () {
  const pid = document.getElementById('pid').innerHTML

  const reply = ipc.sendSync('send-status', parseInt(pid))
})
