import moment from 'moment';
import { FETCH_URL_PAGE_VIEWS } from '../actions/fetch_url_page_views';

function mapData(data) {
  var events = []
  var mappedData = []

  Object.keys(data).forEach((url) => {
    console.log('Data index: ' + url);
    if(!data[url].aggregations) return;

    events = data[url].aggregations.events_over_time.buckets;
    events.map((d) => {
      var newData = {};

      var md = mappedData.filter((md) => { return md.key_as_string == d.key_as_string })[0];
      console.log('Moment: '+moment(new Date(d.key_as_string)).format('HH:mm'));
      if (md == undefined) {
        newData['key_as_string'] = d.key_as_string;
        newData['time'] = moment(new Date(d.key_as_string)).format('HH:mm');
        newData[url] = d.doc_count;
      } else {
        newData = md
        newData[url] = d.doc_count
      }

      mappedData.push(newData);
    })
  })

  return {
    urls: Object.keys(data),
    pageViews: Array.from(new Set(mappedData))
  }
}

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_URL_PAGE_VIEWS:
    return mapData(action.payload.data);
  }

  return state;
}


