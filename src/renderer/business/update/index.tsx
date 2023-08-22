import { FC } from 'react';
import { Button, Popover } from 'antd';
import { GiftOutlined } from '@ant-design/icons';
import ActionItem from 'renderer/ui/actionItem';

type Props = {
  onRelaunch: () => void;
  updates: string[];
};

const Update: FC<Props> = ({ onRelaunch, updates }) => {
  const text = <span>程序已经准备就绪</span>;

  const content = (
    <div>
      {updates.map((update) => (
        <p>{update}</p>
      ))}
      <Button onClick={() => onRelaunch()}>立即升级</Button>
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
