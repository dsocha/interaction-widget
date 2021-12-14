import './App.css';
import 'antd/dist/antd.css';
import React, { useEffect, useState, useCallback } from 'react';
import queryString from 'query-string';
// import ClientAppSdk from './Components/ClientAppSdk/ClientAppSdk';
// import PlatformApi from './Components/PlatformApi/PlatformApi';
// import Notifications from './Components/Notifications/Notifications';
import ActivitySelection from './Components/ActivitySelection/ActivitySelection';
import { Alert, Spin, Table } from 'antd';
import { setEnv, setOau, getMe } from './Misc/api';
import { initializeNotifications, registerCallbackFunctionForUserConversations, registerCallbackFunctionForUserTargets } from './Misc/notifications';
import moment from 'moment';

var trackingData1 = [];
var lastType = null;
var lastValue = null;

function App() {
  const env = queryString.parse(window.location.search).env;
  const oau = queryString.parse(window.location.search).oau;

  const [me, setMe] = useState(null);
  const [trackingData, setTrackingData] = useState([]);

  useEffect(() => {
    if (env && oau) {
      if (!me) {
        setEnv(env);
        setOau(oau);
        loadGetMe();
      } else {
        startWatchingUserPresence();
      }
    }
  }, [me]);

  const loadGetMe = async () => {
    try {
      const me = await getMe();
      setMe(me);
    } catch (error) {
      console.error(error);
    }
  };

  const startWatchingUserPresence = async () => {
    registerCallbackFunctionForUserTargets(presenceCallbackFunc1);
    registerCallbackFunctionForUserConversations(conversationCallbackFunc1);
    await initializeNotifications(me.id);
  };

  const presenceCallbackFunc1 = (v) => {
    console.log('[Activity Widget] presence changed:', v);
    addTrackingData1('Presence', v);
  };

  const conversationCallbackFunc1 = (v) => {
    console.log('[Activity Widget] conversation changed:', v);
    if (!v.participants) return;
    const p = v.participants.find((x) => x.purpose === 'agent' && !x.endTime);
    if (!p) return;
    if (p.emails) {
      addTrackingData1('Conversations', 'email ' + p.emails[0]?.state);
    }
    if (p.chats) {
      addTrackingData1('Conversations', 'chat ' + p.chats[0]?.state);
    }
    if (p.calls) {
      addTrackingData1('Conversations', 'call ' + p.calls[0]?.state);
    }
  };

  const handleActivityChange = (v) => {
    console.log('[Activity Widget] activity changed:', v);
    addTrackingData1('Activity', v);
  };

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      align: 'left',
    },
    {
      title: 'When',
      dataIndex: 'when',
      key: 'when',
      align: 'right',
      render: (when) => <>{when.format('LTS')}</>,
    },
  ];

  const addTrackingData1 = (type, value) => {
    console.log('[Activity Widget] addTrackingData1():', type, value);
    if (lastType === type && lastValue === value) return;
    lastType = type;
    lastValue = value;
    let td = [{ type, value, when: moment() }].concat([...trackingData1]);
    trackingData1 = td;
    setTrackingData(td);
  };

  return (
    <div className='main-container'>
      <>
        {(!env || !oau) && <Alert message='Oops, it does not look good :-(' description={<>Expected query string params are not present: env, oau</>} type='error' showIcon />}
        {env && oau && (
          <>
            {!me && (
              <div className='center' style={{ marginTop: '50px' }}>
                <Spin />
              </div>
            )}
            {me && (
              <>
                <div>
                  Activity:
                  <ActivitySelection onActivityChange={handleActivityChange} />
                </div>
                <div style={{ marginTop: '24px' }}>
                  History:
                  <Table columns={columns} dataSource={trackingData} rowKey={(r) => r.when} />
                </div>
              </>
            )}
          </>
        )}
      </>
    </div>
  );
}

export default App;
