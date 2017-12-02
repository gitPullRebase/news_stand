const favoriteReducer = (
  state = {
    favorited: false,
  },
  action,
) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      state = {
        ...state,
        favorited: action.payload,
      };
      break;
  }
  return state;
};

export default favoriteReducer;
