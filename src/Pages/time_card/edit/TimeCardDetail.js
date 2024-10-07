import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs, Stack } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { PoSidebar } from '../../PO_Sidebar'
import { SharedButton } from '../../../components/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { Loader } from '../../../components/Loader'
import { ReactComponent as AddIconSvg } from '../../../images/Arrow-Left.svg';
import { TimeCardTableDetail } from './TimeCardTableDetail'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { getTimeCardByDate, updateTimeCardStatus } from "../../../services/NetworkCall"
import moment from 'moment'
import { errorAlert } from '../../../components/Alert'
import Swal from 'sweetalert2'

export const TimeCardDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [employeeData, setEmployeeData] = useState();
    const [timeCardData, setTimeCardData] = useState();
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [pagination, setPagination] = useState({ totalPages: 1, page: 1 });

    useEffect(() => {
        if (location && location.state) {
            setEmployeeData(location.state.data);
            const formattedSelectedDate = moment(selectedDate).format('YYYY-MM-DD');
            getTimeCards(pagination.page, location?.state?.data?.id, formattedSelectedDate);
        }
    }, [location, pagination.page, selectedDate]);


    const handleDateChange = (e) => {
        setSelectedDate(e);
    }

    const getTimeCards = async (page = 1, userId, timeCardDate) => {
        setLoading(true);

        const res = await getTimeCardByDate(page, userId, timeCardDate);

        if (res.success) {
            setTimeCardData(res.data);
            setPagination({
                totalPages: res.totalNumberOfPages,
                page: page
            });
            setLoading(false);
        } else {
            errorAlert(res.message)
            setLoading(false);
        }
    };


    const pageHandler = (page) => {
        setPagination(prevPagination => ({
            ...prevPagination,
            page: page
        }));
    };

    const handleStatusChangeButtonClick = (id, status) => {
        if (!id) {
            errorAlert("Something wrong");
            return;
        }

        const data = { id: id, status: status }

        const fStatus = status == "APPROVED" ? "approve" : "reject";
        const sStatus = status == "APPROVED" ? "approved" : "rejected";

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${fStatus} it!`
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true)
                const res = await updateTimeCardStatus(data);

                if (res.success) {
                    setLoading(false);
                    Swal.fire({
                        title: `${status}!`,
                        text: `Request has been ${sStatus}.`,
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const formattedSelectedDate = moment(selectedDate).format('YYYY-MM-DD');
                            getTimeCards(pagination.page, location?.state?.data?.id, formattedSelectedDate);
                        }
                    });
                } else {
                    errorAlert(res.message);
                }
                setLoading(false)
            }
        });
    };


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
                            <Headings MainHeading={"Time Cards"} />
                            <div className='my-md-4'>
                                <div className='text-right'>
                                    <SharedButton BtnLabel={"Back"} onClick={() => window.history.back()} BtnVariant={'light'} startIcon={<AddIconSvg />} />
                                </div>
                                {/* <EditVendorForm pre={pre} setLoading={setLoading} grdata={grdata} quadata={quadata} /> */}
                                <Row className='my-4'>
                                    <Col md={6}>
                                        <Calendar onChange={handleDateChange} value={selectedDate} className={'w-100'} />
                                    </Col>
                                    <Col md={6}>
                                        <Stack direction='vertical' gap={4} style={{
                                            background: '#fff',
                                            padding: '20px',
                                            borderRadius: '5px',
                                            minHeight: '100%'
                                        }}>
                                            <Stack direction='horizontal' gap={5}>
                                                <h6>Employee Name</h6>
                                                <p>{employeeData?.first_name} {employeeData?.last_name}</p>
                                            </Stack>
                                            <Stack direction='horizontal' gap={5}>
                                                <h6>Department Name</h6>
                                                <p>{employeeData?.department_name}</p>
                                            </Stack>
                                            <Stack direction='horizontal' gap={5}>
                                                <h6>Email</h6>
                                                <p>{employeeData?.email}</p>
                                            </Stack>
                                            <Stack direction='horizontal' gap={5}>
                                                <h6>Phone No</h6>
                                                <p>{employeeData?.phone_number}</p>
                                            </Stack>
                                        </Stack>
                                    </Col>
                                </Row>
                                <TimeCardTableDetail
                                    pagination={pagination}
                                    pageHandler={pageHandler}
                                    timeCardData={timeCardData}
                                    handleStatusChangeButtonClick={handleStatusChangeButtonClick}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
