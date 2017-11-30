export function getUser(loggedIn, user) {
  return {
    type: 'GET',
    payload: { loggedIn, user },
  };
}

// export function addNumber(number) {
//     return {
//         type: "ADD",
//         payload: number
//     };
// }
