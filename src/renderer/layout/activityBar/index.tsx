import { FC, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import {
  AppleOutlined,
  IeOutlined,
  GithubOutlined,
  QqOutlined,
  GoogleOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ActionBar from 'renderer/ui/actionBar';
import { changeSettings } from 'renderer/redux/counterSlice';
import { useAppDispatch } from 'renderer/redux/hooks';
import styles from './index.module.css';

const cx = classNames.bind(styles);

const data1 = [
  {
    name: '1',
    type: 'message',
    title: '消息',
    icon: <AppleOutlined />,
  },
  {
    name: '1',
    type: 'video',
    title: '视频会议',
    icon: <IeOutlined />,
  },
  {
    name: '1',
    type: 'calendar',
    title: '日历',
    icon: <GoogleOutlined />,
  },
  {
    name: '1',
    type: 'contacts',
    title: '通信录',
    icon: <GithubOutlined />,
  },
  {
    name: '1',
    type: 'task',
    title: '任务',
    icon: <QqOutlined />,
  },
  {
    name: '1',
    type: 'table',
    title: '表格',
    icon: <AppleOutlined />,
  },
  {
    name: '1',
    type: 'favorite',
    title: '收藏',
    icon: <GoogleOutlined />,
  },
  {
    name: '1',
    type: 'work',
    title: '工作台',
    icon: <AppleOutlined />,
  },
];

const data2 = [
  {
    name: '1',
    type: 'account',
    title: '账户',
    icon: <UserOutlined />,
  },
  {
    name: '1',
    type: 'settings',
    title: '设置',
    icon: <SettingOutlined />,
  },
];

const ActivityBar: FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [max, setMax] = useState(0);
  const appDispatch = useAppDispatch();

  const handleChange = (type: string) => {
    if (type === 'settings') {
      appDispatch(changeSettings());
    }
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      const m = Math.floor((window.innerHeight - 44 - 64 * 2) / 64);
      setMax(m - 1);
      setHeight(elementRef.current.offsetHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div ref={elementRef} className={styles.content}>
      <div className={cx('composite-bar')}>
        <ActionBar max={max} data={data1} />
      </div>
      <div>
        <ActionBar data={data2} onClick={handleChange} />
      </div>
    </div>
  );
};

export default ActivityBar;
