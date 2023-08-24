/* eslint-disable @typescript-eslint/no-explicit-any */

const initialState: {
  keyword: string;
  items: Repo[];
}[] = [
  {
    keyword: "",
    items: [],
  },
];

const repoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_REPOS":
      return [
        ...state,
        {
          keyword: action.payload.keyword,
          items: action.payload.items as Repo[],
        },
      ];

    default:
      return state;
  }
};

export { repoReducer };
