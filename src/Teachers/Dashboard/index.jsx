/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import './dashboard.scss';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Container, Row, CardBody, CardText } from 'reactstrap';
import { getCurrentUser } from '../../helpers/Utils';
import Layout from '../Layout';
import DoughnutChart from './DoughnutChart';
import { Modal } from 'react-bootstrap';
// import LatestNewsNew from './LatestNewsNew';
import { encryptGlobal } from '../../constants/encryptDecrypt';
import LatestScrollNew from './LatestScrollNew';

import { Card } from 'react-bootstrap';
import axios from 'axios';
const GreetingModal = (props) => {
    return (
        <Modal
            show={props.show}
            size="lg"
            centered
            className="modal-popup text-center"
            onHide={props.handleClose}
            backdrop={true}
        >
            <Modal.Header closeButton></Modal.Header>

            <Modal.Body>
                <figure>
                    <img
                        src={props.imgUrl}
                        alt="popup image"
                        className="img-fluid"
                    />
                </figure>
            </Modal.Body>
        </Modal>
    );
};
const Dashboard = () => {
    const [showsPopup, setShowsPopup] = useState(false);
    const [imgUrl, setImgUrl] = useState('');

    // here we can see teacher details //
    // details like school name ,district ,no of ideas , no of teams //
    const currentUser = getCurrentUser('current_user');
    // const presurveyStatus = useSelector(
    //     (state) => state?.mentors.teacherPresurveyStatus
    // );
    // const history = useHistory();
    // useLayoutEffect(() => {
    //     if (presurveyStatus !== 'COMPLETED')
    //         history.push('/teacher/pre-survey');
    // }, []);
    useEffect(() => {
        const popParam = encryptGlobal('1');
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/popup/${popParam}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (res) {
                if (res.status === 200 && res.data.data[0]?.on_off === '1') {
                    setShowsPopup(true);
                    setImgUrl(res?.data?.data[0]?.url);
                }
            })
            .catch(function (error) {
                setShowsPopup(false);
                console.log(error);
            });
    }, []);
    useEffect(() => {
        if (currentUser?.data[0]?.user_id) {
            mentorTeamsCount();
            mentorIdeaCount();
            mentorStudentCount();
            mentorcoursepercentage();
        }
    }, [currentUser?.data[0]?.user_id]);
    // here in  Dashboard we can see all details of teacher //
    // like  school name , district , no of ideas , no of teams //
    const [teamsCount, setTeamsCount] = useState('-');
    const [ideaCount, setIdeaCount] = useState('-');
    const [studentCount, setStudentCount] = useState('-');
    const [coursepercentage, setCoursepercentage] = useState('-');

    const mentorTeamsCount = () => {
        const teamApi = encryptGlobal(
            JSON.stringify({
                mentor_id: currentUser?.data[0]?.mentor_id
            })
        );
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/teamCount?Data=${teamApi}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTeamsCount(response.data.data[0].teams_count);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const mentorIdeaCount = () => {
        const ideaApi = encryptGlobal(
            JSON.stringify({
                mentor_id: currentUser?.data[0]?.mentor_id
            })
        );
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/ideaCount?Data=${ideaApi}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setIdeaCount(response.data.data[0].idea_count);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const mentorStudentCount = () => {
        const studentApi = encryptGlobal(
            JSON.stringify({
                mentor_id: currentUser?.data[0]?.mentor_id
            })
        );
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/studentCount?Data=${studentApi}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setStudentCount(response.data.data[0].student_count);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const mentorcoursepercentage = () => {
        const corseApi = encryptGlobal(
            JSON.stringify({
                user_id: currentUser?.data[0]?.user_id
            })
        );
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/mentorpercentage?Data=${corseApi}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    const per = Math.round(
                        (response.data.data[0].currentProgress /
                            response.data.data[0].totalProgress) *
                            100
                    );
                    setCoursepercentage(per);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const handleClose = () => {
        setShowsPopup(false);
    };
    const hi = false;
    return (
        <Layout>
            <GreetingModal
                handleClose={handleClose}
                show={showsPopup}
                imgUrl={imgUrl}
            ></GreetingModal>
            <Container>
                <h2 className="mb-5 ">
                    <strong>Dashboard</strong>
                </h2>

                <Row>
                    <Col style={{ paddingRight: '20px' }}>
                        <Row>
                            <Card
                                bg="light"
                                text="dark"
                                className="mb-4"
                                style={{ width: '350px' }}
                            >
                                <Card.Body>
                                    <label htmlFor="teams" className="">
                                        Number of Teams
                                    </label>

                                    <Card.Text
                                        style={{
                                            fontSize: '48px',
                                            fontWeight: 'bold',
                                            marginTop: '10px',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        {teamsCount}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row>
                            <Card
                                bg="light"
                                text="dark"
                                className="mb-4 card"
                                style={{ width: '350px' }}
                            >
                                <Card.Body>
                                    <label htmlFor="teams" className="cardbody">
                                        Teacher Course %
                                    </label>
                                    <Card.Text
                                        className="cardtext"
                                        style={{
                                            fontSize: '48px',
                                            fontWeight: 'bold',
                                            marginTop: '10px',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        {coursepercentage + '%'}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Card
                                bg="light"
                                text="dark"
                                className="mb-4"
                                style={{ width: '350px' }}
                            >
                                <Card.Body>
                                    <label htmlFor="teams" className="">
                                        Total Students
                                    </label>
                                    <Card.Text
                                        style={{
                                            fontSize: '48px',
                                            fontWeight: 'bold',
                                            marginTop: '10px',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        {studentCount}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row>
                            <Card
                                bg="light"
                                text="dark"
                                className="mb-4"
                                style={{ width: '350px' }}
                            >
                                <Card.Body>
                                    <label htmlFor="teams" className="">
                                        Number of Ideas
                                    </label>

                                    <Card.Text
                                        className="left-aligned"
                                        style={{
                                            fontSize: '48px',
                                            fontWeight: 'bold',
                                            marginTop: '10px',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        {ideaCount}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>

                    <Col>
                        <Card bg="light" text="dark" className=" md-3 xs-12 ">
                            <Card.Body style={{ overflowX: 'auto' }}>
                                {/* <LatestNewsNew usersdata={currentUser?.data} /> */}
                                <LatestScrollNew
                                    usersdata={currentUser?.data}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="teacher-statistics">
                    {' '}
                    <Row className="">
                        <Col>
                            <div className="d-flex flex-wrap">
                                <DoughnutChart user={currentUser?.data} />
                            </div>
                        </Col>
                    </Row>
                </Row>
            </Container>
        </Layout>
    );
};
export default Dashboard;
