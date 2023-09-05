import { useEffect, useState } from 'react';

export default function useUpdate() {
  const [progress, setProgress] = useState<string | number>('');

  useEffect(() => {
    const callback = window.electron.ipcRenderer.on('message', (arg) => {
      const { event, data } = arg as any;
      if (event === 'progress') {
        setProgress(data as number);
      }

      if (event === 'downloaded') {
        setProgress('downloaded');
      }
    });

    return () => callback();
  }, []);

  return progress;
}
