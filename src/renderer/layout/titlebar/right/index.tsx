import classNames from 'classnames/bind';
import styles from './index.module.css';

const cx = classNames.bind(styles);

export default function Right() {
  return <div className={cx('container', 'right')}></div>;
}
