import { FC, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Popover } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import styles from './index.module.css';

const cx = classNames.bind(styles);

type Props = {
  data: any[];
  max?: number;
  onClick?: (type: string) => void;
};

const ActionBar: FC<Props> = ({ data, max, onClick }) => {
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  const more = {
    name: 'more',
    icon: (
      <Popover
        placement="rightBottom"
        showArrow={false}
        content={content}
        trigger="click"
      >
        <EllipsisOutlined />
      </Popover>
    ),
  };

  const newMax = max || data.length;

  const show = data.slice(0, newMax);
  const hide = data.slice(newMax);

  if (hide.length > 1) {
    show.push(more);
  }

  const contentShow = show.map(({ type, icon }) => (
    <li
      key={type}
      role="presentation"
      className={cx('action-item')}
      onClick={() => onClick?.(type)}
    >
      <div className={cx('action-item-inner')}>{icon}</div>
    </li>
  ));

  const contentHide = hide.map((d) => (
    <li key={d.name} className={cx('action-item')}>
      <div className={cx('action-item-inner')}>{d.icon}</div>
    </li>
  ));

  return (
    <div className={cx('action-bar')}>
      <ul className={cx('actions-container')} role="tablist">
        {contentShow}
        {/* {contentHide} */}
      </ul>
    </div>
  );
};

export default ActionBar;
