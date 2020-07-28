import axios from 'axios';
import config from '../../config/config';
import {
  FETCH_ADS_REQUEST,
  FETCH_ADS_SUCCESS,
  FETCH_ADS_FAILURE,
  RECORD_CONVERSIONS_SUCCESS,
  RECORD_CONVERSIONS_FAILURE,
} from './adsTypes';

// fetch new asyc action creator
export const fetchAds = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchAdsRequest());
      const options = {
        url: config.adsApiUrl,
        method: 'GET',
        auth: {
          username: config.authUser,
          password: config.authPwd,
        }
      }
      const resp = await axios(options);
      dispatch(fetchAdsSuccess(resp.data.ads));
    } catch (err) {
      dispatch(fetchAdsFailure(err))
    }
  }
}

// fetch new asyc action creator
export const recordConversions = (advertisementId) => {
  return async (dispatch) => {
    try {
      const options = {
        url: `${config.adsApiUrl}conversions`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          adId: advertisementId
        },
        auth: {
          username: config.authUser,
          password: config.authPwd,
        }
      }
      const resp = await axios(options);
      dispatch(updateRecordConversionSuccess(advertisementId));
    } catch (err) {
      dispatch(updateRecordConversionFailure(advertisementId))
    }
  }
}

export const fetchAdsRequest = () => {
  return {
    type: FETCH_ADS_REQUEST,
  }
}

export const fetchAdsSuccess = ads => {
  return {
    type: FETCH_ADS_SUCCESS,
    payload: ads
  }
}

export const fetchAdsFailure = error => {
  return {
    type: FETCH_ADS_FAILURE,
    payload: error
  }
}

export const updateRecordConversionSuccess = (adId) => {
  return {
    type: RECORD_CONVERSIONS_SUCCESS,
    payload: adId
  }
}

export const updateRecordConversionFailure = (adId) => {
  return {
    type: RECORD_CONVERSIONS_FAILURE,
    payload: adId
  }
}

