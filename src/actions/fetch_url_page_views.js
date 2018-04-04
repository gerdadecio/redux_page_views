import axios from 'axios';

const ROOT_URL = 'http://localhost:3000';

export const FETCH_URL_PAGE_VIEWS = 'FETCH_URL_PAGE_VIEWS'

export function fetchUrlPageViews(urls = [], before = null, after = null, interval = null) {
  const request = axios.get(`${ROOT_URL}/page_views`, {
    params: {
      urls: urls,
      before: before,
      after: after,
      interval: interval
    }
  });

  return {
    type: FETCH_URL_PAGE_VIEWS,
    payload: request
  }
}

