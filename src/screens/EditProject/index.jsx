import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PopupAlert from "../../components/PopupAlert";
import logo from "../../newLogo.svg";
import { Button } from "../../components";
import { apiEditProject } from "../../api/projects";
import "./EditProject.scss";

function EditProject(props) {
  const history = useHistory();

  const project = props.location.state.project;
  console.log(project);

  const [projectName, setProjectName] = useState(
    project.labels[0].name_display
  );
  const [experienceOneText, setExperienceOneText] = useState(
    project.experience_1_text
  );
  const [experienceOneLink, setExperienceOneLink] = useState(
    project.experience_1_link
  );
  const [experienceTwoText, setExperienceTwoText] = useState(
    project.experience_2_text
  );
  const [experienceTwoLink, setExperienceTwoLink] = useState(
    project.experience_2_link
  );
  const [description, setDescription] = useState(project.description);
  const [encryptions, setEncryptions] = useState(project.labels[0].encryptions);
  const [material, setMaterial] = useState(project.labels[0].material);
  const [printType, setPrintType] = useState(project.labels[0].print_type);

  const alertRef = React.createRef();

  const goToDashboard = () => {
    history.push("/dashboard/live");
  };

  const success = (vals) => {
    alertRef.current.show({
      message: "Project edited successfully",
      callback: goToDashboard,
    });
  };

  const failure = (e) => {
    console.log(e);

    alertRef.current.show({
      message: "API error",
    });
  };

  const edit = (e) => {
    const data = {
      projectId: project.id,
      projectName,
      projectUrl: project.project_url,
      experienceOneText,
      experienceOneLink,
      experienceTwoText,
      experienceTwoLink,
      description,
      encryptions,
      material,
      printType,
    };

    apiEditProject(data, project.labels[0].id, success, failure);
  };

  const cancel = (e) => {
    history.push("/dashboard/live");
  };

  return (
    <div>
      <Container fluid>
        <Row className="color-div">
          <Col xs={12} sm={12} md={12} lg={12} xl={12} className="bg-white">
            <div className="Register-form">
              <Container>
                <Row>
                  <Col md={12} lg={12}>
                    <div className="logo">
                      <img src={logo} alt="logo" />
                    </div>
                    <div className="form">
                      <div className="Heading">
                        <p className="heading-1">Edit Project</p>
                      </div>

                      <Row>
                        <Col md={6} lg={6}>
                          <div className="form-floating">
                            <label htmlFor="projectName">Project Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="projectName"
                              value={projectName}
                              onChange={(e) => setProjectName(e.target.value)}
                              placeholder="Project Name"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} lg={6}>
                          <div className="form-floating">
                            <label htmlFor="projectName">
                              Experience One - Text
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="experienceOneText"
                              value={experienceOneText}
                              onChange={(e) =>
                                setExperienceOneText(e.target.value)
                              }
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
                              id="experienceOneLink"
                              value={experienceOneLink}
                              onChange={(e) =>
                                setExperienceOneLink(e.target.value)
                              }
                              placeholder="URL"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} lg={6}>
                          <div className="form-floating">
                            <label htmlFor="projectName">
                              Experience Two - Text
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="experienceTwoText"
                              value={experienceTwoText}
                              onChange={(e) =>
                                setExperienceTwoText(e.target.value)
                              }
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
                              onChange={(e) =>
                                setExperienceTwoLink(e.target.value)
                              }
                              placeholder="URL"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} lg={12}>
                          <div className="area-floating">
                            <label htmlFor="projectName">Description</label>
                            <textarea
                              type="text"
                              rows={6}
                              className="form-control"
                              id="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Project Description"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} lg={6}>
                          <div className="form-floating">
                            <label htmlFor="projectName">Material</label>
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
                      <Row>
                        <Col md={6} lg={6}>
                          <div className="form-floating">
                            <label htmlFor="projectName">
                              Number of Encryptions
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="encryptions"
                              value={encryptions}
                              onChange={(e) => setEncryptions(e.target.value)}
                              placeholder="1"
                            />
                          </div>
                        </Col>
                      </Row>
                      <div className="btns-flex">
                        <Button name="Save Changes" onclick={edit} />
                        <Button name="Cancel" onclick={cancel} />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
      <PopupAlert ref={alertRef} />
    </div>
  );
}

export default withRouter(EditProject);
