import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class Graph extends Component {
  renderBarDataKey() {
    return this.props.urlList.urls.map((url, index) => {
      var fill = '#'+Math.floor(Math.random()*16777215).toString(16);
      return (
        <Bar key={index} dataKey={url} stackId="a" fill={fill} />
      )
    })
  }

  renderGraph() {
    if(!this.props.urlList.urls) {
      return (
        <div className="graph-section"></div>
      )
    }

    return (
      <BarChart
        width={900}
        height={900}
        data={this.props.urlList.pageViews}
        margin={{top: 20, right: 30, left: 20, bottom: 5}}>

       <XAxis dataKey="time"/>
       <YAxis label={{ value: 'Count', angle: -90, position: 'left' }}/>
       <CartesianGrid strokeDasharray="10 10"/>
       <Tooltip/>
       <Legend />

       {this.renderBarDataKey()}

      </BarChart>
    )

  }

  render() {
    return (
      <div>
        {this.renderGraph()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    urlList: state.urlList
  }
}

export default connect(mapStateToProps)(Graph);
