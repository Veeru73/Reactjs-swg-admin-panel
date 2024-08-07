import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { PoSidebar } from '../../PO_Sidebar'
import { SharedButton } from '../../../components/Button'
import { useLocation } from 'react-router-dom'
import { Loader } from '../../../components/Loader'
import { ReactComponent as AddIconSvg } from '../../../images/Arrow-Left.svg';
import { TimeCardTableDetail } from './TimeCardTableDetail'

export const TimeCardDetail = () => {
    const location = useLocation();
    const [preData, setPreData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location && location.state) {
            setPreData(location.state.data);
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
                            <Headings MainHeading={"Vendor Profile"} />
                            <div className='my-md-4'>
                                <div className='text-right'>
                                    <SharedButton BtnLabel={"Back"} onClick={() => window.history.back()} BtnVariant={'light'} startIcon={<AddIconSvg />} />
                                </div>
                                {/* <EditVendorForm pre={pre} setLoading={setLoading} grdata={grdata} quadata={quadata} /> */}
                                <TimeCardTableDetail pre={preData} setLoading={setLoading} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
