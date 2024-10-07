import { Container, Row, Col } from 'react-bootstrap';
import { Headings } from '../../../components/Headings';
import { PoSidebar } from '../../PO_Sidebar';
import { TimeCardTable } from './TimeCardTable';
import { SharedButton } from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../../components/Loader';
import { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { ReactComponent as AddIconSvg } from '../../../../src/images/Add.svg';
import { getEmployeesWhoHasTimeCard } from "../../../services/NetworkCall";
import { SearchPanel } from '../../../components/SearchPanel';

export const TimeCardList = () => {
    const navigate = useNavigate();
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
            <div className='RoleAdministrator'>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <PoSidebar />
                        </Col>
                        <Col md={9}>
                            <Headings MainHeading={"Time Card"} />
                            <SearchPanel
                                StartIcon={<IoSearch />}
                                FormPlaceHolder={"Search by Name"}
                                onChange={searchHandler}
                            />
                            <TimeCardTable
                                pagination={pagination}
                                maindata={maindata}
                                pageHandler={pageHandler}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};
