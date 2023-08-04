import React, { PropsWithChildren } from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.css';

type Props = {
  // disabled?: boolean;
  bordered?: boolean;
  width?: number;
} & PropsWithChildren;

const cx = classNames.bind(styles);

const ActionItem: React.FC<Props> = ({ children, bordered, width }) => {
  const style = { width };
  return (
    <div
      className={cx('container', { bordered })}
      style={style}
      role="presentation"
    >
      {children}
    </div>
  );
};

export default ActionItem;
