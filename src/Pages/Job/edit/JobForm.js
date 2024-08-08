import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form, } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import Select from '../../../components/Select';
import { errorAlert, successAlert } from '../../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { updateJob } from '../../../services/NetworkCall';

export const JobForm = ({ setLoading, preData }) => {
    const navigate = useNavigate();
    // const [departmentList, setDepartmentList] = useState([]);

    // const getDepartmentData = async () => {
    //     const res = await getDepartments();
    //     if (res.success) {
    //         const data = res.data;
    //         const mData = data.map(e => ({ name: e.department_name, value: e.id }));
    //         setDepartmentList(mData);
    //     }
    // }


    // useEffect(() => {
    //     getDepartmentData();
    // }, []);

    const [indata, setIndata] = useState({
        "jobName": "",
        "jobNumber": "",
        "due": "",
        "odpi": "",
        "pw": ""
    });

    const [error, setError] = useState({
        "jobName": "",
        "due": "",
        "odpi": "",
        "pw": "",
    });

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }

    useEffect(() => {
        if (preData) {

            const exData = {
                id: preData.id,
                jobName: preData.job_name,
                jobNumber: preData.job_number,
                due: preData.due,
                odpi: preData.odpi,
                pw: preData.pw
            }

            setIndata(exData);
        }

    }, [preData])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // let isValid = 1;
        // if (!indata.jobName) {
        //     setError(prev => ({ ...prev, "jobName": "Job Name is required" }));
        //     isValid = 0;
        // }

        // if (!indata.odpi) {
        //     setError(prev => ({ ...prev, "odpi": "Phone Number is required" }));
        //     isValid = 0;
        // }
        // if (!indata.pw) {
        //     setError(prev => ({ ...prev, "pw": "Vehicel Number is required" }));
        //     isValid = 0;
        // }

        // if (isValid == 1) {
        setLoading(true);
        const res = await updateJob(indata);
        if (res.success) {
            e.target.reset();
            setLoading(false);
            successAlert(res.message);
            navigate("/joblist");
        } else {
            errorAlert(res.message);
        }
        setLoading(false);
        // }
    };

    return (
        <>
            <div className='CreateAccountForm'>
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Row className='mb-2'>
                            <Col md={4}>
                                <InputField
                                    readOnly
                                    FormType={'text'}
                                    FormLabel={"Job Number"}
                                    onChange={inputHandler}
                                    error={error.jobNumber}
                                    value={indata.jobNumber}
                                    name='jobNumber' />
                            </Col>
                            <Col md={4}>
                                <InputField
                                    FormType={'text'}
                                    FormLabel={"Job Name"}
                                    onChange={inputHandler}
                                    error={error.jobName}
                                    value={indata.jobName}
                                    name='jobName' />
                            </Col>

                            <Col md={4}>
                                <InputField
                                    FormType={'number'}
                                    FormLabel={"DUE"}
                                    onChange={inputHandler}
                                    value={indata.due}
                                    error={error.due}
                                    name='due' />
                            </Col>
                            <Col md={4}>
                                <InputField
                                    FormType={'tel'}
                                    FormLabel={"ODPI"}
                                    max='10'
                                    onChange={inputHandler}
                                    value={indata.odpi}
                                    error={error.odpi}
                                    name='odpi' />
                            </Col>
                            <Col md={4}>
                                <InputField
                                    FormType={'text'}
                                    FormLabel={"PW"}
                                    onChange={inputHandler}
                                    value={indata.pw}
                                    error={error.pw}
                                    name='pw' />
                            </Col>
                            {/* <Col md={4}>
                                <Select FormLabel='Job Type' Array={departmentList} FormPlaceHolder='Department' onChange={inputHandler} error={error.departmentId} name='departmentId' />
                            </Col> */}
                        </Row>
                        <Row className='mb-2 mt-4'>
                            <Col md={4}>
                                <SharedButton type={'submit'} BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        </>
    )
}
