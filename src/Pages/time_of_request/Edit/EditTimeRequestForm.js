import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button, Badge, Stack } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { errorAlert, successAlert } from '../../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from 'sweetalert2';
import { getEmployessWithoutPagination, updateDepartment, deleteDepartment } from '../../../services/NetworkCall';
import { SharedMultiSelect } from '../../../components/SharedMultiSelect';

export const EditTimeRequestForm = ({ setLoading, pre }) => {
    const navigate = useNavigate();
    const [isedit, setIsedit] = useState(false);
    const [preData, setPreData] = useState({});
    const [users, setUsers] = useState([]);
    const [skillsdata, setSkillsdata] = useState(); // new selected user full data;
    const [exSeletedUserIds, exSetSelectedUserIds] = useState({});

    const getUsers = async () => {
        setLoading(true);

        const res = await getEmployessWithoutPagination();

        if (res.success) {
            if (res.data) {
                const modifyData = res.data.map((e) => ({ label: `${e.first_name} ${e.last_name}`, id: e.id }));
                setUsers(modifyData);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (pre) {
            setPreData(pre);
            // existing selected user ids as super visors
            const exSuperVisors = pre?.department_supervisors.map((e) => e.id).join(",");
            exSetSelectedUserIds(exSuperVisors);
        }
    }, [pre]);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setPreData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!preData.department_name) {
            errorAlert("Please enter department name");
            return;
        }

        setLoading(true);

        const userIds = skillsdata.map((e) => e.id);

        const data = { id: preData.id, departmentName: preData.department_name, userIds };

        const res = await updateDepartment(data);

        if (res.success) {
            e.target.reset();
            setLoading(false);
            successAlert(res.message);
            navigate("/departmentlist");
        } else {
            errorAlert(res.message);
        }
        setLoading(false);

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
                const res = await deleteDepartment(id);

                if (res.success) {
                    setLoading(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            navigate("/departmentlist");
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
                                        name='department_name'
                                        FormLabel='Department Name'
                                        FormPlaceHolder='Enter Department Name'
                                        value={preData.department_name}
                                        onChange={inputHandler}
                                    />
                                </Col>
                                <Col md={4}>
                                    <SharedMultiSelect
                                        value={exSeletedUserIds}
                                        setSkillsdata={setSkillsdata}
                                        options={users}
                                        name={"Select Supervisor"}
                                        labelText={"Select Supervisor"} />
                                </Col>
                            </Row>
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
                        <Stack direction='vertical' gap={4}>
                            <Stack direction='horizontal' gap={4} style={{
                                justifyContent: "space-between"
                            }}>
                                <h4>Veeru Thakur</h4>
                                <Stack direction='horizontal'>
                                    <Button variant="success" size="sm" className='m-2' onClick={() => setIsedit(true)} style={{ fontWeight: '500' }}>Approved</Button>
                                    <Button variant="danger" size="sm" onClick={() => deleteHandler(preData.id)} style={{ fontWeight: '500' }}>Decline</Button>
                                </Stack>
                            </Stack>
                            <Stack direction='horizontal' gap={4} alignItem="center">
                                <Badge className='bg-light text-dark p-3 w-50'>
                                    <Stack direction='Vertical' gap={2} justifyContent="space-between" alignItem="center">
                                        <h5 className='mb-0'>Submission Date</h5>
                                        <p className='mb-0'>20-06-2024</p>
                                    </Stack>
                                </Badge>
                                <Badge className='bg-light text-dark p-3 w-50'>
                                    <Stack direction='Vertical' gap={2} justifyContent="space-between" alignItem="center">
                                        <h5 className='mb-0'>Reason</h5>
                                        <p className='mb-0'>Personal Leave</p>
                                    </Stack>
                                </Badge>
                                <Badge className='bg-light text-dark p-3 w-50'>
                                    <Stack direction='Vertical' gap={2} justifyContent="space-between" alignItem="center">
                                        <h5 className='mb-0'>Start Date</h5>
                                        <p className='mb-0'>Jun 5 2024</p>
                                    </Stack>
                                </Badge>
                                <Badge className='bg-light text-dark p-3 w-50'>
                                    <Stack direction='Vertical' gap={2} justifyContent="space-between" alignItem="center">
                                        <h5 className='mb-0'>End Date</h5>
                                        <p className='mb-0'>Jun 15 2024</p>
                                    </Stack>
                                </Badge>
                            </Stack>
                            <Stack direction='horizontal' gap={4} alignItem="center" >
                                <Badge className='bg-light text-dark p-3 w-100'>
                                    <Stack direction='Vertical' gap={2} >
                                        <h5 className='mb-0'>Employee Comments</h5>
                                        <p className='mb-0'>I gave my doctor's note to Laney that says I need an MRI before I can come back to work.</p>
                                    </Stack>
                                </Badge>
                            </Stack>
                        </Stack>
                    </Container>
                </div>
            )}
        </>
    );
};
