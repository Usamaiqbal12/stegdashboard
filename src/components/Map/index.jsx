import React, { useState } from 'react';
import { CountryMap } from './CountryMap/CountryMap';
import { CityMap } from './CityMap/CityMap';
import './Map.scss';

function Map(props) {
  const [map, setMap] = useState(true);
  return (
    <div className="map">
      <div className="map-div-1">
        <span
          onClick={() => setMap(true)}
          style={{ fontWeight: map ? 'bold' : 'normal' }}
        >
          View By Country
        </span>

        <span
          onClick={() => setMap(false)}
          style={{ fontWeight: map ? 'normal' : 'bold' }}
          className="map-city-p"
        >
          View By City
        </span>
      </div>
      <div className="map-div-2">{map ? 
        <CountryMap />
        : 
        <CityMap locations={props.locations} />}
      </div>
    </div>
  );
}

export { Map };
