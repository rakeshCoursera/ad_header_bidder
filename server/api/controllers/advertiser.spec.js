const mongoose = require('mongoose');
const Advertiser = require('../models/advertiser');
const {
  listAdvertisement,
  getAdvertisement,
  createAdvertisement,
  updateAdvertisement,
  updateAdClickCount,
} = require('./advertiser');

describe('advertiser controller module', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }, (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('list advertisement module', () => {
    it('should return empty array if no record present in db', async () => {
      const resp = await listAdvertisement();
      expect(resp.statusCode).toBe(200);
      expect(resp.ads).toEqual([]);
    });

    it('should return advertisement list if db is not empty', async () => {
      const advertisement = {
        _id: new mongoose.Types.ObjectId(),
        adName: 'Happy Homes Ads',
        company: 'Sh. Homes',
        adImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxEJd8w3aWef71lZoE2-2QzgFtWG6phlY7tA&usqp=CAU',
        cpi: 35,
        isActive: 'true',
        startDate: '2020-08-15',
        endDate: '2021-05-15',
        createdBy: 'Rakesh',
      };

      await new Advertiser(advertisement).save();
      const resp = await listAdvertisement();
      expect(resp.statusCode).toBe(200);
      expect(resp.ads[0]._id).toBeDefined();
      expect(resp.ads[0].adName).toBe(advertisement.adName);
      expect(resp.ads[0].company).toBe(advertisement.company);
      expect(resp.ads[0].cpi).toBe(advertisement.cpi);
      expect(resp.ads.length).toEqual(1);
    });
  });

  describe('get advertisement module', () => {
    it('should return 404 not found if no record present in db', async () => {
      const resp = await getAdvertisement('5f1ec155b3b3c42e0347e70e');
      expect(resp.statusCode).toBe(404);
      expect(resp.message).toEqual('Provided advertisement id not found');
    });

    it('shuold return the advertisement if db is not empty', async () => {
      const advertisement = {
        _id: new mongoose.Types.ObjectId(),
        adName: 'test ad',
        company: 'tst company',
        adImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxEJd8w3aWef71lZoE2-2QzgFtWG6phlY7tA&usqp=CAU',
        cpi: 35,
        isActive: 'true',
        startDate: '2020-08-15',
        endDate: '2021-05-15',
        createdBy: 'Rakesh',
      };

      await new Advertiser(advertisement).save();
      const resp = await getAdvertisement(advertisement._id);
      expect(resp.statusCode).toBe(200);
      expect(resp.ad._id).toBeDefined();
      expect(resp.ad.adName).toBe(advertisement.adName);
      expect(resp.ad.company).toBe(advertisement.company);
      expect(resp.ad.cpi).toBe(advertisement.cpi);
    });
  });

  describe('create advertisement module', () => {
    const body = {
      adName: 'Happy Homes Ads',
      company: 'Sh. Homes',
      adImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxEJd8w3aWef71lZoE2-2QzgFtWG6phlY7tA&usqp=CAU',
      cpi: 35,
      isActive: true,
      startDate: '2020-08-15',
      endDate: '2021-05-15',
      createdBy: 'Rakesh',
    };

    it('should return 409 if similar advertisement is already present in db', async () => {
      const resp = await createAdvertisement(body);
      expect(resp.statusCode).toBe(409);
      expect(resp.message).toEqual('Advertisement with same name already exists');
    });

    it('should create the advertisement if advertisement is unique', async () => {
      body.adName = 'testing advertisement';
      const resp = await createAdvertisement(body);
      expect(resp.statusCode).toBe(201);
      expect(resp.ad._id).toBeDefined();
      expect(resp.ad.adName).toBe(body.adName);
      expect(resp.ad.company).toBe(body.company);
      expect(resp.ad.cpi).toBe(body.cpi);
    });
  });

  describe('update advertisement module', () => {
    const body = {
      adId: '5f1dd484ea05a734676ded9b',
      isActive: true,
      cpi: 25,
      startDate: '2020-08-15',
      endDate: '2020-12-15',
    };

    it('should return 404 not found if no record present in db', async () => {
      const resp = await updateAdvertisement(body.adId);
      expect(resp.statusCode).toBe(404);
      expect(resp.message).toEqual('Provided advertisement id not found');
    });

    it('shuold upadte the advertisement if present in the db', async () => {
      const advertisement = {
        _id: new mongoose.Types.ObjectId(),
        adName: 'unique testing',
        company: 'unique company',
        adImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxEJd8w3aWef71lZoE2-2QzgFtWG6phlY7tA&usqp=CAU',
        cpi: 15,
        isActive: false,
        startDate: '2020-10-15',
        endDate: '2021-12-15',
        createdBy: 'testuser',
      };

      await new Advertiser(advertisement).save();

      body.adId = advertisement._id;
      const resp = await updateAdvertisement(body);
      expect(resp.statusCode).toBe(200);
      expect(resp.ad._id).toBeDefined();
      expect(resp.ad.isActive).toBe(body.isActive);
      expect(resp.ad.company).toBe(advertisement.company);
      expect(resp.ad.cpi).toBe(body.cpi);
    });
  });

  describe('updateAdClickCount module', () => {
    const body = {
      adId: '5f1dd484ea05a734676ded9b',
    };

    it('should return 404 not found if no record present in db', async () => {
      const resp = await updateAdvertisement(body.adId);
      expect(resp.statusCode).toBe(404);
      expect(resp.message).toEqual('Provided advertisement id not found');
    });

    it('shuold upadte the advertisement clickCount if present in the db', async () => {
      const advertisement = {
        _id: new mongoose.Types.ObjectId(),
        adName: 'unique testing1',
        company: 'unique company1',
        adImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxEJd8w3aWef71lZoE2-2QzgFtWG6phlY7tA&usqp=CAU',
        cpi: 15,
        isActive: false,
        startDate: '2020-10-15',
        endDate: '2021-12-15',
        createdBy: 'testuser',
        clickCount: 5,
      };

      await new Advertiser(advertisement).save();
      body.adId = advertisement._id;
      const resp = await updateAdClickCount(body);
      expect(resp.statusCode).toBe(200);
      expect(resp.ad._id).toBeDefined();
      expect(resp.ad.clickCount).toEqual(6);
    });
  });
});
