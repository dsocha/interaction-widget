import React from 'react';
import PropTypes from 'prop-types';
import ClientApp from 'purecloud-client-app-sdk';
import { Card, Button } from 'antd';

const ClientAppSdk = (props) => {
  const handleBtnShowToast = () => {
    const myClientApp = new ClientApp({
      pcEnvironmentQueryParam: 'env',
    });
    myClientApp.alerting.showToastPopup('Interaction widget', "Hello, what's up?");
  };

  const handleBtnConversationDetails = () => {
    const myClientApp = new ClientApp({
      pcEnvironmentQueryParam: 'env',
    });
    myClientApp.myConversations.showInteractionDetails(props.cid);
  };

  const handleBtnUserProfile = () => {
    const myClientApp = new ClientApp({
      pcEnvironmentQueryParam: 'env',
    });
    myClientApp.users.showProfile(props.uid);
  };

  return (
    <Card title='ClientApp SDK'>
      <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Button onClick={handleBtnShowToast}>Show toast</Button>
        <Button onClick={handleBtnConversationDetails}>Show conversation</Button>
        <Button onClick={handleBtnUserProfile}>Show profile</Button>
      </div>
    </Card>
  );
};

ClientAppSdk.propTypes = {
  cid: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
};

export default ClientAppSdk;
