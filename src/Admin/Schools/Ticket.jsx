/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge } from 'reactstrap';
import Layout from '../../Admin/Layout';
import { BsPlusLg } from 'react-icons/bs';
import { Button } from '../../stories/Button';
import { useHistory } from 'react-router-dom';
import { getSchoolRegistationBulkUploadList } from '../../redux/actions';
import { connect } from 'react-redux';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { getCurrentUser, openNotificationWithIcon } from '../../helpers/Utils';
import axios from 'axios';

const TicketsPage = (props) => {
    // here we can see all the support tickets //
    const currentUser = getCurrentUser('current_user');
    const [reqList, setReqList] = useState(false);
    const [newList, setNewList] = useState(false);
    const [reqSchoolsResponse, setReqSchoolsResponse] = useState([]);
    const [newSchoolsResponse, setNewSchoolsResponse] = useState([]);
    const [pending, setPending] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    const [SRows, setSRows] = React.useState([]);
    const [disableBtn, setDisablebtn] = useState(false);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setSRows(reqSchoolsData.data);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(SchoolsData.data);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    const history = useHistory();
    useEffect(() => {
        props.getSchoolRegistationBulkUploadActions('i');
    }, []);
    const handleEdit = (item) => {
        // where item = orgnization id  details //
        // where we can edit the institution details //
        history.push({
            pathname: '/admin/register-edit-schools'
        });
        localStorage.setItem('listId', JSON.stringify(item));
    };
    const handleActiveStatusUpdate = (item, itemA) => {
        setDisablebtn(true);
        // where we can update the status InActive or New   //
        // where item = orgnization id details , itemA= status //
        const body = {
            status: itemA,
            organization_code: item.organization_code,
            organization_name: item.organization_name
        };
        var config = {
            method: 'put',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/organizations/' +
                item.organization_id,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: body
        };
        axios(config)
            .then(function (response) {
                setTimeout(() => {
                    setDisablebtn(false);
                }, 3000);
                if (response.status === 200) {
                    setReqList(false);
                    openNotificationWithIcon(
                        'success',
                        'Status update successfully'
                    );
                    // setDisablebtn(true);
                    props.getSchoolRegistationBulkUploadActions('i');
                }
            })
            .catch(function (error) {
                console.log(error);
                openNotificationWithIcon('error', 'Something went wrong');
            });
    };
    const handleStatusUpdate = (item, itemS) => {
        setDisablebtn(true);
        // where we can update the status Active or New  //
        // where item = orgnization id details , itemS= status //
        //organization_code = orgnization code //
        // organization_name = orgnization name //
        const body = {
            status: itemS,
            organization_code: item.organization_code,
            organization_name: item.organization_name
        };
        var config = {
            method: 'put',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/organizations/' +
                item.organization_id,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: body
        };
        axios(config)
            .then(async function (response) {
                setTimeout(() => {
                    setDisablebtn(false);
                }, 3000);
                if (response.status === 200) {
                    setReqList(true);
                    await listApi();
                    openNotificationWithIcon(
                        'success',
                        'Status update successfully'
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
                openNotificationWithIcon('error', 'Something went wrong');
            });
    };

    const handleNewUpdate = (item, itemS) => {
        setDisablebtn(true);
        // where we can update the status Active or InActive //
        // where item = orgnization id details , itemS= status //
        //organization_code = orgnization code //
        // organization_name = orgnization name //
        const body = {
            status: itemS,
            organization_code: item.organization_code,
            organization_name: item.organization_name
        };
        var config = {
            method: 'put',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/organizations/' +
                item.organization_id,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: body
        };
        axios(config)
            .then(async function (response) {
                setTimeout(() => {
                    setDisablebtn(false);
                }, 3000);
                if (response.status === 200) {
                    setNewList(true);
                    await newListApi();
                    openNotificationWithIcon(
                        'success',
                        'Status update successfully'
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
                openNotificationWithIcon('error', 'Something went wrong');
            });
    };
    const handleNewSchoolsList = async () => {
        // here we can see  list of  new institutions //
        setReqList(false);
        await newListApi();
    };
    async function listApi() {
        //  here we can see listApi where we can see all InActive Institutions //
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/organizations?status=INACTIVE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setReqSchoolsResponse(
                        response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                    setReqList(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    async function newListApi() {
        // here we can see newListApi where we can see list of new Institutions //
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/organizations?status=NEW',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setNewSchoolsResponse(
                        response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                    setNewList(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const handleReqSchoolsList = async (e) => {
        // here we can see  list of inActive institutions //
        await listApi();
    };

    const handleBack = (e) => {
        // here we can go back to main page //
        setReqList(false);
        setNewList(false);
        props.getSchoolRegistationBulkUploadActions('i');
    };

    const handleNewBack = (e) => {
        // here we can go back to main page //
        setReqList(false);
        setNewList(false);
        props.getSchoolRegistationBulkUploadActions('i');
    };
    const [array, setarray] = useState([]);
    useEffect(() => {
        if (
            props.schoolsRegistrationList &&
            props.schoolsRegistrationList.length > 0
        ) {
            let dataarray = [];
            props.schoolsRegistrationList.forEach((item, index) => {
                dataarray.push(Object.assign(item, { index: index + 1 }));
            });
            setarray([...dataarray]);
        }
    }, [props.schoolsRegistrationList]);
    const SchoolsData = {
        data: array,
        columns: [
            {
                name: 'No',
                selector: (row) => row.index,
                cellExport: (row) => row.index,
                width: '6rem'
            },
            {
                name: 'UDISE Code ',
                selector: 'organization_code',
                cellExport: (row) => row.organization_code,
                sortable: true,

                width: '15rem'
            },
            {
                name: 'Institution Name',
                selector: 'organization_name',
                cellExport: (row) => row.organization_name,
                width: '27rem'
            },
            {
                name: 'District',
                selector: 'district',
                cellExport: (row) => row.district,
                width: '15rem'
            },
            {
                name: 'Principal Name',
                selector: 'principal_name',
                cellExport: (row) => row.principal_name,
                width: '15rem'
            },
            // {
            //     name: 'Mobile',
            //     selector: 'principal_mobile',
            //     cellExport: (row) => row.principal_mobile,
            //     width: '12%'
            // },
            {
                name: 'Status',
                cellExport: (row) => row.status,
                cell: (row) => [
                    <Badge
                        key={row.organization_id}
                        bg={`${
                            row.status === 'ACTIVE' ? 'secondary' : 'danger'
                        }`}
                    >
                        {row.status}
                    </Badge>
                ],
                width: '10rem'
            },
            {
                name: 'Actions',
                selector: 'action',
                width: '27rem',
                center: true,
                cellExport: (row) => {},
                cell: (record) => [
                    <>
                        <div
                            key={record}
                            onClick={() => handleEdit(record)}
                            style={{ marginRight: '7px' }}
                        >
                            <div className="btn btn-primary  mx-2">EDIT</div>
                        </div>
                        {/* {disableBtn === false ? setDisableBtn(false) */}
                        <div
                            key={record}
                            onClick={() =>
                                !disableBtn &&
                                handleActiveStatusUpdate(record, 'NEW')
                            }
                            style={{ marginRight: '10px' }}
                        >
                            <div className="btn btn-success ">TEST</div>
                        </div>
                        {/* : setDisableBtn(true)} */}
                        <div
                            key={record}
                            onClick={() =>
                                !disableBtn &&
                                handleActiveStatusUpdate(record, 'INACTIVE')
                            }
                            style={{ marginRight: '10px' }}
                        >
                            <div className="btn btn-danger ">INACTIVE</div>
                        </div>
                    </>
                ]
            }
        ]
    };
    const reqSchoolsData = {
        data: reqSchoolsResponse,
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                // sortable: true,
                width: '6rem'
            },
            {
                name: 'Unique Code',
                selector: (row) => row.organization_code,
                sortable: true,
                width: '15rem'
            },
            {
                name: 'Institution Name',
                selector: (row) => row.organization_name,
                width: '27rem'
            },
            {
                name: 'Principal Name',
                selector: 'principal_name',
                width: '15rem'
            },
            // {
            //     name: 'Mobile',
            //     selector: 'principal_mobile',
            //     width: '12%'
            // },
            {
                name: 'Status',
                cell: (row) => [
                    <Badge key={row.organization_id} bg={`${'danger'}`}>
                        {row.status}
                    </Badge>
                ],
                width: '10rem'
            },
            {
                name: 'Actions',
                selector: 'action',
                center: true,
                width: '20rem',
                cell: (record) => [
                    <>
                        <div
                            key={record}
                            onClick={() => handleEdit(record)}
                            style={{ marginRight: '7px' }}
                        >
                            <div className="btn btn-primary  mx-2">EDIT</div>
                        </div>
                        <div
                            key={record}
                            onClick={() =>
                                !disableBtn &&
                                handleStatusUpdate(record, 'ACTIVE')
                            }
                            style={{ marginRight: '10px' }}
                        >
                            <div className="btn btn-warning ">ACTIVE</div>
                        </div>
                        <div
                            key={record}
                            onClick={() =>
                                !disableBtn && handleStatusUpdate(record, 'NEW')
                            }
                            style={{ marginRight: '10px' }}
                        >
                            <div className="btn btn-success">TEST</div>
                        </div>
                    </>
                ]
            }
        ]
    };
    const newSchoolsData = {
        data: newSchoolsResponse,
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                width: '6rem'
            },
            {
                name: 'Unique Code',
                selector: 'organization_code',
                sortable: true,
                width: '15rem'
            },
            {
                name: 'Institution Name',
                selector: 'organization_name',
                width: '25rem'
            },
            {
                name: 'Principal Name',
                selector: 'principal_name',
                width: '13rem'
            },

            {
                name: 'Status',
                cell: (row) => [
                    <Badge
                        key={row.organization_id}
                        bg={`${row.status === 'NEW' ? 'secondary' : 'success'}`}
                    >
                        {row.status === 'NEW' ? 'TEST' : ''}
                    </Badge>
                ],
                width: '10rem'
            },
            {
                name: 'Actions',
                selector: 'action',
                width: '24rem',
                center: true,
                cell: (record) => [
                    <>
                        <div
                            key={record}
                            onClick={() => handleEdit(record)}
                            style={{ marginRight: '7px' }}
                        >
                            <div className="btn btn-primary  mx-2">EDIT</div>
                        </div>
                        <div
                            key={record}
                            onClick={() =>
                                !disableBtn && handleNewUpdate(record, 'ACTIVE')
                            }
                            style={{ marginRight: '10px' }}
                        >
                            <div className="btn btn-warning ">ACTIVE</div>
                        </div>
                        <div
                            key={record}
                            onClick={() =>
                                !disableBtn &&
                                handleNewUpdate(record, 'INACTIVE')
                            }
                            style={{ marginRight: '10px' }}
                        >
                            <div className="btn btn-danger">INACTIVE</div>
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
                            {reqList ? (
                                <h2>List of inactive institutions</h2>
                            ) : newList ? (
                                <h2>List of test institutions</h2>
                            ) : (
                                <h2>List of active institutions</h2>
                            )}
                        </Col>

                        <Col className="ticket-btn col ml-auto ">
                            {reqList ? (
                                <div className="d-flex justify-content-end">
                                    <Button
                                        label="Back"
                                        btnClass="primary"
                                        size="small"
                                        shape="btn-square"
                                        onClick={(e) => handleBack(e)}
                                    />
                                </div>
                            ) : newList ? (
                                <div className="d-flex justify-content-end">
                                    <Button
                                        label="Back"
                                        btnClass="primary"
                                        size="small"
                                        shape="btn-square"
                                        onClick={(e) => handleNewBack(e)}
                                    />
                                </div>
                            ) : (
                                <div className="d-flex justify-content-end">
                                    <Button
                                        label="Add New Institutions"
                                        btnClass=" btn btn-success"
                                        size="small"
                                        shape="btn-square"
                                        Icon={BsPlusLg}
                                        onClick={() =>
                                            history.push(
                                                '/admin/register-new-schools'
                                            )
                                        }
                                    />
                                    <Button
                                        label="InActive List"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        onClick={(e) => handleReqSchoolsList(e)}
                                    />
                                    <Button
                                        label="Test List"
                                        btnClass="primary"
                                        size="small"
                                        shape="btn-square"
                                        onClick={() => handleNewSchoolsList()}
                                    />
                                </div>
                            )}
                        </Col>
                    </Row>

                    {reqList ? (
                        <div className="my-2">
                            <DataTableExtensions
                                print={false}
                                export={true}
                                {...reqSchoolsData}
                                exportHeaders
                            >
                                <DataTable
                                    data={SRows}
                                    defaultSortField="id"
                                    defaultSortAsc={false}
                                    pagination
                                    highlightOnHover
                                    fixedHeader
                                    subHeaderAlign={Alignment.Center}
                                />
                            </DataTableExtensions>
                        </div>
                    ) : newList ? (
                        <div className="my-2">
                            <DataTableExtensions
                                print={false}
                                export={true}
                                {...newSchoolsData}
                                exportHeaders
                            >
                                <DataTable
                                    defaultSortField="id"
                                    defaultSortAsc={false}
                                    pagination
                                    highlightOnHover
                                    fixedHeader
                                    subHeaderAlign={Alignment.Center}
                                />
                            </DataTableExtensions>
                        </div>
                    ) : (
                        <div className="my-2">
                            <DataTableExtensions
                                {...SchoolsData}
                                export={true}
                                print={false}
                                exportHeaders
                            >
                                <DataTable
                                    data={rows}
                                    defaultSortField="id"
                                    defaultSortAsc={false}
                                    pagination
                                    highlightOnHover
                                    fixedHeader
                                    subHeaderAlign={Alignment.Center}
                                />
                            </DataTableExtensions>
                        </div>
                    )}
                </Row>
            </Container>
        </Layout>
    );
};
const mapStateToProps = ({ schoolRegistration }) => {
    const { schoolsRegistrationList } = schoolRegistration;
    return { schoolsRegistrationList };
};
export default connect(mapStateToProps, {
    getSchoolRegistationBulkUploadActions: getSchoolRegistationBulkUploadList
})(TicketsPage);
