
import { useEffect, useState } from 'react';
import { PoSidebar } from '../../PO_Sidebar'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { SharedButton } from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import { DepartmentTable } from './DepartmentTable';
import { ReactComponent as AddIconSvg } from '../../../../src/images/Add.svg';
import { getDepartmentWithSupervisor } from '../../../services/NetworkCall';
import { errorAlert, successAlert } from '../../../components/Alert';
import { Loader } from '../../../components/Loader'

export const DepartmentList = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [departmentData, setDepartmentData] = useState([]);
    const [pagination, setPagination] = useState({ totalPages: 1, page: 1 });

    const getDepartments = async (page) => {
        setLoading(true);
        const res = await getDepartmentWithSupervisor(page);
        if (res.success) {
            setDepartmentData(res.data);
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

    useEffect(() => { getDepartments(pagination.page) }, []);

    const handleCreateRole = () => { navigate('/createdepartment'); }

    const pageHanlder = (page) => {
        setPagination(prevPagination => ({
            ...prevPagination,
            page: page
        }));
        getDepartments(page);
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
                            <Headings MainHeading={"Department List"} />
                            <div className='text-right'>
                                <SharedButton onClick={handleCreateRole} BtnLabel={"Create Department"} BtnVariant={'light'} style={{ background: '#00285D' }} startIcon={<AddIconSvg />} />
                            </div>
                            <DepartmentTable
                                departmentdata={departmentData}
                                pagination={pagination}
                                pageHanlder={pageHanlder} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
