const remote = require('electron').remote
const app = remote.require('electron').app

const ipc = require('electron').ipcRenderer
const path = require('path')
const fs = require('fs')
const endOfLine = require('os').EOL;

const syncMsgBtn = document.getElementById('start')

syncMsgBtn.addEventListener('click', function () {
  syncMsgBtn.innerHTML = "正在運行"
  document.getElementById('stop').disabled = false
  document.getElementById('status').disabled = false

  const charset = document.getElementById('charset').value
  const length = document.getElementById('length').value
  const cond1 = document.getElementById('cond1').value
  const cond2 = document.getElementById('cond2').value
  const cond3 = document.getElementById('cond3').value
  const cond4 = document.getElementById('cond4').value
  const cond5 = document.getElementById('cond5').value
  const outdir = document.getElementById('selected-file').innerHTML

  var hashFile = path.join(app.getAppPath(), 'test.hash')
  var writeStream = fs.createWriteStream(hashFile)
  if(cond1 != "")
    writeStream.write(cond1 + endOfLine)
  if(cond2 != "")
    writeStream.write(cond2 + endOfLine)
  if(cond3 != "")
    writeStream.write(cond3 + endOfLine)
  if(cond4 != "")
    writeStream.write(cond4 + endOfLine)
  if(cond5 != "")
    writeStream.write(cond5 + endOfLine)
  writeStream.end()

  writeStream.on('error', function (err) {
    console.log(err);
  });
  
  ipc.sendSync('send-datas', charset, length, hashFile, cond1, cond2, cond3, cond4, cond5, outdir)
})
