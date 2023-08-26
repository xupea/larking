import React from 'react';
import { Anchor, Col, Layout, Row } from 'antd';
import SearchCenter from 'renderer/business/searchCenter';
import styles from './index.module.css';
import RecentVisitHistory from 'renderer/business/resentVisitHistory';
import QuickAction from 'renderer/business/quickAction';
import TitleBar from '../titlebar';
import ConversationList from 'renderer/ui/conversationList';
import useVersion from 'renderer/hooks/useVersion';
import ActivityBar from '../activityBar';
import Settings from 'renderer/business/settings';

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

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};

const siderStyle1: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#414c68',
};

const siderStyle2: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#3ba0e9',
};

const ClassicLayout: React.FC = () => {
  const version = useVersion();

  return (
    <Layout className={styles.layout}>
      <Header style={headerStyle}>
        <TitleBar />
      </Header>
      <Layout>
        <Sider width={64} style={siderStyle1}>
          <ActivityBar />
        </Sider>
        {/* <Sider width={288} style={siderStyle2}>
          <ConversationList />
        </Sider> */}
        {/* <Layout style={contentStyle}>
          <Content style={contentStyle}>Content</Content>
          <Footer>Footer</Footer>
          <div className={styles.demoText}>
            <div>Hello World</div>
            <div style={{ fontSize: 34 }}>{version}</div>
          </div>
        </Layout> */}
        <Settings />
      </Layout>
    </Layout>
  );
};

export default ClassicLayout;
