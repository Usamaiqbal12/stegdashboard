import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import proj4 from 'proj4';
import worldContinent from '@highcharts/map-collection/custom/world-continents.geo.json';

import './WorldCityMap.scss';

highchartsMap(Highcharts); // Initialize the map module

if (typeof window !== 'undefined') {
  window.proj4 = window.proj4 || proj4;
}

const mapOptions = {
  chart: {
    type: 'map',
    map: 'custom/world',
  },
  title: {
    text: ' ',
  },
  subtitle: {
    text: ' See which cities your project is being scanned in',
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
      type: 'mapbubble',
      name: 'Locations',
      color: 'rgba(251, 176, 114, 0.5)',
      marker: {
        lineWidth: 1,
        lineColor: '#0060f0',
      },
      borderColor: 'red',
      borderWidth: 2,
      data: [
        { z: 10, keyword: 'Los Angeles, CA', lat: 34.089, lon: -118.182 },
        { z: 10, keyword: 'Martinez, CA', lat: 37.983, lon: -122.122 },
        { z: 10, keyword: 'Calabasas, CA', lat: 34.140, lon: -118.676 },
      ],
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

function WorldCityMap() {
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

export { WorldCityMap };
