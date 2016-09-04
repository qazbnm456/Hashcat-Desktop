const ipc = require('electron').ipcRenderer

const syncMsgBtn = document.getElementById('start')

syncMsgBtn.addEventListener('click', function () {
  const charset = document.getElementById('charset').value
  const length = document.getElementById('length').value
  const cond1 = document.getElementById('cond1').value
  const cond2 = document.getElementById('cond2').value
  const cond3 = document.getElementById('cond3').value
  const cond4 = document.getElementById('cond4').value
  const cond5 = document.getElementById('cond5').value
  
  const reply = ipc.sendSync('send-datas', charset, length, cond1, cond2, cond3, cond4, cond5)
  document.getElementById('pid').innerHTML = reply
})
