/* eslint-disable @typescript-eslint/no-explicit-any */

import { combineReducers } from "@reduxjs/toolkit";
import { repoReducer } from "./repo";
import { userReducer } from "./user";

const ghp = import.meta.env.VITE_GHP;

const githubReducer = combineReducers({
  user: userReducer,
  repo: repoReducer,
});

const fetchItems = async (keyword: string, type: string, page: number) => {
  const response = await fetch(
    `https://api.github.com/search/${type}?q=${keyword}&per_page=30&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${ghp}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  const data = await response.json();
  if (response.status != 200) {
    throw new Error(data.message);
  }

  const headers = response.headers;
  const link = headers.get("Link");

  const matchLastPage = link?.match(/page=(\d+)>; rel="last"/);
  const matchPrevPage = link?.match(/page=(\d+)>; rel="prev"/);

  let totalPage = 0;

  if (matchLastPage == null) {
    // currently is last page
    totalPage = matchPrevPage ? parseInt(matchPrevPage[1]) + 1 : 1;
  } else {
    // currently isnt lastpage
    totalPage = parseInt(matchLastPage[1]);
  }

  return [data.items, totalPage];
};

const checkExist = (state: any, keyword: string, page: number) => {
  const exist = state.find(
    (item: any) => item.keyword === keyword && item.page === page
  );
  return exist != null;
};

export { githubReducer, fetchItems, checkExist };
