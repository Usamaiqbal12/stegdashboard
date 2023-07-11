import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
  Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import inlineLogo from '../../newLogo.svg';
import videoThumbnail from '../../assets/images/videoThumbnail.svg';
import contactUsVector from '../../assets/images/contact-us-vector.svg';
import tick from '../../assets/images/tick.svg';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link as StaticLink, Element } from 'react-scroll';
// import vector from "../../assets/images/Vector.svg"
// import plus from "../../assets/images/plus.svg"
import './Landing.scss';
import $ from 'jquery';
import PopupAlert from '../../components/PopupAlert';
import { apiContact } from '../../api/contact';
import {
  contentSlogan,
  contentSpecial,
  contentMission
} from './content';

function Landing() {
  const [email, setEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [description, setDescription] = useState("");
  const winWidth = window.innerWidth;

  const alertRef = React.createRef();

  // const [videoHeight, setvideoHeight] = useState($('#videosec').outerHeight() + 100);

  useEffect(() => {
    const calcHeight = ($('#videosec').innerHeight() + 100);
    $('.landing-nav-video').css('height',calcHeight);
    window.addEventListener("resize", () => {
      // if (calcHeight !== videoHeight) {
        // setvideoHeight(calcHeight);
        const calcHeight = ($('#videosec').innerHeight() + 100);
           $('.landing-nav-video').css('height',calcHeight);
      // }
    }, false);
  });

  const success = (js) => {
    alertRef.current.show({
      message: "Thanks for your interest!"
    });
  }

  const failure = (e) => {
    alertRef.current.show({
      message: e.message
    });
  }

  const contact = (e) => {
    // XXX should validate email address here
    apiContact(contactName, email, description, success, failure);
  };

  // useEffect(() => {
  //   let videocon  = $('#videosec').outerHeight();
  //   $('.landing-nav-video').css('height',(videocon +100));
  //   console.log(videocon);
  // },)
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="page-wrap">
      <PopupAlert ref={alertRef} />
      <Container fluid>
        <Row>
          <Col md={12} className="navbar-area">
            <NavBar />
          </Col>
        </Row>
      </Container>
      <section className="landing-nav-video">
        <Container fluid id="videosec">
          <Row className="landing-video-section equalpadding">
            <Col md={6} lg={6} xl={5}>
              <div className="video-content">
                <span style={{ fontSize: "30px" }}>
                  steganography
                </span>
                <span style={{ fontSize: "20px" }}>
                  &nbsp;&nbsp;[stĕg″ə-nŏg′rə-fē]
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontStyle: "bold",
                    marginTop: "15px"
                  }}>
                  NOUN
                </span>
                <span style={{ fontSize: "14px", fontStyle: "italic" }}>
                  steganography (noun)
                </span>
                <span style={{ fontSize: "12px", marginLeft: "10px" }}>
                  the practice of concealing messages or information within
                  other nonsecret text or data.
                </span>
                {/*
                <span className="font-bold">Invisible Authentication</span>
                <span className="font-thin">made easy for you</span>
                */}
                <span className="slogan">
                  {contentSlogan}
                </span>
                <Button className="get-started">
                  <Link to="/register">Contact Us</Link>
                </Button>
              </div>
            </Col>
            <Col md={6} lg={6} xl={7}>
              <div className="video-thumbnail">
                <img src={videoThumbnail} alt="thumbnail" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Element name="features">
        <section className="stegvision-special-feature equalpadding">
          <Container fluid>
            <Row>
              <Col md={12} lg={5} xl={4} className="vertical-align-special">
                <div className="stegvision-special">
                  <p className="content-left">
                    What sets
                    <span className="font-bold">StegVision</span>
                    apart:
                  </p>
                </div>
              </Col>
              <Col md={12} lg={7} xl={8}>
                <div className="stegvision-content-parent row">
                  <div className="stegvision-special-content col-lg-6">
                    <span className="tick">
                      <img src={tick} alt="tick" />
                    </span>
                    <span className="content">
                      <span className="heading">{contentSpecial[0].heading}</span>
                      <span className="para">{contentSpecial[0].content}</span>
                    </span>
                  </div>
                  <div className="stegvision-special-content col-lg-6">
                    <span className="tick">
                      <img src={tick} alt="tick" />
                    </span>
                    <span className="content">
                      <span className="heading">{contentSpecial[1].heading}</span>
                      <span className="para">{contentSpecial[1].content}</span>
                    </span>
                  </div>
                  <div className="stegvision-special-content col-lg-6">
                    <span className="tick">
                      <img src={tick} alt="tick" />
                    </span>
                    <span className="content">
                      <span className="heading">{contentSpecial[2].heading}</span>
                      <span className="para">{contentSpecial[2].content}</span>
                    </span>
                  </div>
                  <div className="stegvision-special-content col-lg-6">
                    <span className="tick">
                      <img src={tick} alt="tick" />
                    </span>
                    <span className="content">
                      <span className="heading">{contentSpecial[6].heading}</span>
                      <span className="para">{contentSpecial[6].content}</span>
                    </span>
                  </div>
                  <div className="stegvision-special-content col-lg-6">
                    <span className="tick">
                      <img src={tick} alt="tick" />
                    </span>
                    <span className="content">
                      <span className="heading">{contentSpecial[7].heading}</span>
                      <span className="para">{contentSpecial[7].content}</span>
                    </span>
                  </div>
                  <div className="stegvision-special-content col-lg-6">
                    <span className="tick">
                      <img src={tick} alt="tick" />
                    </span>
                    <span className="content">
                      <span className="heading">{contentSpecial[8].heading}</span>
                      <span className="para">{contentSpecial[8].content}</span>
                    </span>
                  </div>
                  <div className="stegvision-special-content col-lg-6">
                    <span className="tick">
                      <img src={tick} alt="tick" />
                    </span>
                    <span className="content">
                      <span className="heading">{contentSpecial[3].heading}</span>
                      <span className="para">{contentSpecial[3].content}</span>
                    </span>
                  </div>
                  <div className="stegvision-special-content col-lg-6">
                    <span className="tick">
                      <img src={tick} alt="tick" />
                    </span>
                    <span className="content">
                      <span className="heading">{contentSpecial[4].heading}</span>
                      <span className="para">{contentSpecial[4].content}</span>
                    </span>                  
                  </div>
                  <div className="stegvision-special-content col-lg-6">
                    <span className="tick">
                      <img src={tick} alt="tick" />
                    </span>
                    <span className="content">
                      <span className="heading">{contentSpecial[5].heading}</span>
                      <span className="para">{contentSpecial[5].content}</span>
                    </span>
                  </div>
                  <div className="stegvision-special-content col-lg-6">
                    <span className="tick">
                      <img src={tick} alt="tick" />
                    </span>
                    <span className="content">
                      <span className="heading">{contentSpecial[9].heading}</span>
                      <span className="para">{contentSpecial[9].content}</span>
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Element>
      <Element name="ourstory">
        <section className="quote-section">
          <Container fluid>
            <Row className="quote-inner">
              <Col md={6}>
                <div className="quote-left">
                  {contentMission()}
                </div>
              </Col>
              <Col md={6}>
                <div className="quote-right">
                  {/* <img src={require('../../assets/images/quote-left.svg')} className="quoteicon"></img> */}
                  <br />
                  <br />
                  <br />
                  <br />
                  <p>
                    {/*<span className="quoteicon"></span>*/}
                    Authenticate your brand, offer an unforgettable experience.
                    {/*<span className="quoteicon"></span>*/}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Element>
      {/* Was set to 800 */}
      {winWidth > 50000 ? (<Element name="pricing">
        <section className="plan-and-price">
          <Container fluid>
            <Row>
              <Col md={12} className="px-0">
                <div className="heading-slogan">
                  <p className="heading">Plans & Pricing</p>
                  <p className="para">
                  We understand your brand is remarkable—choose the plan that 
                  best fits your unique needs.
                  </p>
                </div>

                <div className="price-card-wrapper">
                  <div className="price-card">
                    <div className="price-top">
                      <p className="subs-title">Basic (Monthly)</p>
                      <div className="price">
                        <span className="currency">$</span>
                        <span className="wo-decimal-price">600</span>
                        <span className="time-duration">
                          <span className="w-decimal-price">00</span>
                          <span className="duration">/ month</span>
                        </span>
                      </div>
                    </div>
                    <div className="price-bottom">
                      <ul className="price-feature-list">
                        <li>Full access to SaaS platform</li>
                        <li>Product encoding</li>
                        <li>Product information display</li>
                        <li>Product tracking</li>
                        <li>Decoded artwork
                          <ul>
                            <li>1 - 50 pcs ($600)</li>
                            <li>51 - 250 pcs ($1,800)</li>
                            <li>250 - 750 pcs ($3,100)</li>
                            <li>750pcs + Special Pricing Available</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="price-card">
                    <div className="price-top">
                      <p className="subs-title">Basic+ (Monthly)</p>
                      <div className="price">
                        <span className="currency">$</span>
                        <span className="wo-decimal-price">900</span>
                        <span className="time-duration">
                          <span className="w-decimal-price">00</span>
                          <span className="duration">/ month</span>
                        </span>
                      </div>
                    </div>
                    <div className="price-bottom">
                      <ul className="price-feature-list">
                        <li>Full access to SaaS platform</li>
                        <li>Product encoding</li>
                        <li>Product information display</li>
                        <li>Product tracking</li>
                        <li>Campaign templates</li>
                        <li>Multi-factor authentication</li>
                        <li>Decoded artwork
                          <ul>
                            <li>1 - 50 pcs ($600)</li>
                            <li>51 - 250 pcs ($1,800)</li>
                            <li>250 - 750 pcs ($3,100)</li>
                            <li>750pcs + Special Pricing Available</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="price-card premium">
                    <div className="popular">
                      <p>Most Popular</p>
                    </div>
                    <div className="price-top">
                      <p className="subs-title">PREMIUM</p>
                      <div className="price">
                        <span className="currency">$</span>
                        <span className="wo-decimal-price">99</span>
                        <span className="time-duration">
                          <span className="w-decimal-price">99</span>
                          <span className="duration">/ month</span>
                        </span>
                      </div>
                    </div>
                    <div className="price-bottom">
                      <ul className="price-feature-list">
                        <li>Full access to SaaS platform</li>
                        <li>Product encoding</li>
                        <li>Product information display</li>
                        <li>Product tracking</li>
                        <li>Campaign templates</li>
                        <li>Multi-factor authentication</li>
                        <li>White Label Solution</li>
                        <li>Decoded artwork
                          <ul>
                            <li>1 - 50 pcs ($600)</li>
                            <li>51 - 250 pcs ($1,800)</li>
                            <li>250 - 750 pcs ($3,100)</li>
                            <li>750pcs + Special Pricing Available</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bottom-bar"></div>
              </Col>
            </Row>
          </Container>
        </section>
      </Element>
      ) : null}
      <Element name="support">
        <section className="partners">
          <Container fluid>
            <Row>
              <Col md={12} className="px-0 partners-content">
                <div className="partners-brand-white">
                  <p className="partners-heading">We do it for our partners</p>
                  {/* <div className="partners-brand">
                                    <img src={inlineLogo} alt="" />
                                    <img src={inlineLogo} alt="" />
                                    <img src={inlineLogo} alt="" />
                                    <img src={inlineLogo} alt="" />
                                    <img src={inlineLogo} alt="" />
                                    <img src={inlineLogo} alt="" />
                                    <img src={inlineLogo} alt="" />
                                </div> */}

                  <Carousel
                    responsive={responsive}
                    autoPlay={true}
                    infinite={true}
                    autoPlaySpeed={3000}
                    removeArrowOnDeviceType={['desktop', 'tablet', 'mobile']}
                  >
                    <div>
                      {' '}
                      <img src={inlineLogo} alt="" />
                    </div>
                    <div>
                      {' '}
                      <img src={inlineLogo} alt="" />
                    </div>
                    <div>
                      {' '}
                      <img src={inlineLogo} alt="" />
                    </div>
                    <div>
                      {' '}
                      <img src={inlineLogo} alt="" />
                    </div>
                    <div>
                      {' '}
                      <img src={inlineLogo} alt="" />
                    </div>
                    <div>
                      {' '}
                      <img src={inlineLogo} alt="" />
                    </div>
                    <div>
                      {' '}
                      <img src={inlineLogo} alt="" />
                    </div>
                  </Carousel>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Element>
      <Element name="contact">
        <section className="contact-us equalpadding">
          <Container>
            <Row>
              <Col md={4} className="px-0">
                <div className="contact-us-left">
                  <img src={contactUsVector} alt="contact-us " />
                </div>
              </Col>
              <Col md={8} className="px-0">
                <Form>
                  <div className="contact-us-right">
                    <div className="contact-us-header">
                      <p className="inquiry">
                        Questions? Inquiry? Something else?
                      </p>
                      <p className="contact-us-text">
                        Feel free to contact us.
                      </p>
                    </div>

                    <div className="contact-form">
                      <div className="contact-field-inline">
                        <div className="form-floating">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={contactName}
                            onChange={e => setContactName(e.target.value)}
                            placeholder="Name"
                          />
                        </div>
                        <div className="form-floating">
                          <label htmlFor="email">Enter Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter Email"
                          />
                        </div>
                      </div>

                      <div className="form-floating contact-us-textarea">
                        <label htmlFor="floatingTextarea">Description</label>
                        <textarea
                          className="form-control"
                          placeholder="Description"
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                          id="floatingTextarea"
                        ></textarea>
                      </div>

                      <div className="contact-us-btn-parent">
                        <Button className="contact-us-send" onClick={contact}>
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </section>
      </Element>
      <section className="Footer">
        <Container fluid>
          <div className="bg">
            <Row>
              <Col md={{ span: 3, offset: 1 }}>
                <div className="showVertical">
                  <img src={inlineLogo} alt="inlineLogo" />
                  {/*
                  <p>Protecting over 500 brands</p>
                  <p>Authenticated over 100,000 products</p>
                              */}
                </div>
              </Col>
              <Col md={2} className="listing">
                <p className="Footerheading">Navigation</p>
                <Link
                  className="FooterLink"
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alertRef.current.show({
                      message: "Coming soon"
                    });
                  }}
                >Feature</Link>
                <br />
                <Link
                  className="FooterLink"
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alertRef.current.show({
                      message: "Coming soon"
                    });
                  }}
                >Pricing</Link>
                <br />
                <Link
                  className="FooterLink"
                  to={{
                    pathname: "https://stegvision.zendesk.com/hc/en-us/articles/4771148310683-Stegvision-API"
                  }}
                  target="_blank"
                >
                  API
                </Link>
              </Col>
              <Col md={2} className="listing">
                <p className="Footerheading">Contact</p>
                {/*
                <Link
                  className="FooterLink"
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alertRef.current.show({
                      message: "Coming soon"
                    });
                  }}
                >Live Chat</Link>
                <br />
                */}
                <a
                  className="FooterLink"
                  href="mailto:shotes@stegvision.com"
                >Email</a>
              </Col>
              <Col md={2} className="listing">
                <p className="Footerheading">Account</p>
                <Link
                  className="FooterLink"
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alertRef.current.show({
                      message: "Coming soon"
                    });
                  }}
                >Privacy Policy</Link>
                <br />
                <Link
                  className="FooterLink"
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alertRef.current.show({
                      message: "Coming soon"
                    });
                  }}
                >Conditions</Link>
              </Col>
              <Col md={2} className="listing">
                <p className="Footerheading">Account</p>
                <Link className="FooterLink" to="/register">
                  Register
                </Link>
                <br />
                <Link className="FooterLink" to="/signin">
                  Signin
                </Link>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </div>
  );
}

function NavBar() {
  return (
    <Navbar fixed="top" collapseOnSelect expand="md">
      <Navbar.Brand>
        <img src={inlineLogo} alt="inlineLogo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="center-nav">
          <StaticLink
            activeClass="active"
            className="nav-link"
            to="features"
            spy={true}
            smooth={true}
            duration={200}
          >
            Features
          </StaticLink>

          <StaticLink
            activeClass="active"
            className="nav-link"
            to="ourstory"
            spy={true}
            smooth={true}
            duration={200}
          >
            About
          </StaticLink>

          <StaticLink
            activeClass="active"
            className="nav-link"
            to="pricing"
            spy={true}
            smooth={true}
            duration={200}
          >
            Pricing
          </StaticLink>
          <StaticLink
            activeClass="active"
            className="nav-link"
            to="support"
            spy={true}
            smooth={true}
            duration={200}
          >
            Support
          </StaticLink>
          <StaticLink
            activeClass="active"
            className="nav-link"
            to="contact"
            spy={true}
            smooth={true}
            duration={200}
          >
            Contact
          </StaticLink>
          {/*
          <StaticLink
            activeClass="active"
            className="nav-link"
            to="api"
            spy={true}
            smooth={true}
            duration={200}
          >
            API
          </StaticLink>
          */}
          {/* <Link className="nav-link active" to='/'>Features</Link>
                    <Link className="nav-link" to='/'>Our Story</Link>
                    <Link className="nav-link" to='/'>Pricing</Link>
                    <Link className="nav-link" to='/'>Support</Link>
                    <Link className="nav-link" to='/'>API</Link> */}
        </Nav>
        <div className="right-nav-btns">
          <Link className="nav-signin" role="button" to="/signin">
            Sign in
          </Link>
          <Link className="nav-register" to="/register">
            Register
          </Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
export { Landing };
