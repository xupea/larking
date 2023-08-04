import { HistoryOutlined } from '@ant-design/icons';
import ActionItem from 'renderer/ui/actionItem';

const RecentVisitHistory = () => {
  return (
    <ActionItem width={28}>
      <HistoryOutlined />
    </ActionItem>
  );
};

export default RecentVisitHistory;
