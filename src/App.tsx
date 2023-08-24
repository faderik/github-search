import { useState } from "react";
import githubLogo from "./assets/github-mark.svg";

function App() {
  const [type, setType] = useState("user");

  return (
    <>
      <div className="page">
        <div className="header">
          <img src={githubLogo} className="gh-logo" alt="logo" />
          <div className="header-desc">
            <h1 className="title">Github Searcher</h1>
            <p>Search users or repositories below</p>
          </div>
        </div>
        <div className="search">
          <input
            className="searchbox"
            type="text"
            placeholder="Typing to search users or repositories.."
          />
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="user">Users</option>
            <option value="repo">Repositories</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default App;
