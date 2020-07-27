const { check } = require('express-validator');

function isValidDate(value) {
  if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;

  const date = new Date(value);
  if (!date.getTime()) return false;
  return date.toISOString().slice(0, 10) === value;
}

const createAdvertisementValidator = [
  check('adName').isLength({ min: 8, max: 100 })
    .withMessage('adName length must be within 8 to 100 chars'),
  check('company').isLength({ min: 3, max: 100 })
    .withMessage('adName length must be within 3 to 100 chars'),
  check('adImage').isLength({ min: 10, max: 25000 })
    .withMessage('adName length must be within 10 to 25000 chars'),
  check('cpi').isFloat().notEmpty()
    .withMessage('cpi should be a required and a number field'),
  check('isActive').isBoolean()
    .withMessage('isActive must be a boolean field'),
  check('startDate').custom(isValidDate)
    .withMessage('the startDate must be a valid date and should be in format YYYY-MM-DD'),
  check('endDate').custom(isValidDate)
    .withMessage('the endDate must be a valid date and should be in format YYYY-MM-DD'),
  check('createdBy').notEmpty().isLength({ min: 3, max: 100 })
    .withMessage('createdBy length should be within 3 to 100 chars'),
];

const updateAdvertisementValidator = [
  check('adId').notEmpty()
    .withMessage('adId is a required field'),
  check('cpi').isFloat().notEmpty()
    .withMessage('cpi should be a required and a number field'),
  check('isActive').isBoolean()
    .withMessage('isActive must be a boolean field'),
  check('startDate').custom(isValidDate)
    .withMessage('the startDate must be a valid date and should be in format YYYY-MM-DD'),
  check('endDate').custom(isValidDate)
    .withMessage('the endDate must be a valid date and should be in format YYYY-MM-DD'),
];

module.exports = {
  createAdvertisementValidator,
  updateAdvertisementValidator,
};
