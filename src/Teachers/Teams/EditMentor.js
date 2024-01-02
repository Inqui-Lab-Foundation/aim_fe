/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React from 'react';
import { Row, Col, Form, Label } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Layout from '../Layout';
import { Button } from '../../stories/Button';
import axios from 'axios';
import { InputBox } from '../../stories/InputBox/InputBox';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
    getCurrentUser,
    openNotificationWithIcon,
    setCurrentUser
} from '../../helpers/Utils';
// import { useNavigate } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
import { encryptGlobal } from '../../constants/encryptDecrypt';

const EditMentor = (props) => {
    // here we can edit the users details //
    const history = useHistory();
    // const navigate = useNavigate();

    const mentorData =
        // where  mentorData = mentor details //
        (history && history.location && history.location.item) || {};
    // console.log(mentorData, 'data');
    const { t } = useTranslation();
    const currentUser = getCurrentUser('current_user');

    const getValidationSchema = () => {
        // where data = mentorData //
        const adminValidation = Yup.object({
            mobile: Yup.string()
                .required('required')
                .trim()
                .matches(/^[0-9\s]+$/, 'Mobile number is not valid')
                .min(10, 'Please enter valid number')
                .max(10, 'Please enter valid number'),
            gender: Yup.string().required('Please select valid gender'),
            // title: Yup.string().required('Please select Title'),
            name: Yup.string()
                // .matches(/^[A-Za-z]*$/, 'Invalid name ')
                // .min(2, 'Enter a valid name')
                // .required('Name is Required'),
                .trim()
                .min(2, 'Enter Name')
                .matches(/^[aA-zZ\s]+$/, 'Special Characters are not allowed')
                .required('Required'),
            email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('required')
        });
        return adminValidation;
    };
    const getInitialValues = (mentorData) => {
        const commonInitialValues = {
            name: mentorData?.moc_name,
            mobile: mentorData?.moc_phone,
            email: mentorData?.moc_email,
            gender: mentorData?.moc_gender
        };
        return commonInitialValues;
    };
    const formik = useFormik({
        initialValues: getInitialValues(mentorData),
        validationSchema: getValidationSchema(),
        onSubmit: (values) => {
            const full_name = values.name;
            const mobile = values.mobile;
            const email = values.email;
            const gender = values.gender;
            const body = JSON.stringify({
                moc_name: full_name,
                moc_email: email,
                moc_phone: mobile,
                moc_gender: gender,
                status: 'ACTIVE',
                team_name: mentorData.team_name
                // username: mentorData.username
            });
            const editParam = encryptGlobal(JSON.stringify(mentorData.team_id));
            const url =
                process.env.REACT_APP_API_BASE_URL + '/teams/' + editParam;
            var config = {
                method: 'put',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser?.data[0]?.token}`
                },
                data: body
            };
            axios(config)
                .then(function (response) {
                    if (response.status === 200) {
                        // console.log(response, 'res');
                        openNotificationWithIcon(
                            'success',
                            'Updated Successfully'
                        );
                        currentUser.data[0].moc_name = values.name;
                        setCurrentUser(currentUser);
                        // navigate('/teacher/view-team-member');
                        setTimeout(() => {
                            props.history.push('/teacher/view-team-member');
                        }, 1000);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    });

    const handleDiscard = () => {
        // where we can discard  the changes //
        props.history.push('/teacher/view-team-member');
    };

    return (
        <Layout>
            <div className="EditPersonalDetails new-member-page">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        <h3 className="mb-5">Mentor Profile</h3>
                        <div>
                            <Form onSubmit={formik.handleSubmit} isSubmitting>
                                <div className="create-ticket register-block">
                                    <Row className="justify-content-center">
                                        <Col md={6}>
                                            <Label
                                                className="name-req"
                                                htmlFor="name"
                                            >
                                                Mentor Name
                                            </Label>
                                            <InputBox
                                                className={'defaultInput'}
                                                placeholder={
                                                    'Enter Mentor Name'
                                                }
                                                id="name"
                                                name="name"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.name}
                                            />

                                            {formik.touched.name &&
                                            formik.errors.name ? (
                                                <small className="error-cls">
                                                    {formik.errors.name}
                                                </small>
                                            ) : null}
                                        </Col>
                                        <Col md={6}>
                                            <Label
                                                className="name-req"
                                                htmlFor="gender"
                                            >
                                                Mentor Gender
                                                {/* {t('teacehr_red.gender')} */}
                                            </Label>
                                            <select
                                                name="gender"
                                                // id="gender"
                                                placeholder={
                                                    'Enter Mentor Gender'
                                                }
                                                className=" col-8 SelectBox form-control custom-registerdropdown "
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
                                                className="name-req"
                                                htmlFor="email"
                                            >
                                                Mentor Email Id
                                            </Label>
                                            <InputBox
                                                className={'defaultInput'}
                                                placeholder={
                                                    'Enter Mentor Email Id'
                                                }
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
                                                className=" name-req"
                                                htmlFor="mobile"
                                            >
                                                Mentor Mobile No
                                                {/* {t(
                                                    'teacehr_red.faculty_mobile'
                                                )} */}
                                            </Label>
                                            <InputBox
                                                className={'defaultInput'}
                                                placeholder={
                                                    'Enter Mentor  Mobile No'
                                                }
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
                                            onClick={handleDiscard}
                                        />
                                    </Col>
                                    <Col className="submit-btn col-xs-12 col-sm-6">
                                        <Button
                                            label="Submit details"
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
                                            disabled={!formik.dirty}
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

export default EditMentor;
