import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
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
    <Container>
      <div class="jumbotron">
      <h1>{!agent ? "Loading..." : agent.companyName + " (" + agent.accountCode + ")"}</h1>
        
        <p>
          {!agent
            ? "Loading..."
            : agent.branchAddress.houseNumber +
              " " +
              agent.branchAddress.address1 +
              ", "}{" "}
          <br />
          {!agent ? "Loading..." : agent.branchAddress.locality + ", "} <br />
          {!agent ? "Loading..." : agent.branchAddress.town + ", "} <br />
          {!agent ? "Loading..." : agent.branchAddress.county + ", "} <br />
          {!agent ? "Loading..." : agent.branchAddress.postcode} <br />
        </p>
      </div>
      <Table striped bordered hover>
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
              <td>{prop.erectedBoardType.title}</td>
              <td>{prop.erectedBoardType.expiryAge}</td>
              <td>
                {prop.erectedBoardType.title == "Sold"
                  ? prop.totalFeeCharged + (prop.totalFeeCharged * 7.5) / 100
                  : prop.totalFeeCharged + (prop.totalFeeCharged * 4) / 100}
              </td>
            </tr>
          ))}

          <tr>
            <td colspan="4"></td>
            <td>totalFees</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default App;
