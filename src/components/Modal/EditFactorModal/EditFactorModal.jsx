import React from "react";
import Modal from "react-bootstrap/Modal";
import "./EditFactorModal.scss";
import { Link } from "react-router-dom";
import { EditButton, TestButton, ActivateButton } from "../../../components";
import productImage from "../../../assets/images/projecttestimg.svg";
import { Button } from "../../Button";
import { data } from "../EditFactorModal/EditFactorData";

function EditFactorModal(props) {
  const editfactordata = data.map((datanew) => {
    return (
      <div key={datanew.id}>
        <h4>{datanew.factor}</h4>
        <tr key={datanew.id}>
          <td>
            <img
              alt="display"
              objectFit="cover"
              width="93px"
              height="83px"
              style={{
                borderRadius: "15px",
                backgroundColor: "#C4C4C4",
                backgroundSize: "cover",
              }}
              src={productImage}
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
                {datanew.projectname} &nbsp; | &nbsp; {datanew.label}
              </p>
              <p
                style={{
                  color: "#42444A",
                  fontWeight: "300",
                  fontSize: "14px",
                  lineHeight: "17px",
                  maxWidth: "230px",
                }}
              >
                {" "}
                {/* {el.description}{" "} */}
                {datanew.description}
              </p>
            </div>
          </td>

          <td>{datanew.range}</td>
          <td>{datanew.livescans}</td>
          <td
            style={{
              color: datanew.status === "Active" ? "#1E8C0E" : "#BCBFC9",
            }}
          >
            {datanew.status}
          </td>

          <td>
            <div className="btns-div">
              <ActivateButton
                state={datanew.status !== "Active" ? "inactive" : "active"}
                label={datanew.status === "Active" ? "Deactivate" : "Active"}
                onclick={(e) => {
                  e.preventDefault();
                  // activate(el);
                }}
              />
              <div className="bottom-buttons">
                <EditButton onclick={() => ""} />
                <TestButton
                // state={el.state === "TEST" ? "on" : "off"}
                // onclick={() => test(el)}
                />
              </div>
            </div>
          </td>

          <td>
            <Link
              className="links"
              to={{
                pathname: "/dashboard/project",
                //   state: { projectId: el.id },
              }}
            >
              .&nbsp;.&nbsp;.
            </Link>
          </td>
        </tr>{" "}
      </div>
    );
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="edit-factor">
          <h3>2 Factor Authentication</h3>
          <table className="edit-factor-table">
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Details</th>
                <th>Serial # Range</th>
                <th>Total Live Scans</th>
                <th>Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{editfactordata}</tbody>
          </table>
          <div className="edit-factor-button">
            <Button name="Add New Factor" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export { EditFactorModal };
