import React from 'react';
import './CountryMap.scss';
import { Row, Col } from 'react-bootstrap';
import { WorldCountryMap } from '../WorldCountryMap/WorldCountryMap';

function CountryMap() {
  return (
    <div className="country-map">
      <Row>
        <Col lg={12} xl={6} className="mb-2">
          <div className="count-map-div1">
            <WorldCountryMap />
          </div>
        </Col>
        <Col lg={12} xl={6} className="countmapd2 mb-2">
          <div className="count-map-div2">
            <div className="cm-divs">
              <p className="cm-p-1">Countries scanned in</p>
              <p className="cm-p-2">1</p>
            </div>
            {/*
            <div className="cm-divs">
              <p className="cm-p-1">Countries scanned in</p>
              <p className="cm-p-2">100</p>
            </div>
            <div className="cm-divs">
              <p className="cm-p-1">Countries scanned in</p>
              <p className="cm-p-2">100</p>
            </div>
            */}
          </div>
          <div className="count-map-div3">
            <p className="cm-d-p"> Top Countries </p>

            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: '100%' }}
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
              <div className="progress-percent">100%</div>
            </div>
            <p>United States</p>
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
            <p>Canada</p>
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
            <p>Mexico</p>
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
            <p>Australia</p>
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
            <p>Japan</p>
            */}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export { CountryMap };
