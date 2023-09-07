import { QRCodeSVG } from 'qrcode.react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Button, Layout } from 'antd';
import styles from './index.module.css';

const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 44,
  paddingInline: 50,
  lineHeight: '44px',
  backgroundColor: '#7dbcea',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 44,
  paddingInline: 50,
  lineHeight: '44px',
  backgroundColor: '#7dbcea',
};

const Login: React.FC = () => {
  const [uuid, setUUID] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setUUID(uuidv4());
  }, []);

  const toMain = () => {
    navigate('/main');
  };

  return (
    <Layout className={styles.layout}>
      <Header style={headerStyle}>
        <div className={styles.header}>登录页面</div>
      </Header>
      <Content style={contentStyle}>
        <div className={styles.container}>
          <QRCodeSVG
            value={uuid}
            size={190}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
            includeMargin={false}
          />

          <Button onClick={() => toMain()}>跳过登录</Button>
        </div>
      </Content>
      <Footer style={footerStyle}></Footer>
    </Layout>
  );
};

export default Login;
