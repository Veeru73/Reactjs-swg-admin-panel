import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap'
import { InputField } from '../../components/InputField'
import { CheckBoxButton } from '../../components/CheckBoxButton'
import { SharedButton } from '../../components/Button'
import { errorAlert, successAlert } from '../../components/Alert'
import { createRole, getPrivileges } from "../../services/NetworkCall"
import { useNavigate } from 'react-router-dom'

export const CreateRoleForm = ({ setLoading }) => {
    const navigate = useNavigate();
    const [roleName, setRoleName] = useState("");
    const [selectedPrivilegeIds, setSelectedPrivilegeIds] = useState([]);
    const [privileges, setPrivileges] = useState([]);


    // master privilegs data || modules list based on platform
    const getPrivilegesData = async (platform) => {
        setLoading(true);
        const res = await getPrivileges(platform);

        if (res.success) {
            setPrivileges(res.data);
            setSelectedPrivilegeIds([]); // Reset selected privileges when platform changes
        }
        setLoading(false);
    }

    useEffect(() => {
        getPrivilegesData();
    }, []);

    const createHandler = async () => {
        if (!roleName || roleName == "") {
            errorAlert("Please Enter Role")
            return;
        }

        const data = { roleName, privilegeIds: selectedPrivilegeIds }
        setLoading(true);

        const res = await createRole(data);
        if (res.success) {
            setLoading(false);
            successAlert(res.message);
            navigate("/roleList");
        } else {
            errorAlert(res.message);
        }
        setLoading(false);
    }


    const checkedHandler = (data) => {
        const { id } = data.data;
        const { isChecked } = data;

        setSelectedPrivilegeIds((prev) => {
            if (isChecked) {
                return [...prev, id];
            } else {
                return prev.filter((privilegeId) => privilegeId !== id);
            }
        });
    };

    return (
        <>
            <div className='bgWhite my-3'>
                <Container>
                    <Row className='my-3'>
                        <Col md={4}>
                            <InputField FormLabel='Role Name' FormPlaceHolder='Enter Role Name' value={roleName} onChange={(e) => setRoleName(e.target.value)} />
                        </Col>
                    </Row>
                    <h6>Select</h6>
                    <div className='RoleModule'>
                        <Row>
                            <Row>
                                {privileges && privileges.map((e, i) => (
                                    <Col md={3} key={i}>
                                        <CheckBoxButton
                                            BtnLabel={e.name_label}
                                            fulldata={e}
                                            BtnClass={'checked-btn'}
                                            onClick={checkedHandler} type={'check'}
                                            isChecked={selectedPrivilegeIds.includes(e.id)} // Pass isChecked prop to CheckBoxButton
                                        />
                                    </Col>
                                ))}
                            </Row>


                        </Row>
                    </div>
                    <Row className='mt-3'>
                        <Col md={4}>
                            <SharedButton BtnLabel={'Create'} type={'button'} onClick={createHandler} BtnVariant={'primary'} BtnClass={'w-100'} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
