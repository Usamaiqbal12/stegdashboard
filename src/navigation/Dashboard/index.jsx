import React, { useEffect, useState } from "react";
import { SideBar } from "../../components";
import "./Dashboard.scss";
import { Route, Switch } from "react-router-dom";
import LiveProject from "../../screens/LiveProject";
import { apiIsLoggedIn } from "../../api/login";
import {
  Dashboard,
  Project,
  ProcessingList,
  LiveProjectDetails,
  Setting,
  SignIn,
  CreateProject,
  EditProject,
} from "../../screens";
import $ from "jquery";

export const DashboardRoute = ({ match, location }) => {
  const [Wwidth, setWwidth] = useState(0);

  // const [Wwidth, setWwidth] = useState(document.documentElement.clientWidth - ($('.div-sidebar').outerWidth() + 78));

  useEffect(() => {
    let Sidewidth = $(".div-sidebar").outerWidth();
    const sidewidthcalc =
      document.documentElement.clientWidth - (Sidewidth + 78);
    setWwidth(sidewidthcalc);
    window.addEventListener(
      "resize",
      () => {
        let Sidewidth = $(".div-sidebar").outerWidth();
        const sidewidthcalc =
          document.documentElement.clientWidth - (Sidewidth + 78);
        if (sidewidthcalc !== setWwidth) setWwidth(sidewidthcalc);
      },
      false
    );
  }, []);

  const isLoggedIn = apiIsLoggedIn();

  // useEffect(() => {
  //   console.log('helo');
  //   // let Sidewidth = $('.div-sidebar').outerWidth();
  //   let Wwidth = document.documentElement.clientWidth - (Sidewidth + 78);
  //   setWwidth(Wwidth);

  // })
  // windowResized() {
  //   let _this = this;
  //   if (this.timer) {
  //     clearTimeout(this.timer);
  //   }
  //   this.timer = setTimeout(function () {
  //     _this.updateWindowWidth();
  //   }, 500);
  // }
  //       <div className="content " style={{width:Wwidth}}></div>

  return (
    <div>
      {isLoggedIn ? (
        <div className="dashboard">
          <div className="div-sidebar ">
            <SideBar url={match.url} pathname={location.pathname} />
          </div>

          <div className="content" style={{ width: Wwidth }}>
            <Switch>
              <Route exact path={`${match.url}`}>
                <Dashboard />
              </Route>
              <Route path={`${match.url}/oldProject`}>
                <Project />
              </Route>
              <Route path={`${match.url}/processing`}>
                <ProcessingList />
              </Route>
              <Route path={`${match.url}/setting`}>
                <Setting />
              </Route>
              <Route path={`${match.url}/live`}>
                <LiveProject />
              </Route>
              <Route path={`${match.url}/createProject`}>
                <CreateProject />
              </Route>
              <Route path={`${match.url}/editProject`}>
                <EditProject />
              </Route>
              <Route
                path={`${match.url}/project`}
                render={(props) => <LiveProjectDetails {...props} />}
              />
            </Switch>
          </div>
        </div>
      ) : <SignIn />}
    </div>
  );
};
