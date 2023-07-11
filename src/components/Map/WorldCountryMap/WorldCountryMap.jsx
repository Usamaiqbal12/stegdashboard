import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import worldContinent from '@highcharts/map-collection/custom/world.geo.json';

import './WorldCountryMap.scss';

highchartsMap(Highcharts); // Initialize the map module

var data = {
  sa: { key: 'sa', value: 0 },
  ca: { key: 'ca', value: 0 },
  ru: { key: 'ru', value: 0 },
  as: { key: 'as', value: 0 },
  na: { key: 'na', value: 0 },
  us: { key: 'us', value: 100 },
};
function fromPercent(valNum) {
  var decimalValue = Math.round((valNum * 255) / 100);

  var hexValue;
  if (valNum < 7) {
    hexValue = '0' + decimalValue.toString(16).toUpperCase();
  } else {
    hexValue = decimalValue.toString(16).toUpperCase();
  }
  return hexValue;
  // document.getElementById("decimal").value=Math.round(valNum*255/100);
  // document.getElementById("hex").value=hexValue;
}
const mapOptions = {
  chart: {
    type: 'map',
    map: 'custom/world',
    events: {
      load: function () {
        this.series[0].data = this.series[0].data.map((el) => {
          //   console.log(, "el");
          const hasValue = data[el['hc-key']];
          if (hasValue) {
            const opacity = fromPercent(hasValue.value);
            el.color = `#0060f0${opacity}`;
            console.log(el.color);
          }
          return el;
        });

        this.update({
          series: [
            {
              data: this.series[0].data,
            },
          ],
        });
      },
    },
  },
  title: {
    text: ' ',
  },
  subtitle: {
    text: ' See which countries your project is being scanned in',
    align: 'left',
    style: {
      color: '#8f8f8f',
      fontSize: 14,
      fontFamily: "'Euclid Circular B', sans-serif",
    },
  },
  credits: {
    enabled: false,
  },
  mapNavigation: {
    enabled: false,
  },
  tooltip: {
    headerFormat: '',
    pointFormat: 'lat: {point.lat}, lon: {point.lon}',
  },
  colorAxis: {
    type: 'logarithmic',
    // dataClasses: [{
    //     to: 3
    // }, {
    //     from: 3,
    //     to: 10
    // }, {
    //     from: 10,
    //     to: 30
    // }, {
    //     from: 30,
    //     to: 100
    // }, {
    //     from: 100,
    //     to: 300
    // }, {
    //     from: 300,
    //     to: 1000
    // }, {
    //     from: 1000
    // }],
    minColor: '#FEEFE3',
    maxColor: '#0060f0',
    min: 1,
    max: 100,
    // labels:{
    //     format:"Least Sanned",
    //     // align:'right',
    //     // overflow:'allow'
    // },
    // labels:{
    //     format:'Most Scanned',
    // },
    showFirstLabel: true,
    showLastLabel: true,
  },
  // legend:{
  //     title:{
  //         text:"Least Scanned"
  //     }
  // },
  series: [
    {
      // Use the gb-all map with no data as a basemap
      name: 'Countries',
      mapData: worldContinent,
      nullColor: '#EFEFEF',
      showInLegend: false,
      borderColor: 'none',
    },
    {
      // Specify points using lat/lon
      // type: "mapbubble",

      name: 'Locations',
      joinBy: 'code_hasc',
      color: 'rgba(251, 176, 114, 0.5)',
      marker: {
        lineWidth: 1,
        lineColor: '#0060f0',
      },
      keys: ['code_hasc', 'value'],
      continent: ['Asia', 'North America'],
      borderColor: 'red',
      borderWidth: 2,
      data: [],
      //     data: [
      //         // 1,2,3,4,50
      //     //   ['AS.PK', 100]
      //         // { z: 10, keyword: "LosAngeles", lat: 34.05, lon: -118.24},
      //         // { z: 10, keyword:"toronto", lat: 43.65, lon: -79.38},
      //         // {z: 10, keyword:"newyork", lat:40.71, lon: -74.0060},
      //         // {z:10, keyword:"seattle", lat: 47.6062, lon: -122.3321},

      // ],
      cursor: 'pointer',
      point: {
        events: {
          click: function () {
            console.log(this.keyword);
          },
        },
      },
    },
  ],
};

function WorldCountryMap() {
  return (
    <div>
      <HighchartsReact
        constructorType={'mapChart'}
        highcharts={Highcharts}
        options={mapOptions}
      />
    </div>
  );
}

export { WorldCountryMap };
