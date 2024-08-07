import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { PoSidebar } from '../../PO_Sidebar'
import { SharedButton } from '../../../components/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { Loader } from '../../../components/Loader'
import { ReactComponent as AddIconSvg } from '../../../images/Arrow-Left.svg';
import { JobForm } from './JobForm'

export const EditJob = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [preData, setPreData] = useState();

    useEffect(() => {
        if (location && location.state) {
            setPreData(location.state.data);
        }

    }, [location])

    const handleBackButton = () => {
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
                            <Headings MainHeading={"Edit Job"} />
                            <div className='my-md-4'>
                                <div className='text-right'>
                                    <SharedButton onClick={handleBackButton} BtnLabel={"Back"} BtnVariant={'light'} style={{ background: '#00285D' }} startIcon={<AddIconSvg />} />
                                </div>
                                <div className='bgWhite mt-3'>
                                    <JobForm setLoading={setLoading} preData={preData} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
