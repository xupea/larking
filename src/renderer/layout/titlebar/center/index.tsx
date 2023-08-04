import classNames from 'classnames/bind';
import RecentVisitHistory from 'renderer/business/resentVisitHistory';
import SearchCenter from 'renderer/business/searchCenter';
import QuickAction from 'renderer/business/quickAction';
import styles from './index.module.css';

const cx = classNames.bind(styles);

export default function Center() {
  return (
    <div className={cx('container', 'center')}>
      <div className={cx('actions-container')}>
        <RecentVisitHistory />
        <SearchCenter />
        <QuickAction />
      </div>
    </div>
  );
}
