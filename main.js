const {app,BrowserWindow,screen,ipcMain,Menu,Tray} = require('electron');
const {exec}=require("child_process")
const path=require("path")
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
    resizable: false,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      devTools: false
    }
  })
  win.loadFile('./index.html');
  win.setAlwaysOnTop(true, 'screen-saver');
}

const createTray = () =>{
  let tray=new Tray(path.join(__dirname,'static','icon64.ico'))
  const contextmenu=Menu.buildFromTemplate([
    {
      label: '退出',
      click: ()=>{
        app.quit()
      }
    },
    {
      label: '显示/隐藏',
      click: ()=>{
        win.isVisible()?win.hide():win.show()
      }
    }
  ]);
  tray.setContextMenu(contextmenu);
}

app.whenReady().then(() => {
  app.setAppUserModelId('com.ljr.classyc');
  createWindow();
  createTray();
})

ipcMain.on('set-ignore', (event, ignore) => {
  if(ignore) win.setIgnoreMouseEvents(true,{forward:true});
  else win.setIgnoreMouseEvents(false);
})
ipcMain.on("log",(event,text)=>{
  console.log(text)
})
ipcMain.on("open-dir",(event,dir)=>{
  exec(`start ${dir}`)
})

const gotTheLock=app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit()
}