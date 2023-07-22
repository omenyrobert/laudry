import { app as electronApp, BrowserWindow } from "electron";
import "./index"
import { PORT, dataSource } from "./index";

let mainWindow : BrowserWindow | null;



async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`http://localhost:${PORT}/desktop-loading-page`);
  while (dataSource.isInitialized === false) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  mainWindow.loadURL(`http://localhost:${PORT}`);


  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  

}

electronApp.on("ready", createWindow);

// @ts-ignore
electronApp.on("resize", (e: any, x: number, y: number) => {
  if (mainWindow) {
    mainWindow.setSize(x, y);
  }
});

electronApp.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    electronApp.quit();
  }
});

electronApp.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});










