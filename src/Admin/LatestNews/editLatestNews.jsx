/* eslint-disable indent */
import React from 'react';
import Layout from '../Layout';
import { Row, Col, FormGroup, Label, Form, Input } from 'reactstrap';
import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../stories/Button';
import { InputBox } from '../../stories/InputBox/InputBox';
import { getCurrentUser, openNotificationWithIcon } from '../../helpers/Utils';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const EditLatestNews = (props) => {
    const { t } = useTranslation();
    const newsID = JSON.parse(localStorage.getItem('newsID'));
    const currentUser = getCurrentUser('current_user');
    const history = useHistory();
    const inputDICE = {
        type: 'text',
        className: 'defaultInput'
    };
    const headingDetails = {
        title: 'Edit LatestNews Details',
        options: [
            {
                title: 'LatestNews',
                path: '/admin/LatestNews'
            },
            {
                title: 'Edit LatestNews',
                path: '/admin/LatestNews/editLatestNews'
            }
        ]
    };


    const fileHandler = (e) => {
        let file = e.target.files[0];

        if (!file) {
            return;
        }

        let pattern = /^[a-zA-Z0-9_-\s]{0,}$/;
        const fileName = file.name.split('.').slice(0, -1).join('.');
        const isValidFileName = pattern.test(fileName);

        const maxFileSize = 20000000;
        const isOverMaxSize = file.size > maxFileSize;

        if (isOverMaxSize) {
            openNotificationWithIcon('error', t('student.less_20MB'));
            return;
        }

        if (!isValidFileName) {
            openNotificationWithIcon(
                'error',
                "Only alphanumeric and '_' are allowed"
            );
            return;
        }

        formik.setFieldValue('file_name', file);

    };

    const formik = useFormik({
        initialValues: {
            role: newsID && newsID.category,
            details: newsID && newsID.details,
            file_name: newsID && newsID.file_name,
            url: newsID && newsID.url,
            new_status: newsID && newsID.new_status
        },
        validationSchema: Yup.object({
            role: Yup.string()
                .optional()
                .oneOf(['mentor', 'student'], 'Role is Required'),
            details: Yup.string().optional().required('details is Required'),
            new_status: Yup.string()
                .optional()
                .oneOf(['0', '1'], 'New Status type is Required'),
            file_name: Yup.mixed(),
            //url: Yup.string()
        }),
        onSubmit: async (values) => {
            console.log(values,'----');
            try {
                if (values.file_name !== null && values.file_name !== '') {
                    const fileData = new FormData();
                    fileData.append('file', values.file_name);

                    const response = await axios.post(
                        `${process.env.REACT_APP_API_BASE_URL}/latest_news/latestnewsFileUpload`,
                        fileData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: `Bearer ${currentUser?.data[0]?.token}`
                            }
                        }
                    );
                    values.file_name =
                        response?.data?.data[0].attachments[0].toString();
                }
                const body = {
                    status: 'ACTIVE',
                    category: values.role,
                    details: values.details,
                    new_status: values.new_status
                };
                if(values.file_name!== '' && values.file_name !== null){
                    body['file_name']=values.file_name;
                }
                if(values.url!=='' && values.url!== null){
                    body['url']=values.url;
                }

                const response = await axios.put(
                    `${process.env.REACT_APP_API_BASE_URL}/latest_news/${newsID.latest_news_id}`,
                    body,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${currentUser?.data[0]?.token}`
                        }
                    }
                );

                if (response.status === 200) {
                    props.history.push('/admin/LatestNews/index');
                    openNotificationWithIcon(
                        'success',
                        'LatestNews Updated Successfully'
                    );
                } else {
                    openNotificationWithIcon('error', 'Opps! Something Wrong');
                }
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <Layout>
            <div className="EditPersonalDetails new-member-page">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        <BreadcrumbTwo {...headingDetails} />

                        <div>
                            <Form onSubmit={formik.handleSubmit} isSubmitting>
                                <div className="create-ticket register-block">
                                    <FormGroup className="form-group" md={12}>
                                        <Label className="mb-2" htmlFor="role">
                                            Role
                                        </Label>
                                        <select
                                            name="role"
                                            id="role"
                                            className="form-control custom-dropdown"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.role}
                                        >
                                            <option value="">
                                                Select role
                                            </option>
                                            <option value="mentor">
                                                mentor
                                            </option>
                                            <option value="student">
                                                student
                                            </option>
                                        </select>
                                        {formik.touched.role &&
                                            formik.errors.role && (
                                                <small className="error-cls">
                                                    {formik.errors.role}
                                                </small>
                                            )}
                                        <Label
                                            className="mb-2"
                                            htmlFor="new_status"
                                        >
                                            New Status
                                        </Label>
                                        <select
                                            name="new_status"
                                            id="new_status"
                                            className="form-control custom-dropdown"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.new_status}
                                        >
                                            <option value="">
                                                Select New Status
                                            </option>
                                            <option value="0">Disable</option>
                                            <option value="1">Enable</option>
                                        </select>
                                        {formik.touched.new_status &&
                                            formik.errors.new_status && (
                                                <small className="error-cls">
                                                    {formik.errors.new_status}
                                                </small>
                                            )}
                                        <Label
                                            className="mb-2"
                                            htmlFor="details"
                                        >
                                            Details
                                        </Label>
                                        <InputBox
                                            {...inputDICE}
                                            id="details"
                                            name="details"
                                            placeholder="Please enter details"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.details}
                                        />
                                        {formik.touched.details &&
                                            formik.errors.details && (
                                                <small className="error-cls">
                                                    {formik.errors.details}
                                                </small>
                                            )}

                                        <Label
                                            className="mb-2"
                                            htmlFor="file_name"
                                        >
                                            File
                                        </Label>
                                        <div className="d-flex align-items-center">
                                            <InputBox
                                                type="file"
                                                id="file_name"
                                                name="file_name"
                                                style={{
                                                    display: 'none'
                                                }}
                                                accept=".png, .jpg, .jpeg,.pdf,video/mp4,video/x-m4v,.doc,.docx"
                                                onChange={(e) => fileHandler(e)}
                                                onBlur={formik.handleBlur}
                                            />
                                            <Button
                                                label="Upload File"
                                                onClick={() => {
                                                    document
                                                        .getElementById(
                                                            'file_name'
                                                        )
                                                        .click();
                                                }}
                                            />
                                            {formik.values.file_name &&
                                            formik.values.file_name.name ? (
                                                <span className="ml-2">
                                                    {
                                                        formik.values.file_name
                                                            .name
                                                    }
                                                </span>
                                            ) : (
                                                <span className="ml-2">
                                                    {formik.initialValues
                                                        .file_name &&
                                                        formik.initialValues
                                                            .file_name.name}
                                                </span>
                                            )}
                                        </div>
                                        {formik.touched.file_name &&
                                            formik.errors.file_name && (
                                                <small className="error-cls">
                                                    {formik.errors.file_name}
                                                </small>
                                            )}

                                        <Label className="mb-2" htmlFor="url">
                                            Link
                                        </Label>
                                        <Input
                                            type="text"
                                            name="url"
                                            id="url"
                                            placeholder="Please enter the link"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.url}
                                        />
                                        {formik.touched.url &&
                                            formik.errors.url && (
                                                <small className="error-cls">
                                                    {formik.errors.url}
                                                </small>
                                            )}
                                    </FormGroup>
                                </div>

                                <hr className="mt-4 mb-4" />
                                <Row>
                                    <Col className="col-xs-12 col-sm-6">
                                        <div className="col-6">
                                            <Button
                                                label="Discard"
                                                size="small"
                                                btnClass="primary"
                                                type="cancel"
                                                onClick={() => history.goBack()}
                                            />
                                        </div>
                                    </Col>
                                    <Col className="submit-btn col-xs-12 col-sm-6">
                                        <Button
                                            label="Submit details"
                                            type="submit"
                                            btnClass={
                                                !formik.dirty && !formik.isValid
                                                    ? 'default'
                                                    : 'primary'
                                            }
                                            size="small"
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

export default EditLatestNews;
