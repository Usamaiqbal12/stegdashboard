import React, { Component } from 'react';
import { searchIcon, rectangle } from '../../assets/images';
import './Tabledata.scss';
import $ from 'jquery';
import { NewProject } from '../../components';
class Project extends Component {
  constructor(props) {
    super(props);
    let Sidewidth = $('.div-sidebar').outerWidth();
    let Wheight = document.documentElement.clientHeight - 345;
    let Wwidth = document.documentElement.clientWidth - (Sidewidth + 78);
    this.state = {
      Theight: Wheight,
      Twidth: Wwidth,
    };
    this.timer = null;
    this.windowResized = this.windowResized.bind(this);
    this.updateWindowWidth = this.updateWindowWidth.bind(this);
    // let { keys, tag, head } = props;
    this.projects = [...Array(10)].reduce(
      (p) => [
        ...p,
        {
          productImage: rectangle,
          productContent: [
            'Woody | Label13',
            '<br/> Campaign “TakeOff”.<br/> Encrtyped Buzz <br/> Lightyear logo on box, under buzz <br/> fight, and label.',
          ],
          serial: 2,
          totalLiveScans: 25,
          status: 'active',
        },
        {
          productImage: rectangle,
          productContent: [
            'Woody | Label13',
            ' Campaign “TakeOff”. Encrtyped Buzz Lightyear logo on box, under buzz fight, and label.',
          ],
          serial: 2,
          totalLiveScans: 25,
          status: 'inactive',
        },
      ],
      []
    );

    // data =    [...Array(50)].map(()=>{
    this.data = this.projects.map((val, ind) => {
      // var img = rectangle;

      return [
        `<img src=${val.productImage} />`,
        val.productContent,
        val.serial,
        val.totalLiveScans,

        [
          `<div style="color:${
            val.status === 'active' ? '#86CD74' : '#74747450'
          }; " class="status-div">
                           ${val.status}
                      </div>`,
        ],

        [
          `<div class='btns-div'>
                               ${
                                 val.status === 'active'
                                   ? "<button class='btn btn-success activation-btun'>Activated</button>"
                                   : "<button class='btn btn-danger deactivation-btun'>Deactivate</button>"
                               }
                               <div class="bottom-buttons">
                                   <button class='btn btn-warning pencil-btun'>
                                     
                                       <span class="icon-pencil edit-icon"></span>
                                       <span class="edit-text">Edit</span>
                                       </button>
                                   <button class='btn btn-info Tick-btun'>
                                      
                                       <span class="icon-Tick2 tick-icon"></span>
                                       <span class="tick-text">Test</span>
                                   </button>
                               </div>
                           </div>`,
        ],

        // '<div style=" font-size:40px; margin-bottom: 15px;"> ... </div>',
      ];
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.windowResized);
    this.updateWindowWidth();

    this.mytable = $('#livetable2').DataTable({
      // pageLength: 6,
      dom: 'rti',
      searching: true,
      paging: false,
      info: false,
      data: this.data,
      scrollY: this.state.Theight,
      scrollX: true,
      responsive: true,
    });
    // this.mytable.search('woody').draw();
  }
  componentDidUpdate(prevProps, prevState) {
    // $('.dataTables_scrollHeadInner').css('width', this.state.Twidth);
    let upperWidth = $('.upper-div').outerWidth();
    $('#livetable2_wrapper').css('width', upperWidth);
    // console.log(this.state.Twidth);
    $('#livetable2_wrapper .dataTables_scrollBody').css(
      'height',
      this.state.Theight
    );
    $('#livetable2_wrapper .dataTables_scrollBody').css(
      'max-height',
      this.state.Theight
    );
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResized);
  }
  updateWindowWidth() {
    let _this = this;
    let Sidewidth = $('.div-sidebar').outerWidth();
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
    return (
      <div className="newprojectpage data-table">
        <div className="upper-div">
          <h3>Live Projects(2)</h3>
          <p className="data-p">Projects that are currently live and working</p>

          <div className="data-divs">
            <div className="search">
              <button className="search-icon">
                <img src={searchIcon} alt="" srcSet="" />
              </button>
              <input
                type="text"
                placeholder="Search Project..."
                onChange={({ target: { value } }) => {
                  if (this.mytable) this.mytable.search(value).draw();
                }}
              />
            </div>
            <div>
              <NewProject />
            </div>
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <table id="livetable2" className="livetable2 commonTable table">
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Details</th>
                <th>Serial # Range</th>
                <th>Total Live Scans</th>
                <th>Status</th>
                <th></th>
                {/* <th></th> */}
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  }
}

export { Project };
