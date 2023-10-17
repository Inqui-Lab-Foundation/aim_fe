/* eslint-disable indent */
import React from 'react';
import { Row, Col, Form, Label } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Layout from '../Layout';
import { Button } from '../../stories/Button';
import { InputBox } from '../../stories/InputBox/InputBox';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { openNotificationWithIcon, getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const CreateTeam = (props) => {
    const currentUser = getCurrentUser('current_user');
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            teamName: '',
            mentorData: ''
        },

        validationSchema: Yup.object({
            teamName: Yup.string()
                .required('Please enter Team name')
                .matches(
                    /^[A-Za-z0-9 ]*$/,
                    'Please enter only alphanumeric characters'
                )
                .trim(),
            mentorData: Yup.string()
                .required('Please enter Mentor Details')
                .matches(
                    /^[A-Za-z0-9 ]*$/,
                    'Please enter only alphanumeric characters'
                )
                .trim()
        }),

        onSubmit: (values) => {
            const body = JSON.stringify({
                mentor_id: JSON.stringify(currentUser?.data[0]?.mentor_id),
                team_name: values.teamName,
                mentor_details: values.mentorData
            });
            var config = {
                method: 'post',
                url: process.env.REACT_APP_API_BASE_URL + '/teams',
                headers: {
                    'Content-Type': 'application/json',

                    Authorization: `Bearer ${currentUser?.data[0]?.token}`
                },
                data: body
            };
            axios(config)
                .then(function (response) {
                    if (response.status === 201) {
                        openNotificationWithIcon(
                            'success',
                            'Team Create Successfully'
                        );
                        props.history.push('/teacher/teamlist');
                    } else {
                        openNotificationWithIcon(
                            'error',
                            'Opps! Something Wrong'
                        );
                    }
                })
                .catch(function (error) {
                    console.log(error.response.data.status);
                    if (error.response.data.status === 400) {
                        openNotificationWithIcon(
                            'warning',
                            'Team Name All Ready Exist!..'
                        );
                    }
                });
        }
    });

    return (
        <Layout>
            <div className="EditPersonalDetails new-member-page">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        <h3> Add New Team Details </h3>

                        <div>
                            <Form onSubmit={formik.handleSubmit} isSubmitting>
                                <div className="create-ticket register-blockt">
                                    <Row>
                                        <Col md={6} className="mb-5 mb-xl-0">
                                            <Label
                                                className="name-req"
                                                htmlFor="firstName"
                                            >
                                                {t('teacher_teams.team_name')}
                                                <span required className="p-1">
                                                    *
                                                </span>
                                            </Label>

                                            <InputBox
                                                className={'defaultInput'}
                                                placeholder="Enter Team name"
                                                id="teamName"
                                                name="teamName"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.teamName}
                                            />

                                            {formik.touched.teamName &&
                                            formik.errors.teamName ? (
                                                <small className="error-cls">
                                                    {formik.errors.teamName}
                                                </small>
                                            ) : null}
                                        </Col>
                                        <Col md={6} className="mb-5 mb-xl-0">
                                            <Label
                                                className="name-req"
                                                htmlFor="mentorData"
                                            >
                                                {/* {t('teacher_teams.team_name')} */}
                                                Mentor Details
                                                <span required className="p-1">
                                                    *
                                                </span>
                                            </Label>

                                            <InputBox
                                                className={'defaultInput'}
                                                placeholder="Enter Mentor Details"
                                                id="mentorData"
                                                name="mentorData"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.mentorData}
                                            />

                                            {formik.touched.mentorData &&
                                            formik.errors.mentorData ? (
                                                <small className="error-cls">
                                                    {formik.errors.mentorData}
                                                </small>
                                            ) : null}
                                        </Col>
                                    </Row>
                                </div>

                                <hr className="mt-4 mb-4"></hr>
                                <Row>
                                    <Col className="col-xs-12 col-sm-6">
                                        <Button
                                            label="Discard"
                                            btnClass="secondary"
                                            size="small"
                                            onClick={() =>
                                                props.history.push(
                                                    '/teacher/teamlist'
                                                )
                                            }
                                        />
                                    </Col>
                                    <Col className="submit-btn col-xs-12 col-sm-6">
                                        <Button
                                            label="Submit"
                                            type="submit"
                                            btnClass={
                                                !(
                                                    formik.dirty &&
                                                    formik.isValid
                                                )
                                                    ? 'default'
                                                    : 'primary'
                                            }
                                            size="small"
                                            disabled={
                                                !(
                                                    formik.dirty &&
                                                    formik.isValid
                                                )
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default withRouter(CreateTeam);
