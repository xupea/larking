import { FC, forwardRef } from 'react';
import styles from './index.module.css';

type Props = {
  title: string;
  content: string;
};

const AnchorItem = forwardRef<HTMLDivElement, Props>(
  ({ title, content }, ref) => {
    return (
      <div ref={ref}>
        <div className={styles.title}>{title}</div>
        <div>{content}</div>
      </div>
    );
  }
);

export default AnchorItem;
