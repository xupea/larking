import { useEffect, useState } from 'react';

export default function useVersion() {
  const [version, setVersion] = useState('');

  useEffect(() => {
    const callback = window.electron.ipcRenderer.on('ipc-example', (arg) => {
      setVersion(arg as string);
    });
    window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);

    return () => callback();
  }, []);

  return version;
}
