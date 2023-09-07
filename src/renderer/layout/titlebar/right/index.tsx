import classNames from 'classnames/bind';
import { Progress } from 'antd';
import Update from 'renderer/business/update';
import { isWindows } from 'common/platform';
import useUpdate from 'renderer/hooks/useUpdate';
import styles from './index.module.css';

const cx = classNames.bind(styles);

export default function Right() {
  const progress = useUpdate();

  return (
    <div className={cx('container', 'right')}>
      <div className={cx('custom-controls')}>
        {typeof progress === 'number' && (
          <Progress
            type="circle"
            trailColor="#e6f4ff"
            percent={progress}
            strokeWidth={20}
            size={16}
            format={(number) => `进行中，已完成${number}%`}
          />
        )}
        {true && <Update />}
      </div>
      {isWindows && <div className={cx('window-controls-container')} />}
    </div>
  );
}
