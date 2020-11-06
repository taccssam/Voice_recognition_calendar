export const initialState = {
  todos: [
    {
      id: 1,
      textValue: "시작하기!",
      checked: false,
    },
  ],
};

const dummyPost = (data) => {
  return {
    id: 2,
    textValue: "더미데이터",
    checked: false,
  }
};

const ADD_POST = "ADD_POST";
const CHECKED_POST = "CHECKED_POST"; //보류

export const addPost = {
  type: ADD_POST,
};

export const checkedPost = (id) => {
  return {
    type: CHECKED_POST,
    id,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        todos: [dummyPost, ...state.todos],
      };
    default:
      return state;
  }
};

export default reducer;
