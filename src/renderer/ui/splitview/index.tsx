import React, { PropsWithChildren } from 'react';
import TitleBar from 'renderer/layout/titlebar';
import styles from './index.module.css';
import ConversationList from '../conversationList';

export const SplitViewView: React.FC<PropsWithChildren> = ({ children }) => {
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
