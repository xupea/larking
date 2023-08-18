import React from 'react';
import { Layout } from 'antd';
import SearchCenter from 'renderer/business/searchCenter';
import styles from './index.module.css';
import RecentVisitHistory from 'renderer/business/resentVisitHistory';
import QuickAction from 'renderer/business/quickAction';
import TitleBar from '../titlebar';
import ConversationList from 'renderer/ui/conversationList';
import useVersion from 'renderer/hooks/useVersion';
import ActivityBar from '../activityBar';

const { Header, Sider, Content, Footer } = Layout;

const headerStyle: React.CSSProperties = {
  color: '#fff',
  height: 44,
  width: '100%',
  backgroundColor: 'black',
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
  backgroundColor: '#6ba0e9',
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
        <div className={styles.demoText}>
          <div>Hello World</div>
          <div style={{ fontSize: 34 }}>{version}</div>
        </div>
        {/* <Sider width={64} style={siderStyle1}>
          <ActivityBar />
        </Sider>
        <Sider width={288} style={siderStyle2}>
          <ConversationList />
        </Sider>
        <Layout style={contentStyle}>
          <Content style={contentStyle}>Content</Content>
          <Footer>Footer</Footer>
        </Layout> */}
      </Layout>
    </Layout>
  );
};

export default ClassicLayout;
