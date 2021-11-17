import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [agent, setAgent] = React.useState(null);
  const [properties, setProperties] = React.useState([]);

  React.useEffect(() => {
    fetch("/agents/ACC001")
      .then((res) => res.json())
      .then((agent) => setAgent(agent));
  }, []);

  React.useEffect(() => {
    fetch("/agents/ACC001/properties")
      .then((res) => res.json())
      .then((properties) => {
        setProperties(properties);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!agent ? "Loading..." : "Account Code: " + agent.accountCode}</p>
        <p>{!agent ? "Loading..." : "Company Name: " + agent.companyName}</p>
        <p>
          {!agent
            ? "Loading..."
            : "Address:" +
              agent.branchAddress.houseNumber +
              " " +
              agent.branchAddress.address1 +
              "," +
              agent.branchAddress.locality +
              "," +
              agent.branchAddress.town +
              "," +
              agent.branchAddress.county +
              "," +
              agent.branchAddress.postcode}
        </p>
        <table>
          <thead>
            <tr>
              <th>Address</th>
              <th>Erected Board Type</th>
              <th>Fee Charged</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((prop) => (
              <tr>
                <td>
                  {prop.address.houseNumber +
                    " " +
                    prop.address.address1 +
                    ", "}
                  <br />
                  {prop.address.locality + ", "}
                  <br />
                  {prop.address.town + ", "}
                  <br />
                  {prop.address.county + ", "}
                  <br />
                  {prop.address.postcode}
                </td>
                <td>{prop.id}</td>
                <td>{prop.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
