/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import githubLogo from "./assets/github-mark.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux";
import { checkExist, fetchItems } from "./redux/reducer";
import ResultList from "./components/ResultList";

function App() {
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("users");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [matchedUser, setMatchedUser] = useState<User[]>([]);
  const [matchedRepo, setMatchedRepo] = useState<Repo[]>([]);

  const users = useSelector((state: RootState) => state.user);
  const repos = useSelector((state: RootState) => state.repo);

  const dispatch = useDispatch();

  useEffect(() => {
    const reqToApi = async () => {
      try {
        setLoading(true);

        console.log("I AM CALLING API...");
        const [items, lastPage] = await fetchItems(keyword, type, currentPage);

        if (type === "users") {
          dispatch({
            type: "SET_USERS",
            payload: { keyword, page: currentPage, items, totalPage: lastPage },
          });
        } else {
          dispatch({
            type: "SET_REPOS",
            payload: { keyword, page: currentPage, items, totalPage: lastPage },
          });
        }

        setLoading(false);
      } catch (error: any) {
        console.log("AKU ERROR NIH");
        setLoading(false);
        setError(error.message);
      }
    };

    if (keyword === "") {
      setError("");
      return;
    }

    const state = type === "users" ? users : repos;
    if (!checkExist(state, keyword, currentPage)) {
      reqToApi();
    } else {
      setLoading(false);

      const matched = setupMatchedData() as any;
      setTotalPage(matched.totalPage);
    }
  }, [keyword, type, dispatch, currentPage]);

  useEffect(() => {
    const matched = setupMatchedData() as any;
    setTotalPage(matched.totalPage);
  }, [users, repos]);

  const setupMatchedData = () => {
    let matched;
    if (type === "users") {
      matched = users.filter(
        (user) => user.keyword === keyword && user.page === currentPage
      );
      setMatchedUser(matched[0] ? matched[0].items : []);
    } else {
      matched = repos.filter(
        (repo) => repo.keyword === keyword && repo.page === currentPage
      );
      setMatchedRepo(matched[0] ? matched[0].items : []);
    }

    if (!matched.length) return [];
    return matched[0];
  };

  const handleTypeChange = (e: any) => {
    setType(e.target.value);
    setCurrentPage(1);
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
        <ResultList
          error={error}
          loading={loading}
          type={type}
          users={matchedUser}
          repos={matchedRepo}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalPage}
        />
      </div>
    </>
  );
}

export default App;
