import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import "./App.css";
import { useParams } from "react-router-dom";

function App() {
  const [agent, setAgent] = React.useState(null);
  const [properties, setProperties] = React.useState([]);
  const { agtcode } = useParams();
  const [agentcode, setAgentCode] = React.useState(agtcode);
  const [agenterr, setAgentErrors] = React.useState(null);
  const [properr, setPropErrors] = React.useState(null);

  React.useEffect(() => {
    fetch("/agents/" + agentcode)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setAgentErrors(data);
        } else {
          setAgent(data);
        }
      });
  }, []);

  React.useEffect(() => {
    fetch("/agents/" + agentcode + "/properties")
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setPropErrors(data);
        } else {
          setProperties(data);
        }
      });
  }, []);

  if (agenterr !== null) {
    return (
      <Container>
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link" href="/">
              Home
            </a>
          </li>
        </ul>
        <br />
        <div class="jumbotron">
          <h1 class="display-4">
            {!agenterr ? "Loading..." : "Error:" + agenterr.title}
          </h1>
          <p class="lead">
            {agenterr.title === "Not Found"
              ? "Please recheck the agent code."
              : " "}{" "}
            <br />
            {!agenterr ? (
              "Loading..."
            ) : (
              <p>
                {" "}
                More information can be found at{" "}
                <a href={agenterr.type}> Link</a>
              </p>
            )}
          </p>
        </div>
      </Container>
    );
  } else if (agenterr === null) {
    return (
      <Container>
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link" href="/">
              Home
            </a>
          </li>
        </ul>
        <br />
        <div class="jumbotron">
          <h1 class="display-4">
            {!agent
              ? "Loading..."
              : agent.companyName + " (" + agent.accountCode + ")"}
          </h1>
          <p class="lead">
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

        {properr === null ? (
          <Container>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Board Type Title</th>
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
                    <td>{prop.erectedBoardType.title}</td>
                    <td>
                      {prop.erectedBoardType.title === "Sold"
                        ? Math.round(
                            (prop.totalFeeCharged +
                              (prop.totalFeeCharged * 7.5) / 100 +
                              Number.EPSILON) *
                              100
                          ) / 100
                        : Math.round(
                            (prop.totalFeeCharged +
                              (prop.totalFeeCharged * 4) / 100 +
                              Number.EPSILON) *
                              100
                          ) / 100}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2">
                    <b>Grand Total</b>
                  </td>
                  <td>
                    {properties.reduce((total, current) => {
                      var val = parseFloat(current.totalFeeCharged);
                      if (current.erectedBoardType.title === "Sold") {
                        total = total + val + (val * 7.5) / 100;
                      } else {
                        total = total + val + (val * 4) / 100;
                      }
                      return Math.round((total + Number.EPSILON) * 100) / 100;
                    }, 0)}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Container>
        ) : (
          ""
        )}
      </Container>
    );
  }
}

export default App;
