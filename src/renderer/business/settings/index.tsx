import { Button, Layout, Menu } from 'antd';
import React, { useRef } from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import useVersion from 'renderer/hooks/useVersion';
import AnchorItem from '../anchorItem';
import styles from './index.module.css';

const { Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
  overflowY: 'auto',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: 'white',
  overflowY: 'auto',
};

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('通用', '0', <MailOutlined />),
  getItem('隐私', '1', <AppstoreOutlined />),
  getItem('效率', '2', <SettingOutlined />),
  getItem('通知', '3', <MailOutlined />),
  getItem('快捷键', '4', <AppstoreOutlined />),
  getItem('日历', '5', <SettingOutlined />),
  getItem('视频会议', '6', <SettingOutlined />),
  getItem('任务', '7', <SettingOutlined />),
  getItem('内部设置', '8', <SettingOutlined />),
  getItem('软件更新', '9', <SettingOutlined />),
  getItem('关于', '10', <SettingOutlined />),
];

const Theme = () => {
  const changeTheme = (type: string) => {
    const html = document.querySelector(':root');
    html?.setAttribute('data-theme', type);
  };

  const changeScale = (scale: number) => {
    window.electron.setZoomFactor(scale);
  };

  return (
    <div>
      <div>设置主题色</div>
      <div>
        <Button onClick={() => changeTheme('blue1')}>深邃蓝</Button>
        <Button onClick={() => changeTheme('blue2')}>经典蓝</Button>
        <Button onClick={() => changeTheme('grey')}>简约灰</Button>
      </div>
      <div>窗口缩放</div>
      <div>
        <Button onClick={() => changeScale(1)}>100%（默认）</Button>
        <Button onClick={() => changeScale(1.1)}>110%</Button>
        <Button onClick={() => changeScale(1.25)}>125%</Button>
      </div>
    </div>
  );
};

const Settings = () => {
  const itemsEls = useRef<HTMLDivElement[]>([]);
  const version = useVersion();

  const data = [
    { title: '通用', content: <Theme /> },
    { title: '隐私', content: '2' },
    { title: '效率', content: '3' },
    { title: '通知', content: '4' },
    { title: '快捷键', content: '5' },
    { title: '日历', content: '6' },
    { title: '视频会议', content: '7' },
    { title: '任务', content: '8' },
    { title: '内部设置', content: '9' },
    { title: '软件更新', content: '10' },
    { title: '关于', content: version },
  ];

  const clickHandler: MenuProps['onClick'] = (info) => {
    itemsEls.current[info.key as unknown as number].scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <Layout className={styles.layout}>
      <Sider width={256} style={siderStyle}>
        <Menu
          style={{ width: 256, overflowY: 'auto' }}
          defaultSelectedKeys={['sub1']}
          mode="inline"
          items={items}
          onClick={clickHandler}
        />
      </Sider>
      <Layout>
        <Content style={contentStyle}>
          {data.map(({ title, content }, index) => {
            return (
              <AnchorItem
                ref={(ele) => {
                  itemsEls.current[index] = ele!;
                }}
                key={title}
                title={`${title}`}
                content={content}
              />
            );
          })}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Settings;
