const initialState = {
  allCountrys: [],
  countryData: [],
  countrysList: [],
  filteredData: [],
  filterInput: "",
  updatedInput: "",
  isCountryListShowing: false,
  isLoading: false,
  errorMessage: "",
};

const countrysReducer = (state = initialState, action) => {
  switch (action.type) {
    case "getAllCountrys":
      return (state = {
        ...state,
        allCountrys: action.payload,
      });
    case "countryData":
      return (state = {
        ...state,
        countryData: action.payload,
      });
    case "getListCountrys":
      return (state = {
        ...state,
        countrysList: action.payload,
      });
    case "filterData":
      return (state = {
        ...state,
        filteredData: action.payload,
      });
    case "filterInput":
      return (state = {
        ...state,
        filterInput: action.payload,
      });
    case "updatedInput":
      return (state = {
        ...state,
        updatedInput: action.payload,
      });
    case "isCountryListShowing":
      return (state = {
        ...state,
        isCountryListShowing: !state.isCountryListShowing,
      });
    case "isLoading":
      return (state = {
        ...state,
        isLoading: !state.isLoading,
      });
    case "errorMessage":
      return (state = {
        ...state,
        errorMessage: action.payload,
      });
    default:
      return state;
  }
};

export default countrysReducer;
