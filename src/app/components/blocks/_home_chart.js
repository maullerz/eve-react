import React, {Component} from 'react'
import {connect} from 'react-redux'
import Highcharts from 'highcharts'
import {map} from 'lodash'
import {updNeed} from '../../actions/homeActions'

class HomeChart extends Component {

  constructor () {
    super()
    this.init = null
    this.chartID = 'homeChart'
    this.chartObj = {
      chart: {
        renderTo: this.chartID,
        zoomType: 'x',
        backgroundColor: '#1D1D1D',
        type: 'line'
      },
      colors: ['#228b22', '#42A5F5', '#FFA851'],
      credits: {
        enabled: false
      },
      title: {
        style: {
          color: '#ffffff'
        }
      },
      subtitle: {
        text: document.ontouchstart === 'undefined' ? 'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
      },
      xAxis: {
        title: {
          text: 'Timeline',
          style: {
            color: '#ffffff'
          },
          margin: 9
        },
        labels: {
          enabled: false
        },
        minTickInterval: 50
      },
      yAxis: {
        title: {
          text: 'Price (ISK)',
          style: {
            color: '#ffffff'
          }
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        line: {
          enableMouseTracking: true,
          marker: {
            enabled: false
          }
        }
      },
      tooltip: {
        shared: true,
        crosshairs: true,
        valueSuffix: ' isk'
      }
    }
  }

  componentWillReceiveProps (np) {
    let chartData = np.chartData

    if (np._need_rebuild_chart) {
      this.props.updNeed('_need_rebuild_chart', false)
      let series = []
      this.chartObj.title.text = np.region_name + ' trade <b>' + np.item_name + '</b>'
      this.chartObj.xAxis.categories = map(chartData, function (v) {
        return v.date.split('T')[0]
      })
      series.push({
        name: 'High Price',
        data: map(chartData, 'highPrice')
      })
      series.push({
        name: 'Avg Price',
        data: map(chartData, 'avgPrice')
      })
      series.push({
        name: 'Low Price',
        data: map(chartData, 'lowPrice')
      })
      this.chartObj.series = series
      this.reloadChart(this.chartObj)
    }
  }

  componentDidMount () {
    this.chart = new Highcharts['Chart'](
      this.chartID,
      this.chartObj
    )
  }

  reloadChart (chartObj) {
    this.init = new Highcharts.Chart(chartObj)
  }

  componentWillUnmount () {
    this.chart = null
  }

  render () {
    return <div id={this.chartID} />
  }
}

function mapStateToProps (state) {
  return state.homeReducer
}

export default connect(mapStateToProps, {updNeed})(HomeChart)
