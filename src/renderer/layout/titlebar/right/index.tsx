import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Update from 'renderer/business/update';
import styles from './index.module.css';

const cx = classNames.bind(styles);

export default function Right() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  const relaunch = () => {
    window.electron.ipcRenderer.sendMessage('ipc-main', ['relaunch']);
  };

  useEffect(() => {
    window.electron.ipcRenderer.on('app-update', (event) => {
      setUpdateAvailable(event === 1);
    });
  }, []);

  return (
    <div className={cx('container', 'right')}>
      <div className={cx('custom-controls')}>
        {updateAvailable && (
          <Update onRelaunch={relaunch} updates={['你好', '还行']} />
        )}
      </div>
    </div>
  );
}
