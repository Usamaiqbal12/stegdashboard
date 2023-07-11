import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Icon, LiveScanTable } from "../../components";
// import { Map } from '../../components';
import { Row, Col } from "react-bootstrap";
import PopupAlert from "../../components/PopupAlert";
import { EditButton, TestButton, ActivateButton } from "../../components";
import "./index.scss";
import { apiScanStats } from "../../api/scans";
import { apiScansDownload, apiEncodingsDownload } from "../../api/download";
import { MapWrapper } from "../../components/GoogleMaps/MapWrapper";
import { apiActivate, apiFetchProject, apiTest } from "../../api/projects";

function ProcessingProject(props) {
  const [vals, setVals] = useState({});
  const [singleLabel, setSingleLabel] = useState({});
  const [masterUrl, setMasterUrl] = useState("");
  const [displayUrl, setDisplayUrl] = useState("");
  const [status, setStatus] = useState("");
  const [stats, setStats] = useState(null);

  const { urlBase } = window.runConfig;
  const { projectId } = props.location.state;

  const history = useHistory();
  const alertRef = React.createRef();

  const getStatus = (el) => {
    if (el.state === "ACTIVE") {
      return "PROJECT ACTIVE";
    } else if (el.state === "INACTIVE") {
      return "PROJECT DEACTIVATED";
    } else {
      return "PROJECT IN TEST";
    }
  };

  const setProject = (js) => {
    setVals(js);
    if (js.labels.length > 0) {
      setSingleLabel(js.labels[0]);

      const base = urlBase + "api/v1/labels/" + js.labels[0].id + "?";
      setMasterUrl(base + "master_image=true");
      setDisplayUrl(base + "display_image=true");
    }

    setStatus(getStatus(js));
  };

  const doSetStats = (stats) => {
    setStats(stats);
  };

  const update = (js) => {
    apiFetchProject(js.id, setProject);
  };

  const activate = (vals) => {
    if (vals.state !== "ACTIVE") {
      apiActivate(vals.id, true, update);
    } else {
      deactivate(vals);
    }
  };

  const doDeactivate = (el) => {
    apiActivate(el.id, false, update);
  };

  const deactivate = (el) => {
    alertRef.current.show({
      message: "This will deactivate your project, are you sure?",
      cancel_callback: () => {},
      callback: () => doDeactivate(el),
    });
  };

  const test = (el) => {
    const doTest = el.state === "TEST" ? false : true;
    apiTest(el.id, doTest, update);
  };

  const edit = (el) => {
    history.push({
      pathname: "/dashboard/editProject",
      state: { project: el },
    });
  };

  const elementHack = (data, type, filename) => {
    const element = document.createElement("a");
    const file = new Blob([data], { type: type });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
  };

  const handleStatsDownload = () => {
    apiScansDownload(vals.id, (data) => {
      elementHack(data, "text/csv", "stats.csv");
    });
  };

  const handleImagesDownload = () => {
    apiEncodingsDownload(vals.id, (data) => {
      elementHack(data, "application/zip", "encodings.zip");
    });
  };

  useEffect(() => {
    apiFetchProject(projectId, function (js) {
      setVals(js);
      if (js.labels.length > 0) {
        setSingleLabel(js.labels[0]);

        const base = urlBase + "api/v1/labels/" + js.labels[0].id + "?";
        setMasterUrl(base + "master_image=true");
        setDisplayUrl(base + "display_image=true");
      }

      setStatus(getStatus(js));
    });
    apiScanStats(projectId, doSetStats);
  }, [projectId, urlBase]);

  if (!stats) {
    return <p>loading...</p>;
  }

  return (
    <div className="process-projects">
      <div className="process-header">
        <div className="proces-proj-header">
          <div>
            <p>
              <Link className="links" to="/dashboard/live">
                <Icon name="faChevronLeft" />
                Back to live Projects
              </Link>
            </p>
            <h3>{vals.name_display}</h3>
          </div>
          <div className="proces-proj-buttons">
            <div>
              <p>
                {" "}
                <span></span>
                {status}
              </p>
            </div>
            <div>
              <ActivateButton
                state={vals.state !== "ACTIVE" ? "inactive" : "active"}
                label={vals.state === "ACTIVE" ? "Deactivate" : "Active"}
                onclick={(e) => {
                  e.preventDefault();
                  activate(vals);
                }}
              />
              &nbsp;&nbsp;
              <TestButton
                state={vals.state === "TEST" ? "on" : "off"}
                onclick={(e) => {
                  e.preventDefault();
                  test(vals);
                }}
              />
              &nbsp;&nbsp;
              <EditButton onclick={() => edit(vals)} />
            </div>
          </div>
        </div>
      </div>
      <div className="process-content">
        <div className="proces-projects-content">
          <Row>
            <Col md={6}>
              <div className="information">
                <div className="info-div-1">
                  <p className="info-h">Information</p>
                  <p className="info-down">
                    {" "}
                    <Link
                      className="info-down"
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleStatsDownload();
                      }}
                    >
                      <Icon name="faArrowDown" /> Download Stats
                    </Link>
                  </p>
                </div>
                <div className="info-div-2">
                  <p className="info-p">Project Name</p>
                  <p>{vals.name}</p>
                </div>
                <div className="info-div-3">
                  <p className="info-p">Description</p>
                  <p>{vals.description}</p>
                </div>
                <div className="info-div-4">
                  <div>
                    <p className="info-p">Material</p>
                    <p>{singleLabel.material}</p>
                  </div>
                  <div>
                    <p className="info-p">Print Type</p>
                    <p>{singleLabel.print_type}</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="process-images">
                <p className="process-h">Images</p>
                <Link
                  className="download-images"
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleImagesDownload();
                  }}
                >
                  <Icon name="faArrowDown" /> Download Encoded Images
                </Link>
                <div className="p-i-div">
                  <div style={{ marginRight: "10px" }}>
                    <img src={masterUrl} alt="project" width="200" />
                  </div>
                  <div>
                    <img src={displayUrl} width="200" alt="project" />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="process-div-2">
            <Col md={6} style={{ height: "min-content" }}>
              <div className="live-scan">
                <LiveScanTable projectId={props.location.state.projectId} />
              </div>
            </Col>
            <Col md={6}>
              <div id="general-statistics" className="general-statistics">
                <p>General Statistics</p>
                <p className="gs-p">Last updated: {Date().substring(0, 21)}</p>
                <div>
                  <div className="gs-1">
                    <div className="gs-div-1">
                      <p className="gs-p-1">Scanned Today</p>
                      <p className="gs-p-2">{stats.total}</p>
                    </div>
                    <div className="gs-div-2">
                      <iframe
                        title="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423283.4355457752!2d-118.69191196832071!3d34.020730498733336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1610705482750!5m2!1sen!2s"
                      ></iframe>
                      <div className="gs-div-2-1">
                        <p className="gs-p-1">Top Location</p>
                        <p className="gs-p-2">{stats.top}</p>
                      </div>
                    </div>
                  </div>

                  <div className="gs-2">
                    <div className="box1">
                      <div className="gs-div-3-1">
                        <p className="gs-p-1">Scans Passed</p>
                        <p className="gs-p-2">{stats.successes}</p>
                      </div>
                      <div className="gs-div-3-1">
                        <p className="gs-p-1">Scans Failed</p>
                        <p className="gs-p-2">{stats.failures}</p>
                      </div>
                    </div>
                    <div className="box1">
                      <div className="gs-div-3-1">
                        <p className="gs-p-1">IOS Scans</p>
                        <p className="gs-p-2">{stats.ios}</p>
                      </div>
                      <div className="gs-div-3-1">
                        <p className="gs-p-1">Android Scans</p>
                        <p className="gs-p-2">{stats.android}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {/*
          <div className="process-div-3">
            <Map locations={locations} />
          </div>
          */}
          <MapWrapper scans={stats.all_scans} />
        </div>
      </div>
      <PopupAlert ref={alertRef} />
    </div>
  );
}
export { ProcessingProject };
