const joi = require("@hapi/joi");

exports.validationEstimationInput = input => {
  const schema = joi.object().keys({
    price: joi.number().required(),
    surface: joi.number().required(),
    nbRooms: joi.number().required(),
    type: joi.string().required(),
    status: joi.string().required()
  });

  return schema.validate(input);
};
