import { useState } from 'react';
import { PoSidebar } from '../PO_Sidebar'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../components/Headings'
import { CreateRoleForm } from './CreateRoleForm';
import { Loader } from '../../components/Loader';
import { SharedButton } from '../../components/Button';
import { ReactComponent as ArrowLeftSvg } from '../../../src/images/Arrow-Left.svg';

export const CreateRole = () => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <Loader show={loading} />
            <div className='RoleAdminstrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Role"} />
                            <div className='my-md-4'>
                                <div className='text-right'>
                                    <SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'light'} style={{ background: '#00285D' }} startIcon={<ArrowLeftSvg />} />
                                </div>
                                <CreateRoleForm setLoading={setLoading} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
