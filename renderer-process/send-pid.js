const ipc = require('electron').ipcRenderer

const syncMsgBtn = document.getElementById('stop')

syncMsgBtn.addEventListener('click', function () {
  const pid = document.getElementById('pid').innerHTML
  
  if(ipc.sendSync('send-pid', parseInt(pid)) == "OK!") {
    document.getElementById('start').innerHTML = "開始運行"
    document.getElementById('stop').disabled = true
    document.getElementById('status').disabled = true
  }
})
