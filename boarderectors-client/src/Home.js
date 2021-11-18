import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

function Home() {
  return (
    <Container>
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link active" href="/">
            Home
          </a>
        </li>
      </ul>
      <br />
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Normal Response</h5>
          <p class="card-text">
            Click the button below to see how the response object from a normal
            request with a 200 response code is displayed.
          </p>
          <a href="/agent/ACC001" class="btn btn-primary">
            Go
          </a>
        </div>
      </div>
      <br />
      <br />
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Error Response</h5>
          <p class="card-text">
            Click the button below to see how the response object from an
            erroneous request with a 404 response code is displayed.
          </p>
          <a href="/agent/ACC002" class="btn btn-primary">
            Go
          </a>
        </div>
      </div>
    </Container>
  );
}

export default Home;
