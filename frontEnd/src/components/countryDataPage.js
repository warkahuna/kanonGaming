import "../styles/tableStyle.css";
import { useSelector } from "react-redux";

function CountryDataPage() {
  //get the state from the countryReducer
  const countryData = useSelector((state) => state.countrysReducer);

  //convert a table into a normal string for display purposes
  const simpleTableToString = (table) => {
    let string = "";
    table.forEach((element) => {
      if (string.length < 1) string += element;
      else string += " / " + element;
    });
    return string;
  };

  return (
    <table className="container">
      <thead>
        <tr>
          <th>Country Name</th>
          <th>Country Capital</th>
          <th>Country region</th>
          <th>Calling codes</th>
          <th>abreviations</th>
          <th>different spellings</th>
          <th>top domains</th>
        </tr>
      </thead>
      <tbody>
        {countryData.countryData.map((data, index) => (
          <tr key={index}>
            <td>{data.name}</td>
            <td>{data.capital}</td>
            <td>{data.region}</td>
            <td>{simpleTableToString(data.callingCodes)}</td>
            <td>
              {data.alpha2Code} / {data.alpha3Code}
            </td>
            <td>{simpleTableToString(data.altSpellings)}</td>
            <td>{simpleTableToString(data.topLevelDomain)}</td>
            <td />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CountryDataPage;
