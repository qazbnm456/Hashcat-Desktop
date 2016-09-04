const psTree = require('ps-tree');
const ipc = require('electron').ipcMain

function kill(pid, signal, callback) {
    signal   = signal || 'SIGKILL'
    callback = callback || function () { console.log("OK!") }
    var killTree = true
    if(killTree) {
        psTree(pid, function (err, children) {
            [pid].concat(
                children.map(function (p) {
                    return p.PID
                })
            ).forEach(function (tpid) {
                try { process.kill(tpid, signal) }
                catch (ex) { }
            });
            callback()
        });
    } else {
        try { process.kill(pid, signal) }
        catch (ex) { }
        callback()
    }
}

ipc.on('send-pid', function (event, pid) {
    kill(pid)
    event.returnValue = "OK!"
})
