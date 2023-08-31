/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import { AsarUpdater } from '@zeromake/electron-asar-updater';
import { resolveHtmlPath } from './util';

const asarUpdater = new AsarUpdater({
  version_url: 'http://rza9e5agw.hn-bkt.clouddn.com/version.json',
  resource_path: app.getAppPath(),
});

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    const key = 'FVP3-473T-LNH9-KTJ4-43X3-3NPP-MT4L-CKFN';
    autoUpdater.addAuthHeader(`License ${key}`);
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `v${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate(app.getVersion()));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const updateAsarFile = async (relaunch: boolean) => {
  // 有更新文件就进行替换逻辑
  if (await asarUpdater.hasUpgraded()) {
    await asarUpdater.upgrade(relaunch);
    if (relaunch && process.platform !== 'win32') {
      // 非 windows 平台都是可以直接替换文件的，直接使用 electron 的 app.relaunch()
      app.relaunch();
    }
  }
  app.exit();
};

ipcMain.on('ipc-main', () => {
  updateAsarFile(true);
});

const getVersion = () => {
  return app.getVersion();
};

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    icon: getAssetPath('icon.png'),
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      height: 44,
      color: '#414c68',
      symbolColor: '#ffffff',
    },
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.setSheetOffset(22);

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', async () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();

      setTimeout(async () => {
        const [isUpdater, asarInfo] = await asarUpdater.check(getVersion());
        console.log('isUpdater', isUpdater);
        console.log(asarInfo);
        if (isUpdater) {
          // TODO 通知进行更新
          if (await asarUpdater.download(asarInfo)) {
            // TODO 通知需要重启，用户确认
            // 替换文件，windows 下会启动一个 vbs 脚本进程尝试不停的替换，必须要退出该应用才可以正确的替换
            console.log('asar is ready to update');
            mainWindow?.webContents.send('app-update', 1);
          } else {
            // TODO 通知下载更新文件失败
            console.log('error');
            mainWindow?.webContents.send('app-update', 2);
          }
        } else {
          mainWindow?.webContents.send('app-update', 0);
        }
      }, 10000);
    }
  });

  mainWindow.on('close', (event) => {
    event.preventDefault();

    updateAsarFile(false);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
