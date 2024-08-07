import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { SharedButton } from '../../../components/Button';
import { errorAlert, successAlert } from '../../../components/Alert';
import { createDepartment, getEmployessWithoutPagination } from "../../../services/NetworkCall";
import { useNavigate } from 'react-router-dom';
import { SharedMultiSelect } from '../../../components/SharedMultiSelect';

export const DepartmentForm = ({ setLoading }) => {
    const navigate = useNavigate();
    const [departmentName, setDepartmentName] = useState("");
    const [users, setUsers] = useState([]);
    const [skillsdata, setSkillsdata] = useState();

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

    const createHandler = async () => {
        if (!departmentName) {
            errorAlert("Please enter department name");
            return;
        }

        const userIds = skillsdata.map((e) => e.id);

        const data = { departmentName, userIds };

        setLoading(true);

        const res = await createDepartment(data);

        if (res.success) {
            setLoading(false);
            successAlert(res.message);
            navigate("/departmentList");
        } else {
            errorAlert(res.message);
            setLoading(false);
        }
    }

    return (
        <>
            <div className='bgWhite my-3'>
                <Container>
                    <Row className='my-3'>
                        <Col md={4}>
                            <InputField
                                FormLabel='Department Name'
                                FormPlaceHolder='Enter Department Name'
                                value={departmentName}
                                onChange={(e) => setDepartmentName(e.target.value)}
                            />
                        </Col>
                        <Col md={4}>
                            <SharedMultiSelect
                                setSkillsdata={setSkillsdata}
                                options={users}
                                name={"Select Supervisor"}
                                labelText={"Select Supervisor"} />
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col md={4}>
                            <SharedButton BtnLabel={'Add'} type={'button'} onClick={createHandler} BtnVariant={'primary'} BtnClass={'w-100'} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
