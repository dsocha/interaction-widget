import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';
import { initializeNotificationsChatMessages, registerCallbackFunctionForChatMessages } from '../../Misc/notifications';

const ChatMsgs = (props) => {
  const [lastMsg, setLastMsg] = useState(null);
  const [iframeUrl, setIframeUrl] = useState('about:blank');

  useEffect(() => {
    startWatchingMessages();
  }, []);

  const startWatchingMessages = async () => {
    registerCallbackFunctionForChatMessages((msg) => {
      setLastMsg(msg);
    });
    await initializeNotificationsChatMessages(props.cid);
  };

  return (
    <>
      <div title='' style={{ marginTop: '0px', borderRadius: '25px', border: '1px solid #dddddd', padding: '20px', backgroundColor: '#fafafa' }}>
        <div style={{ overflow: 'auto', height: '46px', backgroundColor: '#ffffff', border: '1px solid #dddddd', borderRadius: '10px', padding: '10px' }}>{lastMsg && <>{lastMsg} </>}</div>
        <Button
          disabled={!lastMsg}
          style={{ margin: '10px 0' }}
          onClick={() => {
            setIframeUrl(`https://www.bing.com/search?q=${encodeURIComponent(lastMsg)}`);
          }}
        >
          Query 3rd party
        </Button>
        <div style={{ opacity: '0.6', fontWeight: '300', textAlign: 'center' }}>{iframeUrl}</div>
        <div style={{ overflow: 'auto', height: '400px', border: '1px solid #dddddd', borderRadius: '10px', padding: '0' }}>
          <iframe style={{ width: '100%', height: '100%', border: 'none' }} src={iframeUrl} />
        </div>
      </div>
    </>
  );
};

ChatMsgs.propTypes = {
  cid: PropTypes.string.isRequired,
};

export default ChatMsgs;
