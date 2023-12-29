/* eslint-disable no-undef */
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
import { cardData } from '../../../Student/Pages/Ideas/SDGData.js';

import axios from 'axios';
import '../reports.scss';
import { Doughnut } from 'react-chartjs-2';
import { notification } from 'antd';
import { encryptGlobal } from '../../../constants/encryptDecrypt.js';
// import { categoryValue } from '../../Schools/constentText';

const ReportsRegistration = () => {
    const [RegTeachersdistrict, setRegTeachersdistrict] = React.useState('');
    const [RegTeachersState, setRegTeachersState] = React.useState('');
    const [totalCount, setTotalCount] = useState([]);

    const SDGDate = cardData.map((i) => {
        return i.goal_title;
    });
    SDGDate.unshift('All Themes');
    const [sdg, setsdg] = React.useState('');
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
    const [responseData, setResponseData] = useState(null);
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
            label: 'No of Ideas Submitted',
            key: 'totalSubmited'
        },
        {
            label: 'No of ATL Ideas',
            key: 'ATL_Count'
        },
        {
            label: 'No of Non ATL Ideas',
            key: 'NonATL_Count'
        },
        {
            label: 'Agriculture',
            key: 'Agriculture'
        },
        {
            label: 'Disaster Management',
            key: 'DisasterManagement'
        },
        {
            label: 'Education Skill Development',
            key: 'EducationSkillDevelopment'
        },
        {
            label: 'Health',
            key: 'Health'
        },
        {
            label: 'Inclusivity',
            key: 'Inclusivity'
        },
        {
            label: 'Mobility',
            key: 'Mobility'
        },
        {
            label: 'OTHERS',
            key: 'OTHERS'
        },
        {
            label: 'Space',
            key: 'Space'
        }
    ];
    const teacherDetailsHeaders = [
        {
            label: 'ATL CODE',
            key: 'organization_code'
        },
        {
            label: 'UDISE CODE',
            key: 'unique_code'
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
            label: 'CID',
            key: 'challenge_response_id'
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
            label: 'Pin code',
            key: 'pin_code'
        },
        {
            label: 'Address',
            key: 'address'
        },

        // {
        //     label: 'City',
        //     key: 'city'
        // },
        // {
        //     label: 'HM Name',
        //     key: 'HM Name'
        // },
        // {
        //     label: 'HM Contact',
        //     key: 'HM Contact'
        // },
        {
            label: 'Teacher Name',
            key: 'full_name'
        },
        {
            label: 'Teacher Email',
            key: 'email'
        },

        {
            label: 'Teacher Contact',
            key: 'mobile'
        },

        {
            label: 'Team Name',
            key: 'team_name'
        },
        {
            label: 'Student Name',
            key: 'Students names'
        },
        {
            label: 'Theme',
            key: 'sdg'
        },
        {
            label: 'Idea Title',
            key: '1'
        },
        {
            label: 'Problem Statement',
            key: 'sub_category'
        },
        { label: 'Explain your innovation and working in detail', key: '2' },
        {
            label: 'What ATL tools / technologies have you used while developing your project ?',
            key: '3'
        },
        {
            label: 'Upload Research Document of your project and your team group photo',
            key: '4'
        },
        {
            label: 'Upload Video of your project (Share Youtube link)',
            key: '5'
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
    //     dispatch(getDistrictData());
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
    const fetchData = () => {
        const IdeaPram = encryptGlobal(
            JSON.stringify({
                status: 'ACTIVE',
                state: RegTeachersState,
                district: RegTeachersdistrict === '' ? 'All Districts' : RegTeachersdistrict,
                category: category,
                sdg: sdg
            })
        );
        // alert('hi');
        const config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/reports/ideadeatilreport?Data=${IdeaPram}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        // const url = `/reports/ideadeatilreport?status=ACTIVE&state=${RegTeachersState}&district=${
        //     RegTeachersdistrict === '' ? 'All Districts' : RegTeachersdistrict
        // }&category=${category}&sdg=${sdg}`;

        // const config = {
        //     method: 'get',
        //     url: process.env.REACT_APP_API_BASE_URL + url,
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${currentUser?.data[0]?.token}`
        //     }
        // };

        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    const transformedData = response.data.data.map((entry) => {
                        const { response, ...rest } = entry;
                        const parsedResponse = JSON.parse(response);

                        Object.keys(parsedResponse).forEach((key) => {
                            const { challenge_question_id, selected_option } =
                                parsedResponse[key];
                            entry[challenge_question_id] =
                                selected_option.toString();
                        });

                        return {
                            ...entry
                        };
                    });
                
                    setDownloadData(transformedData);
                    csvLinkRef.current.link.click();
                    openNotificationWithIcon(
                        'success',
                        `Ideas Detailed Reports Downloaded Successfully`
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
        // alert('hii');
        if (
            !RegTeachersState ||
            // !RegTeachersdistrict ||
            // !filterType ||
            !category ||
            !sdg
        ) {
            notification.warning({
                message:
                    'Please select a state,category and Theme type before Downloading Reports.'
            });
            return;
        }
        setIsDownloading(true);
        fetchData();
    };

    // useEffect(() => {
    //     if (filteredData.length > 0) {
    //         setDownloadData(filteredData);
    //     }
    // }, [filteredData, downloadNotRegisteredData]);

    useEffect(() => {
        if (downloadComplete) {
            setDownloadComplete(false);
            setRegTeachersState('');

            setRegTeachersdistrict('');

            // setFilterType('');
            setsdg('');
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
            url:
                process.env.REACT_APP_API_BASE_URL + '/reports/ideaReportTable',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };

        axios(config)
            .then((res) => {
                if (res.status === 200) {
                    const chartTableData = res?.data?.data || [];

                    const total = chartTableData.reduce(
                        (acc, item) => {
                            (acc.totalSubmited += item.totalSubmited),
                                (acc.ATL_Count += item.ATL_Count);
                            acc.NonATL_Count += item.NonATL_Count;
                            acc.Agriculture += item.Agriculture;
                            acc.DisasterManagement += item.DisasterManagement;
                            acc.EducationSkillDevelopment +=
                                item.EducationSkillDevelopment;
                            acc.Health += item.Health;
                            acc.Inclusivity += item.Inclusivity;
                            acc.Mobility += item.Mobility;

                            acc.OTHERS += item.OTHERS;

                            acc.Space += item.Space;
                            return acc;
                        },
                        {
                            totalSubmited: 0,
                            ATL_Count: 0,
                            NonATL_Count: 0,
                            Agriculture: 0,
                            DisasterManagement: 0,
                            EducationSkillDevelopment: 0,
                            Health: 0,
                            Inclusivity: 0,
                            Mobility: 0,
                            OTHERS: 0,
                            Space: 0
                        }
                    );
                    setRegisteredGenderChartData({
                        labels: [
                            'Agriculture',
                            'Disaster Management',
                            'Education Skill Development',
                            'Health',
                            'Inclusivity',
                            'Mobility',
                            'OTHERS',
                            ' Space'
                        ],
                        datasets: [
                            {
                                data: [
                                    total.Agriculture,
                                    total.DisasterManagement,
                                    total.EducationSkillDevelopment,
                                    total.Health,
                                    total.Inclusivity,
                                    total.Mobility,
                                    total.OTHERS,
                                    total.Space
                                ],
                                backgroundColor: [
                                    '#36A2EB',
                                    '#FF6384',
                                    '#33FF00',
                                    '#993300',
                                    '#CCFF00',
                                    '#FF9900',
                                    '#FF0099',
                                    '#FFA07A'
                                ],
                                hoverBackgroundColor: [
                                    '#36A2EB',
                                    '#FF6384',
                                    '#33FF00',
                                    '#993300',
                                    '#CCFF00',
                                    '#FF9900',
                                    '#FF0099',
                                    '#FFA07A'
                                ]
                            }
                        ]
                    });

                    setRegisteredChartData({
                        labels: ['ATL Ideas', 'NON ATL Ideas'],
                        datasets: [
                            {
                                data: [total.ATL_Count, total.NonATL_Count],
                                backgroundColor: ['#36A2EB', '#FF6384'],
                                hoverBackgroundColor: ['#36A2EB', '#FF6384']
                            }
                        ]
                    });
                    var array = chartTableData;
                    array.push({ state: 'Total Count', ...total });
                    setChartTableData(array);
                    setDownloadTableData(chartTableData);
                    setTotalCount(total);
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
                            <h2>Ideas Details Status</h2>
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
                                            list={categoryData}
                                            setValue={setCategory}
                                            placeHolder={'Select Category'}
                                            value={category}
                                        />
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={SDGDate}
                                            setValue={setsdg}
                                            placeHolder={'Select Themes'}
                                            value={sdg}
                                        />
                                        {/* <Select
                                            list={filterOptions}
                                            setValue={setFilterType}
                                            placeHolder={'Select Filter'}
                                            value={filterType}
                                        /> */}
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
                                            <div className="col-md-12 mx-10 px-10">
                                                <div className="table-wrapper bg-white">
                                                    {/* <div
                                                        className="table-wrapper bg-white "
                                                        style={{
                                                            overflowX: 'auto'
                                                        }}
                                                    > */}
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
                                                                    No of Ideas
                                                                    Submitted
                                                                </th>
                                                                <th>
                                                                    No of ATL
                                                                    Ideas
                                                                </th>
                                                                <th>
                                                                    No of Non
                                                                    ATL Ideas
                                                                </th>
                                                                <th>
                                                                    Agriculture
                                                                </th>
                                                                <th>
                                                                    Disaster
                                                                    Management
                                                                </th>
                                                                <th>
                                                                    Education
                                                                    Skill
                                                                    Development
                                                                </th>
                                                                <th>Health</th>
                                                                <th>
                                                                    Inclusivity
                                                                </th>
                                                                <th>
                                                                    Mobility
                                                                </th>
                                                                <th>OTHERS</th>
                                                                <th>Space</th>
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
                                                                                item.totalSubmited
                                                                            }
                                                                        </td>

                                                                        <td>
                                                                            {
                                                                                item.ATL_Count
                                                                            }
                                                                        </td>

                                                                        <td>
                                                                            {
                                                                                item.NonATL_Count
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.Agriculture
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.DisasterManagement
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.EducationSkillDevelopment
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.Health
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.Inclusivity
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.Mobility
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.OTHERS
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.Space
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                            {/* <tr>
                                                                <td>{}</td>
                                                                <td>
                                                                    {
                                                                        'Total Count'
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.totalSubmited
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.ATL_Count
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.NonATL_Count
                                                                    }
                                                                </td>

                                                                <td>
                                                                    {
                                                                        totalCount.Agriculture
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.DisasterManagement
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.EducationSkillDevelopment
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.Health
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.Inclusivity
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.Mobility
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.OTHERS
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.Space
                                                                    }
                                                                </td>
                                                            </tr> */}
                                                        </tbody>
                                                    </Table>
                                                    {/* </div> */}
                                                </div>
                                            </div>
                                            <div className="col-md-5 mt-5">
                                                <div className="row">
                                                    <Row>
                                                        <Col>
                                                            <div className="col-md-6 text-center mt-3">
                                                                <p>
                                                                    <b>
                                                                        Overall
                                                                        ATL
                                                                        Ideas vs
                                                                        Non ATL
                                                                        Ideas As
                                                                        of{' '}
                                                                        {
                                                                            newFormat
                                                                        }
                                                                    </b>
                                                                </p>
                                                            </div>
                                                            <div className="col-md-6 doughnut-chart-container">
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
                                                        </Col>
                                                        <Col>
                                                            <div className="col-md-6 text-center mt-3">
                                                                <p>
                                                                    <b>
                                                                        Ideas
                                                                        Theme As
                                                                        of{' '}
                                                                        {
                                                                            newFormat
                                                                        }
                                                                    </b>
                                                                </p>
                                                            </div>
                                                            <div className="col-md-6 doughnut-chart-container">
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
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* <div className="mt-5">
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
                                </div> */}
                                {downloadTableData && (
                                    <CSVLink
                                        data={downloadTableData}
                                        headers={summaryHeaders}
                                        filename={`IdeasSummaryTable_${newFormat}.csv`}
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
                                        headers={teacherDetailsHeaders}
                                        filename={`IdeasDetailedSummaryReport_${newFormat}.csv`}
                                        className="hidden"
                                        ref={csvLinkRef}
                                    >
                                        Download Table CSV
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
