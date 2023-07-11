import React, { useEffect, useRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { rectangle } from '../../../assets/images';
import { useFormContext } from 'react-hook-form';

function Step3(props) {
  const { register } = useFormContext();

  const [nav1, setnav1] = useState(null);
  const [nav2, setnav2] = useState(null);
  const [images, setImages] = useState([...new Array(5)]);

  const slider1 = useRef();
  const slider2 = useRef();

  useEffect(() => {
    setnav1(slider1.current);
    setnav2(slider2.current);
  }, []);
  const removeSlide = (e) => {
    e.preventDefault();
    const index = slider1.current.innerSlider.asNavForIndex;
    const filter = images.filter((v, ind) => {
      console.log(nav2, ind);
      return index !== ind;
    });
    console.log(filter, 'click');
    setImages(filter);
  };
  if (props.currentStep !== 3) {
    return null;
  }
  const gotoNext = (e) => {
    e.preventDefault();
    slider2.current.slickNext();
    slider1.current.slickNext();
  };

  return (
    <div className="step3">
      <Row>
        <Col md={6}>
          <div className="step3-div1">
            <p className="step3-p">
              Select Encryption Area ( 1 Encryption Left )
              <span>Clear Encryption</span>
            </p>
            <Slider
              initialSlide={1}
              asNavFor={nav2}
              ref={slider1}
              slidesToShow={1}
            >
              {images.map((v, ind) => (
                <div className="slider-main-image">
                  <img src={rectangle} alt="sliderimage" />
                </div>
              ))}
            </Slider>
          </div>
        </Col>
        <Col md={6}>
          <div className="step3-div2">
            <div className="step3-div2-1">
              <p className="step3-p">Encryption Details</p>
              <div class="form-floating">
                <label htmlFor="encryptarea">Number of Encryptions</label>
                <select
                  class="form-select"
                  id="encryptarea"
                  name="encryptarea"
                  ref={register}
                  aria-label="Floating label select example"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>
            <div className="step3-div2-2">
              <button onClick={removeSlide}>Delete Image</button>
              <button onClick={gotoNext}>Next Image</button>
            </div>
          </div>
        </Col>
      </Row>
      <div className="step-slider">
        <Slider
          asNavFor={nav1}
          ref={slider2}
          slidesToShow={4}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          {images.map((v, ind) => (
            <div className="slider-image-div">
              <img src={rectangle} alt="sliderimage" />
              <div className="slider-check-div">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export { Step3 };
