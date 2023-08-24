/* eslint-disable @typescript-eslint/no-explicit-any */

const initialState = {
  users: [],
  repos: [],
};

const githubReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_REPOS":
      return {
        ...state,
        repos: action.payload,
      };
    default:
      return state;
  }
};

export { githubReducer };
