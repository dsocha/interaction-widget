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
import { initializeNotifications, registerCallbackFunctionForUserTargets } from './Misc/notifications';
import moment from 'moment';

var trackingData1 = [];

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
    registerCallbackFunctionForUserTargets(presenceCallbackFunc);
    await initializeNotifications(me.id);
  };

  const presenceCallbackFunc = useCallback((v) => {
    console.log('[Activity Widget] prsence changed:', v);
    addTrackingData('Presence', v);
  });

  const handleActivityChange = (v) => {
    console.log('[Activity Widget] activity changed:', v);
    addTrackingData('Activity', v);
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

  const addTrackingData = (type, value) => {
    console.log('[Activity Widget] addTrackingData():', type, value);
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
                  <Table columns={columns} dataSource={trackingData} />
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
