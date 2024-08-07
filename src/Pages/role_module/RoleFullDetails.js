import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { Headings } from '../../components/Headings';
import { InputField } from '../../components/InputField';
import { Textareanew } from '../../components/Textareanew';
import { SharedButton } from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { PoSidebar } from '../PO_Sidebar';
import { errorAlert, successAlert } from '../../components/Alert';
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { CreateRole } from './CreateRoleForm';
import { CheckBoxButton } from '../../components/CheckBoxButton';
import { NewCheckBoxButton } from '../../components/NewCheckBoxButton';
import Swal from 'sweetalert2';
import { getPrivileges, updateRole, deleteRole } from "../../services/NetworkCall"

export default function RoleFullDetails({ setLoading }) {
    const [isedit, setIsedit] = useState(false);
    const [isdelete, setIsdelete] = useState(false);
    const [maindata, setMaindata] = useState();
    const location = useLocation();
    const navigate = useNavigate();
    const [privilegesList, setPrivilegesList] = useState([]); // master list of all privileges
    const [selectedPrivilegeIds, setSelectedPrivilegeIds] = useState([]); //selected privileges ids [1,2,3]
    const [roleName, setRoleName] = useState("");

    // Get all privileges list
    const getPrivilegesData = async () => {
        setLoading(true);
        const res = await getPrivileges();
        setLoading(false);
        if (res.success) {
            setPrivilegesList(res.data);
        }
    }



    const [fdata, setFdata] = useState({ "id": '', "role": "", });

    //get data from a state 

    useEffect(() => {
        if (location && location.state && location.state.data) {
            const data = location.state.data;
            const privileges = data.privileges.map((e) => {
                return { ...e, isChecked: true }
            });
            data.modules = privileges;
            // set selected ids --------
            if (privileges) {
                const selectedids = privileges.map((e) => e.id);
                setSelectedPrivilegeIds(selectedids);
            }
            //set role platform to all privileges
            if (data) {
                console.log("this is data---------", data.id);
                // setPlatform(data.platform);
                setMaindata(data);
                setRoleName(data.role_name);
            }
        }
    }, [location])

    useEffect(() => {
        getPrivilegesData();
    }, []);

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

    const updateHandler = async () => {

        if (!roleName || roleName == "") {
            errorAlert("Please Enter Role");
            return
        }

        setLoading(true);

        const data = { roleName, privilegeIds: selectedPrivilegeIds };
        const id = maindata.id;   // role id

        const res = await updateRole(id, data);
        if (res.success) {
            setLoading(false);
            successAlert(res.message);
            navigate("/rolelist");
        } else {
            errorAlert(res.message);
        }
        setLoading(false);
    }

    const deleteHandler = () => {
        const id = maindata.id;   // role id

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
                const res = await deleteRole(id);
                if (res.success) {
                    setLoading(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            navigate("/rolelist");
                        }
                    })
                } else {
                    errorAlert(res.message);
                }
            }
        });
    }

    return (
        <>
            <div className='RoleAdminstrator mt-3'>
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            {isedit ?
                                <div className='CreateRoleForm bgWhite'>
                                    <Container>
                                        <Row>
                                            <Col md={4}>
                                                <InputField FormLabel='Role Name' FormPlaceHolder='Enter Role Name' value={roleName} onChange={(e) => setRoleName(e.target.value)} />
                                            </Col>
                                        </Row>
                                        <Row className='mt-3'>
                                            <h6>Select Module</h6>
                                            <div className='RoleModule'>
                                                <Row>
                                                    {privilegesList && (privilegesList).map((e, i) => (
                                                        <Col md={3} key={i} >
                                                            <CheckBoxButton
                                                                BtnLabel={e.name_label}
                                                                fulldata={e}
                                                                BtnClass={'checked-btn'}
                                                                onClick={checkedHandler} type={'check'}
                                                                isChecked={selectedPrivilegeIds.includes(e.id)} // Pass isChecked prop to CheckBoxButton
                                                            />
                                                        </Col>
                                                    ))}

                                                    {/* <NewCheckBoxButton option={moduleList} setModuleList={setModuleList} BtnClass={'checked-btn'} type={'check'} /> */}
                                                </Row>
                                            </div>
                                        </Row>
                                        <Row className='mt-3'>
                                            <Col md={4}>
                                                <SharedButton BtnLabel={'Update'} type={'button'} onClick={updateHandler} BtnVariant={'primary'} BtnClass={'w-100'} />
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                                :
                                <div className='CreateAccountForm UseDetailPages'>
                                    <Container>
                                        <Row style={{ justifyContent: 'end' }}>
                                            <Col md={2} style={{ textAlign: "center" }}>
                                                <Button variant="success" size="sm"
                                                    onClick={() => setIsedit(true)} style={{
                                                        fontWeight: '500',
                                                        marginRight: '1rem'
                                                    }}><TbEdit />
                                                </Button>
                                                <Button variant="danger" size="sm"
                                                    onClick={() => deleteHandler(maindata._id)} style={{
                                                        fontWeight: '500'
                                                    }}><RiDeleteBinLine />
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={4}>
                                                <h4>Role Name</h4>
                                                <p> {maindata && maindata.role_name}  </p>
                                            </Col>
                                        </Row>
                                        <Row className='mt-3'>
                                            <h6>Modules</h6>
                                            <div className='RoleModule '>
                                                <Row>
                                                    {maindata && (maindata.modules).map((e, i) => (
                                                        <Col md={3} key={i} >
                                                            <CheckBoxButton
                                                                BtnLabel={e.name_label}
                                                                fulldata={e}
                                                                BtnClass={'checked-btn checked mb-2 color_white'}
                                                                type={'check'}
                                                                disabled={true}
                                                            />
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </div>
                                        </Row>

                                    </Container>
                                </div>
                            }

                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    )
}
