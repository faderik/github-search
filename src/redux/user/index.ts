/* eslint-disable @typescript-eslint/no-explicit-any */

const initialState: {
  keyword: string;
  items: User[];
}[] = [
  {
    keyword: "",
    items: [],
  },
];

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_USERS":
      return [
        ...state,
        {
          keyword: action.payload.keyword,
          items: action.payload.items as User[],
        },
      ];

    default:
      return state;
  }
};

export { userReducer };
