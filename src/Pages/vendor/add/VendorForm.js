import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form, } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { errorAlert, successAlert } from '../../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { addVendor } from '../../../services/NetworkCall';


export const VendorForm = ({ setLoading }) => {
    const navigate = useNavigate();

    const [data, setdata] = useState({
        "ownerName": "",
        "vendorName": "",
        "email": "",
        "address": "",
        "phoneNumber": ""
    });

    const [error, setError] = useState({
        "ownerName": "",
        "vendorName": "",
        "email": "",
        "address": "",
        "phoneNumber": "",
    });


    const inputHandler = (e) => {
        const { name, value } = e.target;
        setdata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = 1;

        if (!data.ownerName) {
            setError(prev => ({ ...prev, "ownerName": "Owner Name is required" }));
            isValid = 0;
        }
        if (!data.vendorName) {
            setError(prev => ({ ...prev, "vendorName": "Vendor Name is required" }));
            isValid = 0;
        }
        if (!data.email) {
            setError(prev => ({ ...prev, "email": "Email is required" }));
            isValid = 0;
        }

        if (!data.address) {
            setError(prev => ({ ...prev, "address": "Address is required" }));
            isValid = 0;
        }

        if (!data.phoneNumber) {
            setError(prev => ({ ...prev, "phoneNumber": "Phone Number is required" }));
            isValid = 0;
        }


        if (isValid == 1) {

            setLoading(true);

            const res = await addVendor(data);
            if (res.success) {
                e.target.reset();
                setLoading(false);
                successAlert(res.message);
                navigate("/vendorlist");
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
                                <InputField FormType={'text'} FormLabel={"Owner Name"} onChange={inputHandler} error={error.ownerName} name='ownerName' FormPlaceHolder='owner name' />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Vendor Name"} onChange={inputHandler} error={error.vendorName} name='vendorName' FormPlaceHolder='vendor name' />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'email'} FormLabel={"Enter Email"} onChange={inputHandler} error={error.email} name='email' FormPlaceHolder='enter email' />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'tel'} FormLabel={"Phone No"} max='10' onChange={inputHandler} error={error.phoneNumber} name='phoneNumber' FormPlaceHolder='phone no' />
                            </Col>
                            <Col md={4}>
                                <InputField FormType={'text'} FormLabel={"Address"} onChange={inputHandler} error={error.address} name='address' FormPlaceHolder='enter address' />
                            </Col>
                        </Row>
                        <Row className='mb-2 mt-4'>
                            <Col md={4}>
                                <SharedButton type={'submit'} BtnLabel={"Add"} BtnVariant={'primary'} BtnClass={"w-100"} />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        </>
    )
}
