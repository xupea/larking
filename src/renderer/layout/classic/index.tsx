import React from 'react';
import { Anchor, Col, Drawer, Layout, Row } from 'antd';
import SearchCenter from 'renderer/business/searchCenter';
import RecentVisitHistory from 'renderer/business/resentVisitHistory';
import QuickAction from 'renderer/business/quickAction';
import TitleBar from '../titlebar';
import ConversationList from 'renderer/ui/conversationList';
import useVersion from 'renderer/hooks/useVersion';
import Settings from 'renderer/business/settings';
import { useAppDispatch, useAppSelector } from 'renderer/redux/hooks';
import { changeSettings } from 'renderer/redux/counterSlice';
import ActivityBar from '../activityBar';
import styles from './index.module.css';

const { Header, Sider, Content, Footer } = Layout;

const headerStyle: React.CSSProperties = {
  color: '#fff',
  height: 44,
  width: '100%',
  backgroundColor: '#414c68',
  paddingInline: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: 1,
  color: '#fff',
  backgroundColor: 'white',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};

const ClassicLayout: React.FC = () => {
  const version = useVersion();

  const open = useAppSelector((state) => state.counter.open);
  const appDispatch = useAppDispatch();
  console.log(open);
  const onClose = () => {
    appDispatch(changeSettings());
  };

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header} style={headerStyle}>
        <TitleBar />
      </Header>
      <Layout>
        <Sider width={64} className={styles.sider}>
          <ActivityBar />
        </Sider>
        <Sider width={288} style={siderStyle}>
          <ConversationList />
        </Sider>
        <Layout style={contentStyle}>
          <Content style={contentStyle}>Content</Content>
          <Footer>Footer</Footer>
          <div className={styles.demoText}>
            <div>Hello World</div>
            <div style={{ fontSize: 34 }}>{version}</div>
          </div>
        </Layout>
        <Drawer
          title="Settings"
          contentWrapperStyle={{ width: '100%', left: 64, top: 44 }}
          bodyStyle={{ padding: 0 }}
          placement="right"
          mask={false}
          open={open}
          onClose={onClose}
        >
          <Settings />
        </Drawer>
      </Layout>
    </Layout>
  );
};

export default ClassicLayout;
