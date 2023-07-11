import React from "react";
import { Link, useHistory } from "react-router-dom";
import { EditButton } from "../../components";
import "./index.scss";
// import projectTest from "../../assets/images/projecttestimg.svg";

const { urlBase } = window.runConfig;

function ProcessingProjectData(props) {
  const src =
    urlBase + "api/v1/labels/" + props.labelId + "?display_image=true";

  const history = useHistory();

  const edit = () => {
    history.push({
      pathname: "/dashboard/editProject",
      state: { project: props.el },
    });
  };

  return (
    <tr key={props.id}>
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
            {props.projectname}
          </p>
          <p
            style={{
              color: "#42444A",
              fontWeight: "300",
              fontSize: "14px",
              lineHeight: "16px",
              maxWidth: "350px",
            }}
          >
            {" "}
            {props.description}
          </p>
        </div>
      </td>
      <td
        style={{ color: props.status === "Active" ? "#1E8C0E" : "#BCBFC9" }}
      >
        {props.status}
      </td>
      <td>
        <div className="btns-div">
          <div className="bottom-buttons">
            <EditButton onclick={edit} />
          </div>
        </div>
      </td>
      <td>
        <Link
          className="links"
          to={{
            pathname: "/dashboard/project",
            state: { projectId: props.id },
          }}
        >
          .&nbsp;.&nbsp;.
        </Link>
      </td>
    </tr>
  );
}

export { ProcessingProjectData };
