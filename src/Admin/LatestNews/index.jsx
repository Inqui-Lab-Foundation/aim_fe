/* eslint-disable indent */
import { useState } from 'react';
import React, { useEffect } from 'react';
import Layout from '../Layout';
import { Container, Row, Col } from 'reactstrap';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable, { Alignment } from 'react-data-table-component';
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { openNotificationWithIcon } from '../../helpers/Utils';
import { Button } from '../../stories/Button';
import { useHistory } from 'react-router-dom';
// import { ReactDOM } from 'react-dom';
// import * as ReactDOM from 'react-dom';

const AdminLatestNews = () => {
    const history = useHistory();
    const [resList, setResList] = useState([]);
    const currentUser = getCurrentUser('current_user');
    useEffect(() => {
        handleResList();
    }, []);
    async function handleResList() {
        let config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/latest_news',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setResList(
                        response.data &&
                            response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function handleNewStatus(data,value) {
        const body ={
            status:data.status,
            category:data.category,
            details:data.details,
            new_status:value
        };
        let config = {
            method: 'put',
            url: process.env.REACT_APP_API_BASE_URL + `/latest_news/${data.latest_news_id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data:JSON.stringify(body)
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    if(value === '0'){
                        openNotificationWithIcon('success', 'New Status Disabled successfully');
                    }
                    else if(value === '1'){
                        openNotificationWithIcon('success', 'New Status Enabled successfully');
                    }
                    handleResList();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleEdit = (item) => {
        // where we can edit level name, no of evaluation //
        history.push({
            pathname: '/admin/LatestNews/editLatestNews'
        });
        localStorage.setItem('newsID', JSON.stringify(item));
    };

    const handleDelete = async (item) => {
        const newsID = item.latest_news_id;
        const confirmed = window.confirm(
            'Are you sure you want to delete this news?'
        );
        if (!confirmed) {
            return;
        }
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_API_BASE_URL}/latest_news/${newsID}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${currentUser?.data[0]?.token}`
                    }
                }
            );
            if (response.status === 200) {
                openNotificationWithIcon('success', 'News succesfully deleted');
                handleResList();
            }
        } catch (error) {
            console.log(error);
        }
    };

   
    const resData = {
        data: resList && resList.length > 0 ? resList : [],
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                sortable: true,
                width: '10rem'
            },
            {
                name: 'Role',
                selector: 'category',
                width: '12rem'
            },
            {
                name: 'New_status',
                width: '12rem',
                cell: (record) => {
                    if(record.new_status === '1'){
                        return (
                            <button className="btn btn-danger btn-lg mx-2" onClick={()=>{handleNewStatus(record,'0');}}>
                                Disable
                            </button>
                        );
                    }else if (record.new_status === '0'){
                        return (
                            <button className="btn btn-success btn-lg mx-2" onClick={()=>{handleNewStatus(record,'1');}}>
                                Enable
                            </button>
                        );
                    }  
                }
            },
            {
                name: 'Details',
                selector: 'details',
                width: '40rem'
            },
            {
                name: 'File',
                width: '13rem',
                cell: (record) => {
                    if (record.file_name === null) {
                        return <p>No file</p>;
                    } else {
                        return (
                            <button className="btn btn-warning btn-lg mx-2">
                                <a
                                    href={record.file_name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'black' }}
                                >
                                    Download
                                </a>
                            </button>
                        );
                    }
                }
            },
            {
                name: 'Link',
                width: '13rem',
                cell: (record) => {
                    if (record.url === null) {
                        return <p>No link</p>;
                    } else {
                        return (
                            <a
                                href={record.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Navigate
                            </a>
                        );
                    }
                }
            },
            {
                name: 'Actions',
                width: '20rem',
                selector: 'action',
                center: true,
                cell: (record) => [
                    <>
                        <div
                            key={record}
                            onClick={() => handleEdit(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-primary btn-lg mx-2">
                                EDIT
                            </div>
                        </div>

                        <div
                            key={record}
                            onClick={() => handleDelete(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-primary btn-lg mx-2">
                                DELETE
                            </div>
                        </div>
                    </>
                ]
            }
        ]
    };
    return (
        <Layout>
            <Container className="ticket-page mt-5 mb-50">
                <Row className="pt-3">
                    <Row className="mb-2 mb-sm-5 mb-md-5 mb-lg-0">
                        <Col className="col-auto">
                            <h2>LatestNews</h2>
                        </Col>
                        <Col className="text-right">
                            <Button
                                label="Create LatestNews"
                                btnClass="primary mx-3"
                                size="small"
                                shape="btn-square"
                                onClick={() =>
                                    history.push(
                                        '/admin/LatestNews/createLatestNews'
                                    )
                                }
                            />
                        </Col>
                    </Row>

                    <div className="my-2">
                        <DataTableExtensions
                            print={false}
                            export={false}
                            {...resData}
                            exportHeaders
                        >
                            <DataTable
                                data={setResList}
                                // noHeader
                                defaultSortField="id"
                                defaultSortAsc={false}
                                pagination
                                highlightOnHover
                                fixedHeader
                                subHeaderAlign={Alignment.Center}
                            />
                        </DataTableExtensions>
                    </div>
                </Row>
            </Container>
            {/* <h1>hi</h1> */}
        </Layout>
    );
};

export default AdminLatestNews;