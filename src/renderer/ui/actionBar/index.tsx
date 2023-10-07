import { FC, JSX } from 'react';
import classNames from 'classnames/bind';
import { Popover } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import styles from './index.module.css';

const cx = classNames.bind(styles);

type Data = {
  type: string;
  icon: JSX.Element;
  title: string;
};

type Props = {
  data: Data[];
  max: number;
  onClick: (type: string) => void;
};

const ActionBar: FC<Props> = ({
  data,
  max = data.length,
  onClick = () => {},
}) => {
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  const more = {
    type: 'more',
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
    title: '更多',
  };

  const show = data.slice(0, max);
  const hide = data.slice(max);

  if (hide.length > 1) {
    show.push(more);
  }

  const contentShow = show.map(({ type, icon, title }) => (
    <li
      key={type}
      role="presentation"
      className={cx('action-item')}
      onClick={() => onClick?.(type)}
    >
      <div className={cx('action-item-inner')}>
        <div className={cx('action-item-inner-icon')}>{icon}</div>
        <span className={cx('action-item-inner-title')}>{title}</span>
      </div>
    </li>
  ));

  return (
    <div className={cx('action-bar')}>
      <ul className={cx('actions-container')} role="tablist">
        {contentShow}
      </ul>
    </div>
  );
};

export default ActionBar;
