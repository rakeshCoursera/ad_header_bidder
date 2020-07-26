import React from 'react';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';
const Chart = loadable(() => import('react-apexcharts'));

//  Line chart building component
const ApexChart = (props) => {
  const newsData = useSelector(state => state.news)

  let xdata = [];
  let ydata = [];
  
  newsData.news.hits.forEach((elem) => {
    xdata.push(elem.objectID);
    ydata.push(elem.points || 0)
  });

  const options = {
    series: [{
      name: "Votes",
      data: ydata
    }],
    options: {
      chart: {
        // height: '100px',
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Votes Trends by ID',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        type: "category",
        categories: xdata,
        title: {
          text: 'ID'
        }
      },
      yaxis: {
        type: 'numeric',
        title: {
          text: 'Votes'
        },
      },
    },
  };

  return (
    <Chart
      options={options.options}
      series={options.series}
      type="line"
      width="100%"
      height="300px"
    />
  );
}

export default ApexChart;