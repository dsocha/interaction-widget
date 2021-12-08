import React, { useState } from 'react';
import { TreeSelect } from 'antd';
import PropTypes from 'prop-types';

const Component = ({ onActivityChange }) => {
  const [value, setValue] = useState();

  const onChange = (value) => {
    setValue(value);
    onActivityChange(value);
  };

  const treeData = [
    {
      selectable: false,
      title: 'Campaigns',
      value: 'Campaigns',
      children: [
        {
          title: 'Outbound calls',
          value: 'Outbound calls',
        },
        {
          title: 'Incomming calls',
          value: 'Incomming calls',
        },
        {
          title: 'Incomming chats and emails',
          value: 'Incomming chats and emails',
        },
      ],
    },
    {
      selectable: false,
      title: 'Office Work',
      value: 'Office Work',
      children: [
        {
          title: 'Handling compliants',
          value: 'Handling compliants',
        },
        {
          title: 'Reviewing orders',
          value: 'Reviewing orders',
        },
        {
          title: 'Admin time',
          value: 'Admin time',
        },
      ],
    },
    {
      selectable: false,
      title: 'Others',
      value: 'Others',
      children: [
        {
          title: 'Meal',
          value: 'Meal',
        },
        {
          title: 'Playing cards',
          value: 'Playing cards',
        },
        {
          title: 'Short nap',
          value: 'Short nap',
        },
      ],
    },
  ];

  return <TreeSelect style={{ width: '100%' }} value={value} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} treeData={treeData} placeholder='Select your activity' treeDefaultExpandAll={false} onChange={onChange} autoClearSearchValue />;
};

Component.propTypes = {
  onActivityChange: PropTypes.func.isRequired,
};

export default Component;
