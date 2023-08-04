import React from 'react';
import TitleBar from 'renderer/layout/titlebar';
import styles from './index.module.css';
import ConversationList from '../conversationList';

type Props = {
  title: string;
};

export const SplitViewView: React.FC<Props> = ({ title, children }) => {
  return <div className={styles['split-view-view']}>{children}</div>;
};

export default function SplitViewContainer() {
  return (
    <div className={styles.scrollableElement}>
      <SplitViewView>
        <TitleBar />
      </SplitViewView>
      <SplitViewView>
        <ConversationList />
      </SplitViewView>
    </div>
  );
}
