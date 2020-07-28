import axios from 'axios';
import config from '../../config/config';
import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
  INCREMENT_VOTE,
  HIDE_NEWS
} from './newsTypes';

// fetch new asyc action creator
export const fetchNews = (page = 0) => {
  return async (dispatch) => {
    try{
      dispatch(fetchNewsRequest(page));
      const resp = await axios.get(`${config.newsApiUrl}?page=${page}`);
      dispatch(fetchNewsSuccess(resp.data));
    } catch(err) {
      dispatch(fetchNewsFailure(err))
    }
  }
}

export const fetchNewsRequest = (page = 0) => {
  return {
    type: FETCH_NEWS_REQUEST,
    payload: page
  }
}

export const fetchNewsSuccess = news => {
  return {
    type: FETCH_NEWS_SUCCESS,
    payload: news
  }
}

export const fetchNewsFailure = error => {
  return {
    type: FETCH_NEWS_FAILURE,
    payload: error
  }
}

export const incrementVote = (newsID) => {
  return {
    type: INCREMENT_VOTE,
    payload: newsID
  }
}

export const hideNews = (newsID) => {
  return {
    type: HIDE_NEWS,
    payload: newsID
  }
}
