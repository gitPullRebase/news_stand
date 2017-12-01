export function isLoggedIn(topics, selectedSources) {
  return {
    type: 'LOGGED_IN',
    payload: { topics, selectedSources },
  };
}

export function changeArticles(articles) {
  return {
    type: 'GET_ARTICLES',
    payload: articles,
  };
}

export function toggleClick() {
  return {
    type: 'TOGGLE_SORT',
  };
}

export function changeSource(selectedSources) {
  console.log('in changeSource', selectedSources);
  return {
    type: 'ADD_SOURCE',
    payload: selectedSources,
  };
}

export function changeTopics(topics) {
  return {
    type: 'CHANGE_TOPICS',
    payload: topics,
  };
}
