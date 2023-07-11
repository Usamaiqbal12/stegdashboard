import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header/Header';
import './Dashboard.scss';
import { dashboardWelcome } from '../../assets/images';
import downloadCsv from '../../assets/images/downloadCsvIcon.svg';
import datesIcon from '../../assets/images/datesIcon.svg';
import { DashboardTable } from '../../components';
import { Doughnut } from 'react-chartjs-2';
import { apiGetLogin } from '../../api/login';
import { apiFetchProjects } from '../../api/projects';
import { apiFetchScans } from '../../api/scans';
import { apiScanStats } from '../../api/scans';
import { useLoadScript } from '@react-google-maps/api';
import Map from './map';
import './style.css';
import { CSVLink } from 'react-csv';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
function Dashboard() {
  const [firstName, setFirstName] = useState('');
  const [circularData, setCircularData] = useState([0, 0, 0]);
  const [successes, setSuccesses] = useState(0);
  const [failures, setFailures] = useState(0);
  const [total, setTotal] = useState(0);
  const [scans, setScans] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [pickerDates, setPickerDates] = useState({
    startDate: 'Select',
    endDate: 'dates',
  });
  const handleEvent = (event, picker) => {
    setPickerDates({
      startDate: picker.startDate.format('YYYY-MM-DD'),
      endDate: picker.endDate.format('YYYY-MM-DD'),
    });
  };
  const onDateCanceled = () => {
    setPickerDates({ startDate: 'Select', endDate: 'dates' });
  };
  useEffect(() => {
    apiGetLogin(setLogin);
    apiFetchProjects(setProjectStats);
    apiScanStats(-1, setScanStats);
    apiFetchScans(true, -1, setScans);
  }, []);
  useEffect(() => {
    const newCsvData = [
      ['Label', 'Scanned By', 'Location', 'Time', 'Result'],
      ...scans.map(({ label, end_user_id, location, timestamp, result }) => [
        label,
        end_user_id,
        location,
        timestamp,
      ]),
    ];
    setCsvData(newCsvData);
  }, []);
  const setLogin = (vals) => {
    setFirstName(vals.first_name);
  };
  const setProjectStats = (projects) => {
    var processing = 0;
    var inactive = 0;
    var test = 0;
    var active = 0;
    console.log(projects, 'projects');
    projects.forEach((el) => {
      if (el.id === -1) {
      } else if (el.provisioning_status === 'PROCESSING') {
        processing += 1;
      } else if (el.state === 'INACTIVE') {
        inactive += 1;
      } else if (el.state === 'TEST') {
        test += 1;
      } else {
        active += 1;
      }
    });

    setCircularData([active, inactive, processing + test]);
  };
  console.log(circularData, 'circular-data');
  const setScanStats = (stats) => {
    setTotal(stats.total);
    setSuccesses(stats.successes);
    setFailures(stats.failures);
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: '', // Add your API key
  });

  return (
    <div className="main-dashboard">
      <div className="d-header">
        <div className="select-range">
          <DateRangePicker
            onApply={handleEvent}
            onCancel={onDateCanceled}
            initialSettings={{
              startDate: moment(new Date()).format('MM-DD-YYYY').toString(),
              endDate: moment(new Date()).format('MM-DD-YYYY').toString(),
            }}
          >
            <button className="btn-date">
              <img src={datesIcon} alt="date" />
              {pickerDates?.startDate}
              {pickerDates?.startDate === 'Select' ? ' ' : ' - '}
              {pickerDates?.endDate}
            </button>
          </DateRangePicker>
        </div>
        <div className="download">
          <CSVLink filename="my-file.csv" data={csvData}>
            <img src={downloadCsv} alt="download" />
            Download
          </CSVLink>
        </div>
      </div>
      <div className="row">
        <div className="col-md-7 cd-sm-12 mb-5">
          {/* <div className="d-wmsg">
            <div className="welcome-msg">
              <div className="w-div-1">
                <h1>Welcome back, {firstName}</h1>
                <p>
                  Take a look at your current projects or create a new project!
                </p>
                <a href="/dashboard/live"> View Live Projects</a>
              </div>
              <img
                src={dashboardWelcome}
                className="welcom-img"
                alt="welcome"
              />}
              <div className="w-div-2"></div>
            </div>
          </div> */}
          <div>
            <div className="statistics-div">
              {/* <p className="a-p">Daily Statistics</p> */}
              <div className="s-div-2">
                <div className="s-div">
                  <div className="icon-box color-2">
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 9L9.99998 16L6.99994 13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="#1daf58"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="content-box">
                    <p className="a-p-2">Scans Passed</p>
                    <p className="a-p-3">{successes}</p>
                  </div>
                </div>
                <div className="s-div">
                  <div
                    className="icon-box"
                    style={{ backgroundColor: '#EF44440D' }}
                  >
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="matrix(-1, 0, 0, 1, 0, 0)"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        {' '}
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="#EF4444"
                          stroke-width="2"
                        />{' '}
                        <path
                          d="M18 18L6 6"
                          stroke="#EF4444"
                          stroke-width="2"
                        />{' '}
                      </g>
                    </svg>
                  </div>
                  <div className="content-box">
                    <p className="a-p-2">Scans Fail</p>
                    <p className="a-p-3">{failures}</p>
                  </div>
                </div>
                <div className="s-div">
                  <div
                    className="icon-box"
                    style={{ backgroundColor: '#0060F00D' }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 22.75H7C2.59 22.75 1.25 21.41 1.25 17V7C1.25 2.59 2.59 1.25 7 1.25H8.5C10.25 1.25 10.8 1.82 11.5 2.75L13 4.75C13.33 5.19 13.38 5.25 14 5.25H17C21.41 5.25 22.75 6.59 22.75 11V17C22.75 21.41 21.41 22.75 17 22.75ZM7 2.75C3.42 2.75 2.75 3.43 2.75 7V17C2.75 20.57 3.42 21.25 7 21.25H17C20.58 21.25 21.25 20.57 21.25 17V11C21.25 7.43 20.58 6.75 17 6.75H14C12.72 6.75 12.3 6.31 11.8 5.65L10.3 3.65C9.78 2.96 9.62 2.75 8.5 2.75H7Z"
                        fill="#0060F0"
                      />
                      <path
                        d="M20 7.13C19.59 7.13 19.25 6.79 19.25 6.38V5C19.25 3.42 18.58 2.75 17 2.75H8C7.59 2.75 7.25 2.41 7.25 2C7.25 1.59 7.59 1.25 8 1.25H17C19.42 1.25 20.75 2.58 20.75 5V6.38C20.75 6.79 20.41 7.13 20 7.13Z"
                        fill="#0060F0"
                      />
                    </svg>
                  </div>
                  <div className="content-box">
                    <p className="a-p-2">Scanned Today</p>
                    <p className="a-p-3">{total}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="recent-scans">
              <DashboardTable />
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="map-div mb-3 mt-0">
            {/* <p className="a-p">Daily Statistics</p>
              <div className="s-div-1 ">
                <p className="a-p-2">Scanned Today</p>
                <p className="a-p-3">{total}</p>
              </div>
              <div className="s-div-2">
                <div className="s-div">
                  <p className="a-p-2">Scanned Passed</p>
                  <p className="a-p-3">{successes}</p>
                </div>
                <div className="s-div">
                  <p className="a-p-2">Scanned Failed</p>
                  <p className="a-p-3">{failures}</p>
                </div>
              </div> */}
            <div className="s-div3 d-flex gap-2">
              <p className="a-p-2">Top Location:</p>
              {/* <p className="a-p-3">{top}</p> */}
              <p className="a-p-2">
                <strong>Los Angeles</strong>
              </p>
            </div>
            <div className="map">
              {isLoaded && scans.length > 0 ? <Map scans={scans} /> : null}
              {/*<iframe*/}
              {/*  title="map"*/}
              {/*  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423283.4355457752!2d-118.69191196832071!3d34.020730498733336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1610705482750!5m2!1sen!2s"*/}
              {/*></iframe>*/}
            </div>
          </div>
          <div className="activity">
            <div className="graph-div">
              <p className="activity-heading">Activity</p>
              {/* <p className="a-p">Project Status</p> */}
              <div className="row">
                <div className="col-3">
                  <div className="chart-alignment">
                    <div className="chart-div">
                      <Doughnut
                        width={100}
                        height={100}
                        options={{
                          tooltips: {
                            enabled: false,
                          },
                          legend: {
                            display: false,
                          },
                          cutoutPercentage: 60,
                          rotation: 150,
                          responsive: true,
                          plugins: {
                            tooltip: {
                              enabled: false, // Disable the tooltip
                            },
                            // doughnutlabel: {
                            //   labels: [
                            //     {
                            //       text: '550',
                            //       font: {
                            //         size: 12,
                            //         weight: 'bold',
                            //         color: 'red',
                            //       },
                            //       position: 'bottom',
                            //     },

                            //     {
                            //       text: 'total',
                            //     },
                            //   ],
                            // },
                          },
                        }}
                        className="my-chart"
                        data={{
                          labels: ['Live', 'Processing', 'Inactive'],
                          datasets: [
                            {
                              tooltip: {
                                enabled: false,
                              },
                              data: circularData,
                              rotation: 100,
                              backgroundColor: [
                                '#3B82F6',
                                '#93c5fd',
                                '#dbeafe',
                              ],
                              borderAlign: 'inner',
                              borderCapStyle: 'round',
                              label: false,
                              borderJoinStyle: 'round',
                              radius: 20,
                              borderWidth: 0,
                              hoverBackgroundColor: [
                                '#3B82F6',
                                '#93c5fd',
                                '#dbeafe',
                              ],
                            },
                          ],
                          radius: 10,
                        }}
                      />
                      {/* <Doughnut
                        width={100}
                        height={100}
                        options={{
                          legend: {
                            display: false,
                          },
                          cutoutPercentage: 60,
                          rotation: 150,
                          responsive: true,
                          plugins: {
                            doughnutlabel: {
                              labels: [
                                {
                                  text: '550',
                                  font: {
                                    size: 12,
                                    weight: 'bold',
                                    color: 'red',
                                  },
                                  position: 'bottom',
                                },

                                {
                                  text: 'total',
                                },
                              ],
                            },
                          },
                        }}
                        data={{
                          labels: ['Live', 'Processing', 'Inactive'],
                          datasets: [
                            {
                              data: circularData,
                              rotation: 100,
                              backgroundColor: [
                                '#3B82F6',
                                '#93c5fd',
                                '#dbeafe',
                              ],
                              borderAlign: 'inner',
                              borderCapStyle: 'round',
                              label: false,
                              borderJoinStyle: 'round',
                              radius: 20,
                              hoverBackgroundColor: [
                                '#3B82F6',
                                '#93c5fd',
                                '#dbeafe',
                              ],
                              hoverBorderWidth: [1, 1, 1],
                            },
                          ],
                          radius: 10,
                        }}
                      /> */}
                    </div>
                    {/*<div className="chart-center">*/}
                    {/*  <span>100%</span>*/}
                    {/*</div>*/}
                  </div>
                </div>
                <div className="col-9">
                  <ul>
                    <li className="live">
                      {' '}
                      <span className="chartLabel">Live</span>
                      <span> {circularData[0]} </span>
                    </li>
                    <li className="processing">
                      {' '}
                      <span className="chartLabel">Processing</span>
                      <span> {circularData[1]} </span>
                    </li>
                    <li className="inactive">
                      {' '}
                      <span className="chartLabel">Inactive</span>
                      <span> {circularData[2]} </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="button-div">
            <NewProject />
          </div> */}
        </div>
      </div>
      <div className="help-btn">
        <div>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_32_3520)">
              <path
                d="M6 11C3.2385 11 1 8.7615 1 6C1 3.2385 3.2385 1 6 1C8.7615 1 11 3.2385 11 6C11 8.7615 8.7615 11 6 11ZM6 10C7.06087 10 8.07828 9.57857 8.82843 8.82843C9.57857 8.07828 10 7.06087 10 6C10 4.93913 9.57857 3.92172 8.82843 3.17157C8.07828 2.42143 7.06087 2 6 2C4.93913 2 3.92172 2.42143 3.17157 3.17157C2.42143 3.92172 2 4.93913 2 6C2 7.06087 2.42143 8.07828 3.17157 8.82843C3.92172 9.57857 4.93913 10 6 10V10ZM5.5 7.5H6.5V8.5H5.5V7.5ZM6.5 6.6775V7H5.5V6.25C5.5 6.11739 5.55268 5.99021 5.64645 5.89645C5.74021 5.80268 5.86739 5.75 6 5.75C6.14204 5.74999 6.28116 5.70965 6.40116 5.63366C6.52117 5.55768 6.61713 5.44918 6.67789 5.32079C6.73864 5.1924 6.76168 5.0494 6.74434 4.90842C6.727 4.76745 6.66998 4.63429 6.57992 4.52446C6.48986 4.41462 6.37046 4.33261 6.23561 4.28798C6.10077 4.24335 5.95602 4.23793 5.81821 4.27235C5.68041 4.30677 5.55521 4.37962 5.45718 4.48241C5.35916 4.5852 5.29234 4.71372 5.2645 4.853L4.2835 4.6565C4.34432 4.35254 4.48475 4.07019 4.69046 3.83829C4.89617 3.6064 5.15976 3.43329 5.45429 3.33666C5.74883 3.24003 6.06374 3.22334 6.36684 3.28831C6.66994 3.35327 6.95035 3.49756 7.17941 3.70641C7.40847 3.91527 7.57796 4.1812 7.67056 4.47703C7.76315 4.77286 7.77553 5.08797 7.70643 5.39015C7.63733 5.69234 7.48923 5.97075 7.27726 6.19693C7.06529 6.42312 6.79707 6.58896 6.5 6.6775V6.6775Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_32_3520">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Help
        </div>
      </div>
    </div>
  );
}

export { Dashboard };
