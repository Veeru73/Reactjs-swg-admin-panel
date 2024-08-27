import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs, Stack } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { PoSidebar } from '../../PO_Sidebar'
import { SharedButton } from '../../../components/Button'
import { useLocation } from 'react-router-dom'
import { Loader } from '../../../components/Loader'
import { ReactComponent as AddIconSvg } from '../../../images/Arrow-Left.svg';
import { TimeCardTableDetail } from './TimeCardTableDetail'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

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
                                <Row className='my-4'>
                                    <Col md={6}>
                                        <Calendar className={'w-100'} />
                                    </Col>
                                    <Col md={6}>
                                        <Stack direction='vertical' gap={4} style={{
                                            background:'#fff',
                                            padding:'20px',
                                            borderRadius:'5px',
                                            minHeight:'100%'
                                        }}>
                                            <Stack direction='horizontal' gap={5}>
                                                <h6>Employee Name</h6>
                                                <p>Hitesh Gard</p>
                                            </Stack>
                                            <Stack direction='horizontal' gap={5}>
                                                <h6>Department Name</h6>
                                                <p>Hitesh Gard</p>
                                            </Stack>
                                            <Stack direction='horizontal' gap={5}>
                                                <h6>Email</h6>
                                                <p>Hitesh Gard</p>
                                            </Stack>
                                            <Stack direction='horizontal' gap={5}>
                                                <h6>Phone No</h6>
                                                <p>Hitesh Gard</p>
                                            </Stack>
                                        </Stack>
                                    </Col>
                                </Row>
                                <TimeCardTableDetail pre={preData} setLoading={setLoading} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
