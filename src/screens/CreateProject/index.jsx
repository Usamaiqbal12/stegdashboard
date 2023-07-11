import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PopupAlert from '../../components/PopupAlert';
import { Icon } from '../../components/Icon';
import { Button } from '../../components';
import dropzoneImage from '../../assets/images/dropzoneimage.svg';
import infoIcon from '../../assets/images/infoIcon.svg';
import { useDropzone } from 'react-dropzone';
import { apiUploadImage, apiNewProject } from '../../api/projects';
import './CreateProject.scss';

function CreateProject() {
  const history = useHistory();

  const [projectName, setProjectName] = useState('');
  const [experienceOneText, setExperienceOneText] = useState('');
  const [experienceOneLink, setExperienceOneLink] = useState('');
  const [experienceTwoText] = useState('');
  const [experienceTwoLink] = useState('');
  const [description, setDescription] = useState('');
  const [encryptions, setEncryptions] = useState([1, 1, 1, 1]);
  const [material, setMaterial] = useState('');
  const [printType, setPrintType] = useState('');
  const [labelUrls, setLabelUrls] = useState(Array(4));
  const [labels, setLabels] = useState(Array(4));
  const [imageUrls, setImageUrls] = useState(Array(4));
  const [images, setImages] = useState(Array(4));
  const [multifactor] = useState(1);
  const [uniqueIds, setUniqueIds] = useState(null);
  const alertRef = React.createRef();

  // const thumbsContainer = {
  //   display: "flex",
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   marginTop: 16,
  // };

  // const thumb = {
  //   display: "inline-flex",
  //   borderRadius: 2,
  //   border: "1px solid #eaeaea",
  //   marginBottom: 8,
  //   marginRight: 8,
  //   minWidth: 80,
  //   height: 100,
  //   padding: 4,
  //   boxSizing: "border-box",
  // };

  // const thumbInner = {
  //   display: "flex",
  //   minWidth: 0,
  //   overflow: "hidden",
  // };

  // const img = {
  //   display: "block",
  //   width: "auto",
  //   height: "100%",
  // };
  const [labelpaths, setlabelPaths] = useState([]);
  const [imagepaths, setimagePaths] = useState([]);
  const [visibilitylabel, setVisibilityLabel] = useState(false);
  const [visibilityimage, setVisibilityImage] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      processLabelDrop(acceptedFiles);
      setlabelPaths(acceptedFiles.map((file) => URL.createObjectURL(file)));
      setVisibilityLabel(!visibilitylabel);
    },

    [setlabelPaths]
  );

  const processLabelDrop = (files) => {
    console.log(files);
    setMultiLabels(1, files);
  };

  const {
    getRootProps: getlabelRootProps,
    getInputProps: getlabelInputProps,
    isDragActive,
  } = useDropzone({
    accept: 'image/*',
    onDrop: onDrop,
  });

  const processImageDrop = (files) => {
    console.log(files);
    setMultiImages(1, files);
  };

  const { getRootProps: getimageRootProps, getInputProps: getimageInputProps } =
    useDropzone({
      accept: 'image/*',
      // onDrop: processImageDrop,
      onDrop: useCallback(
        (acceptedFiles) => {
          processImageDrop(acceptedFiles);
          setimagePaths(acceptedFiles.map((file) => URL.createObjectURL(file)));
          setVisibilityImage(!visibilityimage);
        },
        [setimagePaths]
      ),
    });

  const goToDashboard = () => {
    history.push('/dashboard');
  };

  const success = (vals) => {
    alertRef.current.show({
      message: 'New project created successfully',
      callback: goToDashboard,
    });
  };

  const failure = (e) => {
    console.log(e);

    alertRef.current.show({
      message: 'API error',
    });
  };

  const s1 = (js) => {};

  const doImages = (i, vals) => {
    apiUploadImage(vals.id, 'master_image', labels[i], s1, failure);
    apiUploadImage(vals.id, 'display_image', images[i], success, failure);
  };

  const create = (e) => {
    const mf = parseInt(multifactor, 10);

    const data = {
      projectName,
      experienceOneText,
      experienceOneLink,
      experienceTwoText,
      experienceTwoLink,
      description,
      encryptions,
      material,
      printType,
      mf,
    };

    apiNewProject(data, doImages, failure);
  };

  /*
  const cancel = (e) => {
    history.push("/dashboard");
  };
  */

  const setMultiLabels = (id, files) => {
    const newLabels = [...labels];
    newLabels[id - 1] = files[0];

    const urls = [...labelUrls];
    urls[id - 1] = URL.createObjectURL(files[0]);

    setLabelUrls(urls);
    setLabels(newLabels);
  };

  const setMultiImages = (id, files) => {
    const newImages = [...images];
    newImages[id - 1] = files[0];

    const urls = [...imageUrls];
    urls[id - 1] = URL.createObjectURL(files[0]);

    setImageUrls(urls);
    setImages(newImages);
  };

  /*
  const setMultiEncryptions = (id, x) => {
    const newEncryptions = [...encryptions];
    newEncryptions[id - 1] = parseInt(x) || "";
    setEncryptions(newEncryptions);
  };
  */

  const singleForm = (id) => {
    return (
      <>
        <Row>
          <Col md={6} lg={6}>
            <div className="form-floating">
              {/* <label htmlFor="productImage">Product Label {id}</label> */}
              <label htmlFor="productImage">Production File For Encoding</label>

              <section
                className="container"
                style={{ margin: '0px', padding: '0px' }}
              >
                <div
                  {...getlabelRootProps({
                    className: 'dropzone',
                  })}
                >
                  <input {...getlabelInputProps()} />

                  <div
                    className="flex-column"
                    style={{
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      cursor: 'pointer',
                    }}
                  >
                    {!visibilitylabel ? (
                      <img
                        src={dropzoneImage}
                        style={{
                          cursor: 'pointer',
                        }}
                        alt="..."
                      ></img>
                    ) : (
                      ''
                    )}
                    {!visibilitylabel ? (
                      <p>
                        {' '}
                        <span>Click to upload </span>or drag and drop
                      </p>
                    ) : (
                      ''
                    )}
                    {labelpaths.map((path) => (
                      <img
                        alt="..."
                        key={path}
                        src={path}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          padding: '0.2rem',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </section>
              {/* <Previews /> */}
            </div>
          </Col>

          <Col md={6} lg={6}>
            <div className="form-floating">
              {/* <label htmlFor="productImage">Product Image {id}</label> */}
              <label htmlFor="productImage">Product Display Image</label>
              <section
                className="container"
                style={{ margin: '0px', padding: '0px' }}
              >
                <div {...getimageRootProps({ className: 'dropzone' })}>
                  <input {...getimageInputProps()} />

                  <div
                    className="flex-column"
                    style={{
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      cursor: 'pointer',
                    }}
                  >
                    {!visibilityimage ? (
                      <img
                        src={dropzoneImage}
                        alt="img"
                        style={{
                          cursor: 'pointer',
                        }}
                      ></img>
                    ) : (
                      ''
                    )}
                    {!visibilityimage ? (
                      <p>
                        <span>Click to upload</span> or drag and drop
                      </p>
                    ) : (
                      ''
                    )}
                    {imagepaths.map((path) => (
                      <img
                        alt="..."
                        key={path}
                        src={path}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          padding: '0.2rem',
                          cursor: 'pointer',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} lg={6}>
            <div className="form-floating">
              {/* <label htmlFor="projectName">Encryptions - Label {id}</label> */}
              <label htmlFor="projectName">Unique identifiers</label>
              <input
                type="text"
                className="form-control"
                // id={"encryptions" + id}
                // value={encryptions[id - 1]}
                onChange={(e) => setUniqueIds(e.target.value)}
                placeholder="Ex. 20"
              />
            </div>
          </Col>
          <Col md={6} lg={6}>
            <div className="form-floating">
              {/* <label htmlFor="projectName">Encryptions - Label {id}</label> */}
              <label htmlFor="projectName">Number of Serializations</label>
              <input
                type="text"
                className="form-control"
                // id={"encryptions" + id}
                // value={encryptions[id - 1]}
                onChange={(e) => setEncryptions(id, e.target.value)}
                placeholder="Ex. 1-500,000"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} lg={12}>
            <div className="checkBox">
              <Form.Group
                className="mb-3  btn-group"
                controlId="formBasicCheckbox"
              >
                <Form.Check
                  type="checkbox"
                  label="First time encoding on this material"
                />
              </Form.Group>
            </div>
          </Col>
        </Row>
      </>
    );
  };

  const formRow = (a, b) => {
    if (a === 1) {
      return (
        <div>
          <Row>
            <Col md={12} lg={12}>
              {singleForm(a + b)}
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div>
          <Row>
            <Col md={6} lg={6}>
              {singleForm(1 + b)}
            </Col>
            <Col md={6} lg={6}>
              {singleForm(2 + b)}
            </Col>
          </Row>
        </div>
      );
    }
  };

  const imageForm = (t) => {
    var tot = parseInt(t, 10);

    if (tot < 3) {
      return formRow(tot, 0);
    } else {
      return (
        <div>
          {formRow(2, 0)}
          {formRow(tot - 2, 2)}
        </div>
      );
    }
  };

  return (
    <div>
      {/* <Container fluid>
        <Row className="color-div">
          <Col xs={12} sm={12} md={12} lg={12} xl={12} className="bg-white"> */}
      <div className="Create-Project-form">
        <div className="container-fluid">
          <Row>
            <Col md={12} lg={12}>
              {/* <div className="logo">
                        <img src={logo} alt="logo" />
                      </div> */}
              <div className="form-header-heading">Create Project</div>
              <div className="form">
                {/* <div className="Heading">
                          <p className="heading-1">Create New Project</p>
                        </div> */}

                <div className="Heading">
                  <h3>
                    Basic details of project <img src={infoIcon} alt="info" />
                  </h3>
                  <p>Single Factor Authentication</p>
                </div>

                <div className="project-detail-card">
                  <Row>
                    <Col md={12} lg={12} p-0>
                      <div className="form-floating mt-0">
                        <label htmlFor="projectName">Project Name</label>
                        <input
                          type="text"
                          placeholder="Ex. Lorem ipsum"
                          className="form-control"
                          id="projectName"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                        />
                      </div>
                    </Col>
                  </Row>
                  {/* <Row>
                      <Col md={6} lg={6}>
                        <div className="form-floating">
                          <label>Project Type</label>
                          <select
                            name="multifactor"
                            onChange={(e) => setMultifactor(e.target.value)}
                          >
                            <option key={1} value={1}>
                              Single Factor Authentication
                            </option>
                            <option key={2} value={2}>
                              2 Factor Authentication
                            </option>
                            <option key={3} value={3}>
                              3 Factor Authentication
                            </option>
                            <option key={4} value={4}>
                              4 Factor Authentication
                            </option>
                          </select>
                        </div>
                      </Col>
                    </Row> */}
                  <Row>
                    <Col md={6} lg={6}>
                      <div className="form-floating">
                        <label htmlFor="projectName">Experience Label</label>
                        <input
                          type="text"
                          className="form-control"
                          id="experienceOneText"
                          value={experienceOneText}
                          onChange={(e) => setExperienceOneText(e.target.value)}
                          placeholder="Ex. Lorem ipsum"
                        />
                      </div>
                    </Col>
                    <Col md={6} lg={6}>
                      <div className="form-floating">
                        <label htmlFor="projectName">URL</label>
                        <input
                          type="text"
                          className="form-control"
                          id="experienceOneLink"
                          value={experienceOneLink}
                          onChange={(e) => setExperienceOneLink(e.target.value)}
                          placeholder="Ex. http.loremipsum.com "
                        />
                      </div>
                    </Col>
                  </Row>
                  {/* <Row>
                      <Col md={6} lg={6}>
                        <div className="form-floating">
                          <label htmlFor="projectName">Experience Two - Text</label>
                          <input
                            type="text"
                            className="form-control"
                            id="experienceTwoText"
                            value={experienceTwoText}
                            onChange={(e) => setExperienceTwoText(e.target.value)}
                            placeholder="Text"
                          />
                        </div>
                      </Col>
                      <Col md={6} lg={6}>
                        <div className="form-floating">
                          <label htmlFor="projectName">URL</label>
                          <input
                            type="text"
                            className="form-control"
                            id="experienceTwoLink"
                            value={experienceTwoLink}
                            onChange={(e) => setExperienceTwoLink(e.target.value)}
                            placeholder="URL"
                          />
                        </div>
                      </Col>
                    </Row> */}
                  <Row>
                    <Col md={12} lg={12}>
                      <div className="area-floating">
                        <label htmlFor="projectName">Project Description</label>
                        <textarea
                          type="text"
                          rows={5}
                          className="form-control"
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Type here..."
                        />
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="project-details-div">
                  <h3>
                    Project Details <img src={infoIcon} alt="info" />
                  </h3>
                  <div className="project-detail-card">
                    <Row>
                      <Col md={6} lg={6}>
                        <div className="form-floating">
                          <label htmlFor="projectName">Material</label>
                          <div className="arrow-border">
                            <Icon name="faAngleDown" fontSize="20px" />
                          </div>
                          <select
                            type="text"
                            className="form-control"
                            id="material"
                            value={material}
                            onChange={(e) => setMaterial(e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="Paper">Paper</option>
                            <option value="Fabric">Fabric</option>
                          </select>
                        </div>
                      </Col>
                      <Col md={6} lg={6}>
                        <div className="form-floating">
                          <label htmlFor="projectName">Print Type</label>
                          <div className="arrow-border">
                            <Icon name="faAngleDown" fontSize="20px" />
                          </div>
                          <select
                            type="text"
                            className="form-control"
                            id="printType"
                            value={printType}
                            onChange={(e) => setPrintType(e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="Lithography">Lithography</option>
                            <option value="Digital">Digital</option>
                            <option value="Coated">Coated</option>
                          </select>
                        </div>
                      </Col>
                    </Row>
                    {imageForm(multifactor)}
                  </div>
                </div>
                <div className="last-div-buttons">
                  <Button name="Create Project" onclick={create} />
                  <a href="/dashboard" className="btn">
                    Back
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        {/* <Container>
        </Container> */}
      </div>
      {/* </Col>
        </Row>
      </Container> */}
      <PopupAlert ref={alertRef} />
    </div>
  );
}

export default withRouter(CreateProject);
