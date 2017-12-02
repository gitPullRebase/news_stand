import axios from 'axios';

export function getUser(loggedIn, user) {
  return {
    type: 'GET',
    payload: { loggedIn, user },
  };
}

export function updateFavorites() {
  return (dispatch) => {
    axios
      .get('/auth')
      .then((authStatus) => {
        dispatch({
          type: 'NEW_FAVORITES',
          payload: authStatus.data.user,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}

// export function addFavorite(article) {
//   return (dispatch) => {
//     axios
//       .post('/favorites', article)
//       .then((response) => {
//         if (response.data === 'favorite added') {
//           dispatch({
//             type: 'ADD_FAVORITE',
//             payload: true,
//           });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// }
