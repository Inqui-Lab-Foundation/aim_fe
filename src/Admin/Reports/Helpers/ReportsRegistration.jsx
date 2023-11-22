/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../Layout';
import { Container, Row, Col, Table } from 'reactstrap';
import { Button } from '../../../stories/Button';
import { CSVLink } from 'react-csv';
import {
    openNotificationWithIcon,
    getCurrentUser
} from '../../../helpers/Utils';
import { useHistory } from 'react-router-dom';
import {
    getDistrictData,
    getStateData,
    getFetchDistData
} from '../../../redux/studentRegistration/actions';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../Helpers/Select';
import { Bar } from 'react-chartjs-2';

import axios from 'axios';
import '../reports.scss';
import { Doughnut } from 'react-chartjs-2';
import { notification } from 'antd';
// import { categoryValue } from '../../Schools/constentText';

const ReportsRegistration = () => {
    const [RegTeachersdistrict, setRegTeachersdistrict] = React.useState('');
    const [RegTeachersState, setRegTeachersState] = React.useState('');

    const [filterType, setFilterType] = useState('');
    const [category, setCategory] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const filterOptions = ['Registered', 'Not Registered'];
    const categoryData = ['All Categorys', 'ATL', 'Non ATL'];
    // const categoryData =
    //     categoryValue[process.env.REACT_APP_LOCAL_LANGUAGE_CODE];

    const [downloadData, setDownloadData] = useState(null);
    const [downloadNotRegisteredData, setDownloadNotRegisteredData] =
        useState(null);
    const [chartTableData, setChartTableData] = useState([]);
    const csvLinkRefTable = useRef();
    const csvLinkRef = useRef();
    const csvLinkRefNotRegistered = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = getCurrentUser('current_user');
    const [registeredGenderChartData, setRegisteredGenderChartData] =
        useState(null);
    const [registeredChartData, setRegisteredChartData] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadComplete, setDownloadComplete] = useState(false);
    const [newFormat, setNewFormat] = useState('');
    const [barChart1Data, setBarChart1Data] = useState({
        labels: [],
        datasets: []
    });
    const fullStatesNames = useSelector(
        (state) => state?.studentRegistration?.regstate
    );
    const fiterDistData = useSelector(
        (state) => state?.studentRegistration?.fetchdist
    );
    const fullDistrictsNames = useSelector(
        (state) => state?.studentRegistration?.dists
    );
    const [downloadTableData, setDownloadTableData] = useState(null);
    const summaryHeaders = [
        {
            label: 'State Name',
            key: 'state'
        },
        {
            label: 'Total Eligible ATL Schools',
            key: 'ATL_Count'
        },
        {
            label: 'Total Not Registered ATL Schools',
            key: 'total_not_Reg_ATL'
        },
        {
            label: 'Total Registered ATL Schools',
            key: 'ATL_Reg_Count'
        },
        {
            label: 'Total Registered NON-ATL Schools',
            key: 'NONATL_Reg_Count'
        },
        {
            label: 'Total Registered Teachers (ATL+Non-ATL)',
            key: 'total_registered_teachers'
        },
        {
            label: ' Registered Male Teachers',
            key: 'male_mentor_count'
        },
        {
            label: ' Registered Female Teachers',
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
        dispatch(getStateData());
    }, []);
    useEffect(() => {
        if (RegTeachersState !== '') {
            dispatch(getFetchDistData(RegTeachersState));
        }
        setRegTeachersdistrict('');
        fetchChartTableData();
    }, [RegTeachersState]);

    // useEffect(() => {
    //     // dispatch(getDistrictData());
    //     fetchChartTableData();
    // }, []);

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
        const url =
            item === 'Registered'
                ? `/reports/mentorRegList?status=ACTIVE&state=${RegTeachersState}&district=${
                      RegTeachersdistrict === ''
                          ? 'All Districts'
                          : RegTeachersdistrict
                  }&category=${category}`
                : item === 'Not Registered'
                ? `/reports/notRegistered?state=${RegTeachersState}&district=${
                      RegTeachersdistrict === ''
                          ? 'All Districts'
                          : RegTeachersdistrict
                  }&category=${category}`
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
            !RegTeachersState ||
            // !RegTeachersdistrict ||
            !filterType ||
            !category
        ) {
            notification.warning({
                message:
                    'Please select a state,category and filter type before Downloading Reports.'
            });
            return;
        }
        setIsDownloading(true);
        fetchData(filterType);
    };

    useEffect(() => {
        if (filteredData.length > 0) {
            setDownloadData(filteredData);
        }
    }, [filteredData, downloadNotRegisteredData]);

    useEffect(() => {
        if (downloadComplete) {
            setDownloadComplete(false);
            setRegTeachersState('');

            setRegTeachersdistrict('');

            setFilterType('');
        }
        const newDate = new Date();
        const formattedDate = `${newDate.getUTCDate()}/${
            1 + newDate.getMonth()
        }/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
        setNewFormat(formattedDate);
    }, [downloadComplete]);

    const fetchChartTableData = () => {
        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/reports/mentorsummary',
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
                    const ATLregCount = lastRow?.ATL_Reg_Count || 0;
                    const NONATLregNotCount = lastRow?.NONATL_Reg_Count || 0;

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
                        labels: ['ATL Registered', 'NON ATL Registered'],
                        datasets: [
                            {
                                data: [ATLregCount, NONATLregNotCount],
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
                                onClick={() => history.push('/admin/reports')}
                            />
                        </Col>
                        <div className="reports-data p-5 mt-4 mb-5 bg-white">
                            <Row className="align-items-center">
                                <Col md={2}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={fullStatesNames}
                                            setValue={setRegTeachersState}
                                            placeHolder={'Select State'}
                                            value={RegTeachersState}
                                        />
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
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
                                <Col md={2}>
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
                                                        );
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
                                                                    NON-ATL
                                                                    Schools
                                                                </th>
                                                                <th>
                                                                    Total
                                                                    Registered
                                                                    Teachers
                                                                    (ATL+Non-ATL)
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
                                                                vs Non ATL
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
                                        filename={`MentorSummaryTable_${newFormat}.csv`}
                                        className="hidden"
                                        ref={csvLinkRefTable}
                                        // onDownloaded={() => {
                                        //     setIsDownloading(false);
                                        //     setDownloadComplete(true);
                                        // }}
                                    >
                                        Download Table CSV
                                    </CSVLink>
                                )}
                                {downloadData && (
                                    <CSVLink
                                        data={downloadData}
                                        headers={RegHeaders}
                                        filename={`Teacher_${filterType}Report_${newFormat}.csv`}
                                        className="hidden"
                                        ref={csvLinkRef}
                                        // onDownloaded={() => {
                                        //     setIsDownloading(false);
                                        //     setDownloadComplete(true);
                                        // }}
                                    >
                                        Download CSV
                                    </CSVLink>
                                )}
                                {downloadNotRegisteredData && (
                                    <CSVLink
                                        data={downloadNotRegisteredData}
                                        headers={notRegHeaders}
                                        filename={`Teacher_${filterType}Report_${newFormat}.csv`}
                                        className="hidden"
                                        ref={csvLinkRefNotRegistered}
                                        // onDownloaded={() => {
                                        //     setIsDownloading(false);
                                        //     setDownloadComplete(true);
                                        // }}
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
export default ReportsRegistration;
