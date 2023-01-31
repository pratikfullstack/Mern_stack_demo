const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.register = (req, res, next) => {
  try {
    if (req.body) {
      const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().max(50).email({ minDomainSegments: 2 }).required(),
        phoneNumber: Joi.number().required(),
      });
      let data = schema.validate(req.body);
      if (data.error) {
        return res.status(400).json({ success: false, message: data.error.details[0].message, data: {} });
      } else {
        next();
      }
    } else {
      return res.status(400).send({ success: false, message: "ERROR HAPPEND", data: {} });
    }
  } catch (error) {
    return res.status(400).send({ success: false, message: "ERROR HAPPEND", data: {} });
  }
};
