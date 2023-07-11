import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import searchIcon from "../../assets/images/searchnew.svg";
import PopupAlert from "../../components/PopupAlert";
import * as $ from "jquery";
import tabNotification from "../../assets/images/tabnotification.svg";
import refreshIcon from "../../assets/images/refreshsideicon.svg";
import { apiFetchProjects, apiActivate, apiTest } from "../../api/projects";
import ProjectsPage from "./ProjectsPage";
import "./index.scss";

$.DataTable = require("datatables.net");

const counts = ["2nd", "3rd", "4th"];

class LiveProject extends Component {
  constructor(props) {
    super(props);

    let Sidewidth = $(".div-sidebar").outerWidth();
    let Wheight = document.documentElement.clientHeight - 345;
    let Wwidth = document.documentElement.clientWidth - (Sidewidth + 78);

    this.state = {
      Theight: Wheight,
      Twidth: Wwidth,
      projectData: [],
    };

    this.alertRef = React.createRef();

    this.timer = null;
    this.windowResized = this.windowResized.bind(this);
    this.updateWindowWidth = this.updateWindowWidth.bind(this);
    this.setProjects = this.setProjects.bind(this);
    this.update = this.update.bind(this);
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.doDeactivate = this.doDeactivate.bind(this);
    this.test = this.test.bind(this);
    this.doEdit = this.doEdit.bind(this);
    this.nextRow = this.nextRow.bind(this);
  }

  update(js) {
    apiFetchProjects(this.setProjects);
  }

  activate(el) {
    if (el.state !== "ACTIVE") {
      apiActivate(el.id, true, this.update);
    } else {
      this.deactivate(el);
    }
  }

  doDeactivate(el) {
    apiActivate(el.id, false, this.update);
  }

  deactivate(el) {
    this.alertRef.current.show({
      message: "This will deactivate your project, are you sure?",
      cancel_callback: () => {},
      callback: () => this.doDeactivate(el),
    });
  }

  test(el) {
    let doTest = true;
    if (el.state === "TEST") {
      doTest = false;
    }
    apiTest(el.id, doTest, this.update);
  }

  doEdit(el) {
    this.props.history.push({
      pathname: "/dashboard/editProject",
      state: { project: el },
    });
  }

  getStatus(el) {
    if (el.state === "ACTIVE") {
      return "Active";
    } else if (el.state === "INACTIVE") {
      return "Inactive";
    } else {
      return "PROJECT IN TEST";
    }
  }

  nextRow(proj, label, i) {
    const { urlBase } = window.runConfig;
    const src = urlBase + "api/v1/labels/" + label.id + "?master_image=true";

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

  setProjects(projects) {
    const vals = [];
    projects.forEach((el, o) => {
      if (
        el.id !== -1 &&
        el.labels.length > 0 &&
        el.labels[0].provisioning_status !== "PROCESSING"
      ) {
        vals.push(
          <ProjectsPage
            type="LIVE"
            key={el.id}
            getStatus={this.getStatus}
            test={this.test}
            activate={this.activate}
            el={el}
          />
        );
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

  render() {
    const { projectData } = this.state;

    return (
      <div className="newprojectpage data-table">
        <div className="header-project">
          <div>
            <h3>Live Projects</h3>
            <p className="data-p">
              Projects that are currently live and working
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
                <img src={searchIcon} alt="img" srcSet="" />
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
          <table id="livetable3" className="livetable3 commonTable">
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Details</th>
                <th>Total Factor</th>
                <th>Encryptions</th>
                <th>Total Live Scans</th>
                <th>Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{projectData}</tbody>
          </table>
        </div>
        <PopupAlert ref={this.alertRef} />
      </div>
    );
  }
}

export default withRouter(LiveProject);
