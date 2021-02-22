import queryString from "query-string";
import "./App.css";

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
      {env && cid && (
        <div className="App">
          <h1>Hello :-)</h1>
          <h5>{env}</h5>
          <h5>{cid}</h5>
        </div>
      )}
    </div>
  );
}

export default App;
