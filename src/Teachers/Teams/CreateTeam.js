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
    const inputEmail = {
        type: 'text',
        placeholder: 'Enter Email Id',
        className: 'defaultInput'
    };
    const inputUsername = {
        type: 'text',
        placeholder: `${t('teacehr_red.faculty_ph')}`,
        className: 'defaultInput'
    };
    const formik = useFormik({
        initialValues: {
            teamName: '',
            name: '',
            email: '',
            gender: '',
            mobile: ''
        },

        validationSchema: Yup.object({
            teamName: Yup.string()
                .required('Please enter Team name')
                .matches(
                    /^[A-Za-z0-9 ]*$/,
                    'Please enter only alphanumeric characters'
                )
                .trim(),
            name: Yup.string()
                // .required('Please enter Mentor Details')
                .matches(
                    /^[A-Za-z0-9 ]*$/,
                    'Please enter only alphanumeric characters'
                )
                .trim(),
            mobile: Yup.string()
                // .required('required')
                .trim()
                .matches(
                    /^\d+$/,
                    'Mobile number is not valid (Enter only digits)'
                )
                .max(10, 'Please enter only 10 digit valid number')
                .min(10, 'Number is less than 10 digits'),
            email: Yup.string().email('Must be a valid email').max(255),
            // .required(),
            gender: Yup.string()
            // .required('Please select valid gender')
        }),

        onSubmit: (values) => {
            const body = {
                mentor_id: JSON.stringify(currentUser?.data[0]?.mentor_id),
                team_name: values.teamName
            };
            if (values.name !== '' && values.name !== null) {
                body['moc_name'] = values.name;
            }
            if (values.gender !== '' && values.gender !== null) {
                body['moc_gender'] = values.gender;
            }
            if (values.email !== '' && values.email !== null) {
                body['moc_email'] = values.email;
            }
            if (values.mobile !== '' && values.mobile !== null) {
                body['moc_phone'] = values.mobile;
            }

            var config = {
                method: 'post',
                url: process.env.REACT_APP_API_BASE_URL + '/teams',
                headers: {
                    'Content-Type': 'application/json',

                    Authorization: `Bearer ${currentUser?.data[0]?.token}`
                },
                data: JSON.stringify(body)
            };
            axios(config)
                .then(function (response) {
                    if (response.status === 201) {
                        setTimeout(() => {
                            openNotificationWithIcon(
                                'success',
                                'Team Create Successfully'
                            );
                            props.history.push('/teacher/teamlist');
                        }, 1000);
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
                                                htmlFor="name"
                                            >
                                                {/* {t('teacher_teams.team_name')} */}
                                                Mentor Name
                                                {/* <span required className="p-1">
                                                    *
                                                </span> */}
                                            </Label>

                                            <InputBox
                                                className={'defaultInput'}
                                                placeholder="Enter Mentor Name"
                                                id="name"
                                                name="name"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.name}
                                            />

                                            {formik.touched.name &&
                                            formik.errors.name ? (
                                                <small className="error-cls">
                                                    {/* {formik.errors.name} */}
                                                </small>
                                            ) : null}
                                        </Col>
                                        <Col md={6}>
                                            <Label
                                                className="mb-2"
                                                htmlFor="email"
                                            >
                                                Mentor Email Address
                                            </Label>
                                            <InputBox
                                                {...inputEmail}
                                                id="email"
                                                name="email"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                            />

                                            {formik.touched.email &&
                                            formik.errors.email ? (
                                                <small className="error-cls">
                                                    {formik.errors.email}
                                                </small>
                                            ) : null}
                                        </Col>
                                        <Col md={6}>
                                            <Label
                                                className="mb-2"
                                                htmlFor="gender"
                                            >
                                                Mentor Gender
                                                {/* {t('teacehr_red.gender')} */}
                                            </Label>
                                            <select
                                                name="gender"
                                                // id="gender"
                                                className="col-8 selectDropdown"
                                                value={formik.values.gender}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                            >
                                                <option value="">
                                                    {t(
                                                        'teacehr_red.teacher_gender'
                                                    )}
                                                </option>
                                                <option value="Male">
                                                    {t(
                                                        'teacehr_red.teacher_gender_male'
                                                    )}
                                                </option>
                                                <option value="Female">
                                                    {t(
                                                        'teacehr_red.teacher_gender_female'
                                                    )}
                                                </option>
                                            </select>
                                            {formik.touched.gender &&
                                            formik.errors.gender ? (
                                                <small className="error-cls">
                                                    {formik.errors.gender}
                                                </small>
                                            ) : null}
                                        </Col>
                                        <Col md={6}>
                                            <Label
                                                className="mb-2 mt-3"
                                                htmlFor="mobile"
                                            >
                                                Mentor Mobile Number
                                            </Label>
                                            <InputBox
                                                {...inputUsername}
                                                id="mobile"
                                                name="mobile"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.mobile}
                                            />

                                            {formik.touched.mobile &&
                                            formik.errors.mobile ? (
                                                <small className="error-cls">
                                                    {formik.errors.mobile}
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
