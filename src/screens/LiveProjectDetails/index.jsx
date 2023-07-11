import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Icon } from '../../components';
// import { Map } from '../../components';
import { Row, Col } from 'react-bootstrap';
import PopupAlert from '../../components/PopupAlert';
import { EditButton, TestButton, ActivateButton } from '../../components';
import './index.scss';
import { apiScanStats } from '../../api/scans';
import { apiEncodingsDownload } from '../../api/download';
// import { MapWrapper } from "../../components/GoogleMaps/MapWrapper";
import arrowDownOrange from '../../assets/images/arrowdownorange.svg';
import { DashboardTable } from '../../components';
import { apiActivate, apiFetchProject, apiTest } from '../../api/projects';

function LiveProjectDetails(props) {
  const [vals, setVals] = useState({});
  const [singleLabel, setSingleLabel] = useState({});
  const [masterUrl, setMasterUrl] = useState('');
  const [displayUrl, setDisplayUrl] = useState('');
  const [status, setStatus] = useState('');
  const [stats, setStats] = useState(null);

  const { urlBase } = window.runConfig;
  const { projectId } = props.location.state;

  const history = useHistory();
  const alertRef = React.createRef();

  const getStatus = (el) => {
    if (el.state === 'ACTIVE') {
      return 'PROJECT ACTIVE';
    } else if (el.state === 'INACTIVE') {
      return 'PROJECT DEACTIVATED';
    } else {
      return 'PROJECT IN TEST';
    }
  };

  const setProject = (js) => {
    setVals(js);
    if (js.labels.length > 0) {
      setSingleLabel(js.labels[0]);

      const base = urlBase + 'api/v1/labels/' + js.labels[0].id + '?';
      setMasterUrl(base + 'master_image=true');
      setDisplayUrl(base + 'display_image=true');
    }

    setStatus(getStatus(js));
  };

  const doSetStats = (stats) => {
    setStats(stats);
  };
  console.log(stats, 'stats');
  const update = (js) => {
    apiFetchProject(js.id, setProject);
  };

  const activate = (vals) => {
    if (vals.state !== 'ACTIVE') {
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
      message: 'This will deactivate your project, are you sure?',
      cancel_callback: () => {},
      callback: () => doDeactivate(el),
    });
  };

  const test = (el) => {
    const doTest = el.state === 'TEST' ? false : true;
    apiTest(el.id, doTest, update);
  };

  const edit = (el) => {
    history.push({
      pathname: '/dashboard/editProject',
      state: { project: el },
    });
  };

  const elementHack = (data, type, filename) => {
    const element = document.createElement('a');
    const file = new Blob([data], { type: type });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
  };

  /*
  const handleStatsDownload = () => {
    apiScansDownload(vals.id, (data) => {
      elementHack(data, "text/csv", "stats.csv");
    });
  };
  */

  const handleImagesDownload = () => {
    apiEncodingsDownload(vals.id, (data) => {
      elementHack(data, 'application/zip', 'encodings.zip');
    });
  };

  useEffect(() => {
    apiFetchProject(projectId, function (js) {
      setVals(js);
      if (js.labels.length > 0) {
        setSingleLabel(js.labels[0]);

        const base = urlBase + 'api/v1/labels/' + js.labels[0].id + '?';
        setMasterUrl(base + 'master_image=true');
        setDisplayUrl(base + 'display_image=true');
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
          <div className="header-link">
            <Icon name="faChevronLeft" color=" #000000;" />
            <Link className="back-link" to="/dashboard/live">
              Back to live Projects
            </Link>

            {/* <h3>{vals.name_display}</h3> */}
          </div>
          <div className="proces-proj-buttons">
            <div>
              <p>{status}</p>
            </div>
            <div className="bottom-btn">
              <ActivateButton
                state={vals.state !== 'ACTIVE' ? 'inactive' : 'active'}
                label={vals.state === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                onclick={(e) => {
                  e.preventDefault();
                  activate(vals);
                }}
              />

              <EditButton onclick={() => edit(vals)} />

              <TestButton
                state={vals.state === 'TEST' ? 'on' : 'off'}
                onclick={(e) => {
                  e.preventDefault();
                  test(vals);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="process-content">
        <div className="proces-projects-content">
          <Row>
            <Col md={7}>
              <div className="information">
                <div className="info-div-1">
                  <p className="info-h">Information</p>
                </div>
                <div className="info-div-2">
                  <p className="info-p">Project Name</p>
                  <p className="p-25 font-bold">{vals.name}</p>
                </div>
                <div className="info-div-2">
                  <p className="info-p">Description</p>
                  <p className="width-description">{vals.description}</p>
                </div>
                <div className="info-div-2">
                  <p className="info-p">Material</p>
                  <p className="p-58 font-bold">{singleLabel.material}</p>
                </div>
                <div className="info-div-2">
                  <p className="info-p">Print Type</p>
                  <p className="p-48 font-bold">{singleLabel.print_type}</p>
                </div>
              </div>
            </Col>
            <Col md={5}>
              <div className="process-images">
                <p className="process-h">Images</p>

                <div className="p-i-div">
                  <div>
                    <img
                      src={masterUrl}
                      alt="project"
                      className="project-images"
                    />
                    <p className="project-label ">Project Label</p>
                  </div>
                  <div>
                    <img
                      src={displayUrl}
                      className="project-images"
                      alt="project"
                    />
                    <p className="project-label">Project Image</p>
                  </div>
                </div>
                <Link
                  className="download-images"
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleImagesDownload();
                  }}
                >
                  <img src={arrowDownOrange} alt="arrow" />
                  <p>Download Encoded Images</p>
                </Link>
              </div>
            </Col>
          </Row>
          <Row className="process-div-2">
            {/* <Col md={6} style={{ height: "min-content" }}>
              <div className="live-scan">
                <LiveScanTable projectId={props.location.state.projectId} />
              </div>
            </Col> */}
            <Col md={12}>
              <div id="general-statistics" className="general-statistics">
                <div className="first-row-stats">
                  <div className="left-part">
                    <p className="gs-heading">General Statistics</p>
                    <p className="gs-heading">|</p>
                    <p className="gs-p">
                      Last updated: {Date().substring(0, 21)}
                    </p>
                  </div>{' '}
                  <Link
                    className="info-down"
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleImagesDownload();
                    }}
                  >
                    <img src={arrowDownOrange} alt="arrow" />
                    <p> Download Statistics</p>
                  </Link>
                </div>

                <div className="gs-1">
                  <div className="gs-div-1 color-1">
                    <p className="gs-p-2">{stats.total}</p>
                    <p className="gs-p-1">Scanned Today</p>
                  </div>
                  <div className="gs-div-1 color-2">
                    <p className="gs-p-2">{stats.successes}</p>
                    <p className="gs-p-1">Scans Passed</p>
                  </div>
                  <div className="gs-div-1 color-4">
                    <p className="gs-p-2">{stats.ios}</p>
                    <p className="gs-p-1">IOS Scans</p>
                  </div>
                  <div className="gs-div-1 color-5">
                    <p className="gs-p-2">{stats.android}</p>
                    <p className="gs-p-1">Android Scans</p>
                  </div>
                  <div className="gs-div-1 color-6">
                    <p className="gs-p-2">{stats.failures}</p>
                    <p className="gs-p-1">Scans Failed</p>
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
          {/* <MapWrapper scans={stats.all_scans} /> */}
          <Row>
            <Col md={8}>
              <div className="recent-scans">
                <DashboardTable />
              </div>
            </Col>
            <Col md={4}>
              {' '}
              <div className="map-div">
                <div className="s-div3">
                  <p className="a-p-2">Top Location</p>
                  {/* <p className="a-p-3">{top}</p> */}
                  <p className="a-p-3">Los Angeles</p>
                </div>
                <div className="map">
                  <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423283.4355457752!2d-118.69191196832071!3d34.020730498733336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1610705482750!5m2!1sen!2s"
                  ></iframe>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <PopupAlert ref={alertRef} />
    </div>
  );
}
export { LiveProjectDetails };
