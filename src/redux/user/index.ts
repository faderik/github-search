/* eslint-disable @typescript-eslint/no-explicit-any */

const initialState: {
  keyword: string;
  page: number;
  totalPage: number;
  items: User[];
}[] = [
  {
    keyword: "",
    page: 1,
    totalPage: 0,
    items: [],
  },
];

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_USERS":
      return [
        ...state,
        {
          keyword: action.payload.keyword as string,
          page: action.payload.page as number,
          totalPage: action.payload.totalPage as number,
          items: action.payload.items as User[],
        },
      ];

    default:
      return state;
  }
};

export { userReducer };
