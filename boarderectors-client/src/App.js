import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/agents/ACC001")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : "Account Code: " + data.accountCode}</p>
        <p>{!data ? "Loading..." : "Company Name: " + data.companyName}</p>
        <p>
          {!data
            ? "Loading..."
            : "Address: House #" +
              data.branchAddress.houseNumber +
              "," +
              data.branchAddress.address1 +
              "," +
              data.branchAddress.locality +
              "," +
              data.branchAddress.town +
              "," +
              data.branchAddress.county}
        </p>
        <p>
          {!data ? "Loading..." : "PostCode: " + data.branchAddress.postcode}
        </p>
      </header>
    </div>
  );
}

export default App;
