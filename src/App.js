import React, { useEffect } from 'react';
import queryString from 'query-string';
import './App.css';
import 'antd/dist/antd.css';
import ConversationDetails from './Components/ClientAppSdk/ClientAppSdk';
import { Alert } from 'antd';
import { setEnv, setCid, getMe } from './Misc/api';

function App() {
  const env = queryString.parse(window.location.search).env;
  const cid = queryString.parse(window.location.search).cid;

  useEffect(() => {
    if (env && cid) {
      setEnv(env);
      setCid(cid);
      loadGetMe();
    }
  }, []);

  const loadGetMe = async () => {
    const me = await getMe(env);
  };

  return (
    <div className='main-container'>
      {(!env || !cid) && <Alert message='Oops, it does not look good :-(' description={<>Expected query string params are not present: env, cid</>} type='error' showIcon />}
      {env && cid && <ConversationDetails cid={cid} />}
    </div>
  );
}

export default App;
