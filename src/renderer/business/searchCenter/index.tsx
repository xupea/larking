import { FC } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import ActionItem from 'renderer/ui/actionItem';

const SearchCenter: FC = () => {
  return (
    <ActionItem width={300} bordered>
      <SearchOutlined />
      <span>一站式搜索</span>
    </ActionItem>
  );
};

export default SearchCenter;
