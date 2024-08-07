import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'

import { SharedButton } from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../components/Loader'
import RoleFullDetails from './RoleFullDetails'
import { ReactComponent as AddIconSvg } from '../../../src/images/Arrow-Left.svg';

export const RoleListDetail = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    return (
        <>
            <Loader show={loading} />
            <div className='InventoryList'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Role"} />
                            <div className='my-md-4'>
                                <div className='text-right'>
                                    <SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'light'} style={{ background: '#00285D' }} startIcon={<AddIconSvg />} />
                                </div>
                                <RoleFullDetails setLoading={setLoading} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
