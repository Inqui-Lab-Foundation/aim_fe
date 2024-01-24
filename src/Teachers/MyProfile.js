/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable indent */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardText } from 'reactstrap';
import 'sweetalert2/src/sweetalert2.scss';
import Layout from './Layout.jsx';
import { getCurrentUser } from '../helpers/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherByID } from '../redux/actions';
import { Button } from '../stories/Button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const MyProfile = () => {
    // here we can see all the details of details of teacher //
    const history = useHistory();
    const currentUser = getCurrentUser('current_user');
    const { teacher } = useSelector((state) => state.teacher);
    const [data, setData] = useState('');
    const [code, setCode] = useState('');
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        if (currentUser?.data[0]?.mentor_id) {
            dispatch(getTeacherByID(currentUser?.data[0]?.mentor_id));
        }
    }, [currentUser?.data[0]?.mentor_id]);
    const handleEdit = () => {
        history.push({
            pathname: '/EditTeacherProfile',
            item: {
                full_name: teacher?.full_name,
                mentor_id: teacher?.mentor_id,
                mobile: teacher?.mobile,
                username: teacher?.username_email,
                title: teacher?.title,
                gender: teacher?.gender,
                whatapp_mobile: teacher?.whatapp_mobile
            }
        });
    };

    useEffect(() => {
        if (teacher && teacher.organization?.category === 'Non ATL') {
            const atlcode = teacher?.organization_code.split('-');
            const result = atlcode[0];
            // console.log(result);
            handleAtlData(result);
        }
    }, [teacher]);

    const handleAtlData = (result) => {
        const body = JSON.stringify({
            organization_code: result
        });
        var config = {
            method: 'post',
            url: process.env.REACT_APP_API_BASE_URL + '/organizations/checkOrg',
            headers: {
                'Content-Type': 'application/json',
                Authorization : 'O10ZPA0jZS38wP7cO9EhI3jaDf24WmKX62nWw870'
            },
            data: body
        };
        axios(config)
            .then(function (response) {
                if (response?.status == 200) {
                    setData(response?.data?.data[0]);
                    setCode(response?.data?.data[0]?.organization_code);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <Layout>
            <Container className="MyProfile pt-3 pt-xl-5 mb-50">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        <div className="d-flex justify-content-between mb-3">
                            <h2>My Profile</h2>
                            <Button
                                onClick={() => handleEdit()}
                                size="small"
                                label={'Edit'}
                                btnClass={'primary'}
                            ></Button>
                        </div>
                        <Row>
                            <Col md={12}>
                                <Card className="w-100  mb-5 p-4">
                                    <CardBody>
                                        <Row>
                                            <Col
                                                md={8}
                                                className="border-right my-auto "
                                            >
                                                <Row>
                                                    <Col
                                                        md={7}
                                                        className="my-auto profile-detail w-100"
                                                    >
                                                        <CardText>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>Title</b>
                                                                </Col>
                                                                <Col
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
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher?.title
                                                                            ? teacher?.title
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>Name</b>
                                                                </Col>
                                                                <Col
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
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher?.full_name
                                                                            ? teacher?.full_name
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        Gender
                                                                    </b>
                                                                </Col>
                                                                <Col
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
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher?.gender
                                                                            ? teacher?.gender
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        Email
                                                                        Address
                                                                    </b>
                                                                </Col>
                                                                <Col
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
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher?.username_email
                                                                            ? teacher?.username_email
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        WhatsApp
                                                                        Mobile
                                                                    </b>
                                                                </Col>
                                                                <Col
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
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher?.whatapp_mobile
                                                                            ? teacher?.whatapp_mobile
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        Mobile
                                                                        Number
                                                                    </b>
                                                                </Col>
                                                                <Col
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
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher?.mobile
                                                                            ? teacher?.mobile
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                        </CardText>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={12}>
                                <Card className="w-100  mb-5 p-4">
                                    <CardBody>
                                        <Row>
                                            <Col
                                                md={8}
                                                className="border-right my-auto "
                                            >
                                                <Row>
                                                    <Col
                                                        md={7}
                                                        className="my-auto profile-detail w-100"
                                                    >
                                                        <CardText>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
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
                                                                        My
                                                                        School
                                                                        Details
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        ATL Code
                                                                    </b>
                                                                </Col>
                                                                <Col
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
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher?.organization_code
                                                                            ? teacher?.organization_code
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        UDISE
                                                                        Code
                                                                    </b>
                                                                </Col>
                                                                <Col
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
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher
                                                                            .organization
                                                                            ?.unique_code
                                                                            ? teacher
                                                                                  .organization
                                                                                  ?.unique_code
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        School
                                                                        Name
                                                                    </b>
                                                                </Col>
                                                                <Col
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
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher
                                                                            .organization
                                                                            ?.organization_name
                                                                            ? teacher
                                                                                  .organization
                                                                                  ?.organization_name
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>

                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        Pin Code
                                                                    </b>
                                                                </Col>
                                                                <Col
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
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher
                                                                            .organization
                                                                            ?.pin_code
                                                                            ? teacher
                                                                                  .organization
                                                                                  ?.pin_code
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>

                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        District
                                                                    </b>
                                                                </Col>
                                                                <Col
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
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher
                                                                            .organization
                                                                            ?.district
                                                                            ? teacher
                                                                                  .organization
                                                                                  ?.district
                                                                            : '-'}
                                                                             {teacher
                                                                            .organization
                                                                            ?.new_district
                                                                            ? ` (${teacher
                                                                                  .organization
                                                                                  ?.new_district})`
                                                                            : ''}
                                                                    </b>
                                                                </Col>
                                                            </Row>

                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>State</b>
                                                                </Col>
                                                                <Col
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
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher
                                                                            .organization
                                                                            ?.state
                                                                            ? teacher
                                                                                  .organization
                                                                                  ?.state
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        Category
                                                                    </b>
                                                                </Col>
                                                                <Col
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
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher
                                                                            .organization
                                                                            ?.category
                                                                            ? teacher
                                                                                  .organization
                                                                                  ?.category
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                        </CardText>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            {data && (
                                <Col md={12}>
                                    <Card className="w-100  mb-5 p-4">
                                        <CardBody>
                                            <Row>
                                                <Col
                                                    md={8}
                                                    className="border-right my-auto "
                                                >
                                                    <Row>
                                                        <Col
                                                            md={7}
                                                            className="my-auto profile-detail w-100"
                                                        >
                                                            <CardText>
                                                                <Row className="pt-3 pb-3">
                                                                    <Col
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
                                                                            ATL
                                                                            School
                                                                            Details
                                                                        </b>
                                                                    </Col>
                                                                </Row>
                                                                <Row className="pt-3 pb-3">
                                                                    <Col
                                                                        xs={5}
                                                                        sm={5}
                                                                        md={5}
                                                                        xl={5}
                                                                        className="my-auto profile-detail"
                                                                    >
                                                                        <b>
                                                                            ATL
                                                                            Code
                                                                        </b>
                                                                    </Col>
                                                                    <Col
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
                                                                        className="my-auto profile-detail"
                                                                    >
                                                                        <b>
                                                                            {
                                                                                code
                                                                            }
                                                                            {/* {teacher?.organization_code
                                                                                ? teacher?.organization_code
                                                                                : '-'} */}
                                                                        </b>
                                                                    </Col>
                                                                </Row>

                                                                <Row className="pt-3 pb-3">
                                                                    <Col
                                                                        xs={5}
                                                                        sm={5}
                                                                        md={5}
                                                                        xl={5}
                                                                        className="my-auto profile-detail"
                                                                    >
                                                                        <b>
                                                                            School
                                                                            Name
                                                                        </b>
                                                                    </Col>
                                                                    <Col
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
                                                                        className="my-auto profile-detail"
                                                                    >
                                                                        <b>
                                                                            {
                                                                                data?.organization_name
                                                                            }
                                                                        </b>
                                                                    </Col>
                                                                </Row>

                                                                <Row className="pt-3 pb-3">
                                                                    <Col
                                                                        xs={5}
                                                                        sm={5}
                                                                        md={5}
                                                                        xl={5}
                                                                        className="my-auto profile-detail"
                                                                    >
                                                                        <b>
                                                                            Pin
                                                                            Code
                                                                        </b>
                                                                    </Col>
                                                                    <Col
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
                                                                        className="my-auto profile-detail"
                                                                    >
                                                                        <b>
                                                                            {
                                                                                data?.pin_code
                                                                            }
                                                                        </b>
                                                                    </Col>
                                                                </Row>

                                                                <Row className="pt-3 pb-3">
                                                                    <Col
                                                                        xs={5}
                                                                        sm={5}
                                                                        md={5}
                                                                        xl={5}
                                                                        className="my-auto profile-detail"
                                                                    >
                                                                        <b>
                                                                            District
                                                                        </b>
                                                                    </Col>
                                                                    <Col
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
                                                                        className="my-auto profile-detail"
                                                                    >
                                                                        <b>
                                                                            {
                                                                                data?.district
                                                                            }
                                                                        </b>
                                                                    </Col>
                                                                </Row>

                                                                <Row className="pt-3 pb-3">
                                                                    <Col
                                                                        xs={5}
                                                                        sm={5}
                                                                        md={5}
                                                                        xl={5}
                                                                        className="my-auto profile-detail"
                                                                    >
                                                                        <b>
                                                                            State
                                                                        </b>
                                                                    </Col>
                                                                    <Col
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
                                                                        className="my-auto profile-detail"
                                                                    >
                                                                        <b>
                                                                            {
                                                                                data?.state
                                                                            }
                                                                        </b>
                                                                    </Col>
                                                                </Row>
                                                            </CardText>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default MyProfile;
