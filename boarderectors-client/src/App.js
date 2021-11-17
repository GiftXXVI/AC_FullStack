import React from "react";
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
          {
            (!agent) ? "Loading..." :
              "Address:" + agent.branchAddress.houseNumber + "\n" +
              " " + agent.branchAddress.address1 + "\n" +
              "," + agent.branchAddress.locality + "\n" +
              "," + agent.branchAddress.town + "\n" +
              "," + agent.branchAddress.county + "\n" +
              "," + agent.branchAddress.postcode + "\n"
          }
        </p>
      </header>
      <table>
          <thead>
            <tr>
              <th>Address</th>
              <th>Erected At</th>
              <th>Board Type Title</th>
              <th>Expiry Age</th>
              <th>Fee Charged</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((prop) => (
              <tr>
                <td>
                  {prop.address.houseNumber + " " + prop.address.address1 + ", "}
                  <br />
                  {prop.address.locality + ", "}
                  <br />
                  {prop.address.town + ", "}
                  <br />
                  {prop.address.county + ", "}
                  <br />
                  {prop.address.postcode}
                </td>
                <td>{prop.erectedAt}</td>
                <td>{prop.erectBoardType.title}</td>
                <td>{prop.expiryAge}</td>
                <td>{prop.erectBoardType.title == "Sold" ? prop.totalFeeCharged + (prop.totalFeeCharged * 7.5 / 100) : prop.totalFeeCharged + (prop.totalFeeCharged * 4 / 100)}</td>
              </tr>
            ))}
            {
              totalFees = properties.reduce(function (total, prop) {
                if (prop.erectBoardType.title == "Sold") {
                  return total + prop.totalFeeCharged + (prop.totalFeeCharged * 7.5 / 100)
                } else {
                  return total + prop.totalFeeCharged + (prop.totalFeeCharged * 4 / 100)
                }
              }
              )}
            <tr>
              <td colspan="3"></td><td>{totalFees}</td>
            </tr>
          </tbody>
        </table>
    </div>
  );
}

export default App;
