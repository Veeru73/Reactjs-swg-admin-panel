import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button, Stack } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { errorAlert, successAlert } from '../../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from 'sweetalert2';
import { updateVendor, deleteVendor } from '../../../services/NetworkCall';

export const EditVendorForm = ({ setLoading, pre }) => {
    const navigate = useNavigate();
    const [isedit, setIsedit] = useState(false);
    const [premain, setPremain] = useState();
    const [indata, setIndata] = useState({
        id: 0,
        ownerName: "",
        vendorName: "",
        email: "",
        address: "",
        phoneNumber: "",
        terms: "",
        status: ""
    });

    useEffect(() => {
        if (pre) {
            setPremain(pre);
            setIndata({
                id: pre.id,
                ownerName: pre.owner_name,
                vendorName: pre.vendor_name,
                address: pre.address,
                email: pre.email,
                phoneNumber: pre.phone_number,
                terms: pre.terms,
                status: pre.status
            });
        }
    }, [pre]);

    const handleSwitchChange = async (e) => {
        const newStatus = e.target.checked ? 1 : 0;
        setLoading(true);
        const res = await updateVendor({ id: indata.id, status: newStatus });
        if (res.success) {
            setIndata((prev) => ({ ...prev, status: newStatus }));
            successAlert(res.message);
        } else {
            errorAlert(res.message);
        }
        setLoading(false)
    };


    const [error, setError] = useState({
        ownerName: "",
        vendorName: "",
        email: "",
        address: "",
        phoneNumber: "",
        terms: ""
    });

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((prev) => ({ ...prev, [name]: value }));
        setError((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = 1;

        if (!indata.terms) {
            setError(prev => ({ ...prev, "terms": "Terms is required" }));
            isValid = 0;
        }
        if (!indata.vendorName) {
            setError(prev => ({ ...prev, "vendorName": "Vendor Name is required" }));
            isValid = 0;
        }

        if (!indata.address) {
            setError(prev => ({ ...prev, "address": "Address is required" }));
            isValid = 0;
        }

        if (!indata.phoneNumber) {
            setError(prev => ({ ...prev, "phoneNumber": "Phone Number is required" }));
            isValid = 0;
        }


        if (isValid == 1) {
            setLoading(true);

            const res = await updateVendor(indata);

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

    const deleteHandler = (id) => {

        if (!id) {
            errorAlert("Something wrong");
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteVendor(id);

                if (res.success) {
                    setLoading(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            navigate("/vendorlist");
                        }
                    });
                }
            }
        });
    };

    return (
        <>
            {isedit ? (
                <div className='CreateAccountForm UseDetailPages mt-3'>
                    <Container>
                        <Form onSubmit={handleSubmit}>
                            <Row className='mb-2 mt-3'>
                                <Col md={4}>
                                    <InputField
                                        FormType={'text'}
                                        FormLabel={"Terms"}
                                        onChange={inputHandler}
                                        error={error.terms}
                                        value={indata.terms}
                                        name='terms'
                                        FormPlaceHolder={"Net-30"} />
                                </Col>
                                <Col md={4}>
                                    <InputField
                                        FormType={'text'}
                                        FormLabel={"Vendor Name"}
                                        onChange={inputHandler}
                                        error={error.vendorName}
                                        value={indata.vendorName}
                                        name='vendorName'
                                        FormPlaceHolder={"Wilson"} />
                                </Col>
                                <Col md={4}>
                                    <InputField
                                        FormType={'email'}
                                        FormLabel={"Email"}
                                        onChange={inputHandler}
                                        readOnly={true}
                                        error={error.email}
                                        value={indata.email}
                                        name='email'
                                        FormPlaceHolder={"example@gmail.com"} />
                                </Col>
                                <Col md={4}>
                                    <InputField
                                        FormType={'tel'}
                                        FormLabel={"Phone"}
                                        max='10'
                                        onChange={inputHandler}
                                        error={error.phoneNumber}
                                        value={indata.phoneNumber}
                                        name='phoneNumber' FormPlaceHolder={"8989898989"} />
                                </Col>
                                <Col md={4}>
                                    <InputField
                                        FormType={'text'}
                                        FormLabel={"Address"}
                                        onChange={inputHandler}
                                        error={error.address}
                                        value={indata.address}
                                        name='address'
                                        FormPlaceHolder={"address"} />
                                </Col>
                            </Row>
                            <hr />
                            <Row className='mb-2'>
                                <Col md={4}>
                                    <SharedButton type={'submit'} BtnLabel={"Update"} BtnVariant={'primary'} BtnClass={"w-100"} />
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </div>
            ) : (
                <div className='CreateAccountForm UseDetailPages mt-3'>
                    <Container>
                        <Row className="my-3" style={{ justifyContent: "end" }}>
                            <Col md={10}>
                            </Col>
                            <Col md={2}>
                                <Button variant="success" size="sm" className='m-2' onClick={() => setIsedit(true)} style={{ fontWeight: '500' }}><TbEdit /></Button>
                                <Button variant="danger" size="sm" onClick={() => deleteHandler(indata.id)} style={{ fontWeight: '500' }}><RiDeleteBinLine /></Button>
                            </Col>
                        </Row>
                        <Row className='mb-3 mt-3'>
                            <Col md={4}>
                                <h6>Vendor ID</h6>
                                <p>{indata.id}</p>
                            </Col>
                            <Col md={4}>
                                <h6>Vendor Name</h6>
                                <p>{indata.vendorName}</p>
                            </Col>
                            <Col md={4}>
                                <h6>Email</h6>
                                <p>{indata.email}</p>
                            </Col>
                            <Col md={4}>
                                <h6>Phone</h6>
                                <p>{indata.phoneNumber}</p>
                            </Col>
                            <Col md={4}>
                                <h6>Address</h6>
                                <p>{indata.address}</p>
                            </Col>
                            <Col md={4}>
                                <h6>Terms</h6>
                                <p>{indata.terms}</p>
                            </Col>
                        </Row>
                        <Stack direction='horizontal' gap={2}>
                            <div className="form-check form-switch">
                                <Form.Label className="form-check-label" for="flexSwitchCheckDefault">{indata.status == 1 ? "Active" : "Inactive"}</Form.Label>
                                <Form.Control
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckDefault"
                                    checked={indata.status == 1 ? true : false}
                                    onChange={handleSwitchChange}
                                />
                            </div>
                        </Stack>
                    </Container>
                </div>
            )}
        </>
    );
};
