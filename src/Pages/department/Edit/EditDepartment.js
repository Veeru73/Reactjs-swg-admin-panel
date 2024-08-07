import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { PoSidebar } from '../../PO_Sidebar'
import { SharedButton } from '../../../components/Button'
import { EditDepartmentForm, EditVendorForm } from './EditDepartmentForm'
import { useLocation } from 'react-router-dom'
import { Loader } from '../../../components/Loader'
import { ReactComponent as AddIconSvg } from '../../../images/Arrow-Left.svg';

export const EditDepartment = () => {
    const location = useLocation();
    const [preData, setPreData] = useState();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (location && location.state) {
            setPreData(location.state.data);
            // const id = location.state.data.id;
            // if (id) { getgr(id); getqua(id); }
        }
    }, [location])



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
                            <Headings MainHeading={"Department detail"} />
                            <div className='my-md-4'>
                                <div className='text-right'>
                                    <SharedButton BtnLabel={"Back"} onClick={() => window.history.back()} BtnVariant={'light'} startIcon={<AddIconSvg />} />
                                </div>
                                <EditDepartmentForm pre={preData} setLoading={setLoading} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
