import "../styles/tableStyle.css";
import { useSelector } from "react-redux";

function CountryListPage() {
  //get the state from the countryReducer
  const countrysData = useSelector((state) => state.countrysReducer);

  return (
    <table className="container">
      <thead>
        <tr>
          <th>These countrys matches your query</th>
        </tr>
      </thead>
      <tbody>
        {countrysData.countrysList.map((data, index) => (
          <tr key={index}>
            <td>{data.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CountryListPage;
