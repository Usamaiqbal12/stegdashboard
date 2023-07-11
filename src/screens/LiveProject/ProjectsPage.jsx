import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { EditButton, TestButton, ActivateButton } from "../../components";
import { EditFactorModal } from "../../components/Modal/EditFactorModal/EditFactorModal";
import "./index.scss";
import orangetick from "../../assets/images/orangetick.svg";
import upDownArrow from "../../assets/images/updownArrow.svg";
import twoFactorArrow from "../../assets/images/twofactorarrow.svg";
// import * as $ from "jquery";
// import faCheck from '@fortawesome/free-solid-svg-icons/faCheck';

/*
function multiLabel(el, getStatus) {
  const { urlBase } = window.runConfig;
  var rows = [];
  for (var i = 1; i < el.labels.length; i++) {
    const src2 =
      urlBase + "api/v1/labels/" + el.labels[i].id + "?display_image=true";

    rows.push(
      <tr
        key={el.labels[i].id}
        className="d-flex justify-content-between"
        style={{ alignItems: "center" }}
      >
        <td style={{ border: "none" }}>
          <img
            alt="display"
            width="170"
            style={{ borderRadius: "10px" }}
            src={src2}
          />
        </td>
        <td style={{ border: "none", valign: "middle" }}>
          <small style={{ fontWeight: "500", fontSize: "14px" }}>
            {el.description}
          </small>
          <br />
        </td>
        <td style={{ border: "none" }}>
          <p style={{ fontWeight: "500", fontSize: "14px", margin: "0" }}>
            {getStatus(el)}
          </p>
        </td>
        <td style={{ paddingTop: "10px", border: "none" }}>
          <Link
            className="links"
            to={{
              pathname: "/dashboard/project",
              state: { projectId: el.id },
            }}
          >
            ...
          </Link>
        </td>
      </tr>
    );
  }

  return rows;
}
*/

const doThisEdit = (el, history) => {
  history.push({
    pathname: "/dashboard/editProject",
    state: { project: el },
  });
};

const ProjectsPage = ({ type, getStatus, activate, test, el }) => {
  const history = useHistory();
  const { urlBase } = window.runConfig;
  const [drop, setDrop] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const src =
    urlBase + "api/v1/labels/" + el.labels[0].id + "?display_image=true";

  const showDropdown = el.labels.length > 1;

  let numScans = 0;
  let encryptions = 0;
  el.labels.forEach(x => {
    numScans += x.num_scans;
    encryptions += x.encryptions;
  })

  return (
    <>
      <tr key={el.labels[0].id}>
        <td>
          <img
            alt="display"
            objectfit="cover"
            width="93px"
            height="83px"
            style={{
              borderRadius: "15px",
              backgroundColor: "#C4C4C4",
              backgroundSize: "cover",
            }}
            src={src}
          />
        </td>

        <td>
          <div className="d-flex flex-column">
            <p
              style={{
                paddingBottom: "0rem",
                marginBottom: 0,
                fontWeight: 500,
                paddingTop: "0.7rem",
              }}
            >
              {el.name}
            </p>
            <p
              style={{
                color: "#42444A",
                fontWeight: "300",
                fontSize: "14px",
                lineHeight: "16px",
                maxWidth: "230px",
              }}
            >
              {" "}
              {el.description}{" "}
            </p>

            {showDropdown ? (
              <div>
                <span
                  onClick={() => {
                    setDrop(!drop);
                  }}
                >
                  <img alt="tick" src={orangetick} width={17} /> &nbsp;
                  <small style={{ cursor: "pointer" }}>
                    Multi Factor &nbsp;
                    <img
                      alt="display"
                      src={upDownArrow}
                      style={{
                        ponterEvents: "auto",
                        cursor: "pointer",
                        transform: drop ? "rotate(180deg)" : "",
                        transition: "0.5s",
                      }}
                    />
                  </small>
                </span>
              </div>
            ) : null}
          </div>
          {/* <faCheck /> */}
        </td>
        <td>
          <div
            style={{
              width: "57px",
              height: "36px",
              background: "#F2F7FE",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.7rem",
              cursor: "pointer",
            }}
            onClick={() => setModalShow(true)}
          >
            02{" "}
            <img
              src={twoFactorArrow}
              alt="arrowimg"
              width="7px"
              // onClick={() => setModalShow(true)}
            ></img>
          </div>
          <EditFactorModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </td>
        <td>{encryptions}</td>
        <td>{numScans}</td>
        <td style={{ color: el.state === "ACTIVE" ? "#1E8C0E" : "#BCBFC9" }}>
          <span style={{ backgroundColor: el.state === "ACTIVE" ? "#22C55E1A" : "#BCBFC91A", padding: "3px 5px", borderRadius: "30px", display: "block", textAlign: "center" }}>
            {getStatus(el)}
          </span>
        </td>

        <td>
          {type === "PROCESSING" ? (
            <div className="btns-div">
              <div className="bottom-buttons">
                <EditButton onclick={() => doThisEdit(el, history)} />
              </div>
            </div>
          ) : (
            <div className="btns-div">
              <ActivateButton
                state={el.state !== "ACTIVE" ? "inactive" : "active"}
                label={el.state === "ACTIVE" ? "Deactivate" : "Active"}
                onclick={(e) => {
                  e.preventDefault();
                  activate(el);
                }}
              />
              <div className="bottom-buttons">
                <EditButton onclick={() => doThisEdit(el, history)} />
                {/* &nbsp;&nbsp; */}
                <TestButton
                  state={el.state === "TEST" ? "on" : "off"}
                  onclick={() => test(el)}
                />
              </div>
            </div>
          )}
        </td>

        <td>
          <Link
            className="links"
            to={{
              pathname: "/dashboard/project",
              state: { projectId: el.id },
            }}
          >
            .&nbsp;.&nbsp;.
          </Link>
        </td>
      </tr>
      {/* {showDropdown ? (
        <tr>
          <td>
            <div>
              {drop && (
                <>
                  <div>
                    <div
                      className="position-absolute"
                      style={{
                        boxShadow: "0px 5px 11px 5px lightgray",
                        background: "#FFFFFF",
                        width: "68vw",
                      }}
                    >
                      <table>
                        <tbody>{multiLabel(el, getStatus)}</tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      ) : (
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      )} */}
    </>
  );
};

export default ProjectsPage;
