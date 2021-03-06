import React from 'react'
import { Table } from 'antd';
import { isValidArray } from '@/utils';

import './index.less';

const Index = ({
  rowKey,
  columns,
  dataSource,
  loading=false,
  bordered=true
}) => {
  if (!isValidArray(columns)) return false;

  return (
    <div className="table-wrapper">
      <Table
        bordered={bordered}
        rowKey={rowKey}
        loading={loading}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  )
};

export default Index;