const initialState = {
  isSchema: true,
  isMethode1: false,
  isMethode2: false,
  query: false,
};

const dataBaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "isSchema":
      return (state = {
        ...state,
        isSchema: action.payload,
      });
    case "isMethode1":
      return (state = {
        ...state,
        isMethode1: action.payload,
      });
    case "isMethode2":
      return (state = {
        ...state,
        isMethode2: action.payload,
      });
    case "query":
      return (state = {
        ...state,
        query: action.payload,
      });

    default:
      return state;
  }
};

export default dataBaseReducer;
