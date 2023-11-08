/* eslint-disable no-empty */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Label, UncontrolledAlert } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Input, Radio } from 'antd';
import Select from '../Evaluator/Helper/Select';

import successIcon from '../assets/media/img/rocket.gif';
import signuplogo from '../assets/media/tn-brands/UPSHIFT_BLACK.png';
import image_1 from '../assets/media/unisolve_slider1.png';
import image_2 from '../assets/media/aim_Slider.png';
import { useFormik } from 'formik';
import { Carousel } from 'react-bootstrap';
import { InputBox } from '../stories/InputBox/InputBox';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Button } from '../stories/Button';
import { URL, KEY } from '../constants/defaultValues';
import { Modal } from 'react-bootstrap';
import { getNormalHeaders, openNotificationWithIcon } from '../helpers/Utils';

import axios from 'axios';
import CryptoJS from 'crypto-js';
import OtpInput from 'react-otp-input-rc-17';
import { useHistory } from 'react-router-dom';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import {
    getDistrictData,
    getStateData,
    getFetchDistData,
    getAtlCodeData,
    getPinCodeData
} from '../redux/studentRegistration/actions';
import { useDispatch, useSelector } from 'react-redux';

function RegisterNew() {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();

    const [diesCode, setDiesCode] = useState('');
    const [orgData, setOrgData] = useState({});
    const [district, setdistrict] = React.useState('');
    const [stateData, setStateData] = React.useState('');
    const [pinCode, setPinCode] = useState('');
    const [atlCode, setAtlCode] = useState('');
    const [orgNewData, setOrgNewData] = useState([]);

    const [btn, setBtn] = useState(false);
    const [schoolBtn, setSchoolBtn] = useState(false);
    const [diceBtn, setDiceBtn] = useState(true);

    const [textData, setTextData] = useState('');
    const [schoolname, setSchoolname] = useState('');
    const [error, setError] = useState('');
    const [btnOtp, setBtnOtp] = useState(false);
    const [otpRes, setOtpRes] = useState('');
    const [errorMsg, setErrorMsg] = useState(false);
    const [mentorData, setMentorData] = useState({});
    const [checkBox, setCheckBox] = useState(false);
    const [change, setChange] = useState('Send OTP');
    const [wtsNum, setWtsNum] = useState('');
    const [mobNum, setMobNum] = useState('');
    const [holdKey, setHoldKey] = useState(false);
    const [sendOtp, setSendOtp] = useState('');
    const [time] = useState('00');
    const [counter, setCounter] = useState(59);
    const [sec, setSec] = useState(59);
    const [disable, setDisable] = useState(false);
    const [timer, setTimer] = useState(0);
    const [or, setOr] = useState('');
    const [orgName, setOrgname] = useState('');
    localStorage.setItem('mentorData', JSON.stringify(mentorData));
    localStorage.setItem('orgData', JSON.stringify(orgData));

    const fullStatesNames = useSelector(
        (state) => state?.studentRegistration?.regstate
    );
    const fiterDistData = useSelector(
        (state) => state?.studentRegistration?.fetchdist
    );
    const fiterPinCodeData = useSelector(
        (state) => state?.studentRegistration?.pincode
    );
    const fiterAtlCodeData = useSelector(
        (state) => state?.studentRegistration?.atlcode
    );
    useEffect(() => {
        dispatch(getStateData());
    }, []);
    useEffect(() => {
        if (stateData !== '') {
            dispatch(getFetchDistData(stateData));
        }
        setdistrict('');
        setPinCode('');
        setAtlCode('');
    }, [stateData]);
    useEffect(() => {
        if (district !== '') {
            dispatch(getPinCodeData(district));
        }
        setPinCode('');
        setAtlCode('');
    }, [district]);
    useEffect(() => {
        if (pinCode !== '') {
            dispatch(getAtlCodeData(pinCode));
        }
        setAtlCode('');
    }, [pinCode]);
    // useEffect(() => {
    //     dispatch(getStateData());
    //     dispatch(getFetchDistData(stateData));
    //     dispatch(getPinCodeData(district));
    //     dispatch(getAtlCodeData(pinCode));
    // }, [stateData, district, pinCode]);
    const handleOnChangeCode = (e) => {
        setDiesCode(e.target.value.trim());
        setOrgData();
        setError('');
    };
    let pattern = /[0-9]*$/;
    const handleRegister = (e) => {
        const { index } = diesCode.match(pattern);
        // console.log(index, '=====', diesCode);
        if (index) {
            setError('Only numeric are allowed');
        } else if (diesCode.length < 11) {
            setError('Udise Code must be 11 digits');
        } else {
            const body = JSON.stringify({
                unique_code: diesCode
            });
            var config = {
                method: 'post',
                url:
                    process.env.REACT_APP_API_BASE_URL +
                    '/organizations/checkUniqueCode',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: body
            };
            axios(config)
                .then(function (response) {
                    if (response?.status == 200) {
                        setError(
                            'Another Teacher is already registered in given School'
                        );
                        setDiceBtn(true);
                        setBtn(false);
                    }
                })
                .catch(function (error) {
                    if (error?.response?.data?.status === 404) {
                        setBtn(true);
                        setDiceBtn(false);
                    }
                });

            e.preventDefault();
        }
    };
    const formik = useFormik({
        initialValues: {
            full_name: '',
            organization_code: atlCode,
            // username: '',
            mobile: '',
            whatapp_mobile: '',
            role: 'MENTOR',
            qualification: '-',
            reg_status: false,
            otp: '',
            password: '',
            gender: '',
            title: '',
            email: '',
            click: false,
            checkbox: false
        },

        validationSchema: Yup.object({
            full_name: Yup.string()
                .trim()
                .min(2, 'Enter Name')
                .matches(/^[aA-zZ\s]+$/, 'Special Characters are not allowed')
                .required('Required'),
            mobile: Yup.string()
                .required('required')
                .trim()
                .matches(
                    /^\d+$/,
                    'Mobile number is not valid (Enter only digits)'
                )
                .max(10, 'Please enter only 10 digit valid number')
                .min(10, 'Number is less than 10 digits'),
            email: Yup.string().email('Must be a valid email').max(255),
            whatapp_mobile: Yup.string()
                .required('required')
                .trim()
                .matches(
                    /^\d+$/,
                    'Mobile number is not valid (Enter only digit)'
                )
                .max(10, 'Please enter only 10 digit valid number')
                .min(10, 'Number is less than 10 digit'),
            gender: Yup.string().required('Please select valid gender'),
            title: Yup.string().required('Please select Title')
        }),

        onSubmit: async (values) => {
            // alert('hi');
            if (values.otp.length < 5) {
                setErrorMsg(true);
            } else {
                const axiosConfig = getNormalHeaders(KEY.User_API_Key);
                var pass = values.email.trim();
                var myArray = pass.split('@');
                let word = myArray[0];
                const key = CryptoJS.enc.Hex.parse(
                    '253D3FB468A0E24677C28A624BE0F939'
                );
                const iv = CryptoJS.enc.Hex.parse(
                    '00000000000000000000000000000000'
                );
                const encrypted = CryptoJS.AES.encrypt(word, key, {
                    iv: iv,
                    padding: CryptoJS.pad.NoPadding
                }).toString();
                // values.password = encrypted;
                const body = {
                    full_name: values.full_name.trim(),
                    mobile: values.mobile.trim(),
                    whatapp_mobile: values.whatapp_mobile.trim(),
                    username: values.email.trim(),
                    qualification: values.qualification.trim(),
                    role: values.role.trim(),
                    gender: values.gender,
                    title: values.title,
                    reg_status: values.reg_status,
                    password: encrypted
                };
                handleRegist(body);
            }
        }
    });

    const inputField = {
        type: 'text',
        className: 'defaultInput'
    };
    const inputName = {
        type: 'text',
        placeholder: `${t('teacehr_red.faculty_name_pl')}`,
        className: 'defaultInput'
    };

    const inputUsername = {
        type: 'text',
        placeholder: `${t('teacehr_red.faculty_ph')}`,
        className: 'defaultInput'
    };
    const inputMobile = {
        type: 'text',
        placeholder: `${t('teacehr_red.faculty_mobile')}`,
        className: 'defaultInput'
    };
    const inputEmail = {
        type: 'text',
        placeholder: 'Enter Email Id',
        className: 'defaultInput'
    };
    const handleOnChange = (e) => {
        setTextData(e.target.value);
    };
    const handleOnChangeSchool = (e) => {
        setSchoolname(e.target.value);
    };
    const handleSubmit = (e) => {
        const body = {
            state: stateData,
            district: district,
            pin_code: pinCode,
            category: 'Non ATL',
            organization_code: atlCode,
            organization_name: schoolname,

            address: textData
        };
        setOrgData(body);
        setBtn(false);
        setSchoolBtn(true);

        e.preventDefault();
    };

    const handelMentorReg = async (body) => {
        var config = {
            method: 'post',
            url: process.env.REACT_APP_API_BASE_URL + '/mentors/register',
            headers: {
                'Content-Type': 'application/json'
            },

            data: JSON.stringify(body)
        };
        await axios(config)
            .then((mentorRegRes) => {
                if (mentorRegRes?.data?.status == 201) {
                    setMentorData(mentorRegRes?.data?.data[0]);
                    const successData = {
                        full_name: mentorRegRes?.data?.data[0].full_name,
                        district: orgData?.district,
                        school: orgData?.organization_name,
                        organization_code:
                            mentorRegRes?.data?.data[0].organization_code,
                        gender: mentorRegRes?.data?.data[0].gender,
                        title: mentorRegRes?.data?.data[0].title,
                        mobile: mentorRegRes?.data?.data[0].mobile,
                        username: mentorRegRes?.data?.data[0].email,
                        whatapp_mobile:
                            mentorRegRes?.data?.data[0].whatapp_mobile
                    };
                    // setBtn(true);
                    history.push({
                        pathname: '/success',
                        data: successData
                    });
                }
            })
            .catch((err) => {
                openNotificationWithIcon('error', err.response.data?.message);
                // setBtn(false);
                formik.setErrors({
                    check: err.response && err?.response?.data?.message
                });
                return err.response;
            });
    };
    const handleRegist = (mentorregdata) => {
        const body = JSON.stringify({
            state: stateData,
            district: district,
            pin_code: pinCode,
            category: 'Non ATL',
            organization_code: atlCode,
            organization_name: schoolname,
            unique_code: diesCode,
            address: textData
        });
        var config = {
            method: 'post',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/organizations/createOrg?nonatlcode=true',
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        };
        axios(config)
            .then(function (response) {
                if (response?.status == 201) {
                    mentorregdata['organization_code'] =
                        response.data.data[0].organization_code;
                    handelMentorReg(mentorregdata);
                }
            })

            .catch(function (error) {
                console.log(error);
            });
    };
    localStorage.setItem('diesCode', JSON.stringify(diesCode));
    useEffect(() => {
        const updatedData = [...fiterAtlCodeData];
        const index =
            fiterAtlCodeData.length > 0 &&
            fiterAtlCodeData.findIndex((x) => x.organization_code == atlCode);
        if (index !== -1) {
            setOrgNewData(fiterAtlCodeData[index]);
        }
    }, [atlCode]);
    const handleSendOtp = async (e) => {
        setHoldKey(true);
        setDisable(false);
        formik.setFieldValue('email', formik.values.email);
        setTimer(timer + 1);
        setSec(59);
        setCounter(59);
        if (change == 'Resend OTP') {
            if (!sec) {
                setSec(sec - 1);
            }
        } else {
            setSec(sec - 1);
        }

        const body = JSON.stringify({
            username: formik.values.email
        });
        var config = {
            method: 'post',
            url: process.env.REACT_APP_API_BASE_URL + '/mentors/mobileOtp',
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        };
        axios(config)
            .then(function (response) {
                if (response.status === 202) {
                    const key = 'PMBXDE9N53V89K65';
                    const UNhashedPassword = CryptoJS.AES.decrypt(
                        response?.data?.data,
                        key
                    ).toString(CryptoJS.enc.Utf8);
                    setOtpRes(UNhashedPassword);
                    openNotificationWithIcon('success', 'Otp send to Email Id');
                    setBtnOtp(true);
                    setTimeout(() => {
                        setChange('Resend OTP');
                        setDisable(true);
                        setHoldKey(false);
                        setTimer(0);
                    }, 60000);
                }
            })
            .catch(function (error) {
                if (error?.response?.data?.status === 406) {
                    openNotificationWithIcon(
                        'error',
                        'Email ID already exists'
                    );
                    // setTimer(0);
                    // setHoldKey(false);
                    setTimeout(() => {
                        // setChange('Resend OTP');
                        setDisable(true);
                        setHoldKey(false);
                        setTimer(0);
                    }, 1000);
                }
            });
        e.preventDefault();
    };
    useEffect(() => {
        if (!disable) {
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        }
    }, [counter, disable]);

    useEffect(() => {
        if (
            formik.values.title.length > 0 &&
            formik.values.full_name.length > 0 &&
            formik.values.gender.length > 0 &&
            formik.values.mobile.length > 0 &&
            formik.values.email.length > 0 &&
            formik.values.whatapp_mobile.length > 0
        ) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, [
        formik.values.title,
        formik.values.full_name,
        formik.values.gender,
        formik.values.username,
        formik.values.email,
        formik.values.whatapp_mobile
    ]);

    const handleOtpChange = (e) => {
        formik.setFieldValue('otp', e);
        setErrorMsg(false);
    };

    const handleCheckbox = (e, click) => {
        if (click) {
            setCheckBox(click);
            formik.setFieldValue('whatapp_mobile', formik.values.mobile);
            setWtsNum(formik.values.mobile);
        } else {
            setCheckBox(click);
            formik.setFieldValue('whatapp_mobile', '');
        }
    };

    useEffect(() => {
        setCheckBox(false);
        formik.setFieldValue('whatapp_mobile', '');
    }, [formik.values.mobile.length == 0]);
    const showButton =
        stateData && district && pinCode && atlCode && schoolname && textData;

    return (
        <div className="container-fluid  SignUp Login">
            <Row className="row-flex  ">
                <div className="col-md-6 aside mobile-header">
                    <Carousel>
                        <Carousel.Item>
                            <div className="mobile_tab-hide">
                                <figure>
                                    <img
                                        src={image_1}
                                        alt="image_1"
                                        className="img-fluid img-1"
                                    />
                                </figure>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="mobile_tab-hide">
                                <figure>
                                    <img
                                        src={image_2}
                                        alt="image_2"
                                        className="img-fluid img-2"
                                    />
                                </figure>
                            </div>
                        </Carousel.Item>
                        {/* <Carousel.Item>
                            
                            <div className="mobile_tab-hide">
                                <figure>
                                    <img
                                        src={ellipse_1}
                                        alt="ellipse_1"
                                        className="img-fluid img-1"
                                    />
                                </figure>
                            </div>
                        </Carousel.Item> */}
                    </Carousel>
                </div>

                <Col xs={12} sm={12} md={12} xl={6} className="article">
                    <div className="row">
                        <a href={process.env.REACT_APP_LANDING_PAGE_URL}>
                            <Col md={12} className="mr-auto text-center">
                                <h2 className="text-white">
                                    <img
                                        src={signuplogo}
                                        alt="Signup logo"
                                        className="img-fluid w-50"
                                    />
                                </h2>
                            </Col>
                        </a>
                    </div>

                    <Row className="article-header mb-4 mt-4 text-center">
                        <h4 className="mb-4">
                            <span className="color-black">
                                Non ATL School Registration
                            </span>
                        </h4>
                    </Row>
                    {diceBtn && (
                        <div className="form-row row mb-5">
                            <Col
                                className="form-group"
                                xs={12}
                                sm={12}
                                md={12}
                                xl={12}
                            >
                                <Label
                                    className="mb-2"
                                    htmlFor="organization_code"
                                >
                                    {/* {t('teacehr_red.UDISE')} */}
                                    UDISE Code
                                </Label>
                                <Input
                                    {...inputField}
                                    id="organization_code"
                                    onChange={(e) => handleOnChangeCode(e)}
                                    value={diesCode}
                                    maxLength={11}
                                    minLength={11}
                                    name="organization_code"
                                    placeholder="Enter UDISE Code"
                                    className="w-100 mb-3 mb-md-0"
                                    style={{
                                        borderRadius: '0px',
                                        padding: '9px 11px'
                                        // color: 'red'
                                    }}
                                />
                                {error ? (
                                    <p
                                        style={{
                                            color: 'red'
                                        }}
                                    >
                                        {error}
                                    </p>
                                ) : null}

                                {diceBtn && (
                                    <div className="mt-4">
                                        <Button
                                            label={t('teacehr_red.continue')}
                                            btnClass={
                                                !diesCode.length
                                                    ? 'default rounded-0'
                                                    : 'primary rounded-0'
                                            }
                                            size="small"
                                            onClick={(e) => handleRegister(e)}
                                        />
                                    </div>
                                )}
                                <div className="form-row row mb-5 mt-5">
                                    <p>
                                        {' '}
                                        Already a member ?
                                        <Link
                                            to={'/teacher'}
                                            exact
                                            className=" m-3 text-center"
                                            style={{
                                                color: 'blue'
                                            }}
                                        >
                                            Login Here
                                        </Link>
                                    </p>
                                </div>
                            </Col>
                        </div>
                    )}
                    {btn && (
                        <Row className="mt-5">
                            <Col md={12}>
                                <Row className="align-items-center">
                                    <Col md={6}>
                                        <p>
                                            {' '}
                                            <b>Select State </b>
                                        </p>
                                        <div className="my-3 d-md-block d-flex justify-content-center">
                                            <Select
                                                list={fullStatesNames}
                                                setValue={setStateData}
                                                placeHolder={'Select State'}
                                                value={stateData}
                                            />
                                        </div>
                                    </Col>

                                    <Col md={6}>
                                        <p>
                                            <b> Select District</b>
                                        </p>
                                        <div className="my-3 d-md-block d-flex justify-content-center">
                                            <Select
                                                list={fiterDistData}
                                                setValue={setdistrict}
                                                placeHolder={'Select District'}
                                                value={district}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="align-items-center">
                                    <Col md={6}>
                                        <p>
                                            {' '}
                                            <b>
                                                Select Pincode of near by ATL
                                                School
                                            </b>
                                        </p>
                                        <div className="my-3 d-md-block d-flex justify-content-center">
                                            <Select
                                                list={fiterPinCodeData}
                                                setValue={setPinCode}
                                                placeHolder={'Select PinCode'}
                                                value={pinCode}
                                            />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <p>
                                            <b>
                                                {' '}
                                                Select ATLcode of near by ATL
                                                School
                                            </b>{' '}
                                        </p>
                                        <div className="my-3 d-md-block d-flex justify-content-center">
                                            <Select
                                                list={fiterAtlCodeData}
                                                setValue={setAtlCode}
                                                placeHolder={'Select AtlCode'}
                                                value={atlCode}
                                                drop={1}
                                            />
                                        </div>
                                    </Col>
                                    <div className="form-row row mb-3 mt-5">
                                        <Col
                                            className="form-group"
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            xl={12}
                                        >
                                            <Label
                                                className="mb-2"
                                                htmlFor="organization_name"
                                            >
                                                Enter Your School Name
                                            </Label>
                                            <Input
                                                {...inputField}
                                                id="organization_name"
                                                onChange={(e) =>
                                                    handleOnChangeSchool(e)
                                                }
                                                value={schoolname}
                                                name="organization_name"
                                                placeholder="Enter Your School Name"
                                                className="w-100 mb-3 mb-md-0"
                                                style={{
                                                    borderRadius: '0px',
                                                    padding: '9px 11px'
                                                    // color: 'red'
                                                }}
                                            />
                                        </Col>
                                    </div>
                                    <div className="form-row row mb-3">
                                        <Col
                                            className="form-group"
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            xl={12}
                                        >
                                            <Label
                                                className="mb-2"
                                                htmlFor="address"
                                            >
                                                Enter Your School Address
                                            </Label>
                                            <Input
                                                {...inputField}
                                                id="address"
                                                onChange={(e) =>
                                                    handleOnChange(e)
                                                }
                                                value={textData}
                                                name="address"
                                                placeholder="Enter Your School Address"
                                                className="w-100 mb-3 mb-md-0"
                                                style={{
                                                    borderRadius: '0px',
                                                    padding: '9px 11px'
                                                    // color: 'red'
                                                }}
                                            />
                                        </Col>
                                    </div>
                                    <div className="d-flex justify-content-end mt-4">
                                        <Button
                                            label={'PROCEED'}
                                            btnClass={
                                                showButton
                                                    ? 'primary'
                                                    : 'default'
                                            }
                                            disabled={!showButton}
                                            shape="btn-square"
                                            size="small"
                                            onClick={(e) => handleSubmit(e)}
                                        />
                                    </div>
                                    <div className="form-row row mb-5">
                                        <p>
                                            {' '}
                                            Already a member ?
                                            <Link
                                                to={'/teacher'}
                                                exact
                                                className=" m-3 text-center"
                                                style={{ color: 'blue' }}
                                            >
                                                Login Here
                                            </Link>
                                        </p>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    )}
                    <div className="w-100 clearfix" />
                    {schoolBtn && (
                        <div className="form-row row mb-5">
                            <Col className="form-row row mb-5">
                                <Col
                                    className="form-group"
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    xl={12}
                                >
                                    <Label className="mb-3 w-100 mt-4">
                                        <UncontrolledAlert
                                            color="primary"
                                            toggle={false}
                                        >
                                            {t('teacehr_red.school')}:{' '}
                                            {orgData?.organization_name} <br />
                                            {/* {t('teacehr_red.city')}:{' '}
                                            {orgData?.city
                                                ? orgData?.city
                                                : ' N/A'}{' '}
                                            <br /> */}
                                            {t('teacehr_red.district')}:{' '}
                                            {orgData?.district
                                                ? orgData?.district
                                                : ' N/A'}
                                            <br />
                                            {t('teacehr_red.state')}:{' '}
                                            {orgData?.state
                                                ? orgData?.state
                                                : ' N/A'}{' '}
                                            <br />
                                            {t('teacehr_red.pincode')}:{' '}
                                            {orgData?.pin_code
                                                ? orgData?.pin_code
                                                : ' N/A'}{' '}
                                            <br />
                                        </UncontrolledAlert>
                                    </Label>
                                </Col>
                                <Row className="mt-5">
                                    <Col md={12}>
                                        <Form onSubmit={formik.handleSubmit}>
                                            <Row
                                                className="form-group"
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                xl={12}
                                            >
                                                <Col
                                                    className="form-group"
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    xl={6}
                                                >
                                                    <Label
                                                        className="mb-2"
                                                        htmlFor="title"
                                                    >
                                                        {t('teacehr_red.title')}
                                                    </Label>
                                                    <select
                                                        disabled={
                                                            holdKey
                                                                ? true
                                                                : false
                                                        }
                                                        name="title"
                                                        // id="gender"
                                                        className=" col-8 selectDropdown"
                                                        style={{
                                                            borderRadius: '0'
                                                        }}
                                                        value={
                                                            formik.values.title
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                    >
                                                        <option value="">
                                                            {t(
                                                                'teacehr_red.teacher_title'
                                                            )}
                                                        </option>
                                                        <option value="Dr">
                                                            {t(
                                                                'teacehr_red.teacher_title_drs'
                                                            )}
                                                        </option>
                                                        <option value="Mr">
                                                            {t(
                                                                'teacehr_red.teacher_title_mrs'
                                                            )}
                                                        </option>
                                                        <option value="Miss">
                                                            {t(
                                                                'teacehr_red.teacher_title_misss'
                                                            )}
                                                        </option>
                                                        <option value="Mrs">
                                                            {t(
                                                                'teacehr_red.teacher_title_mrss'
                                                            )}
                                                        </option>
                                                    </select>
                                                    {formik.touched.title &&
                                                    formik.errors.title ? (
                                                        <small className="error-cls">
                                                            {
                                                                formik.errors
                                                                    .title
                                                            }
                                                        </small>
                                                    ) : null}
                                                </Col>
                                                <Col
                                                    className="form-group"
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    xl={6}
                                                >
                                                    <Label
                                                        className="mb-2"
                                                        htmlFor="name"
                                                    >
                                                        Teacher Name
                                                    </Label>
                                                    <InputBox
                                                        {...inputName}
                                                        id="full_name"
                                                        isDisabled={
                                                            holdKey
                                                                ? true
                                                                : false
                                                        }
                                                        name="full_name"
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        value={
                                                            formik.values
                                                                .full_name
                                                        }
                                                    />

                                                    {formik.touched.full_name &&
                                                    formik.errors.full_name ? (
                                                        <small className="error-cls">
                                                            {
                                                                formik.errors
                                                                    .full_name
                                                            }
                                                        </small>
                                                    ) : null}
                                                </Col>
                                                <Col
                                                    className="form-group"
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    xl={6}
                                                >
                                                    <Label
                                                        className="mb-2"
                                                        htmlFor="email"
                                                    >
                                                        Email Address
                                                    </Label>
                                                    <InputBox
                                                        {...inputEmail}
                                                        id="email"
                                                        isDisabled={
                                                            holdKey
                                                                ? true
                                                                : false
                                                        }
                                                        name="email"
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        value={
                                                            formik.values.email
                                                        }
                                                    />

                                                    {formik.touched.email &&
                                                    formik.errors.email ? (
                                                        <small className="error-cls">
                                                            {
                                                                formik.errors
                                                                    .email
                                                            }
                                                        </small>
                                                    ) : null}
                                                </Col>
                                                <Col
                                                    className="form-group"
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    xl={6}
                                                >
                                                    <Label
                                                        className="mb-2"
                                                        htmlFor="gender"
                                                    >
                                                        {t(
                                                            'teacehr_red.gender'
                                                        )}
                                                    </Label>
                                                    <select
                                                        disabled={
                                                            holdKey
                                                                ? true
                                                                : false
                                                        }
                                                        name="gender"
                                                        // id="gender"
                                                        className="col-8 selectDropdown"
                                                        value={
                                                            formik.values.gender
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
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
                                                            {
                                                                formik.errors
                                                                    .gender
                                                            }
                                                        </small>
                                                    ) : null}
                                                </Col>
                                            </Row>
                                            <Row
                                                className="form-group"
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                xl={12}
                                            >
                                                <Col
                                                    className="form-group"
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    xl={6}
                                                >
                                                    <Label
                                                        className="mb-2 mt-3"
                                                        htmlFor="mobile"
                                                    >
                                                        Mobile Number
                                                    </Label>
                                                    <InputBox
                                                        {...inputUsername}
                                                        id="mobile"
                                                        isDisabled={
                                                            holdKey
                                                                ? true
                                                                : false
                                                        }
                                                        name="mobile"
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        value={
                                                            formik.values.mobile
                                                        }
                                                    />

                                                    {formik.touched.mobile &&
                                                    formik.errors.mobile ? (
                                                        <small className="error-cls">
                                                            {
                                                                formik.errors
                                                                    .mobile
                                                            }
                                                        </small>
                                                    ) : null}
                                                </Col>
                                                <Col
                                                    className="form-group"
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    xl={6}
                                                >
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <Label
                                                            className="mb-2 mt-3"
                                                            htmlFor="phone"
                                                        >
                                                            {t(
                                                                'teacehr_red.faculty_mobile'
                                                            )}
                                                        </Label>
                                                        <div
                                                            className="my-10 checkbox-right"
                                                            style={{
                                                                display: 'flex'
                                                            }}
                                                        >
                                                            <b
                                                                style={{
                                                                    marginRight:
                                                                        '0.5rem',
                                                                    marginTop:
                                                                        '1rem',
                                                                    fontSize:
                                                                        '1.5rem'
                                                                }}
                                                            >
                                                                Same
                                                            </b>
                                                            <Input
                                                                type="checkbox"
                                                                className="mt-3 mb-8 my-10 pb-4 pt-3"
                                                                name="click"
                                                                disabled={
                                                                    (formik
                                                                        .values
                                                                        .mobile
                                                                        .length >
                                                                    0
                                                                        ? false
                                                                        : true) ||
                                                                    (holdKey
                                                                        ? true
                                                                        : false)
                                                                }
                                                                id="click"
                                                                checked={
                                                                    checkBox
                                                                }
                                                                onClick={(e) =>
                                                                    handleCheckbox(
                                                                        e,
                                                                        !checkBox
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <InputBox
                                                        {...inputMobile}
                                                        id="whatapp_mobile"
                                                        isDisabled={
                                                            (formik.values
                                                                .mobile.length >
                                                            0
                                                                ? false
                                                                : true) ||
                                                            (holdKey
                                                                ? true
                                                                : false) ||
                                                            checkBox
                                                        }
                                                        name="whatapp_mobile"
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        value={
                                                            formik.values
                                                                .whatapp_mobile
                                                        }
                                                    />

                                                    {formik.touched
                                                        .whatapp_mobile &&
                                                    formik.errors
                                                        .whatapp_mobile ? (
                                                        <small className="error-cls">
                                                            {
                                                                formik.errors
                                                                    .whatapp_mobile
                                                            }
                                                        </small>
                                                    ) : null}
                                                </Col>
                                                <div className="mt-3">
                                                    <span
                                                        required
                                                        className="p-1 "
                                                        style={{ color: 'red' }}
                                                    >
                                                        * Note : PWD is set
                                                        default with Characters
                                                        in mail (till before @)
                                                        ex : ID-
                                                        abcd.98@gmail.com ,
                                                        Password : “abcd.98”
                                                    </span>
                                                </div>
                                            </Row>
                                            <div className="mt-5 d-flex align-items-center">
                                                <Button
                                                    label={change}
                                                    btnClass={
                                                        !disable
                                                            ? 'default rounded-0'
                                                            : 'primary rounded-0 '
                                                    }
                                                    onClick={(e) =>
                                                        handleSendOtp(e)
                                                    }
                                                    size="small"
                                                    disabled={
                                                        (timer == 0
                                                            ? false
                                                            : true) || !disable
                                                    }
                                                />
                                            </div>
                                            {btnOtp && (
                                                <div>
                                                    <h3>
                                                        {time}:
                                                        {counter < 59
                                                            ? counter - '0'
                                                            : counter}
                                                    </h3>

                                                    <div
                                                        className="w-100 d-block text-left"
                                                        // className="form-row row mb-5 col-md-3 text-centered"
                                                    >
                                                        <Label
                                                            className="mb-2 mt-4  text-left"
                                                            htmlFor="otp"
                                                        >
                                                            Enter OTP
                                                        </Label>
                                                        <div
                                                            // className="form-row row mb-6"
                                                            className="d-flex justify-content-left "
                                                        >
                                                            <OtpInput
                                                                numInputs={6}
                                                                isDisabled={
                                                                    false
                                                                }
                                                                errorStyle="error"
                                                                onChange={
                                                                    handleOtpChange
                                                                }
                                                                separator={
                                                                    <span>
                                                                        {'-'}
                                                                    </span>
                                                                }
                                                                isInputNum={
                                                                    true
                                                                }
                                                                isInputSecure={
                                                                    false
                                                                }
                                                                shouldAutoFocus
                                                                value={
                                                                    formik
                                                                        .values
                                                                        .otp
                                                                }
                                                                placeholder={''}
                                                                inputStyle={{
                                                                    border: '1px solid var(--color-grey-light-3)',
                                                                    borderRadius:
                                                                        '8px',
                                                                    width: '5.4rem',
                                                                    height: '5.4rem',
                                                                    fontSize:
                                                                        '2.2rem',
                                                                    color: '#000',
                                                                    fontWeight:
                                                                        '400',
                                                                    caretColor:
                                                                        'blue'
                                                                }}
                                                                focusStyle={{
                                                                    border: '1px solid #CFD3DB',
                                                                    outline:
                                                                        'none'
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {formik.values.otp.length > 5 &&
                                                otpRes != formik.values.otp && (
                                                    <div
                                                        className="form-row row mb-5 text-center"
                                                        // className=" w-50 d-flex justify-content-center"
                                                    >
                                                        <span
                                                            className=" w-100 mt-3 d-flex justify-content-center"
                                                            style={{
                                                                color: 'red'
                                                            }}
                                                        >
                                                            Invalid OTP
                                                        </span>
                                                    </div>
                                                )}
                                            {btnOtp && (
                                                <div className="mt-5">
                                                    <Button
                                                        label={
                                                            'VERIFY & REGISTER'
                                                        }
                                                        btnClass={
                                                            formik.values.otp
                                                                .length > 5 &&
                                                            otpRes ==
                                                                formik.values
                                                                    .otp
                                                                ? 'primary rounded-0'
                                                                : 'default rounded-0'
                                                        }
                                                        size="small w-50"
                                                        type="submit"
                                                        disabled={
                                                            !(
                                                                formik.values
                                                                    .otp
                                                                    .length >
                                                                    5 &&
                                                                otpRes ==
                                                                    formik
                                                                        .values
                                                                        .otp
                                                            )
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </Form>
                                    </Col>
                                </Row>
                            </Col>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default RegisterNew;
