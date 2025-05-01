const {app,BrowserWindow,screen,ipcMain} = require('electron');
const {exec}=require("child_process")
var win=undefined;

const createWindow = () => {
  const {width,height}=screen.getPrimaryDisplay().workAreaSize;
  win = new BrowserWindow({
    width: width,
    height: 50,
    x: 0,
    y: 0,
    frame: false,
    transparent: true,
    movable: false,
    alwaysOnTop: true,
    maximizable: false,
    minimizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  win.loadFile('./index.html');
  // win.setIgnoreMouseEvents(true);
}

app.whenReady().then(() => {
  createWindow();
})

ipcMain.on('set-ignore', (event, ignore) => {
  if(ignore) win.setIgnoreMouseEvents(true,{forward:true});
  else win.setIgnoreMouseEvents(false);
})
ipcMain.on("helo",(event)=>{
  console.log(1)
})
