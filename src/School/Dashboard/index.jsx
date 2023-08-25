/* eslint-disable no-unused-vars */
import React from 'react';
import Layout from '../Layout';
import './dashboard.scss';
import { Col, Container, Row, CardBody, CardText } from 'reactstrap';
import { Card } from 'react-bootstrap';
import LatestNewsNew from '../../Teachers/Dashboard/LatestNewsNew';
const DashboardSchool = () => {
    return (
        <Layout>
            <Container>
                <h2 className="mb-5  text-center mt-5">
                    <strong> School Dashboard</strong>
                </h2>
                <Row>
                    <Col style={{ paddingRight: '20px' }}>
                        <Row>
                            <Card bg="light" text="dark" className="mb-4">
                                <Card.Body>
                                    <label htmlFor="teams" className="">
                                        Total Teachers
                                    </label>

                                    <Card.Text
                                        style={{
                                            fontSize: '48px',
                                            fontWeight: 'bold',
                                            marginTop: '10px',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        4
                                        {/* {dashboardStates &&
                                        dashboardStates?.teams_count
                                            ? dashboardStates?.teams_count
                                            : 0} */}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row>
                            <Card bg="light" text="dark" className="mb-4">
                                <Card.Body>
                                    <label htmlFor="teams" className="">
                                        Total Teams
                                    </label>
                                    <Card.Text
                                        style={{
                                            fontSize: '48px',
                                            fontWeight: 'bold',
                                            marginTop: '10px',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        16
                                        {/* {dashboardStates &&
                                        dashboardStates?.course_completed_count !==
                                            undefined
                                            ? `${
                                                  Math.round(
                                                      (dashboardStates?.course_completed_count /
                                                          dashboardStates?.Total_course_count) *
                                                          100
                                                  ) + ' %'
                                              }`
                                            : '-'} */}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Card bg="light" text="dark" className="mb-4">
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
                                        16
                                        {/* {dashboardStates &&
                                        dashboardStates.students_count
                                            ? dashboardStates.students_count
                                            : '-'} */}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row>
                            <Card bg="light" text="dark" className="mb-4">
                                <Card.Body>
                                    <label htmlFor="teams" className="">
                                        Total Ideas
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
                                        16
                                        {/* {dashboardStates &&
                                        dashboardStates?.ideas_count
                                            ? dashboardStates?.ideas_count
                                            : 0} */}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>

                    <Col>
                        <Card bg="light" text="dark" className=" md-3 xs-12 ">
                            <Card.Body style={{ overflowX: 'auto' }}>
                                <LatestNewsNew />
                            </Card.Body>
                        </Card>
                    </Col>
                    
                </Row>
            </Container>
        </Layout>
    );
};

export default DashboardSchool;
