import './App.css';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import ChatMsgs from './Components/ChatMsgs/ChatMsgs';
import { Alert, Spin } from 'antd';
import { setEnv, setCid, setOau, getMe } from './Misc/api';

function App() {
  const env = queryString.parse(window.location.search).env;
  const cid = queryString.parse(window.location.search).cid;
  const oau = queryString.parse(window.location.search).oau;

  const [me, setMe] = useState(null);
  // const [presence, setPresence] = useState('NOT CHANGED YET');

  useEffect(() => {
    if (env && cid && oau) {
      if (!me) {
        setEnv(env);
        setCid(cid);
        setOau(oau);
        loadGetMe();
      } else {
        //
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

  return (
    <div className='main-container'>
      <>
        {(!env || !cid || !oau) && <Alert message='Oops, it does not look good :-(' description={<>Expected query string params are not present: env, cid, oau</>} type='error' showIcon />}
        {env && cid && oau && (
          <>
            {!me && (
              <div className='center' style={{ marginTop: '50px' }}>
                <Spin />
              </div>
            )}
            {me && (
              <>
                <ChatMsgs cid={cid} />
              </>
            )}
          </>
        )}
      </>
    </div>
  );
}

export default App;
