const { app, BrowserWindow } = require('electron')

function crearVentana() {
    const ventana = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    ventana.maximize()  // Maximizar después de crear
    ventana.loadFile('index.html')
}

app.whenReady().then(() => {
    crearVentana()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            crearVentana()
        }
    })
})

app.on('window-all-closed', () => {

    app.quit()

})
