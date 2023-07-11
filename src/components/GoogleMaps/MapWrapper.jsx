import React, { useState } from 'react';
import { Wrapper } from "@googlemaps/react-wrapper";
import { MyMap } from './MyMap';
import { MyMarker } from './MyMarker';
import './mymap.css';

const { googleMapsApiKey } = window.runConfig;

/*
const testScans = [
  {
    id: 1,
    label_id: 1,
    label_name: 'PHG',
    end_user_id: 13,
    timestamp: '2022--3-12',
    latitude: 38.1,
    longitude: -122.3,
    location: "Cleveland, OH"
  },
  {
    id: 2,
    label_id: 1,
    label_name: 'PHG',
    end_user_id: 13,
    timestamp: '2022--3-12',
    latitude: 39.0,
    longitude: -121.1,
    location: "Miami, OH"
  },
  {
    id: 3,
    label_id: 1,
    label_name: 'PHG',
    end_user_id: 13,
    timestamp: '2022--3-12',
    latitude: 31.3,
    longitude: -101.2,
    location: "Tulsa, OH"
  }
]
*/

function MapWrapper(props) {
  const { scans } = props;

  const [showScans, setShowScans] = useState(scans);

  const updateTimePeriod = e => {
    if (e.target.value === "forever") {
      setShowScans(scans);
      return;
    }

    const now = Date.now();
    let diff = 0;
    if (e.target.value === "day") {
      diff = 24 * 3600 * 1000;
    } else if (e.target.value === "week") {
      diff = 7 * 24 * 3600 * 1000;
    } else {
      diff = 30 * 24 * 3600 * 1000;
    }

    setShowScans(scans.filter(el => {
      const d = Date.parse(el.timestamp);
      if (now - d < diff) {
        return true;
      }
      return false;
    }));
  };

  const render = status => {
    return <h1>{status}</h1>;
  }

  return (
    <Wrapper apiKey={googleMapsApiKey} render={render}>
      <div className="map-container">
        <div className="map-part">
          <MyMap scans={showScans}>
            {showScans.map(x => (
              <MyMarker
                key={x.id}
                scan={x}
                position={{ lat: x.latitude, lng: x.longitude }}
              />
            ))}
          </MyMap>
        </div>
        <div style={{margin: "10px"}}>
          <div>
            <label>Time Period</label><br />
            <select onChange={updateTimePeriod} defaultValue="forever">
              <option value="day">Last Day</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="forever">Forever</option>
            </select>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export { MapWrapper };