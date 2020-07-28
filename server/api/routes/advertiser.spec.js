const mongoose = require('mongoose');
const request = require('supertest');
const config = require('../../config/config');
const app = require('../../app');
const {
  listAdvertisement,
  getAdvertisement,
  createAdvertisement,
  updateAdvertisement,
  updateAdClickCount,
} = require('../controllers/advertiser');

jest.mock('../controllers/advertiser', () => ({
  listAdvertisement: jest.fn(),
  getAdvertisement: jest.fn(),
  createAdvertisement: jest.fn(),
  updateAdvertisement: jest.fn(),
  updateAdClickCount: jest.fn(),
}));

// to avoid mongodb reference error
mongoose.connection.close();

describe('advertiser routes module', () => {
  describe('Test the root path', () => {
    it('It should response the application version', async () => {
      const resp = await request(app)
        .get('/')
        .auth(config.authUser, config.authPwd);

      expect(resp.statusCode).toBe(200);
      expect(resp.body.message).toEqual('API version 1.0.0');
    });
  });

  describe('Test the get advertisements GET / path', () => {
    it('It should return all the advertisements with success', async () => {
      listAdvertisement.mockReset();
      listAdvertisement.mockReturnValue({ statusCode: 200, ads: [{ adName: 'my ad 1' }] });
      const resp = await request(app)
        .get('/api/v1/advertiser')
        .auth(config.authUser, config.authPwd);

      expect(resp.statusCode).toBe(200);
      expect(resp.body.ads.length).toBeGreaterThanOrEqual(1);
      expect(resp.body.ads[0].adName).toEqual('my ad 1');
    });

    it('It should return an error message', async () => {
      listAdvertisement.mockReset();
      listAdvertisement.mockResolvedValue({ statusCode: 500, message: 'Internal Server Error' });
      const resp = await request(app)
        .get('/api/v1/advertiser')
        .auth(config.authUser, config.authPwd);

      expect(resp.statusCode).toBe(500);
      expect(resp.body.message).toEqual('Internal Server Error');
    });
  });

  describe('Test the get a advertisement by id GET / path', () => {
    it('It should return a advertisement by id with success', async () => {
      getAdvertisement.mockReset();
      getAdvertisement.mockReturnValue({ statusCode: 200, ad: { adName: 'my ad 1' } });
      const resp = await request(app)
        .get('/api/v1/advertiser/123')
        .auth(config.authUser, config.authPwd);

      expect(resp.statusCode).toBe(200);
      expect(resp.body.ad.adName).toEqual('my ad 1');
    });

    it('if passed advertisement id is not exist then return not found message', async () => {
      getAdvertisement.mockReset();
      getAdvertisement.mockResolvedValue({ statusCode: 404, message: 'Provided advertisement id not found' });
      const resp = await request(app)
        .get('/api/v1/advertiser/123')
        .auth(config.authUser, config.authPwd);

      expect(resp.statusCode).toBe(404);
      expect(resp.body.message).toEqual('Provided advertisement id not found');
    });

    it('should return an error if something goes wrong', async () => {
      getAdvertisement.mockReset();
      getAdvertisement.mockResolvedValue({ statusCode: 500, message: 'Internal Server Error' });
      const resp = await request(app)
        .get('/api/v1/advertiser/123')
        .auth(config.authUser, config.authPwd);

      expect(resp.statusCode).toBe(500);
      expect(resp.body.message).toEqual('Internal Server Error');
    });
  });

  describe('Test the Create a advertisement POST / path', () => {
    it('It should 422 if request json is not proper', async () => {
      createAdvertisement.mockReset();
      createAdvertisement.mockReturnValue({ statusCode: 200, ad: { adName: 'my ad 1' } });
      const resp = await request(app)
        .post('/api/v1/advertiser')
        .send({
          adName: 'Testing ad',
          company: 'Testify',
          adImage: '',
          cpi: '35',
          isActive: true,
          startDate: '2020-25-15',
          endDate: '20210515',
          createdBy: 'Rakesh',
        })
        .set('Accept', 'application/json')
        .auth(config.authUser, config.authPwd);

      expect(resp.statusCode).toBe(422);
      expect(resp.body).toHaveProperty('errors');
    });

    it('It should create and return the advertisement with success', async () => {
      createAdvertisement.mockReset();
      createAdvertisement.mockReturnValue({ statusCode: 201, ad: { adName: 'my ad 1' } });
      const resp = await request(app)
        .post('/api/v1/advertiser')
        .send({
          adName: 'Testing ad',
          company: 'Testify',
          adImage: 'https://mytestimage.static.com/catimage',
          cpi: 35,
          isActive: true,
          startDate: '2020-12-15',
          endDate: '2021-03-15',
          createdBy: 'Rakesh',
        })
        .set('Accept', 'application/json')
        .auth(config.authUser, config.authPwd);

      expect(resp.statusCode).toBe(201);
      expect(resp.body.ad.adName).toEqual('my ad 1');
    });

    it('if should return 409 conflict if same name advertisement is already exists', async () => {
      createAdvertisement.mockReset();
      createAdvertisement.mockReturnValue({ statusCode: 409, message: 'Advertisement with same name already exists' });
      const resp = await request(app)
        .post('/api/v1/advertiser')
        .send({
          adName: 'Testing ad',
          company: 'Testify',
          adImage: 'https://mytestimage.static.com/catimage',
          cpi: 35,
          isActive: true,
          startDate: '2020-12-15',
          endDate: '2021-03-15',
          createdBy: 'Rakesh',
        })
        .set('Accept', 'application/json')
        .auth(config.authUser, config.authPwd);

      expect(resp.statusCode).toBe(409);
      expect(resp.body.message).toEqual('Advertisement with same name already exists');
    });

    it('should return an error if something goes wrong', async () => {
      createAdvertisement.mockReset();
      createAdvertisement.mockReturnValue({ statusCode: 500, message: 'Internal Server Error' });
      const resp = await request(app)
        .post('/api/v1/advertiser')
        .send({
          adName: 'Testing ad',
          company: 'Testify',
          adImage: 'https://mytestimage.static.com/catimage',
          cpi: 35,
          isActive: true,
          startDate: '2020-12-15',
          endDate: '2021-03-15',
          createdBy: 'Rakesh',
        })
        .set('Accept', 'application/json')
        .auth(config.authUser, config.authPwd);

      expect(resp.statusCode).toBe(500);
      expect(resp.body.message).toEqual('Internal Server Error');
    });
  });

  describe('Test update of an advertisement PATCH / path', () => {
    it('It should 422 if request json is not proper', async () => {
      updateAdvertisement.mockReset();
      updateAdvertisement.mockReturnValue({ statusCode: 200, ad: { adName: 'my ad 1' } });
      const resp = await request(app)
        .patch('/api/v1/advertiser')
        .send({
          adId: '123',
          cpi: '35',
          isActive: true,
          startDate: '2020-25-15',
          endDate: '20210515',
        })
        .set('Accept', 'application/json')
        .auth(config.authUser, config.authPwd);

      expect(resp.statusCode).toBe(422);
      expect(resp.body).toHaveProperty('errors');
    });

    it('It should create and return the advertisement with success', async () => {
      updateAdvertisement.mockReset();
      updateAdvertisement.mockReturnValue({ statusCode: 200, ad: { adName: 'my ad 1' } });
      const resp = await request(app)
        .patch('/api/v1/advertiser')
        .send({
          adId: '123',
          cpi: 35,
          isActive: true,
          startDate: '2020-12-15',
          endDate: '2021-03-15',
        })
        .set('Accept', 'application/json')
        .auth(config.authUser, config.authPwd);

      expect(resp.statusCode).toBe(200);
      expect(resp.body.ad.adName).toEqual('my ad 1');
    });

    it('if should return 404 if provided advertisement not exists', async () => {
      updateAdvertisement.mockReset();
      updateAdvertisement.mockReturnValue({ statusCode: 404, message: 'Provided advertisement id not found' });
      const resp = await request(app)
        .patch('/api/v1/advertiser')
        .send({
          adId: '123',
          cpi: 35,
          isActive: true,
          startDate: '2020-12-15',
          endDate: '2021-03-15',
        })
        .set('Accept', 'application/json')
        .auth(config.authUser, config.authPwd);

      expect(resp.statusCode).toBe(404);
      expect(resp.body.message).toEqual('Provided advertisement id not found');
    });

    it('should return an error if something goes wrong', async () => {
      updateAdvertisement.mockReset();
      updateAdvertisement.mockReturnValue({ statusCode: 500, message: 'Internal Server Error' });
      const resp = await request(app)
        .patch('/api/v1/advertiser')
        .send({
          adId: '123',
          cpi: 35,
          isActive: true,
          startDate: '2020-12-15',
          endDate: '2021-03-15',
        })
        .set('Accept', 'application/json')
        .auth(config.authUser, config.authPwd);

      expect(resp.statusCode).toBe(500);
      expect(resp.body.message).toEqual('Internal Server Error');
    });
  });

  describe('Test update of an advertisement PATCH / path', () => {
    it('It should update the click count of advertisement with success', async () => {
      updateAdClickCount.mockReset();
      updateAdClickCount.mockReturnValue({ statusCode: 200, ad: { adName: 'my ad 1', clickCount: 2 } });
      const resp = await request(app)
        .patch('/api/v1/advertiser/conversions')
        .send({
          adId: '123',
        })
        .set('Accept', 'application/json')
        .auth(config.authUser, config.authPwd);

      expect(resp.statusCode).toBe(200);
      expect(resp.body.ad.clickCount).toEqual(2);
    });

    it('if should return 404 if provided advertisement not exists', async () => {
      updateAdClickCount.mockReset();
      updateAdClickCount.mockReturnValue({ statusCode: 404, message: 'Provided advertisement id not found' });
      const resp = await request(app)
        .patch('/api/v1/advertiser/conversions')
        .send({
          adId: '123',
        })
        .set('Accept', 'application/json')
        .auth(config.authUser, config.authPwd);

      expect(resp.statusCode).toBe(404);
      expect(resp.body.message).toEqual('Provided advertisement id not found');
    });

    it('should return an error if something goes wrong', async () => {
      updateAdClickCount.mockReset();
      updateAdClickCount.mockReturnValue({ statusCode: 500, message: 'Internal Server Error' });
      const resp = await request(app)
        .patch('/api/v1/advertiser/conversions')
        .send({
          adId: '123',
        })
        .set('Accept', 'application/json')
        .auth(config.authUser, config.authPwd);

      expect(resp.statusCode).toBe(500);
      expect(resp.body.message).toEqual('Internal Server Error');
    });
  });
});
