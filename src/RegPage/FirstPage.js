/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Label, UncontrolledAlert } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Input, Radio } from 'antd';

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
// import './dropDown.scss';
import { getNormalHeaders, openNotificationWithIcon } from '../helpers/Utils';

import axios from 'axios';
import CryptoJS from 'crypto-js';
import OtpInput from 'react-otp-input-rc-17';
import { useHistory } from 'react-router-dom';
import { isDisabled } from '@testing-library/user-event/dist/utils';

function RegisterNew() {
    const { t } = useTranslation();
    const history = useHistory();
    const [diesCode, setDiesCode] = useState('');

    return (
        <div className="container-fluid  SignUp Login">
            <Row className="row-flex  ">
                <div className="col-md-6 aside mobile-header">
                    {/* <div className="row">
                        <Link to={'/'} exact>
                            <Col md={12} className=" mr-auto mobile_tab-hide">
                                {' '}
                                <h2 className="text-white">
                                    <img
                                        src={signuplogo}
                                        alt="Signup logo"
                                        className="img-fluid w-50"
                                    />
                                </h2>
                            </Col>
                        </Link>
                    </div> */}

                    {/* <h1 className="text-left pb-5 mobile_tab-hide">
                        {t('login.Title')}
                    </h1>
                    <p className="mobile_tab-hide">{t('login.subtitle')}</p>
                    <div className="mobile_tab-hide">
                        <figure>
                            <img
                                src={image_1}
                                alt="image_1"
                                className="img-fluid img-1"
                            />
                        </figure>
                    </div> */}
                    {/* <h1 className="text-left pb-5 mobile_tab-hide">
                        {t('login.Title')}
                    </h1>
                    <p className="mobile_tab-hide">{t('login.subtitle')}</p> */}
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
                                TEACHER REGISTRATION
                            </span>
                        </h4>
                    </Row>
                    <Row className="article-header mb-4 mt-4 text-center">
                        <h3 className="mb-4">
                            <span className="color-blue">Register As As ?</span>
                        </h3>
                    </Row>

                    <Row className="mt-5">
                        {/* <Col md={12} className="m-5"> */}
                        <Col md={12}>
                            <div className="form-row row mb-5">
                                <Col className="form-row row mb-5">
                                    <Col
                                        className="form-group"
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        xl={12}
                                    >
                                        <div className="mt-6 mb-5 text-center">
                                            <Button
                                                label={'ATL School'}
                                                btnClass="primary tex-center my-0 py-0 mx-3 px-3"
                                                style={{
                                                    borderRadius: '0px',
                                                    padding: '1rem 1rem',
                                                    height: '35px'
                                                }}
                                                size="medium"
                                                onClick={() =>
                                                    history.push(
                                                        '/register/atl'
                                                    )
                                                }
                                            />
                                            {/* </div> */}
                                            {/* <div className="mt-6 mb-5"> */}
                                            <Button
                                                btnClass="primary tex-center my-0 py-0 mx-3 px-3"
                                                style={{
                                                    borderRadius: '0px',
                                                    padding: '1rem 1rem',
                                                    height: '35px'
                                                    // color: 'red'
                                                }}
                                                label={'NON-ATL School'}
                                                size="medium"
                                                onClick={() =>
                                                    history.push(
                                                        '/register/non-atl'
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="form-row row mb-5 mt-5 text-center">
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
                                        <div className="form-row row mb-5 mt-5 text-left">
                                            <p>
                                                {' '}
                                                <span style={{ color: 'red' }}>
                                                    Note : &nbsp;
                                                </span>
                                                Kindly note that only one
                                                teacher per school can register
                                                here. Additional teachers
                                                guiding teams can be mentioned
                                                as mentors while creating
                                                student teams.
                                            </p>
                                        </div>
                                        {/* </Col> */}
                                        {/* <Col md={12} className="m-5"> */}

                                        {/* </Col> */}
                                    </Col>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default RegisterNew;
