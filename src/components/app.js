import React, { Component } from 'react';

import Graph from '../containers/graph';
import PageViewForm from '../containers/page_view_form';

export default class App extends Component {
  render() {
    return (
      <div>
        <Graph />
        <PageViewForm />
      </div>
    );
  }
}
