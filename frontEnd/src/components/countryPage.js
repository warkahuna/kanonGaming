import { ApiCalls } from "../api/apiCalls";
import "../App.css";
import "../styles/buttonsStyle.css";
import { useSelector, useDispatch } from "react-redux";
import { countrysActions } from "../actions";
import CountryDataPage from "./countryDataPage";
import CountryListPage from "./countrysListPage";
import AllCountrysPage from "./allCountrysPage";
import Loader from "react-loader-spinner";
function CountryPage() {
  //get the state from the countryReducer
  const countrysData = useSelector((state) => state.countrysReducer);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    //update the updatedInput of the countryData state when user is writing
    dispatch(
      countrysActions({ type: "updatedInput", payload: e.target.value })
    );
  };

  const getCountryData = () => {
    //check if updatedInput from countrysData state is empty or not to avoid unnecessary api calls
    if (countrysData.updatedInput.length > 0) {
      //call the api to get specific country data
      //first field for the country name the seond for macthing correct country name
      ApiCalls.getCountry(countrysData.updatedInput, true)
        .then((result) => {
          //update countryData of the countryData state with the result of the api call
          dispatch(
            countrysActions({ type: "countryData", payload: result.data })
          );
          //update getListCountrys of the countryData state with the result of the api call
          dispatch(
            countrysActions({ type: "getListCountrys", payload: result.data })
          );
        })
        .catch((error) => {
          console.log(error);
          //update isLoading of the countryData state to decide whether to show loader or not
          dispatch(countrysActions({ type: "isLoading" }));
          //update errorMessage of the countryData state with an error message for display purposes
          dispatch(
            countrysActions({
              type: "errorMessage",
              payload: "error occured",
            })
          );
        });
    } else {
      //update countryData of the countryData state with an empty table when the user dosn't provide a country name
      dispatch(countrysActions({ type: "countryData", payload: [] }));
      //update getListCountrys of the countryData state with an empty table when the user dosn't provide a country name
      dispatch(countrysActions({ type: "getListCountrys", payload: [] }));
    }
  };

  const getAllCountry = () => {
    //call the api to get all countrys
    ApiCalls.getAllCountry()
      .then((result) => {
        //update getAllCountrys of the countryData state with the result of the api call
        dispatch(
          countrysActions({ type: "getAllCountrys", payload: result.data })
        );
        //update filterData of the countryData state with the result of the api call
        dispatch(countrysActions({ type: "filterData", payload: result.data }));
        //update isLoading of the countryData state to decide whether to show loader or not
        dispatch(countrysActions({ type: "isLoading" }));
      })
      .catch((error) => {
        console.log(error);
        //update isLoading of the countryData state to decide whether to show loader or not
        dispatch(countrysActions({ type: "isLoading" }));
        //update errorMessage of the countryData state with an error message for display purposes
        dispatch(
          countrysActions({
            type: "errorMessage",
            payload: "error occured",
          })
        );
      });
  };

  const showAllCountrys = () => {
    //check whether allCountrys from the countryData state already have data to avoid unnecessary api call
    if (countrysData.allCountrys.length < 1) {
      //update isLoading of the countryData state to decide whether to show loader or not
      dispatch(countrysActions({ type: "isLoading" }));
      //call the function for getting all country
      getAllCountry();
      //update isCountryListShowing of the countryData state to decide whether to show countrys list or not
      dispatch(countrysActions({ type: "isCountryListShowing" }));
    } else {
      //update isCountryListShowing of the countryData state to decide whether to show countrys list or not
      dispatch(countrysActions({ type: "isCountryListShowing" }));
    }
  };

  return (
    <div className="App">
      <h3>Countrys searcher</h3>
      <input
        type="text"
        name="name"
        placeholder="exp : Tunisia"
        onChange={(e) => handleChange(e)}
      />
      <button
        className="normal-button"
        onClick={() => {
          getCountryData();
        }}
      >
        get country
      </button>
      <h3>searched country : {countrysData.updatedInput}</h3>

      {countrysData.countrysList.length > 1 ? (
        <CountryListPage />
      ) : countrysData.countrysList.length < 1 ? (
        ""
      ) : (
        <CountryDataPage />
      )}
      <button
        className="normal-button"
        onClick={() => {
          showAllCountrys();
        }}
      >
        show all countrys
      </button>
      {countrysData.isCountryListShowing ? (
        countrysData.isLoading ? (
          <Loader type="Puff" color="#d45d45" height={50} width={50} />
        ) : countrysData.allCountrys.length > 0 ? (
          <AllCountrysPage />
        ) : (
          <div>
            <p>{countrysData.errorMessage}</p>
            <button
              className="normal-button"
              onClick={() => {
                showAllCountrys();
              }}
            >
              try Again
            </button>
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default CountryPage;
