const { app, BrowserWindow } = require('electron')

// Crea una nueva ventana
function crearVentana() {
    const ventana = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    ventana.loadFile('index.html')
}

// Cuando la aplicación esté lista, se crea la ventana
app.whenReady().then(() => {
    crearVentana()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            crearVentana()
        }
    })
})

// Cierra la aplicación cuando todas las ventanas se cierran, evento de electron window-all-closed
app.on('window-all-closed', () => {

    app.quit()

})
