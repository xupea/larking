import React, { useEffect, useState } from 'react';
import { AutoSizer, List } from 'react-virtualized';
import { Avatar, List, message } from 'antd';
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
const ContainerHeight = 400;

const ConversationList: React.FC = () => {
  const [data, setData] = useState<UserItem[]>([]);

  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
      });
  };

  useEffect(() => {
    appendData();
  }, []);

  function rowRenderer({ key, index, style }) {
    return (
      <div key={key} className={styles.row} style={style}>
        <div>{data[index].email}</div>
      </div>
    );
  }

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
