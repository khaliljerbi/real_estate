import React from "react";
import { Container, Header, Statistic } from "semantic-ui-react";

const Result = ({ estimation }) => {
  return (
    <Container>
      <Header as="h2">Estimation:</Header>
      <Statistic horizontal label="€" value={+estimation.toFixed(2)} />
    </Container>
  );
};

export default Result;
