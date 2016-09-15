const app = require('electron').app

const spawn = require('child_process').spawn
const ipc = require('electron').ipcMain
const windowManager = require('electron-window-manager')

const path = require('path')
const fs = require('fs')
const endOfLine = require('os').EOL;

function hashcat(charset, length, hashFile, cond1, cond2, cond3, cond4, cond5, outdir) {
  var count = 0
  var re1 = new RegExp(cond1 + ":(.*)")
  var re2 = new RegExp(cond2 + ":(.*)")
  var re3 = new RegExp(cond3 + ":(.*)")
  var re4 = new RegExp(cond4 + ":(.*)")
  var re5 = new RegExp(cond5 + ":(.*)")

  var outputFile = null

  if(outdir)
    outputFile = path.join(outdir, 'hash.out')
  else
    outputFile = path.join(app.getAppPath(), 'hash.out')
  var writeStream = fs.createWriteStream(outputFile)

  var binary = null
  var Win = process.platform
  if(Win === 'win32')
    binary = './hashcat32.exe'
  else if(Win === 'darwin')
    binary = './hashcat'
  else
    binary = './hashcat64.bin'

  process.hashcat = spawn(binary, ['--quiet', '-t', '32', '-a', '3', '-m', '1400', '-1', `${charset}`, `${hashFile}`, '?1'.repeat(parseInt(length))], { cwd: path.join(app.getAppPath(), 'hashcat') }).on('error', function( err ){ throw err })
  windowManager.get('mainWindow').content().send('set-pid', process.hashcat.pid)

  process.hashcat.stdout.on('data', function(data) {
    count = 1
    process.buffer = data.toString()
    if(cond1 != "" && process.buffer.match(re1)) {
      windowManager.get('mainWindow').content().send('ping', cond1, re1.exec(process.buffer)[1])
      writeStream.write(cond1 + ":" + re1.exec(process.buffer)[1] + endOfLine)
      process.buffer = "undefined"
    } else if(cond2 != "" && process.buffer.match(re2)) {
      windowManager.get('mainWindow').content().send('ping', cond2, re2.exec(process.buffer)[1])
      writeStream.write(cond2 + ":" + re2.exec(process.buffer)[1] + endOfLine)
      process.buffer = "undefined"
    } else if(cond3 != "" && process.buffer.match(re3)) {
      windowManager.get('mainWindow').content().send('ping', cond3, re3.exec(process.buffer)[1])
      writeStream.write(cond3 + ":" + re3.exec(process.buffer)[1] + endOfLine)
      process.buffer = "undefined"
    } else if(cond4 != "" && process.buffer.match(re4)) {
      windowManager.get('mainWindow').content().send('ping', cond4, re4.exec(process.buffer)[1])
      writeStream.write(cond4 + ":" + re4.exec(process.buffer)[1] + endOfLine)
      process.buffer = "undefined"
    } else if(cond5 != "" && process.buffer.match(re5)) {
      windowManager.get('mainWindow').content().send('ping', cond5, re5.exec(process.buffer)[1])
      writeStream.write(cond5 + ":" + re5.exec(process.buffer)[1] + endOfLine)
      process.buffer = "undefined"
    }
    writeStream.end()
  })
  process.hashcat.on('exit', function(code) {
    if(count == 1)
      console.log('Hashcat finish!')
    else {
      hashcat_show = spawn(binary, ['--quiet', '-t', '32', '-a', '3', '-m', '1400', '-1', `${charset}`, `${hashFile}`, '--show'], { cwd: path.join(app.getAppPath(), 'hashcat') }).on('error', function( err ){ throw err })
      hashcat_show.stdout.on('data', function(data) {
        process.buffer_show = data.toString()
        if(cond1 != "" && process.buffer_show.match(re1)) {
          windowManager.get('mainWindow').content().send('ping', cond1, re1.exec(process.buffer_show)[1])
          writeStream.write(cond1 + ":" + re1.exec(process.buffer_show)[1] + endOfLine)
        } else if(cond2 != "" && process.buffer_show.match(re2)) {
          windowManager.get('mainWindow').content().send('ping', cond2, re2.exec(process.buffer_show)[1])
          writeStream.write(cond2 + ":" + re2.exec(process.buffer_show)[1] + endOfLine)
        } else if(cond3 != "" && process.buffer_show.match(re3)) {
          windowManager.get('mainWindow').content().send('ping', cond3, re3.exec(process.buffer_show)[1])
          writeStream.write(cond3 + ":" + re3.exec(process.buffer_show)[1] + endOfLine)
        } else if(cond4 != "" && process.buffer_show.match(re4)) {
          windowManager.get('mainWindow').content().send('ping', cond4, re4.exec(process.buffer_show)[1])
          writeStream.write(cond4 + ":" + re4.exec(process.buffer_show)[1] + endOfLine)
        } else if(cond5 != "" && process.buffer_show.match(re5)) {
          windowManager.get('mainWindow').content().send('ping', cond5, re5.exec(process.buffer_show)[1])
          writeStream.write(cond5 + ":" + re5.exec(process.buffer_show)[1] + endOfLine)
        }
        writeStream.end()
      })
      hashcat_show.stdout.on('exit', function() {
        console.log('Hashcat finish!')
      })
    }
    windowManager.get('mainWindow').content().send('send-pid')
  })
}

ipc.on('send-datas', function(event, charset, length, hashFile, cond1, cond2, cond3, cond4, cond5, outdir) {
  hashcat(charset, length, hashFile, cond1, cond2, cond3, cond4, cond5, outdir)
  event.returnValue = ''
})
