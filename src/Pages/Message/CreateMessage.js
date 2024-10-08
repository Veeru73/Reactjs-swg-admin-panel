import React, { useState, useEffect } from 'react'
import { PoSidebar } from '../PO_Sidebar'
import { Headings } from '../../components/Headings'
import { Container, Form, Row, Col, Stack, InputGroup } from 'react-bootstrap'
import { Loader } from 'react-bootstrap-typeahead'
import { getEmployeesWhoHasTimeCard } from '../../services/NetworkCall'
import { MessageList } from './MessageList'
import { Link } from 'react-router-dom'
import { SharedButton } from '../../components/Button'


export const CreateMessage = () => {
    const [loading, setLoading] = useState(false);
    const [maindata, setMaindata] = useState([]);
    const [pagination, setPagination] = useState({ totalPages: 1, page: 1 });
    const [searchTerm, setSearchTerm] = useState('');

    const getEmployees = async (page = 1, search = '') => {
        setLoading(true);

        const res = await getEmployeesWhoHasTimeCard(page, search);

        if (res.success) {
            setLoading(false);
            setMaindata(res.data);
            setPagination({
                totalPages: res.totalNumberOfPages,
                page: page
            });
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEmployees(pagination.page, searchTerm);
    }, [pagination.page, searchTerm]);

    const pageHandler = (page) => {
        setPagination(prevPagination => ({
            ...prevPagination,
            page: page
        }));
    };

    const searchHandler = (e) => {
        const key = e.target.value;
        setSearchTerm(key);
        setPagination(prevPagination => ({
            ...prevPagination,
            page: 1
        }));
    };

    return (
        <>
            <Loader show={loading} />
            <div className='CreateMessage'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Stack direction='vertical' gap={3}>
                                <Headings MainHeading={"Message"} />
                                <Row >
                                    <Col md={6}>
                                        <Form.Group className="mb-0" controlId="formGroupEmail">
                                            <InputGroup>
                                                <Form.Control type={"search"} placeholder={"Search by user name"}
                                                //  onChange={onChange} 
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Link to={'/sendmessage'}>
                                            <SharedButton className="float-right" BtnLabel={'Sent Messages'} BtnVariant={'light'} />
                                        </Link>
                                    </Col>
                                </Row>
                                <MessageList />
                            </Stack>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
