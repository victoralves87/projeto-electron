const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path')
const fs = require("node:fs")

let mainWindow;

const musicDir = path.join(__dirname,"..","public","musicas")

function createWindow() {
    // Cria a janela do navegador.
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true, // Permite a integração do Node.js no front-end
        preload: `${__dirname}/preload.js`
      },
    });
      // Carrega o arquivo index.html da aplicação.
     mainWindow.loadURL('http://localhost:3000');
     mainWindow.on('closed', function () {
        mainWindow = null;
      });
}

app.whenReady().then(async () =>{
    createWindow();
})

app.on('window-all-cloesed', () =>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () =>{
    if(mainWindow === null){
        createWindow();
    }
});

ipcMain.on("music-upload", (event, file) => {
  const filePath = path.join(musicDir, file.name);
  fs.writeFile(filePath, file.data, async (err) => {
      if (err) {
          mainWindow.webContents.send("toast:receive", err);
      } else {
         sendUpdateList()
          mainWindow.webContents.send("toast:receive", "Arquivo recebido com sucesso");
      }
  });
});

ipcMain.on("music-get", ()=>{
    sendUpdateList();
})

ipcMain.on("remove-listener", (event, channel) => {
    mainWindow.webContents.send("remove-listener", channel);
});


async function sendUpdateList(){
    const files = await fs.promises.readdir(musicDir)
    mainWindow.webContents.send("music-list", files)
}

ipcMain.on("music-delete", async (event, file) => {
    const filePath = path.join(musicDir, file);
    fs.unlink(filePath, async (err) => {
        if (err) {
            mainWindow.webContents.send("toast:receive", err);
        } else {
            sendUpdatedList();
            mainWindow.webContents.send("toast:receive", "Arquivo foi deletado com sucesso");
        }
    });
});

ipcMain.on("music-to-play", (event, file) => {
    mainWindow.webContents.send("music-playable", file);
});

