import { useEffect, useState } from 'react';

export default function useVersion() {
  const [version, setVersion] = useState('');

  useEffect(() => {
    window.electron.ipcRenderer.once('ipc-example', (arg) => {
      setVersion(arg as string);
    });
    window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
  }, []);

  return version;
}
