import React from "react";
import { Icon, Step } from "semantic-ui-react";
import PropTypes from "prop-types";

const Stepper = ({ step, stepsOptions }) => {
  return (
    <Step.Group vertical fluid>
      {stepsOptions.map(stepOption => (
        <Step
          key={stepOption.step}
          active={stepOption.step === step}
          completed={stepOption.step < step}
        >
          <Icon />
          <Step.Content>
            <Step.Title>{stepOption.title}</Step.Title>
            {stepOption.description && (
              <Step.Description>{stepOption.description}</Step.Description>
            )}
          </Step.Content>
        </Step>
      ))}
    </Step.Group>
  );
};

Stepper.propTypes = {
  step: PropTypes.number,
  stepsOptions: PropTypes.array
};

export default Stepper;
