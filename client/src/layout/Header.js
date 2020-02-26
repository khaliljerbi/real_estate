import React from "react";
import { Header, Icon, Segment } from "semantic-ui-react";

const HeaderUI = () => {
  return (
    <Segment basic>
      <Header as="h2" icon textAlign="center">
        <Icon name="home" circular />
        <Header.Content>Estimateur Immobilier</Header.Content>
      </Header>
    </Segment>
  );
};

export default HeaderUI;
