import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { PoSidebar } from '../../PO_Sidebar'
import { SharedButton } from '../../../components/Button'
import { useLocation } from 'react-router-dom'
import { Loader } from '../../../components/Loader'
import { ReactComponent as AddIconSvg } from '../../../images/Arrow-Left.svg';
import { utcToLocal, utcToLocalTime } from '../../../helper/Helper'

export const PODetail = () => {
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
                            <Headings MainHeading={"Purchase Order Detail"} />
                            <div className='my-md-4'>
                                <div className='text-right'>
                                    <SharedButton BtnLabel={"Back"} onClick={() => window.history.back()} BtnVariant={'light'} startIcon={<AddIconSvg />} />
                                </div>
                                <div className='CreateAccountForm UseDetailPages mt-3'>
                                    <Container>
                                        {/* <Row className="my-3" style={{ justifyContent: "end" }}>
                                            <Col md={10}>
                                            </Col>
                                            <Col md={2}>
                                                <Button variant="success" size="sm" className='m-2' onClick={() => setIsedit(true)} style={{ fontWeight: '500' }}><TbEdit /></Button>
                                                <Button variant="danger" size="sm" onClick={() => deleteHandler(indata.id)} style={{ fontWeight: '500' }}><RiDeleteBinLine /></Button>
                                            </Col>
                                        </Row> */}
                                        <Row className='mb-3 mt-3'>
                                            <Col md={4}>
                                                <h6>PO Number</h6>
                                                <p>{preData?.po_number}</p>
                                            </Col>
                                            <Col md={4}>
                                                <h6>PO Type</h6>
                                                <p>{preData?.po_type}</p>
                                            </Col>

                                            {preData?.po_type == "OTHER_PO" ? (
                                                <Col md={4}>
                                                    <h6>Other PO Category</h6>
                                                    <p>{preData?.other_po_category}</p>
                                                </Col>
                                            ) : null}

                                            {preData?.po_type == "JOB_PO" ? (
                                                <>
                                                    <Col md={4}>
                                                        <h6>Job Name</h6>
                                                        <p>{preData?.job?.job_name}</p>
                                                    </Col>
                                                    <Col md={4}>
                                                        <h6>Job Number</h6>
                                                        <p>{preData?.job?.job_number}</p>
                                                    </Col>
                                                </>
                                            ) : null}

                                            {preData?.po_type == "WORK_ORDER_PO" ? (
                                                <>
                                                    <Col md={4}>
                                                        <h6>Customer Name</h6>
                                                        <p>{preData?.customer_name}</p>
                                                    </Col>
                                                    <Col md={4}>
                                                        <h6>Work Order Number</h6>
                                                        <p>{preData?.work_order_number}</p>
                                                    </Col>
                                                </>
                                            ) : null}

                                            <Col md={4}>
                                                <h6>Created Date</h6>
                                                <p>{utcToLocalTime(preData?.createdAt)}</p>
                                            </Col>
                                            <Col md={4}>
                                                <h6>Vendor</h6>
                                                <p>{preData?.vendor?.vendor_name || `${preData?.unlisted_vendor} (Unlisted Vendor)`}</p>
                                            </Col>
                                            <Col md={4}>
                                                <h6>Cost</h6>
                                                <p>${preData?.cost}</p>
                                            </Col>

                                            <Col md={4}>
                                                <h6>Employee Email</h6>
                                                <p>{preData?.user?.email}</p>
                                            </Col>
                                            <Col md={4}>
                                                <h6>Employee Name</h6>
                                                <p>{preData?.user?.first_name} {preData?.user?.last_name}</p>
                                            </Col>
                                            <Col md={4}>
                                                <h6>Employee Last Name</h6>
                                                <p>{preData?.user?.last_name}</p>
                                            </Col>
                                            <Col md={4}>
                                                <h6>Description</h6>
                                                <p>{preData?.description}</p>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
