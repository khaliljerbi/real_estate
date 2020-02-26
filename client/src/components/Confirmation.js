import React from "react";
import { Grid } from "semantic-ui-react";

import { stepsOptions } from "../shared/data";

const Confirmation = ({ formValues }) => {
  return (
    <Grid centered columns="equal">
      {stepsOptions.slice(0, 5).map(stepOption => (
        <Grid.Row key={stepOption.step}>
          <Grid.Column>
            <strong>{stepOption.title}</strong>: {formValues[stepOption.value]}
          </Grid.Column>
        </Grid.Row>
      ))}
    </Grid>
  );
};

export default Confirmation;
