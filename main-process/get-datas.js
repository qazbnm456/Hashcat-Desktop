const spawn = require('child_process').spawn
const ipc = require('electron').ipcMain

ipc.on('send-datas', function(event, charset, length, cond1, cond2, cond3, cond4, cond5) {
  process.hashcat = spawn('hashcat', ['--quiet', '-t', '32', '-a', '3', '-m', '1400', '-1', `${charset}`, `${cond1}`, '?1'.repeat(parseInt(length))], { 'cwd': './hashcat' })
  var re1 = new RegExp(cond1 + ":(.*)")
  process.hashcat.stdout.on('data', function(data) {
    process.buffer = data.toString()
    if(process.buffer.match(re1)) {
      console.log(re1.exec(process.buffer)[1])
    }
  })
  process.hashcat.on('exit', function(code) {
    console.log('Hashcat finish!')
  })
  event.returnValue = process.hashcat.pid
})
