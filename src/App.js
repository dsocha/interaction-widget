import queryString from "query-string";
import "./App.css";
import "antd/dist/antd.css";
import ConversationDetails from "./Components/ClientAppSdk/ClientAppSdk";

function App() {
  const env = queryString.parse(window.location.search).env;
  const cid = queryString.parse(window.location.search).cid;
  return (
    <div className="main-container">
      {(!env || !cid) && (
        <p className="center">
          Oops, it does not look good :-(
          <br />
          Expected query string params are not present: env, cid
        </p>
      )}
      {env && cid && <ConversationDetails cid={cid} />}
    </div>
  );
}

export default App;
