const express = require('express');
const { validationResult } = require('express-validator');
const { createAdvertisementValidator, updateAdvertisementValidator } = require('../validators/advertiser');
const {
  listAdvertisement,
  getAdvertisement,
  createAvertisement,
  updateAdvertisement,
  updateAdClickCount,
} = require('../controllers/advertiser');

const router = express.Router();

// list advertisement route
router.get('/', async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const resp = await listAdvertisement();

  console.log('resp: ', resp);

  if (resp.statusCode === 200) {
    return res.status(resp.statusCode).json({
      ads: resp.ads,
    });
  }

  return res.status(resp.statusCode).json({
    message: resp.message,
  });
});

// get advertisement route
router.get('/:adId', async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const resp = await getAdvertisement(req.params.adId);

  if (resp.statusCode === 200) {
    return res.status(resp.statusCode).json({
      ad: resp.ad,
    });
  }

  return res.status(resp.statusCode).json({
    message: resp.message,
  });
});

// create advertisement route
router.post('/', createAdvertisementValidator, async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const resp = await createAvertisement(req.body);

  if (resp.statusCode === 201) {
    return res.status(resp.statusCode).json({
      message: resp.message,
      ad: resp.ad,
    });
  }

  return res.status(resp.statusCode).json({
    message: resp.message,
  });
});

// update advertisement route
router.patch('/', updateAdvertisementValidator, async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const resp = await updateAdvertisement(req.body);

  if (resp.statusCode === 200) {
    return res.status(resp.statusCode).json({
      message: resp.message,
      ad: resp.ad,
    });
  }

  return res.status(resp.statusCode).json({
    message: resp.message,
  });
});

router.patch('/conversions', async (req, res) => {
  const resp = await updateAdClickCount(req.body);

  if (resp.statusCode === 200) {
    return res.status(resp.statusCode).json({
      message: resp.message,
      ads: resp.ad,
    });
  }

  return res.status(resp.statusCode).json({
    message: resp.message,
  });
});

module.exports = router;
