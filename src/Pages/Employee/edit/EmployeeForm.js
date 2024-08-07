import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form, } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import Select from '../../../components/Select';
import { errorAlert, successAlert } from '../../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { getDepartments, updateEmployee, deleteEmployee } from '../../../services/NetworkCall';

export const EmployeeForm = ({ setLoading, preData }) => {
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
        "firstName": "",
        "id": null,
        "lastName": "",
        "email": "",
        // "departmentId": "",
        "phoneNumber": "",
        "vehicleNumber": ""
    });

    const [error, setError] = useState({
        "firstName": "",
        "lastName": "",
        "email": "",
        // "departmentId": "",
        "phoneNumber": "",
        "vehicleNumber": "",
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
                firstName: preData.first_name,
                lastName: preData.last_name,
                email: preData.email,
                phoneNumber: preData.phone_number,
                vehicleNumber: preData.vehicle_number
            }

            setIndata(exData);
        }

    }, [preData])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = 1;
        if (!indata.firstName) {
            setError(prev => ({ ...prev, "firstName": "First Name is required" }));
            isValid = 0;
        }
        if (!indata.lastName) {
            setError(prev => ({ ...prev, "lastName": "Last Name is required" }));
            isValid = 0;
        }

        // if (!indata.departmentId) {
        //     setError(prev => ({ ...prev, "departmentId": "Department is required" }));
        //     isValid = 0;
        // }

        if (!indata.phoneNumber) {
            setError(prev => ({ ...prev, "phoneNumber": "Phone Number is required" }));
            isValid = 0;
        }
        if (!indata.vehicleNumber) {
            setError(prev => ({ ...prev, "vehicleNumber": "Vehicel Number is required" }));
            isValid = 0;
        }

        if (isValid == 1) {
            setLoading(true);
            const res = await updateEmployee(indata);
            if (res.success) {
                e.target.reset();
                setLoading(false);
                successAlert(res.message);
                navigate("/employeelist");
            } else {
                errorAlert(res.message);
            }
            setLoading(false);
        }
    };

    return (
        <>
            <div className='CreateAccountForm'>
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Row className='mb-2'>
                            <Col md={4}>
                                <InputField
                                    FormType={'text'}
                                    FormLabel={"First Name"}
                                    onChange={inputHandler}
                                    error={error.firstName}
                                    value={indata.firstName}
                                    name='firstName' />
                            </Col>
                            <Col md={4}>
                                <InputField
                                    FormType={'text'}
                                    FormLabel={"Last Name"}
                                    onChange={inputHandler}
                                    error={error.lastName}
                                    value={indata.lastName}
                                    name='lastName' />
                            </Col>
                            <Col md={4}>
                                <InputField
                                    FormType={'email'}
                                    FormLabel={"Email"}
                                    onChange={inputHandler}
                                    value={indata.email}
                                    readOnly
                                    error={error.email} name='email' />
                            </Col>
                            <Col md={4}>
                                <InputField
                                    FormType={'tel'}
                                    FormLabel={"Phone No"}
                                    max='10'
                                    onChange={inputHandler}
                                    value={indata.phoneNumber}
                                    error={error.phoneNumber}
                                    name='phoneNumber' />
                            </Col>
                            <Col md={4}>
                                <InputField
                                    FormType={'text'}
                                    FormLabel={"Vehicle No"}
                                    onChange={inputHandler}
                                    value={indata.vehicleNumber}
                                    error={error.vehicleNumber}
                                    name='vehicleNumber' />
                            </Col>
                            {/* <Col md={4}>
                                <Select FormLabel='Select Department' Array={departmentList} FormPlaceHolder='Department' onChange={inputHandler} error={error.departmentId} name='departmentId' />
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
