// const initialState = {
//   notes: [],
// };

// const notes_reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "ADD_NOTE":
//       return {
//         ...state,
//         notes: [...state.notes, action.payload],
//       };
//     case "DELETE_NOTE":
//       return {
//         ...state,
//         notes: state.notes.filter((note) => note.id !== action.payload),
//       };
//     case "REPLACE_ALL_NOTES":
//       return {
//         ...state,
//         notes: [...action.payload]
//       };
//     default:
//       return state;
//   }
// };

// export default notes_reducer;
