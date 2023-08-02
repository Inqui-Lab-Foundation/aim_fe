/* eslint-disable indent */
import { useState } from 'react';
import React, { useEffect } from 'react';
import Layout from '../Layout';
import { Container, Row, Col, Card } from 'reactstrap';
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
import { openNotificationWithIcon } from '../../helpers/Utils';
import { Button } from '../../stories/Button';
import { Spinner } from 'react-bootstrap';

const Popup = () => {
    const [popupList, setPopupList] = useState([]);
    const currentUser = getCurrentUser('current_user');
    const [imgUrl, setImgUrl] = useState('');
    const [showspin, setshowspin] = React.useState(false);

    useEffect(() => {
        handlepopupList();
    }, []);
    async function handlepopupList() {
        //  handlePopupList Api where we can see list of all resource //
        let config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/popup/1',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setPopupList(response?.data?.data[0]);
                    setImgUrl(response?.data?.data[0]?.url);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const Statusfunc = async (item) => {
        let config = {
            method: 'put',
            url: process.env.REACT_APP_API_BASE_URL + '/popup/1',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: item
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    openNotificationWithIcon(
                        'success',
                        item.on_off === '1'
                            ? 'PopUp successfully ON'
                            : item.on_off === '0'
                            ? 'PopUp successfully OFF'
                            : 'Popup Image upload successfull'
                    );
                    handlepopupList();
                    setshowspin(false);
                }
            })
            .catch(function (error) {
                console.log(error);
                setshowspin(false);
            });
    };

    const handleFile = async (file) => {
        setshowspin(true);
        const fileData = new FormData();
        fileData.append('file', file);

        let config = {
            method: 'post',
            url: process.env.REACT_APP_API_BASE_URL + '/popup/popupFileUpload',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: fileData
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    Statusfunc({
                        url: `${response?.data?.data[0]?.attachments[0]}`
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
                setshowspin(false);
            });
    };

    const handleStatus = (item) => {
        Statusfunc({ on_off: `${item}` });
    };

    const fileHandler = (e) => {
        let file = e.target.files[0];

        if (!file) {
            return;
        }

        let pattern = /^[a-zA-Z0-9_-\s]{0,}$/;
        const fileName = file.name.split('.').slice(0, -1).join('.');
        const isValidFileName = pattern.test(fileName);

        const maxFileSize = 3000000;
        const isOverMaxSize = file.size > maxFileSize;
        if (!(file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')){
            openNotificationWithIcon('error', 'file type should be PNG JPG JPEG');
            return;
        }
        if (isOverMaxSize) {
            openNotificationWithIcon('error', 'less_3MB');
            return;
        }

        if (!isValidFileName) {
            openNotificationWithIcon(
                'error',
                "Only alphanumeric and '_' are allowed"
            );
            return;
        }
        handleFile(file);
    };

    return (
        <Layout>
            <Container className="ticket-page mt-5 mb-50">
                <Row className="pt-3">
                    <Row className="mb-2 mb-sm-5 mb-md-5 mb-lg-0">
                        <Col className="col-auto">
                            <h2>PopUp</h2>
                        </Col>
                    </Row>
                    <Card className="p-5">
                        <Row>
                            <Col>
                                <h2>
                                    status :{' '}
                                    <span
                                        className={
                                            popupList.on_off === '1'
                                                ? 'text-success'
                                                : 'text-danger'
                                        }
                                    >
                                        {popupList.on_off === '1'
                                            ? 'Enabled'
                                            : 'Disabled'}
                                    </span>
                                </h2>
                                <div className="wrapper my-3 m-3">
                                    <Button
                                        label="Upload File"
                                        btnClass="primary mx-3"
                                        size={'small'}
                                        shape="btn-square"
                                    />
                                    <input
                                        type="file"
                                        name="file"
                                        accept='.png, .jpg, .jpeg'
                                        multiple
                                        onChange={(e) => fileHandler(e)}
                                    />
                                </div>
                                {popupList.on_off === '1' ? (
                                    <Button
                                        label="Disable"
                                        btnClass="primary mx-3"
                                        size={'small'}
                                        shape="btn-square"
                                        backgroundColor={'red'}
                                        onClick={() => handleStatus('0')}
                                    />
                                ) : (
                                    <Button
                                        label="Enable"
                                        btnClass="primary mx-3"
                                        size={'small'}
                                        shape="btn-square"
                                        backgroundColor={'green'}
                                        onClick={() => handleStatus('1')}
                                    />
                                )}
                                <ul className='p-2'>
                                    <li>File size should be less than 3MB</li>
                                    <li>File type should be following format PNG JPG JPEG</li>
                                </ul>
                            </Col>
                            <Col md={6}>
                                {showspin ? (
                                    <div className="text-center mt-5">
                                        <Spinner
                                            animation="border"
                                            variant="secondary"
                                        />
                                    </div>
                                ) : (
                                    <figure>
                                        <img
                                            src={imgUrl}
                                            alt="popup image"
                                            className="img-fluid"
                                        />
                                    </figure>
                                )}
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </Container>
        </Layout>
    );
};

export default Popup;