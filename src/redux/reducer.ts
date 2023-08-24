/* eslint-disable @typescript-eslint/no-explicit-any */

import { combineReducers } from "@reduxjs/toolkit";
import { repoReducer } from "./repo";
import { userReducer } from "./user";

const ghp = import.meta.env.VITE_GHP;

const githubReducer = combineReducers({
  user: userReducer,
  repo: repoReducer,
});

const fetchItems = async (keyword: string, type: string) => {
  const response = await fetch(
    `https://api.github.com/search/${type}?q=${keyword}`,
    {
      headers: {
        Authorization: `Bearer ${ghp}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  const data = await response.json();
  return data.items;
};

const checkExist = (state: any, keyword: string) => {
  const exist = state.find((item: any) => item.keyword === keyword);
  return exist;
};

export { githubReducer, fetchItems, checkExist };
