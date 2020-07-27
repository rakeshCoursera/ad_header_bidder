const mongoose = require('mongoose');

const Advertiser = require('../models/advertiser');

// function to list advertisements
const listAdvertisement = async () => {
  try {
    const advertisements = await Advertiser.find({
      isActive: true,
      endDate: {
        $gte: new Date().toISOString(),
      },
    }).exec();

    return {
      statusCode: 200,
      ads: advertisements,
    };
  } catch (err) {
    return {
      statusCode: 500,
      message: `Something went wrong while listing all the advertisements, error: ${err.message.toString()}`,
    };
  }
};

// get advertisement details controller
const getAdvertisement = async (id) => {
  try {
    const advertisement = await Advertiser.findById(id).exec();

    if (advertisement) {
      return {
        statusCode: 200,
        ad: advertisement,
      };
    }
    return {
      statusCode: 404,
      message: 'Provided advertisement id not found',
    };
  } catch (err) {
    return {
      statusCode: 500,
      message: `Something went wrong while fetching the advertisement, error: ${err.message.toString()}`,
    };
  }
};


// function to create advertisements
const createAdvertisement = async (body) => {
  try {
    const ad = await Advertiser.findOne({
      adName: body.adName,
      isActive: true,
      endDate: {
        $gte: new Date().toISOString(),
      },
    }).exec();

    if (ad) {
      return {
        statusCode: 409,
        message: 'Advertisement with same name already exists',
      };
    }

    const newAd = new Advertiser({
      _id: new mongoose.Types.ObjectId(),
      adName: body.adName,
      company: body.company,
      adImage: body.adImage,
      cpi: body.cpi,
      isActive: body.isActive,
      startDate: body.startDate,
      endDate: body.endDate,
      createdBy: body.createdBy,
    });

    const resp = await newAd.save();

    return {
      statusCode: 201,
      ad: resp,
    };
  } catch (err) {
    return {
      statusCode: 500,
      message: `Something went wrong while creating a advertisement, error: ${err.message.toString()}`,
    };
  }
};

const updateAdvertisement = async (body) => {
  try {
    const { adId, ...updateQuery } = body;

    const advertisement = await Advertiser.findByIdAndUpdate(adId,
      updateQuery, { new: true }).exec();

    if (advertisement) {
      return {
        statusCode: 200,
        ad: advertisement,
      };
    }
    return {
      statusCode: 404,
      message: 'Provided advertisement id not found',
    };
  } catch (err) {
    return {
      statusCode: 500,
      message: `Something went wrong while updating a advertisement, error: ${err.message.toString()}`,
    };
  }
};

// function to update advertisements
const updateAdClickCount = async (body) => {
  try {
    const query = { _id: body.adId };
    const ad = await Advertiser.findOneAndUpdate(query,
      { $inc: { clickCount: 1 } }, { new: true }).exec();

    if (ad) {
      return {
        statusCode: 200,
        ad,
      };
    }
    return {
      statusCode: 404,
      message: 'Provided advertisement id not found',
    };
  } catch (err) {
    return {
      statusCode: 500,
      message: `Something went wrong while updating advertisement click count, error: ${err.message.toString()}`,
    };
  }
};

module.exports = {
  listAdvertisement,
  getAdvertisement,
  createAdvertisement,
  updateAdvertisement,
  updateAdClickCount,
};
