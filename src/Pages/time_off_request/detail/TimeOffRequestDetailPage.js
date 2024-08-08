import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button, Badge, Stack } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { errorAlert, successAlert } from '../../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from 'sweetalert2';
import { updateTimeOffRequestStatus } from '../../../services/NetworkCall';
import { SharedMultiSelect } from '../../../components/SharedMultiSelect';
import { utcToLocalTime } from '../../../helper/Helper';

export const TimeOffRequestDetailPage = ({ setLoading, pre }) => {
    const navigate = useNavigate();
    const [preData, setPreData] = useState({});

    useEffect(() => {
        if (pre) {
            setPreData(pre);
        }
    }, [pre]);

    const handleButtonClick = (id, status) => {

        if (!id) {
            errorAlert("Something wrong");
            return;
        }

        const fStatus = status == "APPROVED" ? "approve" : "reject";
        const sStatus = status == "APPROVED" ? "approved" : "rejected";

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${fStatus} it!`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await updateTimeOffRequestStatus(id, { status });

                if (res.success) {
                    setLoading(false);
                    Swal.fire({
                        title: `${status}!`,
                        text: `Request has been ${sStatus}.`,
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            navigate("/timeoffrequestlist");
                        }
                    });
                }
            }
        });
    };

    return (
        <>
            <div className='CreateAccountForm UseDetailPages mt-3'>
                <Container>
                    <Stack direction='vertical' gap={4}>
                        <Stack direction='horizontal' gap={4} style={{
                            justifyContent: "space-between"
                        }}>
                            <h4>{preData?.user?.first_name} {preData?.user?.last_name}</h4>
                            <Stack direction='horizontal'>
                                <Button variant="success" size="sm" className='m-2' style={{ fontWeight: '500' }} onClick={() => { handleButtonClick(preData.id, "APPROVED") }}>APPROVE</Button>
                                <Button variant="danger" size="sm" style={{ fontWeight: '500' }} onClick={() => { handleButtonClick(preData.id, "REJECTED") }}>REJECT</Button>
                            </Stack>
                        </Stack>
                        <Stack direction='horizontal' gap={4} alignItem="center">
                            <Badge className='bg-light text-dark p-3 w-50'>
                                <Stack direction='Vertical' gap={2} justifyContent="space-between" alignItem="center">
                                    <h5 className='mb-0'>Submission Date</h5>
                                    <p className='mb-0'>{utcToLocalTime(preData?.createdAt)}</p>
                                </Stack>
                            </Badge>
                            <Badge className='bg-light text-dark p-3 w-50'>
                                <Stack direction='Vertical' gap={2} justifyContent="space-between" alignItem="center">
                                    <h5 className='mb-0'>Reason</h5>
                                    <p className='mb-0'>{preData?.time_off_reason?.reason}</p>
                                </Stack>
                            </Badge>
                            <Badge className='bg-light text-dark p-3 w-50'>
                                <Stack direction='Vertical' gap={2} justifyContent="space-between" alignItem="center">
                                    <h5 className='mb-0'>Department</h5>
                                    <p className='mb-0'>{preData?.department?.department_name}</p>
                                </Stack>
                            </Badge>
                            <Badge className='bg-light text-dark p-3 w-50'>
                                <Stack direction='Vertical' gap={2} justifyContent="space-between" alignItem="center">
                                    <h5 className='mb-0'>Start Date</h5>
                                    <p className='mb-0'>{preData.start_date}</p>
                                </Stack>
                            </Badge>
                            <Badge className='bg-light text-dark p-3 w-50'>
                                <Stack direction='Vertical' gap={2} justifyContent="space-between" alignItem="center">
                                    <h5 className='mb-0'>End Date</h5>
                                    <p className='mb-0'>{preData.end_date}</p>
                                </Stack>
                            </Badge>
                        </Stack>
                        <Stack direction='horizontal' gap={4} alignItem="center" >
                            <Badge className='bg-light text-dark p-3 w-100'>
                                <Stack direction='Vertical' gap={2} >
                                    <h5 className='mb-0'>Employee Comments</h5>
                                    <p className='mb-0'>{preData?.notes}</p>
                                </Stack>
                            </Badge>
                        </Stack>
                    </Stack>
                </Container>
            </div>
        </>
    );
};
