import classNames from 'classnames/bind';
import styles from './index.module.css';

const cx = classNames.bind(styles);

export default function Left() {
  return (
    <div className={cx('container', 'left')}>
      <div className={cx('window-controls-container')} />
    </div>
  );
}
