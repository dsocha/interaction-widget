import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import './App.css';
import 'antd/dist/antd.css';
import ClientAppSdk from './Components/ClientAppSdk/ClientAppSdk';
import PlatformApi from './Components/PlatformApi/PlatformApi';
import { Alert, Spin } from 'antd';
import { setEnv, setCid, getMe } from './Misc/api';

function App() {
  const env = queryString.parse(window.location.search).env;
  const cid = queryString.parse(window.location.search).cid;

  const [me, setMe] = useState(null);

  useEffect(() => {
    if (env && cid) {
      setEnv(env);
      setCid(cid);
      loadGetMe();
    }
  }, []);

  const loadGetMe = async () => {
    try {
      const me = await getMe(env);
      setMe(me);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='main-container'>
      <>
        {(!env || !cid) && <Alert message='Oops, it does not look good :-(' description={<>Expected query string params are not present: env, cid</>} type='error' showIcon />}
        {env && cid && (
          <>
            {!me && (
              <div className='center' style={{ marginTop: '50px' }}>
                <Spin />
              </div>
            )}
            {me && (
              <>
                <ClientAppSdk cid={cid} uid={me.id} />
                <PlatformApi jsonObj={me} />
              </>
            )}
          </>
        )}
      </>
    </div>
  );
}

export default App;
