/* eslint-disable react/jsx-key */
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
import { Bar } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';
import { getDistrictData } from '../../../redux/studentRegistration/actions';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../Helpers/Select';
import axios from 'axios';
import { categoryValue } from '../../Schools/constentText';
import '../reports.scss';
import { Doughnut } from 'react-chartjs-2';
import { notification } from 'antd';

const ReportsRegistration = () => {
    
    const data1 = {
        labels: [
            'ARIYALUR',
            'CHENGALPATTU',
            'CHENNAI',
            'COIMBATORE',
            'CUDDALORE',
            'DHARMAPURI',
            'DINDIGUL',
            'ERODE',
            'KALLAKURICHI',
            'KANCHEEPURAM',
            'KANNIYAKUMARI',
            'KARUR',
            'KRISHNAGIRI',
            'MADURAI',
            'MAYILADUTHURAI',
            'NAGAPATTINAM',
            'NAMAKKAL',
            'PERAMBALUR',
            'PUDUKKOTTAI',
            'RAMANATHAPURAM'
        ],
        datasets: [
            {
                label: 'No of Students Completed Course',
                backgroundColor: 'Lightgreen',
                data: [
                    10, 15, 20, 25, 30, 10, 15, 20, 25, 30, 10, 15, 20, 25, 30,
                    10, 15, 20, 25, 30, 10, 15, 20, 25, 30
                ]
            },
            {
                label: 'No of Students Course In progress',
                backgroundColor: 'Yellow',
                data: [
                    5, 10, 15, 20, 25, 5, 10, 15, 20, 25, 5, 10, 15, 20, 25, 5,
                    10, 15, 20, 25, 5, 10, 15, 20, 25
                ]
            },
            {
                label: 'No of Students Not Started Course ',
                backgroundColor: 'Red',
                data: [
                    2, 4, 6, 8, 10, 2, 4, 6, 8, 10, 2, 4, 6, 8, 10, 2, 4, 6, 8,
                    10, 2, 4, 6, 8, 10
                ]
            }
        ]
    };

    const data2 = {
        labels: [
            'ARIYALUR',
            'CHENGALPATTU',
            'CHENNAI',
            'COIMBATORE',
            'CUDDALORE',
            'DHARMAPURI',
            'DINDIGUL',
            'ERODE',
            'KALLAKURICHI',
            'KANCHEEPURAM',
            'KANNIYAKUMARI',
            'KARUR',
            'KRISHNAGIRI',
            'MADURAI',
            'MAYILADUTHURAI',
            'NAGAPATTINAM',
            'NAMAKKAL',
            'PERAMBALUR',
            'PUDUKKOTTAI',
            'RAMANATHAPURAM'
        ],
        datasets: [
            {
                label: 'No of Teams Submitted Ideas',
                backgroundColor: 'Lightgreen',
                data: [
                    14, 15, 23, 25, 30, 10, 15, 20, 25, 30, 10, 15, 20, 25, 30,
                    10, 15, 20, 25, 30, 10, 15, 20, 25, 46
                ]
            },
            {
                label: 'No of Team Ideas in Draft',
                backgroundColor: 'Yellow',
                data: [
                    5, 10, 15, 20, 25, 5, 10, 15, 20, 25, 5, 10, 15, 20, 25, 5,
                    10, 15, 20, 25, 5, 10, 15, 20, 25
                ]
            },
            {
                label: 'No of Teams Not Started Idea Submission',
                backgroundColor: 'Red',
                data: [
                    2, 4, 6, 8, 10, 2, 4, 6, 8, 10, 2, 4, 6, 8, 10, 2, 4, 6, 8,
                    10, 2, 4, 6, 8, 10
                ]
            }
        ]
    };
    const options = {
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
    };
    const [RegTeachersdistrict, setRegTeachersdistrict] = React.useState('');
    const [category, setCategory] = useState('');
    const categoryData =
        categoryValue[process.env.REACT_APP_LOCAL_LANGUAGE_CODE];

    const [downloadData, setDownloadData] = useState(null);
    const [chartTableData, setChartTableData] = useState([]);
    //const [showTable, setShowTable] = useState(false);
    //const [statsshowTable, setStatsShowTable] = useState(false);
    const csvLinkRef = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = getCurrentUser('current_user');
    const [registeredGenderChartData, setRegisteredGenderChartData] =
        useState(null);
    const [registeredChartData, setRegisteredChartData] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadComplete, setDownloadComplete] = useState(false);
    const [combinedArray, setCombinedArray] = useState([]);
    const [downloadTableData, setDownloadTableData] = useState([]);
    const [totalCount, setTotalCount] = useState([]);
    // const [barChart1Data, setBarChart1Data] = useState({
    //     labels: [],
    //     datasets: []
    // });
    // const [barChart2Data, setBarChart2Data] = useState({
    //     labels: [],
    //     datasets: []
    // });
    const fullDistrictsNames = useSelector(
        (state) => state?.studentRegistration?.dists
    );
    const studentDetailsHeaders = [
        {
            label: 'UDISE CODE',
            key: 'UDISE code'
        },
        {
            label: 'School Name',
            key: 'School Name'
        },
        {
            label: 'School Type/Category',
            key: 'category'
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
            label: 'HM Name',
            key: 'HM Name'
        },
        {
            label: 'HM Contact',
            key: 'HM Contact'
        },
        {
            label: 'Teacher Name',
            key: 'Teacher Name'
        },
        {
            label: 'Teacher Gender',
            key: 'Teacher Gender'
        },
        {
            label: 'Teacher Contact',
            key: 'Teacher Contact'
        },
        {
            label: 'Teacher WhatsApp Contact',
            key: 'Teacher WhatsApp Contact'
        },
        {
            label: 'Team Name',
            key: 'Team Name'
        },
        {
            label: 'Student Name',
            key: 'Student Name'
        },
        {
            label: 'Student Username',
            key: 'Student Username'
        },
        {
            label: 'Age',
            key: 'Age'
        },
        {
            label: 'Gender',
            key: 'gender'
        },
        {
            label: 'Grade',
            key: 'Grade'
        },
        {
            label: 'Pre-Survey Status',
            key: 'Pre Survey Status'
        },
        {
            label: 'Course Completion%',
            key: 'Course Completion'
        },
        {
            label: 'Course Status',
            key: 'Course Status'
        },
        {
            label: 'Idea Status',
            key: 'Idea Status'
        },
        {
            label: 'Post-Survey Status',
            key: 'Post Survey Status'
        }
    ];
    useEffect(() => {
        dispatch(getDistrictData());
        fetchChartTableData();
        fetchDoughnutChartData();
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

    const fetchData = () => {
        const url = `/reports/studentdetailsreport?district=${RegTeachersdistrict}&category=${category}`;

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
                    const newdatalist = response.data.data.map((item) => {
                        const dataList = { ...item };
                        if (item['Post Survey Status'] === 'ACTIVE') {
                            dataList['Post Survey Status'] = 'Completed';
                        }
                        if (item['Pre Survey Status'] === 'ACTIVE') {
                            dataList['Pre Survey Status'] = 'Completed';
                        }
                        const coursePre = Math.round(
                            (item.course_status / 34) * 100
                        );
                        dataList['Course Completion'] = `${coursePre}%`;
                        if (coursePre >= 100) {
                            dataList['Course Status'] = 'Completed';
                        } else if (coursePre < 100 && coursePre > 0) {
                            dataList['Course Status'] = 'In Progress';
                        } else {
                            dataList['Course Status'] = 'Not Started';
                        }
                        return dataList;
                    });
                    setDownloadData(newdatalist);
                    csvLinkRef.current.link.click();
                    openNotificationWithIcon(
                        'success',
                        `Student Detailed Reports Downloaded Successfully`
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
        if (!RegTeachersdistrict || !category) {
            notification.warning({
                message:
                    'Please select a district and category type before Downloading Reports.'
            });
            return;
        }
        setIsDownloading(true);
        //  setDownloadComplete(false);
        fetchData();
    };

    useEffect(() => {
        if (downloadComplete) {
            setDownloadComplete(false);
            setRegTeachersdistrict('');
        }
    }, [downloadComplete]);

    const fetchDoughnutChartData = () => {
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

                    const lastRow = chartTableData[chartTableData.length - 1];
                    const maleCount = lastRow?.male_mentor_count || 0;
                    const femaleCount = lastRow?.female_mentor_count || 0;
                    const regCount = lastRow?.total_registered_teachers || 0;
                    const regNotCount =
                        lastRow?.total_not_registered_teachers || 0;

                    setRegisteredGenderChartData({
                        labels: ['Male', 'Female'],
                        datasets: [
                            {
                                data: [maleCount, femaleCount],
                                backgroundColor: ['#FF6384', '#36A2EB'],
                                hoverBackgroundColor: ['#FF6384', '#36A2EB']
                            }
                        ]
                    });

                    setRegisteredChartData({
                        labels: ['Registered', 'Not Registered'],
                        datasets: [
                            {
                                data: [regCount, regNotCount],
                                backgroundColor: ['#FF6384', '#36A2EB'],
                                hoverBackgroundColor: ['#FF6384', '#36A2EB']
                            }
                        ]
                    });
                }
            })
            .catch((error) => {
                console.log('API error:', error);
            });
    };
    const fetchChartTableData =() => {
        
        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/reports/studentdetailstable',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };

        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    const summary = response.data.data[0].summary;
                    const studentCountDetails = response.data.data[0].studentCountDetails;
                    const courseCompleted = response.data.data[0].courseCompleted;
                    const courseINprogesss = response.data.data[0].courseINprogesss;
                    const submittedCount = response.data.data[0].submittedCount;
                    const draftCount = response.data.data[0].draftCount;

                    const combinedArray = summary.map(summaryItem => {
                        const district = summaryItem.district;
                        const totalTeams= summaryItem.totalTeams;
                        const studentCountItem = studentCountDetails.find(item => item.district === district);
                        const courseCompletedItem = courseCompleted.find(item => item.district === district);
                        const courseInProgressItem = courseINprogesss.find(item => item.district === district);
                        const courseNotStarted = studentCountItem - ((courseCompletedItem ? courseCompletedItem : 0) + (courseInProgressItem ? courseInProgressItem:0));
                        const submittedCountItem = submittedCount.find(item => item.district === district);
                        const draftCountItem = draftCount.find(item => item.district === district);
                        const ideaNotStarted = summaryItem.totalTeams - ((submittedCountItem ? submittedCountItem.submittedCount : 0) + (draftCountItem ? draftCountItem.draftCount : 0));
                        const coursePercentage = Math.round((courseCompletedItem / studentCountItem)*100);
                        const ideaSubmissionPercentage = Math.round(submittedCountItem / totalTeams) * 100;
                        
                        console.log("Course",courseNotStarted);
                        
                        return {
                          district,
                          totalTeams,
                          totalStudents: studentCountItem ? studentCountItem.totalstudent : 0,
                          courseCompleted: courseCompletedItem ? courseCompletedItem.studentCourseCMP : 0,
                          courseInProgress: courseInProgressItem ? courseInProgressItem.studentCourseIN : 0,
                          courseNotStarted,
                          submittedCount: submittedCountItem ? submittedCountItem.submittedCount : 0,
                          draftCount: draftCountItem ? draftCountItem.draftCount : 0,
                          ideaNotStarted,
                          coursePercentage,
                          ideaSubmissionPercentage
                        };
                        
                      });

                      
                    // Calculate total values
                    const total = combinedArray.reduce((acc, item) => {
                        acc.totalTeams += item.totalTeams;
                        acc.totalStudents += item.totalStudents;
                        acc.courseCompleted += item.courseCompleted;
                        acc.courseInProgress += item.courseInProgress;
                        acc.submittedCount += item.submittedCount;
                        acc.draftCount += item.draftCount;
                        return acc;
                    }, {
                        totalTeams: 0,
                        totalStudents: 0,
                        courseCompleted: 0,
                        courseInProgress: 0,
                        submittedCount: 0,
                        draftCount: 0
                    });
                    console.log("Combined Array:", combinedArray);
                    console.log("Total count",total);

                    // const stackedBarChart1Data={
                    //     labels: combinedArray.map(item => item.district),
                    //     datasets: [

                    //         {
                    //             label: 'label: 'No of Students Completed Course',
                    //             data: combinedArray.map(item => item.totalStudents),
                    //             backgroundColor: 'Lightgreen',
                    //         },
                    //         {
                    //             label: 'No of Students Course In progress',
                    //             data: combinedArray.map(item => item.totalTeams),
                    //             backgroundColor: 'Yellow',
                    //         },
                //            {
                        //             label: 'No of Students Not Started Course',
                        //             data: combinedArray.map(item => item.totalTeams),
                        //             backgroundColor: 'Red',
                        //         }
                    //     ]
                    // };

                    // const stackedBarChart2Data={
                    //     labels: combinedArray.map(item => item.district),
                    //     datasets: [
                    //         {
                    //             label: 'No of Teams Submitted Ideas',
                    //             data: combinedArray.map(item => item.courseNotStarted),
                    //             backgroundColor: 'Lightgreen',
                    //         },
                    //         {
                    //             label: 'No of Team Ideas in Draft',
                    //             data: combinedArray.map(item => item.courseINcompleted),
                    //             backgroundColor: 'Yellow'
                    //         },
                    //         {
                    //             label: 'No of Teams Not Started Idea Submission',
                    //             data: combinedArray.map(item => item.courseCompleted),
                    //             backgroundColor: 'Red'
                    //         }
                    //     ]
                    // };
                    setCombinedArray(combinedArray);
                    setDownloadTableData(combinedArray);
                    // setBarChart1Data(stackedBarChart1Data);
                    // setBarChart2Data(stackedBarChart2Data);
                    setTotalCount(total);
                }
                
            })
            .catch((error) => {
                console.log('API error:', error);
            });
    };
    console.log(downloadTableData);



    return (
        <>
            <Layout>
                <Container className="RegReports mt-4 mb-30 userlist">
                    <Row className="mt-0 pt-2">
                        <Col>
                            <h2>Students Progress Detailed Report</h2>
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
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={fullDistrictsNames}
                                            setValue={setRegTeachersdistrict}
                                            placeHolder={'Select District'}
                                            value={RegTeachersdistrict}
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
                                    md={3}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    <Button
                                        onClick={handleDownload}
                                        label={
                                            downloadComplete
                                                ? 'Download Complete'
                                                : isDownloading
                                                ? 'Downloading...'
                                                : 'Download Report'
                                        }
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        type="submit"
                                        style={{
                                            width: '160px',
                                            whiteSpace: 'nowrap',
                                            pointerEvents: isDownloading
                                                ? 'none'
                                                : 'auto'
                                        }}
                                        disabled={isDownloading}
                                    />
                                </Col>
                            </Row>

                            <div className="chart">
                                {chartTableData.length > 0 && (
                                    <div className="mt-5">
                                        <h3>OVERVIEW</h3>
                                        <div className="row">
                                            <div className="col-md-12 mx-10 px-10">
                                                <div
                                                    className="table-wrapper bg-white "
                                                    style={{
                                                        overflowX: 'auto'
                                                    }}
                                                >
                                                    <Table
                                                        id="dataTable"
                                                        className="table table-striped table-bordered responsive"
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>
                                                                    District
                                                                    Name
                                                                </th>
                                                                <th>
                                                                    Total No.Of
                                                                    TEAMS
                                                                    created
                                                                </th>
                                                                <th>
                                                                    Total No.Of
                                                                    STUDENTS
                                                                    enrolled
                                                                </th>
                                                                <th>
                                                                    No.Of
                                                                    Students
                                                                    completed
                                                                    the Course
                                                                </th>
                                                                <th>
                                                                    No.Of
                                                                    Students
                                                                    course In
                                                                    Progress
                                                                </th>
                                                                <th>
                                                                    No.Of
                                                                    students NOT
                                                                    STARTED
                                                                    Course
                                                                </th>
                                                                <th>
                                                                    No.Of TEAMS
                                                                    SUBMITTED
                                                                    IDEAS
                                                                </th>
                                                                <th>
                                                                    No.Of Teams
                                                                    IDEAS IN
                                                                    DRAFT
                                                                </th>
                                                                <th>
                                                                    No.Of Teams
                                                                    NOT STARTED
                                                                    IDEAS
                                                                    SUBMISSION
                                                                </th>
                                                                <th>
                                                                    Course
                                                                    Completion
                                                                    Percentage
                                                                </th>
                                                                <th>
                                                                    IDEA
                                                                    Submission
                                                                    Percentage
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {combinedArray.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>{index +1}</td>
                                                                    <td>{item.district}</td>
                                                                    <td>{item.totalTeams}</td>
                                                                    <td>{item.totalStudents}</td>
                                                                    <td>{item.courseCompleted}</td>
                                                                    <td>{item.courseInProgress}</td>
                                                                    <td>{item.courseNotStarted}</td>
                                                                    <td>{item.submittedCount}</td>
                                                                    <td>{item.draftCount}</td>
                                                                    <td>{item.ideaNotStarted}</td>
                                                                    <td>{item.coursePercentage}</td>
                                                                    <td>{item.ideaSubmissionPercentage}</td>
                                                                </tr>
                                                            ))}
                                                            <tr>
                                                                <td>{}</td>
                                                                <td>{'Total Count'}</td>
                                                                <td>{totalCount.totalReg}</td>
                                                                <td>{totalCount.totalTeams}</td>
                                                                <td>{totalCount.totalStudents}</td>
                                                                <td>{totalCount.femaleStudents}</td>
                                                                <td>{totalCount.maleStudents}</td>
                                                                <td>{totalCount.courseCompleted}</td>
                                                                <td>{totalCount.courseINcompleted}</td>
                                                                <td>{totalCount.totalReg-(totalCount.courseCompleted+totalCount.courseINcompleted)}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                            <div
                                                className="col-md-6 text-center mt-5"
                                                style={{
                                                    overflowX: 'auto'
                                                }}
                                            >
                                                <h2>
                                                    Student Course Completion
                                                    Status As Of Date
                                                </h2>
                                                <Bar
                                                    data={data1}
                                                    options={options}
                                                />
                                            </div>
                                            <div
                                                className="col-md-6 text-center mt-5"
                                                style={{
                                                    overflowX: 'auto'
                                                }}
                                            >
                                                <h2>
                                                    Idea Submission Status
                                                    Status As Of Date
                                                </h2>
                                                <Bar
                                                    data={data2}
                                                    options={options}
                                                />
                                            </div>
                                            <div className="col-md-5">
                                                <div className="row">
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
                                                    <div className="col-md-11 text-center mt-3">
                                                        <p>
                                                            <b>
                                                                Student Course
                                                                Status
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
                                                    <div className="col-md-11 text-center mt-3">
                                                        <p>
                                                            <b>
                                                                Student Idea
                                                                Submission
                                                            </b>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {downloadData && (
                                    <CSVLink
                                        headers={studentDetailsHeaders}
                                        data={downloadData}
                                        filename={`Student Detailed Reports.csv`}
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
                            </div>
                        </div>
                    </Row>
                </Container>
            </Layout>
        </>
    );
};
export default ReportsRegistration;
// <div className="row">
//     <div className="col-md-6">
//         {/* ... your second chart code ... */}
//     </div>
//     <div className="col-md-6 doughnut-chart-container">
//         {registeredGenderChartData && (
//             <Doughnut data={registeredGenderChartData} options={chartOptions} />
//         )}
//     </div>

{
    /* {showTable && filterType === 'Registered' && (
    <div className="mt-5">
        <h3>Data based on Filter: {filterType}</h3>
        <div className="table-wrapper bg-white">
            <div className="table-wrapper">
                <Table id="dataTable" className="table table-striped table-bordered responsive">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Organization Code</th>
                            <th>Organization District</th>
                            <th>Organization Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.full_name}</td>
                                <td>{item.mobile}</td>
                                <td>{item['organization.organization_code']}</td>
                                <td>{item['organization.district']}</td>
                                <td>{item['organization.organization_name']}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div> 
    </div>  
)}   
{showTable && filterType === 'Not Registered' && (
    <div className="mt-5">
        <h3>Data based on Filter: Not Registered</h3>
        <div className="table-wrapper bg-white">
            <div className="table-wrapper">
                <Table id="dataTable" className="table table-striped table-bordered responsive">
                    <thead>
                        <tr>
                            <th>Organization ID</th>
                            <th>Organization Name</th>
                            <th>Organization Code</th>
                            <th>District</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Principal Name</th>
                            <th>Principal Mobile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notRegisteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.organization_id}</td>
                                <td>{item.organization_name}</td>
                                <td>{item.organization_code}</td>
                                <td>{item.district}</td>
                                <td>{item.city}</td>
                                <td>{item.state}</td>
                                <td>{item.principal_name}</td>
                                <td>{item.principal_mobile}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    </div>
)} */
}
