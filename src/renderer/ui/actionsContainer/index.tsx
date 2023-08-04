import React from 'react';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './index.module.css';

const cx = classNames.bind(styles);

type Props = {
  title?: string;
};

const ActionItem: React.FC<Props> = ({ children }) => {
  return (
    <li className={cx(['action-item', 'menu-entry'])} role="presentation">
      {children}
    </li>
  );
};

const SearchCenter = () => {
  return (
    <ActionItem>
      <SearchOutlined />
      <span className={cx('search-label')}>一站式搜索</span>
    </ActionItem>
  );
};

const Quick = () => {
  return (
    <ActionItem>
      <Button type="link" icon={<SearchOutlined />} />
    </ActionItem>
  );
};

export default function ActionsContainer() {
  return (
    <ul className={cx('actions-container')} role="toolbar">
      <SearchCenter />
      <Quick />
    </ul>
  );
}
