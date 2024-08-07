import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { PoSidebar } from '../PO_Sidebar'
import { ProfileForm } from './ProfileForm'
import { SharedButton } from '../../components/Button'
import { MyPlans } from './MyPlans'
import { Loader } from '../../components/Loader'

export const MyProfile = () => {
    const [key, setKey] = useState('home');
    const [usedata, setUsedata] = useState(JSON.parse(localStorage.getItem('userData')));
    const [plan, setPlan] = useState();
    const [loder, setLoder] = useState(false);

    const getplan = async () => {
        if (usedata && usedata.subscription_id) {
            setLoder(true);
            // const resp = await getSubscriptonData_API({ "id": usedata.subscription_id });
            // if (resp && resp.success) {
            //     setLoder(false);
            //     const prefdata = resp.data;
            //     setPlan(prefdata);
            // }
            setLoder(false);
        }
    }
    useEffect(() => { getplan() }, [])

    return (
        <>
            <Loader show={loder} />
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"My Profile"} HeadButton={
                                <SharedButton BtnLabel={"Back"} BtnVariant={'primary'} onClick={() => window.history.back()} style={{
                                    background: '#FEF2F2',
                                    color: '#991B1B',
                                    borderColor: '#FEF2F2',
                                    fontWeight: '500'
                                }} />} />
                            <div className='my-md-4'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="Information">
                                        <ProfileForm usedata={usedata} />
                                    </Tab>
                                </Tabs>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
