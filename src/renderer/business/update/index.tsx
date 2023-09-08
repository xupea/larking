import { FC, useEffect, useState } from 'react';
import { Button, Popover } from 'antd';
import { GiftOutlined } from '@ant-design/icons';
import ActionItem from 'renderer/ui/actionItem';

const Update: FC = () => {
  const [version, setVersion] = useState('');
  const [updates, setUpdates] = useState([]);

  const text = <span>Larking v{version} 已准备就绪</span>;

  const relaunch = () => {
    window.electron.ipcRenderer.sendMessage('ipc-main', ['relaunch']);
  };

  const fetchData = async () => {
    const res = await fetch(
      `http://rza9e5agw.hn-bkt.clouddn.com/version.json?r=${Math.random()}`
    );
    const update = await res.json();
    setUpdates(update.content || []);
    setVersion(update.version);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const content = (
    <div>
      {updates.map((update) => (
        <p>- {update}</p>
      ))}
      <Button onClick={() => relaunch()}>重启升级</Button>
    </div>
  );

  return (
    <ActionItem width={28}>
      <Popover
        placement="bottomRight"
        title={text}
        content={content}
        arrow={false}
        trigger="click"
      >
        <Button icon={<GiftOutlined />} type="link" />
      </Popover>
    </ActionItem>
  );
};

export default Update;
