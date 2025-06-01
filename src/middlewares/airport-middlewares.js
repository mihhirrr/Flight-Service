const zod = require('zod');
const { StatusCodes } = require('http-status-codes');
const { Error } = require('../utils/common-utils')

function createValidation(req, res, next) {
  const AirportinputSchema = zod.object({
    Name: zod
      .string()
      .min(1, "Airport Name cannot be empty"),
    code: zod
      .string()
      .length(3, "There should be 3 charactor Airport code"),
    Address: zod.string().optional(),
    cityID: zod.number(),
  });

  const validationResult = AirportinputSchema.safeParse(req.body);

  if (!validationResult.success) {
      Error.error.message = validationResult.error.errors.map((err) => ({
      field: err.path[0],
      message: err.message,
    }));

    return res.status(StatusCodes.BAD_REQUEST).json(Error);
  }
  next();
}

module.exports = {
  createValidation,
};