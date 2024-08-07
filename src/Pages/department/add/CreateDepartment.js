import { useState } from 'react';
import { PoSidebar } from '../../PO_Sidebar'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { DepartmentForm } from './DepartmentForm';
import { Loader } from '../../../components/Loader';
import { SharedButton } from '../../../components/Button';
import { ReactComponent as ArrowLeftSvg } from '../../../../src/images/Arrow-Left.svg';

export const CreateDepartment = () => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <Loader show={loading} />
            <div className='CreateDepartment'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Create Department"} />
                            <div className='my-md-4'>
                                <div className='text-right'>
                                    <SharedButton onClick={() => window.history.back()} BtnLabel={"Back"} BtnVariant={'light'} style={{ background: '#00285D' }} startIcon={<ArrowLeftSvg />} />
                                </div>
                                <DepartmentForm setLoading={setLoading} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
