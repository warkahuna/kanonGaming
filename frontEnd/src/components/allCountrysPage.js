import "../styles/tableStyle.css";
import "../styles/buttonsStyle.css";
import { useSelector, useDispatch } from "react-redux";
import { countrysActions } from "../actions";

function AllCountrysPage() {
  //get the state from the countryReducer
  const countryData = useSelector((state) => state.countrysReducer);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    //update the filterInput of the countryData state when user is writing
    dispatch(countrysActions({ type: "filterInput", payload: e.target.value }));
  };

  //filter the countrys by name
  const filteringData = () => {
    //put the filtered data in a temporary variable
    var list = countryData.allCountrys
      .filter((country) => country.name.includes(countryData.filterInput))
      .map((filteredCountry) => {
        return filteredCountry;
      });
    //update the filterData of the countryData state with the filtered data
    dispatch(countrysActions({ type: "filterData", payload: list }));
  };

  return (
    <table className="container">
      <thead>
        <tr>
          <th>
            <h2>all Countrys</h2>
            <input
              type="text"
              name="name"
              placeholder="exp : tun"
              onChange={(e) => handleChange(e)}
            />
            <button
              className="normal-button"
              onClick={() => {
                filteringData();
              }}
            >
              Filter by name
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {countryData.filteredData.map((data, index) => (
          <tr key={index}>
            <td>{data.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AllCountrysPage;
