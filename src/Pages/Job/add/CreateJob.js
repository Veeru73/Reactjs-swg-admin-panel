import React, { useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { PoSidebar } from '../../PO_Sidebar'
import { EmployeeForm } from './JobForm'
import { SharedButton } from '../../../components/Button'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../../components/Loader'
import { ReactComponent as AddIconSvg } from '../../../images/Arrow-Left.svg';

export const CreateJob = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleCreateAccount = () => {
        navigate('/joblist');
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
                            <Headings MainHeading={"Create Job"} />
                            <div className='my-md-4'>
                                <div className='text-right'>
                                    <SharedButton onClick={handleCreateAccount} BtnLabel={"Back"} BtnVariant={'light'} style={{ background: '#00285D' }} startIcon={<AddIconSvg />} />
                                </div>
                                <div className='bgWhite mt-3'>
                                    <EmployeeForm setLoading={setLoading} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
