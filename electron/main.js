const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
    // Cria a janela do navegador.
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true, // Permite a integração do Node.js no front-end
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