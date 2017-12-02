import axios from 'axios';

export function addFavorite(article) {
  return (dispatch) => {
    axios
      .post('/favorites', article)
      .then((response) => {
        if (response.data === 'favorite added') {
          dispatch({
            type: 'ADD_FAVORITE',
            payload: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

// onAddFavorite(article) {
//   axios.post('/favorites', article)
//     .then((response) => {
//       if (response.data === 'favorite added') {
//         this.setState({
//           favorited: true,
//         });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
