import classNames from 'classnames/bind';
import styles from './index.module.css';
import Left from './left';
import Center from './center';
import Right from './right';

const cx = classNames.bind(styles);

export default function TitleBar() {
  return (
    <div className={cx('titlebarContainer')}>
      <div className={cx('titlebarDragRegion')}></div>
      <Left />
      <Center />
      <Right />
    </div>
  );
}
