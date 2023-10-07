import React, { useEffect, useState } from 'react';
import { AutoSizer, List, ListRowRenderer } from 'react-virtualized';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './index.module.css';

interface UserItem {
  email: string;
  gender: string;
  name: {
    first: string;
    last: string;
    title: string;
  };
  nat: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';

const ConversationList: React.FC = () => {
  const [data, setData] = useState<UserItem[]>([]);

  useEffect(() => {
    const appendData = () => {
      fetch(fakeDataUrl)
        .then((res) => res.json())
        .then((body) => {
          setData(data.concat(body.results));
        });
    };
    appendData();
  }, []);

  const rowRenderer: ListRowRenderer = ({ key, index, style }) => {
    return (
      <div key={key} className={styles.row} style={style}>
        <div>
          <Avatar shape="square" size={50} icon={<UserOutlined />} />
        </div>
        <div className={styles.body}>
          <div className={styles.title}>{data[index].email}</div>
          <div className={styles.content}>{data[index].email}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            rowCount={data.length}
            rowHeight={64}
            rowRenderer={rowRenderer}
            width={width}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default ConversationList;
