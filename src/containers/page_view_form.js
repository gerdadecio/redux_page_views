import React, { Component } from 'react';
import Datetime from 'react-datetime';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUrlPageViews } from '../actions/fetch_url_page_views';

class PageViewForm extends Component {
  constructor(props) {
    super(props);

    this.handleAddUrl = this.handleAddUrl.bind(this);
    this.handleRemoveUrl = this.handleRemoveUrl.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputUrlChange = this.onInputUrlChange.bind(this);

    this.state = {
      urls: [],
      before: null,
      after: null,
      intervalCount: null,
      intervalType: 'second'
    };
  }

  handleAddUrl() {
    var urls = this.state.urls;
    urls.push('');
    this.setState({ urls });
  }

  onFormSubmit(event) {
    event.preventDefault();
    // Fetch page views data from server
    const interval = `${this.state.intervalCount}${this.state.intervalType}`;
    this.props.fetchUrlPageViews(
      this.state.urls,
      this.state.before,
      this.state.after,
      interval
    )
  }

  onInputUrlChange = (idx) => (event) => {
    const newUrls = this.state.urls.map((url, uidx) => {
      if (idx !== uidx) return url;
      return event.target.value
    });

    this.setState({ urls: newUrls });
  }

  handleRemoveUrl = (idx) => () => {
    this.setState({ urls: this.state.urls.filter((url, uidx) => idx !== uidx) });
  }

  render() {
    const intervalObj = {s: 'second', m: 'minute', h: 'hour', d: 'day', w: 'week', M: 'month', y: 'year'};
    const intervals = Object.keys(intervalObj).map((interval,index) => {
      return (
        <option key={'option_'+index} value={interval}>{intervalObj[interval]}</option>
      );
    })

    return (
      <form id="page-view-form" onSubmit={this.onFormSubmit}>
        <div className="col-md-2">
        </div>
        <div className="input-group col-md-6 offset-md-4">
          {this.state.urls.map((url, idx) => (
            <div className="form-row">
              <div className="form-group col-md-10">
                <input
                  className="form-control"
                  type="text"
                  placeholder='URL'
                  key={'input_'+idx}
                  onChange={this.onInputUrlChange(idx)}
                />
              </div>
              <div className="form-group col-md-2">
                <button
                  key={'btn_'+idx}
                  type="button"
                  onClick={this.handleRemoveUrl(idx)}
                  className="small btn btn-secondary">-
                </button>
              </div>
            </div>
          ))}

          <div className="form-row">
            <div className="form-group col-md-10">
              <button
                type="button"
                onClick={this.handleAddUrl}
                className="small btn btn-secondary"> Add URL
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-10">
              <Datetime
                inputProps={{ required: true, placeholder: 'From (Date and Time)' }}
                onChange={(date) => {this.setState({ after: date.format('x')}) }} />

            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-10">
              <Datetime
                inputProps={{ required: true, placeholder: 'To (Date and Time)'}}
                onChange={(date) => {this.setState({ before: date.format('x')}) }} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <input
                className="form-control"
                onChange={(event) => {this.setState({ intervalCount: event.target.value })}}
                placeholder="Interval" />
            </div>
            <div className="form-group col-md-6">
              <select
                className="form-control custom-select"
                onChange={(event) => {this.setState({ intervalType: event.target.value })}}>{intervals}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-10">
              <span className="input-group-btn">
                <button type="submit" className="btn btn-primary center-btn">Submit</button>
              </span>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUrlPageViews }, dispatch);
}

export default connect(null, mapDispatchToProps)(PageViewForm);
