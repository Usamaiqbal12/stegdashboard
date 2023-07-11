import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import searchIcon from "../../assets/images/searchnew.svg";
import { EditButton } from "../../components";
import tabNotification from "../../assets/images/tabnotification.svg";
import refreshIcon from "../../assets/images/refreshsideicon.svg";
import "./index.scss";
import { ProcessingProjectData } from "./ProcessingList";
import * as $ from "jquery";
import { apiFetchProjects } from "../../api/projects";
$.DataTable = require("datatables.net");

const counts = ["2nd", "3rd", "4th"];
const data = [
  {
    id: 1,
    projectname: "Woody",
    label: " Label 13",
    description:
      "Campaign “TakeOff”. Encrtyped Buzz Lightyear logo on box, under buzz fight, and label.",
    status: "Processing",
  },
  {
    id: 2,
    projectname: "Woody",
    label: " Label 13",
    description:
      "Campaign “TakeOff”. Encrtyped Buzz Lightyear logo on box, under buzz fight, and label.",
    status: "Processing",
  },
  {
    id: 3,
    projectname: "Woody",
    label: " Label 13",
    description:
      "Campaign “TakeOff”. Encrtyped Buzz Lightyear logo on box, under buzz fight, and label.",
    status: "Processing",
  },
  {
    id: 4,
    projectname: "Woody",
    label: " Label 13",
    description:
      "Campaign “TakeOff”. Encrtyped Buzz Lightyear logo on box, under buzz fight, and label.",
    status: "Processing",
  },
];
/*
const newdata = data.map((datanew) => {
  return (
    <>
      <ProcessingProjectData
        label={datanew.label}
        description={datanew.description}
        projectname={datanew.projectname}
        status={datanew.status}
      />
    </>
  );
});
*/
class ProcessingList extends Component {
  constructor(props) {
    super(props);

    let Sidewidth = $(".div-sidebar").outerWidth();
    let Wheight = document.documentElement.clientHeight - 345;
    let Wwidth = document.documentElement.clientWidth - (Sidewidth + 78);

    this.state = {
      Theight: Wheight,
      Twidth: Wwidth,
      projectData: [],
      newData: [],
    };

    this.timer = null;
    this.windowResized = this.windowResized.bind(this);
    this.updateWindowWidth = this.updateWindowWidth.bind(this);
    this.setProjects = this.setProjects.bind(this);
    this.firstRow = this.firstRow.bind(this);
    this.nextRow = this.nextRow.bind(this);
  }

  firstRow(proj, label) {
    const { urlBase } = window.runConfig;
    const src = urlBase + "api/v1/labels/" + label.id + "?display_image=true";

    return (
      <tr key={label.id}>
        <td>
          <img alt="display" width="200" src={src} />
        </td>
        <td>{proj.name}</td>
        <td>{proj.state}</td>
        <td>
          <div className="btns-div">
            <div className="bottom-buttons">
              <EditButton onclick={() => this.doEdit(proj)} />
            </div>
          </div>
        </td>
      </tr>
    );
  }

  nextRow(proj, label, i) {
    const { urlBase } = window.runConfig;
    const src = urlBase + "api/v1/labels/" + label.id + "?display_image=true";

    return (
      <tr key={label.id}>
        <td>
          {proj.name} : {counts[i]} Label
        </td>
        <td>
          <img alt="display" width="200" src={src} />
        </td>
      </tr>
    );
  }

  getStatus(el) {
    if (el.state === "ACTIVE") {
      return "PROJECT ACTIVE";
    } else if (el.state === "INACTIVE") {
      return "PROJECT DEACTIVATED";
    } else {
      return "PROJECT IN TEST";
    }
  }

  test(el) {
    console.log("test");
  }

  activate(el) {
    console.log("activate");
  }

  setProjects(projects) {
    const vals = [];
    projects.forEach((el) => {
      if (
        el.labels.length > 0 &&
        el.labels[0].provisioning_status === "PROCESSING"
      ) {
        vals.push(
          <ProcessingProjectData
            key={el.id}
            id={el.id}
            el={el}
            label=""
            description={el.description}
            projectname={el.name}
            status={el.state}
            labelId={el.labels[0].id}
          />
        )
        /*
        vals.push(
          <ProjectsPage
            type="PROCESSING"
            key={el.id}
            getStatus={this.getStatus}
            test={this.test}
            activate={this.activate}
            doEdit={this.doEdit}
            el={el}
          />
        );
        */
        /*
        vals.push(this.firstRow(el, el.labels[0]));
        for (let i = 1; i < el.labels.length; i++) {
          vals.push(this.nextRow(el, el.labels[i], i-1));
        }
        */
        /*
          <tr key={ el.id }>
            <td>
              <img alt="display" width="200" src={ src } />
            </td>
            <td>{ el.name }</td>
            <td>{ el.state }</td>
            <td>
              <div className='btns-div'>
                <div className="bottom-buttons">
                  <EditButton onclick={() => this.doEdit(el)} />
                </div>
              </div>
            </td>
          </tr>
          */
      }
    });

    this.setState({ projectData: vals });
  }

  componentDidMount() {
    window.addEventListener("resize", this.windowResized);
    this.updateWindowWidth();
    apiFetchProjects(this.setProjects);
  }

  componentDidUpdate(prevProps, prevState) {
    $("#livetable3_wrapper .dataTables_scrollBody").css(
      "height",
      this.state.Theight
    );

    $("#livetable3_wrapper .dataTables_scrollBody").css(
      "max-height",
      this.state.Theight
    );
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.windowResized);
  }

  updateWindowWidth() {
    let _this = this;
    let Sidewidth = $(".div-sidebar").outerWidth();
    setTimeout(function () {
      _this.setState({
        Theight: document.documentElement.clientHeight - 345,
        Twidth: document.documentElement.clientWidth - (Sidewidth + 78),
      });
    });
  }

  windowResized() {
    let _this = this;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(function () {
      _this.updateWindowWidth();
    }, 500);
  }

  doEdit(el) {
    this.props.history.push({
      pathname: "/dashboard/editProject",
      state: { project: el },
    });
  }
  newdata = data.map((datanew) => {
    return (
      <>
        <ProcessingProjectData label={datanew.label} />
      </>
    );
  });

  render() {
    const { projectData } = this.state;

    return (
      <div className="newprojectpage data-table">
        <div className="header-project">
          <div>
            <h3>Processing Projects</h3>
            <p className="data-p">
              Projects that are currently being processed
            </p>
          </div>
          <div className="data-divs">
            <div className="search">
              <input
                type="text"
                placeholder="Search here..."
                onChange={({ target: { value } }) => {
                  if (this.mytable) this.mytable.search(value).draw();
                }}
              />
              <button className="search-icon">
                <img src={searchIcon} alt="" srcSet="" />
              </button>
            </div>
            <div className="side-icons">
              <img src={tabNotification} alt="img"></img>
              <div className="notification-circle"></div>
            </div>
            <div className="side-icons">
              {" "}
              <img src={refreshIcon} alt="img"></img>
            </div>
          </div>
        </div>
        <div className="project-table">
          <table id="processing-table" className="livetable3 commonTable">
            <thead>
              <tr>
                <th>Product Image</th>
                <th style={{ width: 350 }}>Product Details</th>
                <th style={{ width: 150 }}>Status</th>
                <th style={{ width: 100 }}></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{projectData}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(ProcessingList);
