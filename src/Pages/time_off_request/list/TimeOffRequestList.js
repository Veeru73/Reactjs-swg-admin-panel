
import { useEffect, useState } from 'react';
import { PoSidebar } from '../../PO_Sidebar'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { SharedButton } from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import { TimeOffRequestTable } from './TimeOffRequestTable';
import { ReactComponent as AddIconSvg } from '../../../../src/images/Add.svg';
import { getDepartments, getDepartmentWithSupervisor, getTimeOffRequests } from '../../../services/NetworkCall';
import { errorAlert, successAlert } from '../../../components/Alert';
import { Loader } from '../../../components/Loader'

export const TimeOffRequestList = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [timeOffRequestData, setTimeOffRequestData] = useState([]);
    const [pagination, setPagination] = useState({ totalPages: 1, page: 1 });

    const getTimeOffRequestData = async (page) => {
        setLoading(true);
        const res = await getTimeOffRequests(page);
        if (res.success) {
            setTimeOffRequestData(res.data);
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

    useEffect(() => { getTimeOffRequestData(pagination.page) }, []);

    const handleCreateRole = () => { navigate('/createdepartment'); }

    const pageHanlder = (page) => {
        setPagination(prevPagination => ({
            ...prevPagination,
            page: page
        }));
        getTimeOffRequestData(page);
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
                            <Headings MainHeading={"Time Of Request"} />
                            <TimeOffRequestTable
                                timeOffRequestData={timeOffRequestData}
                                pagination={pagination}
                                pageHanlder={pageHanlder} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
