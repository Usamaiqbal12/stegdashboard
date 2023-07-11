import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { WorldCityMap } from '../WorldCityMap/WorldCityMap';
import './CityMap.scss';

function CityMap(props) {
  let tot = 0;
  props.locations.forEach(x => tot += x[1])
  return (
    <div className="city-map">
      <Row>
        <Col md={6}>
          <div className="city-map-div1">
            <WorldCityMap />
          </div>
        </Col>
        <Col md={6} className="citymapd2">
          <div className="city-map-div2">
            <div className="cm-divs">
              <p className="cm-p-1">Cities scanned in</p>
              <p className="cm-p-2">{props.locations.length}</p>
            </div>
            {/*
            <div className="cm-divs">
              <p className="cm-p-1">Cities scanned in</p>
              <p className="cm-p-2">100</p>
            </div>
            <div className="cm-divs">
              <p className="cm-p-1">Cities scanned in</p>
              <p className="cm-p-2">100</p>
            </div>
            */}
          </div>
          <div className="city-map-div3">
            <p className="cm-d-p"> Top Cities </p>

            {props.locations.map(el => (
              <div key={el[0]}>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: '50%' }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                  <div className="progress-percent">{el[1]}</div>
                </div>
                <p>{el[0]}</p>
              </div>
            ))}

            {/*
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: '35%' }}
                aria-valuenow="35"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
              <div className="progress-percent">35%</div>
            </div>
            <p>Toronto</p>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: '10%' }}
                aria-valuenow="10"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
              <div className="progress-percent">10%</div>
            </div>
            <p>NewYork</p>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: '2%' }}
                aria-valuenow="2"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
              <div className="progress-percent">2%</div>
            </div>
            <p>Seattle</p>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: '0.2%' }}
                aria-valuenow="0.2"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
              <div className="progress-percent">0.2%</div>
            </div>
            <p>Miami</p>
            */}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export { CityMap };
