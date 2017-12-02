const homeReducer = (
  state = {
    sortBy: 'publishedAt',
    articles: [],
    selectedSources: [
      {
        label: 'TechCrunch',
        id: 'techcrunch',
      },
    ],
    topics: ['net neutrality'],
  },
  action,
) => {
  switch (action.type) {
    case 'LOGGED_IN':
      state = {
        ...state,
        topics: action.payload.topics,
        selectedSources: action.payload.selectedSources,
      };
      break;
    case 'GET_ARTICLES':
      state = {
        ...state,
        articles: action.payload,
      };
      break;
    case 'TOGGLE_SORT':
      state = {
        ...state,
        sortBy: state.sortBy === 'popularity' ? 'publishedAt' : 'popularity',
      };
      break;
    case 'CHANGE_TOPICS':
      state = {
        ...state,
        topics: action.payload,
      };
      break;
  }
  return state;
};

export default homeReducer;
