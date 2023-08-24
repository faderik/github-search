/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import githubLogo from "./assets/github-mark.svg";
import UserBox from "./components/UserBox";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux";
import { checkExist, fetchItems } from "./redux/reducer";
import RepoBox from "./components/RepoBox";

function App() {
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("users");
  const [matchedUsers, setMatchedUsers] = useState<any[]>([]);

  const users = useSelector((state: RootState) => state.user);
  const repos = useSelector((state: RootState) => state.repo);

  const dispatch = useDispatch();

  useEffect(() => {
    const reqToApi = async () => {
      console.log("I AM CALLING API...");
      const items = await fetchItems(keyword, type);

      if (type === "users") {
        dispatch({ type: "SET_USERS", payload: { keyword, items } });
      } else {
        dispatch({ type: "SET_REPOS", payload: { keyword, items } });
      }
    };

    const state = type === "users" ? users : repos;
    if (!checkExist(state, keyword)) {
      reqToApi();
    }
  }, [keyword, type, dispatch]);

  const getMatchedUsers = () => {
    const matched = users.filter((user) => user.keyword === keyword);
    if (!matched.length) return [];
    return matched[0].items;
  };

  const getMatchedRepos = () => {
    const matched = repos.filter((repo) => repo.keyword === keyword);
    if (!matched.length) return [];
    return matched[0].items;
  };

  const handleTypeChange = (e: any) => {
    setType(e.target.value);
  };

  const handleKeywordChange = (e: any) => {
    setKeyword(e.target.value);
  };

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
            value={keyword}
            onChange={(e) => handleKeywordChange(e)}
          />
          <select
            name="type"
            value={type}
            onChange={(e) => handleTypeChange(e)}
          >
            <option value="users">Users</option>
            <option value="repositories">Repositories</option>
          </select>
        </div>
        <div className="content">
          {type == "users"
            ? getMatchedUsers().map((user: User) => (
                <UserBox key={user.id} user={user} />
              ))
            : getMatchedRepos().map((repo: Repo) => (
                <RepoBox key={repo.id} repo={repo} />
              ))}
        </div>
      </div>
    </>
  );
}

export default App;
