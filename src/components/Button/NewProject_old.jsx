import React from "react";
// import { useHistory } from "react-router-dom";
// import { ProjectModal } from "../Modal/Modal";
import { NewProjectModal } from "../Modal/DashboardModal/NewProjectModal";
import plusIcon from "../../assets/images/plusicon.svg";
import "./NewProject.scss";

function NewProject() {
  // const history = useHistory();
  const [modalShow, setModalShow] = React.useState(false);

  // const toCreateProject = (e) => {
  //   history.push("/dashboard/createProject");
  // };

  return (
    <div className="new-project-btn">
      <button className="mt-0" onClick={() => setModalShow(true)}>
        <img src={plusIcon} alt="icon" className="icon-plus"></img>
        New Project
      </button>
      <NewProjectModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export { NewProject };
