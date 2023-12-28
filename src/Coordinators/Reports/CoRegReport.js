/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect, useRef } from 'react';
import Layout from '../Layout';
import { Container, Row, Col, Table } from 'reactstrap';
import { Button } from '../../stories/Button';
import { CSVLink } from 'react-csv';
import { openNotificationWithIcon, getCurrentUser } from '../../helpers/Utils';
import { useHistory } from 'react-router-dom';
import {
    getDistrictData,
    getFetchDistData
} from '../../redux/studentRegistration/actions';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../../Admin/Reports/Helpers/Select';
import axios from 'axios';
import '../../Admin/Reports/reports.scss';
import { Doughnut } from 'react-chartjs-2';
import { notification } from 'antd';
import { categoryValue } from '../../Admin/Schools/constentText';
// import { getDistrictByName } from '../../Coordinators/store/Coordinator/actions';
import { Bar } from 'react-chartjs-2';
import { encryptGlobal } from '../../constants/encryptDecrypt';
const CoRegReport = () => {
    const currentUser = getCurrentUser('current_user');
   
    const [RegTeachersState, setRegTeachersState] = React.useState(
        currentUser?.data[0]?.state_name
    );

    const [RegTeachersdistrict, setRegTeachersdistrict] = React.useState('');
    const [filterType, setFilterType] = useState('');
    const [category, setCategory] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const filterOptions = ['Registered', 'Not Registered'];
    const categoryData = ['All Categorys', 'ATL', 'Non ATL'];
    const [downloadData, setDownloadData] = useState(null);
    const [downloadNotRegisteredData, setDownloadNotRegisteredData] =
        useState(null);
    const [chartTableData, setChartTableData] = useState([]);
 

    const csvLinkRefTable = useRef();
    const csvLinkRef = useRef();
    const csvLinkRefNotRegistered = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const [registeredGenderChartData, setRegisteredGenderChartData] =
        useState(null);
    const [registeredChartData, setRegisteredChartData] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [newFormat, setNewFormat] = useState('');

    const [downloadComplete, setDownloadComplete] = useState(false);
    const fiterDistData = useSelector(
        (state) => state?.studentRegistration?.fetchdist
    );
    // const coordinator = useSelector((state) => state.coordinator);

    // useLayoutEffect(() => {
    //     if (currentUser?.data[0]?.district_name) {
    //         dispatch(getDistrictByName(currentUser?.data[0]?.district_name));
    //     }
    // }, [currentUser?.data[0]?.district_name]);

    // const fullDistrictsNames = useSelector(
    //     (state) => state?.studentRegistration?.dists
    // );
    const [downloadTableData, setDownloadTableData] = useState(null);
    const [barChart1Data, setBarChart1Data] = useState({
        labels: [],
        datasets: []
    });
    const summaryHeaders = [
        {
            label: 'State Name',
            key: 'state'
        },
        {
            label: 'Total ATL Eligible Schools',
            key: 'ATL_Count'
        },
        {
            label: 'Total Registered Teachers',
            key: 'total_registered_teachers'
        },
        {
            label: 'Total Registered ATL Teachers',
            key: 'ATL_Reg_Count'
        },
        {
            label: 'Total Registered Non ATL Teachers',
            key: 'NONATL_Reg_Count'
        },
        {
            label: 'Registered Male Teachers',
            key: 'male_mentor_count'
        },
        {
            label: 'Registered Female Teachers',
            key: 'female_mentor_count'
        }
    ];
    const RegHeaders = [
        {
            label: 'ATL CODE',
            key: 'organization.organization_code'
        },
        {
            label: 'UDISE CODE',
            key: 'organization.unique_code'
        },
        {
            label: 'School Name',
            key: 'organization.organization_name'
        },
        {
            label: 'School Type/Category',
            key: 'organization.category'
        },
        {
            label: 'State',
            key: 'organization.state'
        },
        {
            label: 'District',
            key: 'organization.district'
        },
        {
            label: 'City',
            key: 'organization.city'
        },
        {
            label: 'Pin code',
            key: 'organization.pin_code'
        },
        {
            label: 'Address',
            key: 'organization.address'
        },
        {
            label: 'HM Name',
            key: 'organization.principal_name'
        },
        {
            label: 'HM Contact',
            key: 'organization.principal_mobile'
        },
        {
            label: 'Teacher Name',
            key: 'full_name'
        },
        {
            label: 'Email ID',
            key: 'user.username'
        },
        {
            label: 'Teacher Gender',
            key: 'gender'
        },
        {
            label: 'Teacher Contact',
            key: 'mobile'
        },
        {
            label: 'Teacher WhatsApp Contact',
            key: 'whatapp_mobile'
        }
    ];
    const notRegHeaders = [
        {
            label: 'ATL CODE',
            key: 'organization_code'
        },
        {
            label: 'UDISE CODE',
            key: 'unique_code'
        },
        {
            label: 'School Name',
            key: 'organization_name'
        },
        {
            label: 'School Type/Category',
            key: 'category'
        },
        {
            label: 'State',
            key: 'state'
        },
        {
            label: 'District',
            key: 'district'
        },
        {
            label: 'City',
            key: 'city'
        },
        {
            label: 'Pin code',
            key: 'pin_code'
        },
        {
            label: 'Address',
            key: 'address'
        },
        {
            label: 'Country',
            key: 'country'
        },
        {
            label: 'HM Name',
            key: 'principal_name'
        },
        {
            label: 'HM Contact',
            key: 'principal_mobile'
        },
        {
            label: 'HM Email',
            key: 'principal_email'
        }
    ];

    useEffect(() => {
        // dispatch(getDistrictData());
        dispatch(getFetchDistData(currentUser?.data[0]?.state_name));
        fetchChartTableData();
        const newDate = new Date();
        const formattedDate = `${newDate.getUTCDate()}/${
            1 + newDate.getMonth()
        }/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
        setNewFormat(formattedDate);
        //setStatsShowTable(true);
    }, []);

    const chartOption = {
        maintainAspectRatio: false,
        legend: {
            position: 'bottom',
            labels: {
                fontColor: 'black'
            }
        },
        plugins: {
            legend: {
                labels: {
                    generateLabels: function (chart) {
                        return chart.data.labels.map(function (label, i) {
                            const value = chart.data.datasets[0].data[i];
                            const backgroundColor =
                                chart.data.datasets[0].backgroundColor[i];
                            return {
                                text: label + ': ' + value,
                                fillStyle: backgroundColor
                            };
                        });
                    }
                }
            }
        }
    };
    const chartOptions = {
        maintainAspectRatio: false,
        legend: {
            position: 'bottom',
            labels: {
                fontColor: 'black'
            }
        },
        plugins: {
            legend: {
                labels: {
                    generateLabels: function (chart) {
                        return chart.data.labels.map(function (label, i) {
                            const value = chart.data.datasets[0].data[i];
                            const backgroundColor =
                                chart.data.datasets[0].backgroundColor[i];
                            return {
                                text: label + ': ' + value,
                                fillStyle: backgroundColor
                            };
                        });
                    }
                }
            }
        }
    };
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 10
                },
                title: {
                    display: true,
                    text: 'Number of Registered ATL and Non ATL Schools',
                    color: 'blue'
                }
            },
            x: {
                grid: {
                    display: true,
                    drawBorder: true,
                    color: 'rgba(0, 0, 0, 0.2)',
                    lineWidth: 0.5
                },
                title: {
                    display: true,
                    text: 'States',
                    color: 'blue'
                },
                ticks: {
                    maxRotation: 80,
                    autoSkip: false
                    //maxTicksLimit: 10,
                }
            }
        }
    };
    const fetchData = (item) => {
        const regaram =
            RegTeachersdistrict === '' ? 'All Districts' : RegTeachersdistrict;
        const param = encryptGlobal(
            JSON.stringify({
                state: RegTeachersState,
                status: 'ACTIVE',
                district: regaram,
                category: category
            })
        );

        const params = encryptGlobal(
            JSON.stringify({
                state: RegTeachersState,
                district: regaram,
                category: category
            })
        );
        const url =
            item === 'Registered'
                ? `/reports/mentorRegList?Data=${param}`
                : item === 'Not Registered'
                ? `/reports/notRegistered?Data=${params}`
                : '';

        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + url,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };

        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    if (item === 'Registered') {
                        setFilteredData(response?.data?.data || []);
                        setDownloadData(response?.data?.data || []);

                        csvLinkRef.current.link.click();
                    } else if (item === 'Not Registered') {
                        //setNotRegisteredData(response?.data?.data || []);
                        setDownloadNotRegisteredData(
                            response?.data?.data || []
                        );
                        csvLinkRefNotRegistered.current.link.click();
                    }
                    openNotificationWithIcon(
                        'success',
                        `${filterType} Report Downloaded Successfully`
                    );
                    setIsDownloading(false);
                }
            })
            .catch((error) => {
                console.log('API error:', error);
                setIsDownloading(false);
            });
    };

    const handleDownload = () => {
        if (
            // !RegTeachersdistrict
            // ||
            !filterType ||
            !category
        ) {
            notification.warning({
                message:
                    'Please select a district,category and filter type before Downloading Reports.'
            });
            return;
        }
        setIsDownloading(true);
        fetchData(filterType);
    };

    useEffect(() => {
        if (filteredData.length > 0) {
            setDownloadData(filteredData);
            //setIsDownloading(false);
        }
    }, [filteredData, downloadNotRegisteredData]);

    useEffect(() => {
        if (downloadComplete) {
            setDownloadComplete(false);
            setRegTeachersdistrict('');
            setFilterType('');
        }
    }, [downloadComplete]);

    const fetchChartTableData = () => {
        const tabParam = encryptGlobal(
            JSON.stringify({
                state: currentUser?.data[0]?.state_name
            })
        );
        const config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/reports/mentorsummary?Data=${tabParam}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };

        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    const chartTableData = response?.data?.data || [];
                    setChartTableData(chartTableData);
                    setDownloadTableData(chartTableData);

                    const lastRow = chartTableData[chartTableData.length - 1];
                    const maleCount = lastRow?.male_mentor_count || 0;
                    const femaleCount = lastRow?.female_mentor_count || 0;
                    const regCount = lastRow?.ATL_Reg_Count || 0;
                    const regNotCount = lastRow?.NONATL_Reg_Count || 0;

                    setRegisteredGenderChartData({
                        labels: ['Male', 'Female'],
                        datasets: [
                            {
                                data: [maleCount, femaleCount],
                                backgroundColor: ['#36A2EB', '#FF6384'],
                                hoverBackgroundColor: ['#36A2EB', '#FF6384']
                            }
                        ]
                    });

                    setRegisteredChartData({
                        labels: ['Registered ATL ', 'Non ATLRegistered'],
                        datasets: [
                            {
                                data: [regCount, regNotCount],
                                backgroundColor: ['#36A2EB', '#FF6384'],
                                hoverBackgroundColor: ['#36A2EB', '#FF6384']
                            }
                        ]
                    });
                    const barData = {
                        labels: chartTableData.map((item) => item.state),
                        datasets: [
                            {
                                label: 'Registered ATL Schools',
                                data: chartTableData.map(
                                    (item) => item.ATL_Reg_Count
                                ),
                                backgroundColor: 'rgba(255, 0, 0, 0.6)'
                            },
                            {
                                label: 'Registered Non ATL Schools',
                                data: chartTableData.map(
                                    (item) => item.NONATL_Reg_Count
                                ),
                                backgroundColor: 'rgba(75, 162, 192, 0.6)'
                            }
                        ]
                    };
                    setBarChart1Data(barData);
                }
            })
            .catch((error) => {
                console.log('API error:', error);
            });
    };

    return (
        <>
            <Layout>
                <Container className="RegReports mt-4 mb-30 userlist">
                    <Row className="mt-0 pt-2">
                        <Col>
                            <h2>Teacher Registration Status</h2>
                        </Col>
                        <Col className="text-right mb-1">
                            <Button
                                label="Back"
                                btnClass="primary mx-3"
                                size="small"
                                shape="btn-square"
                                onClick={() =>
                                    history.push('/coordinator/report')
                                }
                            />
                        </Col>
                        <div className="reports-data p-5 mt-4 mb-5 bg-white">
                            <Row className="align-items-center">
                                <Col md={2}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <p>{RegTeachersState}</p>
                                        {/* <Select
                                            list={fullDistrictsNames}
                                            setValue={setRegTeachersdistrict}
                                            placeHolder={'Select District'}
                                            value={RegTeachersdistrict}
                                        /> */}
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        {/* <p>{RegTeachersdistrict}</p> */}
                                        <Select
                                            list={fiterDistData}
                                            setValue={setRegTeachersdistrict}
                                            placeHolder={'Select District'}
                                            value={RegTeachersdistrict}
                                        />
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={filterOptions}
                                            setValue={setFilterType}
                                            placeHolder={'Select Filter'}
                                            value={filterType}
                                        />
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={categoryData}
                                            setValue={setCategory}
                                            placeHolder={'Select Category'}
                                            value={category}
                                        />
                                    </div>
                                </Col>

                                <Col
                                    md={2}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    {/* <Button
                                        label="View Details"
                                        btnClass="primary mx-6"
                                        size="small"
                                        shape="btn-square"
                                        onClick={handleViewDetails}
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    /> */}
                                    <Button
                                        onClick={handleDownload}
                                        //label={'Download Report'}
                                        label={
                                            isDownloading
                                                ? 'Downloading'
                                                : 'Download Report'
                                        }
                                        // label={
                                        //     downloadComplete
                                        //         ? 'Download Complete'
                                        //         : isDownloading
                                        //         ? 'Downloading...'
                                        //         : 'Download Report'
                                        // }
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        type="submit"
                                        // style={{
                                        //     width: '160px',
                                        //     whiteSpace: 'nowrap',
                                        //     pointerEvents: isDownloading
                                        //         ? 'none'
                                        //         : 'auto'
                                        // }}
                                        disabled={isDownloading}
                                    />
                                </Col>
                            </Row>

                            <div className="chart">
                                {chartTableData.length > 0 && (
                                    <div className="mt-5">
                                        <div className="d-flex align-items-center mb-3">
                                            <h3>OVERVIEW</h3>
                                            <Button
                                                label="Download Table"
                                                btnClass="primary mx-2"
                                                size="small"
                                                shape="btn-square"
                                                onClick={() => {
                                                    if (downloadTableData) {
                                                        // setIsDownloading(true);
                                                        setDownloadTableData(
                                                            null
                                                        ); // Reset data
                                                        csvLinkRefTable.current.link.click();
                                                    }
                                                }}
                                                style={{
                                                    width: '150px',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="col-md-7">
                                                <div className="table-wrapper bg-white">
                                                    <Table
                                                        id="dataTable"
                                                        className="table table-striped table-bordered responsive"
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>
                                                                    State Name
                                                                </th>
                                                                <th>
                                                                    Total
                                                                    Eligible ATL
                                                                    Schools
                                                                </th>
                                                                <th>
                                                                    Total Not
                                                                    Registered
                                                                    ATL Schools
                                                                </th>
                                                                <th>
                                                                    Total
                                                                    Registered
                                                                    ATL Schools
                                                                </th>
                                                                <th>
                                                                    Total
                                                                    Registered
                                                                    NON ATL
                                                                    Schools
                                                                </th>
                                                                <th>
                                                                    Total
                                                                    Registered
                                                                    (ATL+Non-ATL)
                                                                    Teachers
                                                                </th>
                                                                <th>
                                                                    Registered
                                                                    Male
                                                                    Teachers
                                                                </th>
                                                                <th>
                                                                    Registered
                                                                    Female
                                                                    Teachers
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {chartTableData.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <tr
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <td>
                                                                            {index +
                                                                                1}
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.state
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.ATL_Count
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.total_not_Reg_ATL
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.ATL_Reg_Count
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.NONATL_Reg_Count
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.total_registered_teachers
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.male_mentor_count
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.female_mentor_count
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="row">
                                                    <div className="col-md-12 text-center mt-3">
                                                        <p>
                                                            <b>
                                                                Overall
                                                                Registered ATL
                                                                v/s Non ATL
                                                                Schools As of{' '}
                                                                {newFormat}
                                                            </b>
                                                        </p>
                                                    </div>
                                                    <div className="col-md-12 doughnut-chart-container">
                                                        {registeredChartData && (
                                                            <Doughnut
                                                                data={
                                                                    registeredChartData
                                                                }
                                                                options={
                                                                    chartOption
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="col-md-11 text-center mt-3">
                                                        <p
                                                            style={{
                                                                paddingLeft:
                                                                    '30px'
                                                            }}
                                                        >
                                                            <b>
                                                                Overall
                                                                Registered Male
                                                                vs Female
                                                                Teachers As of{' '}
                                                                {newFormat}
                                                            </b>
                                                        </p>
                                                    </div>
                                                    <div className="col-md-12 doughnut-chart-container">
                                                        {registeredGenderChartData && (
                                                            <Doughnut
                                                                data={
                                                                    registeredGenderChartData
                                                                }
                                                                options={
                                                                    chartOptions
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-5">
                                    <div
                                        className="col-md-12 chart-container mt-5"
                                        style={{
                                            width: '100%',
                                            height: '370px'
                                        }}
                                    >
                                        <div className="chart-box">
                                            <Bar
                                                data={barChart1Data}
                                                options={options}
                                            />
                                            <div className="chart-title">
                                                <p>
                                                    <b>
                                                        Registered ATL Schools
                                                        v/s Registered Non ATL
                                                        Schools {newFormat}
                                                    </b>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {downloadTableData && (
                                    <CSVLink
                                        data={downloadTableData}
                                        headers={summaryHeaders}
                                        // filename={`Mentor_Summary_Table.csv`}
                                        filename={`MentorSummaryTable_${newFormat}.csv`}
                                        className="hidden"
                                        ref={csvLinkRefTable}
                                        onDownloaded={() => {
                                            setIsDownloading(false);
                                            setDownloadComplete(true);
                                        }}
                                    >
                                        Download Table CSV
                                    </CSVLink>
                                )}
                                {downloadData && (
                                    <CSVLink
                                        data={downloadData}
                                        headers={RegHeaders}
                                        // filename={`Teacher_Registration_Status_${filterType}.csv`}
                                        filename={`Teacher_${filterType}Report_${newFormat}.csv`}
                                        className="hidden"
                                        ref={csvLinkRef}
                                        onDownloaded={() => {
                                            setIsDownloading(false);
                                            setDownloadComplete(true);
                                        }}
                                    >
                                        Download CSV
                                    </CSVLink>
                                )}
                                {downloadNotRegisteredData && (
                                    <CSVLink
                                        data={downloadNotRegisteredData}
                                        headers={notRegHeaders}
                                        // filename={`Teacher_Registration_Status_${filterType}.csv`}
                                        filename={`Teacher_${filterType}Report_${newFormat}.csv`}
                                        className="hidden"
                                        ref={csvLinkRefNotRegistered}
                                        onDownloaded={() => {
                                            setIsDownloading(false);
                                            setDownloadComplete(true);
                                        }}
                                    >
                                        Download Not Registered CSV
                                    </CSVLink>
                                )}
                            </div>
                        </div>
                    </Row>
                </Container>
            </Layout>
        </>
    );
};
export default CoRegReport;
