/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect } from 'react';
import { Row, Col, Form, Label, FormGroup } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import './style.scss';

import Layout from '../../Admin/Layout';

import { Button } from '../../stories/Button';

import axios from 'axios';
import Select from './../Challenges/pages/Select';
import { getCurrentUser } from '../../helpers/Utils';

import { InputBox } from '../../stories/InputBox/InputBox';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { useSelector } from 'react-redux';

import { URL, KEY } from '../../constants/defaultValues';
import {
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';
import { useDispatch } from 'react-redux';
import {
    // getDistrictData,
    getStateData,
    getFetchDistData
} from '../../redux/studentRegistration/actions';
const EditSchool = (props) => {
    const currentUser = getCurrentUser('current_user');

    const listID = JSON.parse(localStorage.getItem('listId'));
    const dispatch = useDispatch();

    // where  listID = orgnization details //

    const listId =
        (history &&
            history.location &&
            history.location.item &&
            history.location.item) ||
        listID;

    const inputDICE = {
        type: 'text',
        className: 'defaultInput'
    };
    const filterCategory = ['ATL', 'Non ATL'];

    const fullStatesNames = useSelector(
        (state) => state?.studentRegistration?.regstate
    );
    const fiterDistData = useSelector(
        (state) => state?.studentRegistration?.fetchdist
    );
    // const phoneRegExp = /^[0-9\s]+$/;
    // const headingDetails = {
    //     title: 'Edit Institutions Details',

    //     options: [
    //         {
    //             title: 'Institutions',
    //             path: '/admin/registered-schools'
    //         },
    //         {
    //             title: 'Edit Institutions',
    //             path: '/admin/register-edit-schools'
    //         }
    //     ]
    // };

    const formik = useFormik({
        initialValues: {
            principal_name: listId && listId.principal_name,
            // principal_mobile: listId && listId.principal_mobile,
            principal_email: listId && listId.principal_email,
            organization_name: listId && listId.organization_name,
            organization_code: listId && listId.organization_code,
            unique_code: listId && listId.unique_code,
            pin_code: listId && listId.pin_code,
            // organization_code: 'Unique Code',
            city: listId && listId.city,
            district: listId && listId.district,
            state: listId && listId.state,
            status: listId && listId.status,
            address: listId && listId.address,
            category: listId && listId.category
        },

        validationSchema: Yup.object({
            organization_code: Yup.string()
                .matches(
                    /^[A-Za-z0-9]*$/,
                    'Please enter only alphanumeric characters'
                )
                .trim()
                .required('UDISE  Code is Required'),
            organization_name: Yup.string().required(
                'Organization  Name is Required'
            ),
            unique_code: Yup.string()
                .matches(/^[0-9]*$/, 'Please enter Numeric values')
                .required('UDISE Code is Required'),
            address: Yup.string().required('Address is required'),
            pin_code: Yup.string()
                .matches(/^[0-9]*$/, 'Please enter Numeric values')
                .required('Please Enter PinCode'),
            district: Yup.string()
                // .matches(/^[aA-zZ\s]+$/, 'Invalid district')
                .required('District is Required'),
            category: Yup.string()
                .matches(/^[aA-zZ\s]+$/, 'Invalid category')
                .required('category is Required'),
            state: Yup.string().required('State is required'),
            // .optional()
            // .matches(/^[aA-zZ\s]+$/, 'Invalid State'),
            principal_email: Yup.string()
                .optional()
                .email('Invalid email address format'),
            principal_name: Yup.string()
                .optional()
                .matches(/^[aA-zZ\s/^.*$/]+$/, 'Invalid Name')
                .trim()
            // city: Yup.string().matches(/^[aA-zZ\s/^.*$/]+$/)
        }),

        onSubmit: (values) => {
            const body = {
                organization_code: values.organization_code,
                principal_email: values.principal_email,
                principal_name: values.principal_name,
                state: values.state,
                category: values.category,
                pin_code: values.pin_code,
                address: values.address,
                unique_code: values.unique_code,
                organization_name: values.organization_name
            };
            if (listId && listId.district !== values.district) {
                body['district'] = values.district;
            }
            var config = {
                method: 'put',
                url:
                    process.env.REACT_APP_API_BASE_URL +
                    '/organizations/' +
                    listId.organization_id,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser?.data[0]?.token}`
                },
                data: body
            };
            axios(config)
                .then((checkOrgRes) => {
                    if (checkOrgRes.status == 200) {
                        openNotificationWithIcon(
                            'success',
                            'School Update Successfully'
                        );
                        props.history.push('/admin/registered-schools');
                    }
                })
                .catch((err) => {
                    return err.response;
                });
        }
    });
    useEffect(() => {
        dispatch(getStateData());
    }, []);
    useEffect(() => {
        if (formik.values.state) {
            dispatch(getFetchDistData());
        }
    }, [formik.values.state]);
    // console.log('formik.values.district', formik.values.district);

    return (
        <Layout>
            <div className="EditPersonalDetails new-member-page">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        {/* <BreadcrumbTwo {...headingDetails} /> */}
                        <h3 className="mb-5">Edit Institutions Details</h3>

                        <div>
                            <Form onSubmit={formik.handleSubmit} isSubmitting>
                                <div className="create-ticket register-block">
                                    <FormGroup className="form-group">
                                        <Row className="justify-content-center">
                                            {/* <p style={{ color: 'red' }}>
                                                Note : Here Editable Fields are
                                                Institute/School
                                                Name,City,Principal
                                                Name,Principal Email.
                                            </p> */}
                                            <Col md={4}>
                                                <Label
                                                    className="mb-2"
                                                    htmlFor="organization_code"
                                                >
                                                    ATL Code
                                                    {/* <span required>*</span> */}
                                                </Label>
                                                <InputBox
                                                    {...inputDICE}
                                                    id="organization_code"
                                                    // isDisabled={true}
                                                    name="organization_code"
                                                    placeholder="Please enter Unique Code"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values
                                                            .organization_code
                                                    }
                                                />
                                                {formik.touched
                                                    .organization_code &&
                                                formik.errors
                                                    .organization_code ? (
                                                    <small className="error-cls">
                                                        {
                                                            formik.errors
                                                                .organization_code
                                                        }
                                                    </small>
                                                ) : null}
                                            </Col>
                                            <Col md={4}>
                                                <Label
                                                    className="mb-2"
                                                    htmlFor="unique_code"
                                                    // style={{ fontSize: 15 }}
                                                >
                                                    UDISE Code
                                                    <span required>*</span>
                                                </Label>
                                                <InputBox
                                                    {...inputDICE}
                                                    id="unique_code"
                                                    name="unique_code"
                                                    placeholder="Please enter Unique Code"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values
                                                            .unique_code
                                                    }
                                                    // isDisabled={holdKey ? true : false}
                                                />
                                                {formik.touched.unique_code &&
                                                formik.errors.unique_code ? (
                                                    <small className="error-cls">
                                                        {
                                                            formik.errors
                                                                .unique_code
                                                        }
                                                    </small>
                                                ) : null}
                                            </Col>
                                            <Col md={4}>
                                                <Label
                                                    className="mb-2"
                                                    htmlFor="city"
                                                >
                                                    City
                                                </Label>
                                                <InputBox
                                                    {...inputDICE}
                                                    id="city"
                                                    name="city"
                                                    className="code"
                                                    placeholder="Please enter city "
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.city}
                                                />
                                                {formik.touched.city &&
                                                formik.errors.city ? (
                                                    <small className="error-cls">
                                                        {formik.errors.city}
                                                    </small>
                                                ) : null}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={4}>
                                                <Label
                                                    className="mb-2"
                                                    htmlFor="pin_code"
                                                    // style={{ fontSize: 15 }}
                                                >
                                                    PinCode
                                                    <span required>*</span>
                                                </Label>
                                                <InputBox
                                                    {...inputDICE}
                                                    id="pin_code"
                                                    name="pin_code"
                                                    placeholder="Please enter PinCode"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values.pin_code
                                                    }
                                                />
                                                {formik.touched.pin_code &&
                                                formik.errors.pin_code ? (
                                                    <small className="error-cls">
                                                        {formik.errors.pin_code}
                                                    </small>
                                                ) : null}
                                            </Col>
                                            <Col md={4}>
                                                <Label
                                                    className="mb-2"
                                                    htmlFor="organization_name"
                                                    // style={{ fontSize: 15 }}
                                                >
                                                    Institute/School Name
                                                    <span required>*</span>
                                                </Label>
                                                <InputBox
                                                    {...inputDICE}
                                                    id="organization_name"
                                                    name="organization_name"
                                                    placeholder="Please enter Institute/School name"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values
                                                            .organization_name
                                                    }
                                                />
                                                {formik.touched
                                                    .organization_name &&
                                                formik.errors
                                                    .organization_name ? (
                                                    <small className="error-cls">
                                                        {
                                                            formik.errors
                                                                .organization_name
                                                        }
                                                    </small>
                                                ) : null}
                                            </Col>
                                            <Col md={4}>
                                                <Label
                                                    className="mb-2"
                                                    htmlFor="address"
                                                >
                                                    Address
                                                    <span required>*</span>
                                                </Label>
                                                <InputBox
                                                    {...inputDICE}
                                                    id="address"
                                                    name="address"
                                                    placeholder="Please enter Address"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values.address
                                                    }
                                                />
                                                {formik.touched.address &&
                                                formik.errors.address ? (
                                                    <small className="error-cls">
                                                        {formik.errors.address}
                                                    </small>
                                                ) : null}
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={4}>
                                                <Label
                                                    // className="mb-2"
                                                    className="name-req"
                                                    htmlFor="district"
                                                >
                                                    category
                                                    <span required>*</span>
                                                </Label>
                                                {/* <Col md={3}> */}
                                                <div className=" d-md-block d-flex justify-content-center">
                                                    {' '}
                                                    <Select
                                                        className="form-control custom-registerdropdown "
                                                        list={filterCategory}
                                                        setValue={(value) =>
                                                            formik.setFieldValue(
                                                                'category',
                                                                value
                                                            )
                                                        }
                                                        placeHolder={
                                                            'Select category'
                                                        }
                                                        value={
                                                            formik.values
                                                                .category
                                                        }
                                                    />
                                                </div>

                                                {formik.touched.category &&
                                                formik.errors.category ? (
                                                    <small className="error-cls">
                                                        {formik.errors.category}
                                                    </small>
                                                ) : null}
                                            </Col>
                                            <Col md={4}>
                                                <Label
                                                    className="mb-2"
                                                    htmlFor="state"
                                                >
                                                    State
                                                </Label>
                                                <div className=" d-md-block d-flex justify-content-center">
                                                    <Select
                                                        list={fullStatesNames}
                                                        setValue={(value) =>
                                                            formik.setFieldValue(
                                                                'state',
                                                                value
                                                            )
                                                        }
                                                        placeHolder={
                                                            'Select State'
                                                        }
                                                        value={
                                                            formik.values.state
                                                        }
                                                    />
                                                </div>

                                                {formik.touched.state &&
                                                formik.errors.state ? (
                                                    <small className="error-cls">
                                                        {formik.errors.state}
                                                    </small>
                                                ) : null}
                                            </Col>
                                            <Col md={4}>
                                                <Label
                                                    className="mb-2"
                                                    htmlFor="district"
                                                >
                                                    District
                                                    <span required>*</span>
                                                </Label>
                                                {/* <Col md={3}> */}
                                                <div className=" d-md-block d-flex justify-content-center">
                                                    <Select
                                                        list={fiterDistData}
                                                        setValue={(value) =>
                                                            formik.setFieldValue(
                                                                'district',
                                                                value
                                                            )
                                                        }
                                                        placeHolder={
                                                            'Select District'
                                                        }
                                                        value={
                                                            formik.values
                                                                .district
                                                        }
                                                    />
                                                </div>

                                                {formik.touched.district &&
                                                formik.errors.district ? (
                                                    <small className="error-cls">
                                                        {formik.errors.district}
                                                    </small>
                                                ) : null}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <Label
                                                    className="mb-2"
                                                    htmlFor="principal_name"
                                                >
                                                    Principal Name
                                                </Label>
                                                <InputBox
                                                    {...inputDICE}
                                                    id="principal_name"
                                                    name="principal_name"
                                                    placeholder="Please enter principal name"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values
                                                            .principal_name
                                                    }
                                                />
                                                {formik.touched
                                                    .principal_name &&
                                                formik.errors.principal_name ? (
                                                    <small className="error-cls">
                                                        {
                                                            formik.errors
                                                                .principal_name
                                                        }
                                                    </small>
                                                ) : null}
                                            </Col>
                                            {/* <Label
                                            className="mb-2"
                                            htmlFor="principal_mobile"
                                        >
                                            Principal Mobile
                                        </Label>
                                        <InputBox
                                            {...inputDICE}
                                            id="principal_mobile"
                                            name="principal_mobile"
                                            placeholder="Please enter principal mobile number"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={
                                                formik.values.principal_mobile
                                            }
                                        />
                                        {formik.touched.principal_mobile &&
                                        formik.errors.principal_mobile ? (
                                            <small className="error-cls">
                                                {formik.errors.principal_mobile}
                                            </small>
                                        ) : null} */}
                                            <Col md={6}>
                                                <Label
                                                    className="mb-2"
                                                    htmlFor="principal_email"
                                                >
                                                    Principal Email
                                                </Label>
                                                <InputBox
                                                    {...inputDICE}
                                                    id="principal_email"
                                                    name="principal_email"
                                                    placeholder="Please enter principal email"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values
                                                            .principal_email
                                                    }
                                                />
                                                {formik.touched
                                                    .principal_email &&
                                                formik.errors
                                                    .principal_email ? (
                                                    <small className="error-cls">
                                                        {
                                                            formik.errors
                                                                .principal_email
                                                        }
                                                    </small>
                                                ) : null}
                                            </Col>
                                        </Row>
                                    </FormGroup>
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
                                                    '/admin/registered-schools'
                                                )
                                            }
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

export default withRouter(EditSchool);
