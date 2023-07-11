import React, { Component } from 'react'
import { apiFetchScans } from '../../../api/scans'
import $ from 'jquery'
import './DashboardTable.scss'
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import OutsideClickHandler from 'react-outside-click-handler';

const customSortIcon = [
    // Ascending sort icon
    <svg key="sort-asc" className='table-asc-arrow' width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.99994 10.625C5.90494 10.625 5.80994 10.59 5.73494 10.515L2.69994 7.48C2.55494 7.335 2.55494 7.095 2.69994 6.95C2.84494 6.805 3.08494 6.805 3.22994 6.95L5.62494 9.345V1.75C5.62494 1.545 5.79494 1.375 5.99994 1.375C6.20494 1.375 6.37494 1.545 6.37494 1.75V9.345L8.76994 6.95C8.91494 6.805 9.15494 6.805 9.29994 6.95C9.44494 7.095 9.44494 7.335 9.29994 7.48L6.26494 10.515C6.18994 10.59 6.09494 10.625 5.99994 10.625Z" fill="#0060F0" />
    </svg>,
    // Descending sort icon
    <svg key="sort-desc" className='table-desc-arrow' width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.99994 10.625C5.90494 10.625 5.80994 10.59 5.73494 10.515L2.69994 7.48C2.55494 7.335 2.55494 7.095 2.69994 6.95C2.84494 6.805 3.08494 6.805 3.22994 6.95L5.62494 9.345V1.75C5.62494 1.545 5.79494 1.375 5.99994 1.375C6.20494 1.375 6.37494 1.545 6.37494 1.75V9.345L8.76994 6.95C8.91494 6.805 9.15494 6.805 9.29994 6.95C9.44494 7.095 9.44494 7.335 9.29994 7.48L6.26494 10.515C6.18994 10.59 6.09494 10.625 5.99994 10.625Z" fill="#0060F0" />
    </svg>,
    // Unsorted icon
];

const columnss = [
    {
        name: 'Project Name',
        selector: row => row.label,
        sortable: true,
        width: '30%', // Adjust the width percentage as needed
        cell: row => <div style={{ width: '100%' }}>{row.label}</div>,
        headerCellClass: 'sortable-header',
    },
    {
        name: 'User ID',
        selector: row => row.id,
        sortable: true,
        width: '13%',
        cell: row => <div style={{ width: '100%' }}>{row.id}</div>,
        headerCellClass: 'sortable-header',
    },
    {
        name: 'Location',
        selector: row => row.location,
        sortable: true,
        width: '30%',
        cell: row => <div style={{ width: '100%' }}>{row.location}</div>,
        headerCellClass: 'sortable-header',
    },
    {
        name: 'Time',
        selector: row => row.timestamp,
        sortable: true,
    },
    {
        name: 'Status',
        selector: row => {
            if (row.result === "FAILED_TO_DECODE") {
                return "Fail"
            } else if (row.result === "SUCCESS") {
                return "Pass"
            } else if (row.result === "IN_PROGRESS") {
                return "In Progress"
            }
        },
        sortable: true,
    },
];
const SortIcon = (props) => {
    console.log(props, "sortDirection")
    return <div className="sort-icon">
        <svg className={sortDirection === 'asc' ? 'active' : ''} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.99994 10.625C5.90494 10.625 5.80994 10.59 5.73494 10.515L2.69994 7.48C2.55494 7.335 2.55494 7.095 2.69994 6.95C2.84494 6.805 3.08494 6.805 3.22994 6.95L5.62494 9.345V1.75C5.62494 1.545 5.79494 1.375 5.99994 1.375C6.20494 1.375 6.37494 1.545 6.37494 1.75V9.345L8.76994 6.95C8.91494 6.805 9.15494 6.805 9.29994 6.95C9.44494 7.095 9.44494 7.335 9.29994 7.48L6.26494 10.515C6.18994 10.59 6.09494 10.625 5.99994 10.625Z" fill="#0060F0" />
        </svg>
        <svg className={sortDirection === 'desc' ? 'active' : ''} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.99994 10.625C5.90494 10.625 5.80994 10.59 5.73494 10.515L2.69994 7.48C2.55494 7.335 2.55494 7.095 2.69994 6.95C2.84494 6.805 3.08494 6.805 3.22994 6.95L5.62494 9.345V1.75C5.62494 1.545 5.79494 1.375 5.99994 1.375C6.20494 1.375 6.37494 1.545 6.37494 1.75V9.345L8.76994 6.95C8.91494 6.805 9.15494 6.805 9.29994 6.95C9.44494 7.095 9.44494 7.335 9.29994 7.48L6.26494 10.515C6.18994 10.59 6.09494 10.625 5.99994 10.625Z" fill="#0060F0" />
        </svg>
    </div>
};
class DashboardTable extends Component {
    constructor(props) {
        super(props)
        let activityH = $('.activity').outerHeight()
        let swgH = $('.d-wmsg').outerHeight()
        let tableHead = $('.dataTables_scrollHead').outerHeight()
        let tableTitle = $('.dashboardPage.firstTable .heading ').outerHeight()
        let dataH = activityH - swgH - tableHead - tableTitle - 35
        this.state = {
            Aheight: activityH,
            Sheight: swgH,
            Theight: dataH,
            scanData: [],
            scans_data: [],
            csvData: [],
            pending: true,
            startDate: 'Select',
            endDate: ' Date',
            selectedValue: 'all',
            isOpen: false,
        }

        this.timer = null
        this.windowResized = this.windowResized.bind(this)
        this.updateWindowWidth = this.updateWindowWidth.bind(this)
        this.setScans = this.setScans.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.handleEvent = this.handleEvent.bind(this)
        this.setData = this.setData.bind(this)
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.selectOption = this.selectOption.bind(this);
    }


    setScans(scans) {
        const csvData = [
            ["Label", "Scanned By", "Location", "Time", 'Result'],
            ...scans.map(({ label, end_user_id, location, timestamp, result }) => [
                label,
                end_user_id,
                location,
                timestamp
            ]),
        ];
        this.setState({
            scans_data: scans,
            pending: false,
            csvData: csvData,
            scanData: scans
        })
    }

    componentDidMount() {
        window.addEventListener('resize', this.windowResized)
        apiFetchScans(true, -1, this.setScans)
    }

    componentDidUpdate(prevProps, prevState) {
        $('#dashboardtable_wrapper .dataTables_scrollBody').css(
            'height',
            this.state.Theight,
        )
        $('#dashboardtable_wrapper .dataTables_scrollBody').css(
            'max-height',
            this.state.Theight,
        )
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResized)
    }

    updateWindowWidth() {
        let _this = this
        let NactivityH = $('.activity').outerHeight()
        let NswgH = $('.d-wmsg').outerHeight()
        let tableHead = $('.dataTables_scrollHead').outerHeight()
        let tableTitle = $('.dashboardPage.firstTable .heading ').outerHeight()

        setTimeout(function () {
            _this.setState({
                Theight: NactivityH - NswgH - tableHead - tableTitle - 35,
            })
        })
    }

    windowResized() {
        let _this = this
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(function () {
            _this.updateWindowWidth()
        }, 500)
    }
    setData() {
        const data = this.state.scanData;
        let temp = [];

        if (this.state.selectedValue == 'all') {
            console.log('chala1111')
            temp = this.state.scanData
        } else {
            console.log('chala222')
            temp = data.filter((item) => {
                if (this.state.selectedValue == item.result)
                    return item;
            });

        }
        if (this.state.startDate != 'Select') {
            console.log('chala3333')
            const x = new Date(this.state.startDate);
            const y = new Date(this.state.endDate);
            temp = temp.filter((item) => {
                const z = new Date(item.timestamp);
                if (z >= x && z <= y)
                    return item;
            });
        }

        this.setState({
            scans_data: temp,
            csvData: temp
        })

    }
    handleEvent(event, picker) {
        this.setState({
            startDate: picker.startDate.format("YYYY-MM-DD"),
            endDate: picker.endDate.format("YYYY-MM-DD")
        }, () => {
            this.setData();
        })
    }
    onChange(event) {
        this.setState({
            selectedValue: event.target.value
        }, () => {
            this.setData();
        })
    }
    onCancel() {
        this.setState({
            startDate: 'Select',
            endDate: ' Date'
        }, () => {
            this.setData();
        })
    }
    toggleDropdown() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    selectOption(option) {
        this.setState({
            selectedOption: option,
            isOpen: false
        });
    }


    render() {
        const { scans_data, pending, selectedValue, isOpen } = this.state
        console.log(scans_data, "scans_data")
        const tableCustomStyles = {
            headCells: {
                style: {
                    fontSize: '12px',
                    fontWeight: '400',
                    justifyContent: 'center',
                    lineHeight: "18px",
                    fontFamily: 'Inter',
                    color: "rgba(0, 0, 0, 0.40)",
                    opacity: 1
                },
            },
            cells: {
                style: {
                    display: "flex",
                    justifyContent: "start"
                },
            }
        }


        return (
            <div className="dashboardPage firstTable" >
                <div className='recent-scan-headings' >
                    <div >
                        <p className="heading">Recent Scans</p>
                    </div>
                    {/* <div className="select-box" >
                        <select onChange={this.onChange} value={selectedValue} >
                            <option value={'all'}>All</option>
                            <option value={'SUCCESS'}>SUCCESS</option>
                            <option value={'FAILED_TO_DECODE'}>FAILED</option>

                        </select>
                    </div> */}
                    <OutsideClickHandler
                        onOutsideClick={() => this.setState(prevState => ({
                            isOpen: false
                        }))}
                    >

                        <div className="custom-select-dashboard" ref={this.wrapperRef}>
                            <div className={`select-box ${this.state.isOpen ? "open" : ""}`} onClick={this.toggleDropdown}>

                                <div className="selected-option">{selectedValue === "all" ? "All Scans" : selectedValue === "FAILED_TO_DECODE" ? "Fail" : selectedValue === "SUCCESS" ? "Pass" : selectedValue}</div>
                                <svg className='icon' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.8274 5.16393C3.0222 4.96523 3.32703 4.94716 3.54183 5.10974L3.60337 5.16393L8.00002 9.64894L12.3967 5.16393C12.5915 4.96523 12.8963 4.94716 13.1111 5.10974L13.1726 5.16393C13.3674 5.36264 13.3852 5.67358 13.2258 5.8927L13.1726 5.95547L8.38801 10.8361C8.19321 11.0348 7.88838 11.0528 7.67357 10.8903L7.61203 10.8361L2.8274 5.95547C2.61312 5.73689 2.61312 5.38251 2.8274 5.16393Z" fill="black" />
                                </svg>

                            </div>
                            {isOpen && (
                                <div className="dropdown">
                                    <div className={`option ${selectedValue === "all" ? "active" : ""}`} onClick={() => {
                                        this.setState({
                                            selectedValue: "all"
                                        }, () => {
                                            this.setData();
                                        })
                                        this.toggleDropdown()
                                    }}>
                                        All Scans
                                    </div>
                                    <div className={`option ${selectedValue === "SUCCESS" ? "active" : ""}`} onClick={() => {
                                        this.setState({
                                            selectedValue: "SUCCESS"
                                        }, () => {
                                            this.setData();
                                        })
                                        this.toggleDropdown()
                                    }}>
                                        Pass
                                    </div>
                                    <div className={`option ${selectedValue === "FAILED_TO_DECODE" ? "active" : ""}`} onClick={() => {
                                        this.setState({
                                            selectedValue: "FAILED_TO_DECODE"
                                        }, () => {
                                            this.setData();
                                        })
                                        this.toggleDropdown()
                                    }}>
                                        Fail
                                    </div>
                                </div>
                            )}
                        </div>
                    </OutsideClickHandler>
                </div>
                <div className="dashboard-table">
                    <DataTable
                        columns={columnss}
                        data={scans_data}
                        progressPending={pending}
                        customStyles={tableCustomStyles}
                        responsive
                    // sortIcon={customSortIcon}
                    // sortIcon={<SortIcon />}
                    />

                </div>
            </div >
        )
    }
}

export { DashboardTable }
