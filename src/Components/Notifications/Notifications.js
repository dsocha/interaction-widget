import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

const Notifications = (props) => {
  return (
    <Card title='Notifications' style={{ marginTop: '20px' }}>
      User presence
      <div style={{ overflow: 'auto', height: '50px', backgroundColor: '#f5f5f5', border: '1px solid #dddddd', borderRadius: '5px', padding: '10px' }}>{props.presence}</div>
    </Card>
  );
};

Notifications.propTypes = {
  presence: PropTypes.string.isRequired,
};

export default Notifications;
