import React from "react";
import { Header, Icon, Segment } from "semantic-ui-react";

const Footer = () => {
  return (
    <Segment basic>
      <Header as="h6" textAlign="center">
        <Header.Content>
          Made with <Icon name="heart" color="red" />
          by Khalil.
        </Header.Content>
      </Header>
    </Segment>
  );
};

export default Footer;
