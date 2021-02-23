import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ClientApp from 'purecloud-client-app-sdk';
import { Card, Button } from 'antd';

const ConversationDetails = (props) => {
  let myClientApp = null;
  useEffect(() => {
    myClientApp = new ClientApp({
      pcEnvironmentQueryParam: 'env',
    });
  }, []);

  const handleBtnShowToast = () => {
    myClientApp.alerting.showToastPopup('Interaction widget', "Hello, what's up?");
  };

  const handleBtnConversationDetails = () => {
    myClientApp.myConversations.showInteractionDetails(props.cid);
  };

  const handleBtnUserProfile = () => {
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

ConversationDetails.propTypes = {
  cid: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
};

export default ConversationDetails;
