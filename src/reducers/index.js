import { combineReducers } from 'redux';
import UrlsReducer from './reducer_urls';

const rootReducer = combineReducers({
  urlList: UrlsReducer
});

export default rootReducer;
