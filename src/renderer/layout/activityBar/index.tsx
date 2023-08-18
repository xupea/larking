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
import styles from './index.module.css';

const cx = classNames.bind(styles);

const data1 = [
  {
    name: '1',
    icon: <AppleOutlined />,
  },
  {
    name: '1',
    icon: <IeOutlined />,
  },
  {
    name: '1',
    icon: <AppleOutlined />,
  },
  {
    name: '1',
    icon: <GithubOutlined />,
  },
  {
    name: '1',
    icon: <QqOutlined />,
  },
  {
    name: '1',
    icon: <AppleOutlined />,
  },
  {
    name: '1',
    icon: <GoogleOutlined />,
  },
  {
    name: '1',
    icon: <AppleOutlined />,
  },
];

const data2 = [
  {
    name: '1',
    icon: <UserOutlined />,
  },
  {
    name: '1',
    icon: <SettingOutlined />,
  },
];

const ActivityBar: FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [max, setMax] = useState(0);

  useLayoutEffect(() => {
    const handleResize = () => {
      // console.log(elementRef.current.offsetHeight);
      const m = Math.floor((window.innerHeight - 44 - 64 * 2) / 64);
      console.log(m - 1);
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
        <ActionBar data={data2} />
      </div>
    </div>
  );
};

export default ActivityBar;
