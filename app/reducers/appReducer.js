const appReducer = (
  state = {
    loggedIn: false,
    user: {},
  },
  action,
) => {
  switch (action.type) {
    case 'GET':
      break;
  }
  return state;
};

export default appReducer;
// const mathReducer = (state = {
//     result: 1,
//     lastValues: []
// }, action) => {
//     switch (action.type) {
//         case "ADD":
//             state = {
//                 ...state,
//                 result: state.result + action.payload,
//                 lastValues: [...state.lastValues, action.payload]
//             };
//             break;
//         case "SUBTRACT":
//             state = {
//                 ...state,
//                 result: state.result - action.payload,
//                 lastValues: [...state.lastValues, action.payload]
//             };
//             break;
//     }
//     return state;
// };
