const request = require('supertest');
const config = require('../../config/config');
const app = require('../../app');

jest.mock('../controllers/advertiser');
const controller = require('../controllers/advertiser');

const listAdvertisement = jest.fn();
controller.listAdvertisement = listAdvertisement;
const getAdvertisement = jest.fn();
controller.getAdvertisement = getAdvertisement;
const createAdvertisement = jest.fn();
controller.createAdvertisement = createAdvertisement;
const updateAdvertisement = jest.fn();
controller.updateAdvertisement = updateAdvertisement;
const updateAdClickCount = jest.fn();
controller.updateAdClickCount = updateAdClickCount;

jest.useFakeTimers();

describe('Test the root path', () => {
  it('It should response the application version', async () => {
    const resp = await request(app)
      .get('/')
      .auth(config.authUser, config.authPwd);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.message).toEqual('API version 1.0.0');
  });
});

// describe('Test the Advertiser GET path', () => {
//   beforeEach(() => {
//     listAdvertisement.mockClear();
//     listAdvertisement.mockResolvedValue({ statusCode: 500 });
//   });

//   it('It should return all the advertisements', async () => {
//    // const mockFn = jest.spyOn(controller, 'listAdvertisement');
//    // mockFn.mockImplementation(() => Promise.resolve({ statusCode: 400 }));
//     const resp = await request(app)
//       .get('/api/v1/advertiser')
//       .auth(config.authUser, config.authPwd);

//     expect(resp.statusCode).toBe(200);
//     expect(resp.body.ads.length).toBeGreaterThanOrEqual(1);
//   });
// });

// getting this issue while testing, have to dig deep more
// https://github.com/facebook/jest/issues/9131
