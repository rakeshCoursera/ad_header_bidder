import axios from 'axios';
import config from '../../config/config';
import {
  FETCH_ADS_REQUEST,
  FETCH_ADS_SUCCESS,
  FETCH_ADS_FAILURE,
} from './adsTypes';

// fetch new asyc action creator
export const fetchAds = () => {
  return async (dispatch) => {
    try{
      dispatch(fetchAdsRequest());
      const resp = await axios.get(`${config.apiUrl}`);
      dispatch(fetchAdsSuccess(resp.data));
    } catch(err) {
      dispatch(fetchAdsFailure(err))
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

