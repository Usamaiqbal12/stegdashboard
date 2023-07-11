import React, { Component } from 'react';
import { apiFetchScans } from "../../../api/scans";
import $ from 'jquery';

class LiveScanTable extends Component {
  constructor(props) {
    super(props);

    let GH = $('#general-statistics').outerHeight();
    let dataH = GH - 117;

    this.state = {
      Theight: dataH,
      scanData: []
    };

    this.timer = null;
    this.windowResized = this.windowResized.bind(this);
    this.updateWindowWidth = this.updateWindowWidth.bind(this);
    this.setScans = this.setScans.bind(this);
  }
  
  setScans(scans) {
    this.setState({ scanData: 
      scans
      .sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
      .map(el => (
        <tr key={el.id}>
          <td>{el.end_user_id}</td>
          <td>{el.location}</td>
          <td>{el.timestamp}</td>
        </tr>
      ))
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.windowResized);
    this.updateWindowWidth();
    apiFetchScans(false, this.props.projectId, this.setScans);
  }

  componentDidUpdate(prevProps, prevState) {
    $('#livescantable_wrapper .dataTables_scrollBody').css(
      'height',
      this.state.Theight
    );
    $('#livescantable_wrapper .dataTables_scrollBody').css(
      'max-height',
      this.state.Theight
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResized);
  }

  updateWindowWidth() {
    let _this = this;
    let GH = $('#general-statistics').outerHeight();
    setTimeout(function () {
      _this.setState({
        Theight: GH - 117,
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
    return (
      <div className="projectdetail">
        <p className="heading">Live Scan Feed</p>
        <table id="livescantable" className="livescantable">
          <thead>
            <tr>
              <th>Scanned by</th>
              <th>Location</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {this.state.scanData.slice(0, 40)}
          </tbody>
        </table>
      </div>
    );
  }
}

export { LiveScanTable };
