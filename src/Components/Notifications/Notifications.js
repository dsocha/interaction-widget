import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Alert } from 'antd';

const Notifications = (props) => {
  const [presenceClass, setPresenceClass] = useState('');

  useEffect(() => {
    setPresenceClass('blink');
    setTimeout(() => {
      setPresenceClass('');
    }, 900);
  }, [props.presence]);

  return (
    <Card title='Notifications' style={{ marginTop: '20px' }}>
      User presence
      <Alert className={presenceClass} message={props.presence} type='info' />
    </Card>
  );
};

Notifications.propTypes = {
  presence: PropTypes.string.isRequired,
};

export default Notifications;
