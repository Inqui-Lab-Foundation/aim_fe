/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import './Student.scss';
import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardText,
    Label
} from 'reactstrap';
import Layout from '../Layout.jsx';
import 'sweetalert2/src/sweetalert2.scss';
import { getCurrentUser } from '../../helpers/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentByIdData } from '../../redux/studentRegistration/actions';
import axios from 'axios';

const MyProfile = () => {
    const currentUser = getCurrentUser('current_user');
    const { teamMember } = useSelector((state) => state.studentRegistration);
    const [data, setData] = useState('');
    const [showMentorCard, setshowMentorCard] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getStudentByIdData(currentUser?.data[0]?.student_id));
    }, [dispatch, currentUser?.data[0]?.student_id]);
    useEffect(() => {
        if (teamMember && teamMember?.team?.moc_name !== null) {
            setshowMentorCard(true);
        }
    }, [teamMember]);
    return (
        <Layout>
            <Container className="MyProfile pt-3 pt-xl-5 mb-50">
                {/* <UsersPage /> */}
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        <Label>My Profile</Label>
                        <Row>
                            <Col md={12}>
                                <Card className="w-100  mb-5 p-4">
                                    <CardBody>
                                        <Row>
                                            <Col
                                                md={12}
                                                className="my-auto profile-detail "
                                            >
                                                <CardText>
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            // md={3}
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>Name</b>
                                                        </Col>
                                                        <Col
                                                            // md={1}
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            // md={8}
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>
                                                                {teamMember?.full_name
                                                                    ? teamMember?.full_name
                                                                    : '-'}
                                                            </b>
                                                        </Col>
                                                    </Row>

                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            // md={3}
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>Class</b>
                                                        </Col>
                                                        <Col
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                            // md={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            // md={8}
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>
                                                                {teamMember?.Grade
                                                                    ? teamMember?.Grade
                                                                    : '-'}
                                                            </b>
                                                        </Col>
                                                    </Row>

                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            // md={3}
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>Age</b>
                                                        </Col>
                                                        <Col
                                                            // md={1}
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            // md={8}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>
                                                                {teamMember?.Age
                                                                    ? teamMember?.Age
                                                                    : '-'}
                                                            </b>
                                                        </Col>
                                                    </Row>

                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            // md={3}
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>Gender</b>
                                                        </Col>
                                                        <Col
                                                            // md={1}
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            // md={8}
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>
                                                                {teamMember?.Gender
                                                                    ? teamMember?.Gender
                                                                    : '-'}
                                                            </b>
                                                        </Col>
                                                    </Row>
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            // md={3}
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>Email Id</b>
                                                        </Col>
                                                        <Col
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                            // md={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            // md={8}
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>
                                                                {teamMember?.username_email
                                                                    ? teamMember?.username_email
                                                                    : '-'}
                                                            </b>
                                                        </Col>
                                                    </Row>
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            // md={3}
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>Disability</b>
                                                        </Col>
                                                        <Col
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                            // md={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            // md={8}
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>
                                                                {teamMember?.disability
                                                                    ? teamMember?.disability
                                                                    : '-'}
                                                            </b>
                                                        </Col>
                                                    </Row>
                                                </CardText>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                                <Card className="w-100  mb-5 p-4">
                                    <CardBody>
                                        <Row>
                                            <Col
                                                md={12}
                                                className="my-auto profile-detail"
                                            >
                                                <CardText>
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            // md={3}
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>ATL Code</b>
                                                        </Col>
                                                        <Col
                                                            //  md={1}
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            // md={8}
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>
                                                                {teamMember.team
                                                                    ?.mentor
                                                                    ?.organization_code
                                                                    ? teamMember
                                                                          .team
                                                                          ?.mentor
                                                                          ?.organization_code
                                                                    : '-'}
                                                            </b>
                                                        </Col>
                                                    </Row>
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            // md={3}
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>UDISE Code</b>
                                                        </Col>
                                                        <Col
                                                            //  md={1}
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            // md={8}
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>
                                                                {teamMember.team
                                                                    ?.mentor
                                                                    ?.organization
                                                                    ?.unique_code
                                                                    ? teamMember
                                                                          .team
                                                                          ?.mentor
                                                                          ?.organization
                                                                          ?.unique_code
                                                                    : '-'}
                                                            </b>
                                                        </Col>
                                                    </Row>
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            // md={3}
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>Category</b>
                                                        </Col>
                                                        <Col
                                                            //  md={1}
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            // md={8}
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>
                                                                {teamMember.team
                                                                    ?.mentor
                                                                    ?.organization
                                                                    ?.category
                                                                    ? teamMember
                                                                          .team
                                                                          ?.mentor
                                                                          ?.organization
                                                                          ?.category
                                                                    : '-'}
                                                            </b>
                                                        </Col>
                                                    </Row>
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            // md={3}
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>Pin Code</b>
                                                        </Col>
                                                        <Col
                                                            //  md={1}
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            // md={8}
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>
                                                                {teamMember.team
                                                                    ?.mentor
                                                                    ?.organization
                                                                    ?.pin_code
                                                                    ? teamMember
                                                                          .team
                                                                          ?.mentor
                                                                          ?.organization
                                                                          ?.pin_code
                                                                    : '-'}
                                                            </b>
                                                        </Col>
                                                    </Row>
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            // md={3}
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>District</b>
                                                        </Col>
                                                        <Col
                                                            //  md={1}
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            // md={8}
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>
                                                                {teamMember.team
                                                                    ?.mentor
                                                                    ?.organization
                                                                    ?.district
                                                                    ? teamMember
                                                                          .team
                                                                          ?.mentor
                                                                          ?.organization
                                                                          ?.district
                                                                    : '-'}
                                                            </b>
                                                        </Col>
                                                    </Row>
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            // md={3}
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>State</b>
                                                        </Col>
                                                        <Col
                                                            //  md={1}
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            // md={8}
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>
                                                                {teamMember.team
                                                                    ?.mentor
                                                                    ?.organization
                                                                    ?.state
                                                                    ? teamMember
                                                                          .team
                                                                          ?.mentor
                                                                          ?.organization
                                                                          ?.state
                                                                    : '-'}
                                                            </b>
                                                        </Col>
                                                    </Row>
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            // md={3}
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>School Name</b>
                                                        </Col>
                                                        <Col
                                                            //  md={1}
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            // md={8}
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>
                                                                {teamMember.team
                                                                    ?.mentor
                                                                    ?.organization
                                                                    ?.organization_name
                                                                    ? teamMember
                                                                          .team
                                                                          ?.mentor
                                                                          ?.organization
                                                                          ?.organization_name
                                                                    : '-'}
                                                            </b>
                                                        </Col>
                                                    </Row>

                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            // md={3}
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>Team Name</b>
                                                        </Col>
                                                        <Col
                                                            //  md={1}
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            // md={8}
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>
                                                                {teamMember.team
                                                                    ?.team_name
                                                                    ? teamMember
                                                                          .team
                                                                          ?.team_name
                                                                    : '-'}
                                                            </b>
                                                        </Col>
                                                    </Row>

                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            // md={3}
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>Teacher Name</b>
                                                        </Col>
                                                        <Col
                                                            // md={1}
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            // md={8}
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <b>
                                                                {teamMember.team
                                                                    ?.mentor
                                                                    ?.full_name
                                                                    ? teamMember
                                                                          .team
                                                                          ?.mentor
                                                                          ?.full_name
                                                                    : '-'}
                                                            </b>
                                                        </Col>
                                                    </Row>
                                                </CardText>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                                {showMentorCard && (
                                    <Card className="w-100  mb-5 p-4">
                                        <CardBody>
                                            <Row>
                                                <Col
                                                    md={12}
                                                    className="my-auto profile-detail "
                                                >
                                                    <CardText>
                                                        <Row className="pt-3 pb-3">
                                                            <Col
                                                                // md={3}
                                                                xs={12}
                                                                sm={12}
                                                                md={12}
                                                                xl={12}
                                                                className="my-auto profile-detail"
                                                            >
                                                                <b
                                                                    style={{
                                                                        fontSize:
                                                                            '20px'
                                                                    }}
                                                                >
                                                                    {' '}
                                                                    Mentor
                                                                    Details
                                                                </b>
                                                            </Col>
                                                        </Row>
                                                        <Row className="pt-3 pb-3">
                                                            <Col
                                                                // md={3}
                                                                xs={5}
                                                                sm={5}
                                                                md={5}
                                                                xl={5}
                                                                className="my-auto profile-detail"
                                                            >
                                                                <b>
                                                                    {' '}
                                                                    Mentor Name
                                                                </b>
                                                            </Col>
                                                            <Col
                                                                // md={1}
                                                                xs={1}
                                                                sm={1}
                                                                md={1}
                                                                xl={1}
                                                            >
                                                                :
                                                            </Col>
                                                            <Col
                                                                // md={8}
                                                                xs={6}
                                                                sm={6}
                                                                md={6}
                                                                xl={6}
                                                                className="my-auto profile-detail"
                                                            >
                                                                <b>
                                                                    {teamMember
                                                                        .team
                                                                        ?.moc_name
                                                                        ? teamMember
                                                                              .team
                                                                              ?.moc_name
                                                                        : '-'}
                                                                </b>
                                                            </Col>
                                                        </Row>

                                                        <Row className="pt-3 pb-3">
                                                            <Col
                                                                // md={3}
                                                                xs={5}
                                                                sm={5}
                                                                md={5}
                                                                xl={5}
                                                                className="my-auto profile-detail"
                                                            >
                                                                <b>Email Id</b>
                                                            </Col>
                                                            <Col
                                                                xs={1}
                                                                sm={1}
                                                                md={1}
                                                                xl={1}
                                                                // md={1}
                                                            >
                                                                :
                                                            </Col>
                                                            <Col
                                                                // md={8}
                                                                xs={6}
                                                                sm={6}
                                                                md={6}
                                                                xl={6}
                                                                className="my-auto profile-detail"
                                                            >
                                                                <b>
                                                                    {teamMember
                                                                        .team
                                                                        ?.moc_email
                                                                        ? teamMember
                                                                              .team
                                                                              ?.moc_email
                                                                        : '-'}
                                                                </b>
                                                            </Col>
                                                        </Row>

                                                        <Row className="pt-3 pb-3">
                                                            <Col
                                                                // md={3}
                                                                xs={5}
                                                                sm={5}
                                                                md={5}
                                                                xl={5}
                                                                className="my-auto profile-detail"
                                                            >
                                                                <b>Mobile No</b>
                                                            </Col>
                                                            <Col
                                                                // md={1}
                                                                xs={1}
                                                                sm={1}
                                                                md={1}
                                                                xl={1}
                                                            >
                                                                :
                                                            </Col>
                                                            <Col
                                                                xs={6}
                                                                sm={6}
                                                                md={6}
                                                                xl={6}
                                                                // md={8}
                                                                className="my-auto profile-detail"
                                                            >
                                                                <b>
                                                                    {teamMember
                                                                        .team
                                                                        ?.moc_phone
                                                                        ? teamMember
                                                                              .team
                                                                              ?.moc_phone
                                                                        : '-'}
                                                                </b>
                                                            </Col>
                                                        </Row>

                                                        <Row className="pt-3 pb-3">
                                                            <Col
                                                                // md={3}
                                                                xs={5}
                                                                sm={5}
                                                                md={5}
                                                                xl={5}
                                                                className="my-auto profile-detail"
                                                            >
                                                                <b>Gender</b>
                                                            </Col>
                                                            <Col
                                                                // md={1}
                                                                xs={1}
                                                                sm={1}
                                                                md={1}
                                                                xl={1}
                                                            >
                                                                :
                                                            </Col>
                                                            <Col
                                                                // md={8}
                                                                xs={6}
                                                                sm={6}
                                                                md={6}
                                                                xl={6}
                                                                className="my-auto profile-detail"
                                                            >
                                                                <b>
                                                                    {teamMember
                                                                        .team
                                                                        ?.moc_gender
                                                                        ? teamMember
                                                                              .team
                                                                              ?.moc_gender
                                                                        : '-'}
                                                                </b>
                                                            </Col>
                                                        </Row>
                                                    </CardText>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default MyProfile;
