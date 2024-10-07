
import { useEffect, useState } from 'react';
import { PoSidebar } from '../PO_Sidebar'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { SharedButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { RoleTable } from './RoleTable';
import { ReactComponent as AddIconSvg } from '../../../src/images/Add.svg';
import { getRolesWithPrivilages } from '../../services/NetworkCall';
import { errorAlert, successAlert } from '../../components/Alert';
import { Loader } from '../../components/Loader'

export const RoleList = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [roledata, setRoledata] = useState([]);
    const [pagination, setPagination] = useState({ totalPages: 1, page: 1 });

    const getRoles = async (page) => {
        setLoading(true);
        const res = await getRolesWithPrivilages(page);
        if (res.success) {
            setRoledata(res.data);
            setPagination(prevPagination => ({
                ...prevPagination,
                totalPages: res.totalNumberOfPages
            }));
            // successAlert(res.message);
        } else {
            errorAlert(res.message);
        }
        setLoading(false);
    }

    // const getrolls = async (page = 1) => {
    //     const resp = await getRolls_API({ "page": page });
    //     if (resp) {
    //         const findata = resp.data;
    //         setPagination(resp.pagination);

    //         const mydata = [];
    //         findata.map((e) => {
    //             const modules = [];
    //             if (e.User_Profile_Module) { modules.push('User Profile'); }
    //             if (e.Training_Module) { modules.push('Training'); }
    //             if (e.Inventory_Module) { modules.push('Inventory'); }
    //             if (e.Availability_Module) { modules.push('Availability'); }
    //             if (e.Qualification_Module) { modules.push('Qualifications'); }
    //             if (e.Reporting_Module) { modules.push('Reporting'); }
    //             const modulesString = modules.join(', ');
    //             mydata.push({ name: e.role, modules: modulesString, fulldata: e });
    //         });
    //         setRolldata(mydata);
    //     }
    // }

    useEffect(() => { getRoles(pagination.page) }, []);

    const handleCreateRole = () => { navigate('/createrole'); }

    const pageHandler = (page) => {
        setPagination(prevPagination => ({
            ...prevPagination,
            page: page
        }));
        getRoles(page);
    }

    return (
        <>
            <Loader show={loading} />
            <div className='RoleAdministrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Role"} />
                            <div className='text-right'>
                                <SharedButton onClick={handleCreateRole} BtnLabel={"Create Role"} BtnVariant={'light'} style={{ background: '#00285D' }} startIcon={<AddIconSvg />} />
                            </div>
                            <RoleTable rolesdata={roledata} pagination={pagination} pageHandler={pageHandler} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
