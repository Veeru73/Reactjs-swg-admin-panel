
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import { Headings } from '../../../components/Headings'
import { PoSidebar } from '../../PO_Sidebar'
import { JobTable } from './JobTable';
import { SharedButton } from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../../components/Loader';
import { useEffect, useState } from 'react';
import { getJobs, deleteJob } from "../../../services/NetworkCall"
import Swal from 'sweetalert2';
import { SearchPanel } from '../../../components/SearchPanel';
import { IoSearch } from 'react-icons/io5';
import { ReactComponent as AddIconSvg } from '../../../../src/images/Add.svg';
import { errorAlert } from '../../../components/Alert';

export const JobList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [maindata, setMaindata] = useState([]);
    const [pagination, setPagination] = useState({ totalPages: 1, page: 1 })
    const [searchTerm, setSearchTerm] = useState('');

    const getJobsData = async (page = 1, search = '') => {
        setLoading(true);
        const res = await getJobs(page, search);
        if (res.success) {
            setMaindata(res.data);
            setPagination(prevPagination => ({
                ...prevPagination,
                totalPages: res.totalNumberOfPages
            }));
            // successAlert(res.message);
        } else {
            errorAlert(res.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        getJobsData(pagination.page, searchTerm);
    },
        [pagination.page, searchTerm]);

    const pageHanlder = (page) => {
        setPagination(prevPagination => ({
            ...prevPagination,
            page: page
        }));
        getJobsData(page);
    }

    const handleCreateJob = () => {
        navigate('/createjob');
    }

    const searchHandler = (e) => {
        const key = e.target.value;
        setSearchTerm(key);
        setPagination(prevPagination => ({
            ...prevPagination,
            page: 1
        }));
    };


    const handleDeleteClick = (id) => {
        if (!id) {
            errorAlert("Something wrong");
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteJob(id);

                if (res.success) {
                    setLoading(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Data has been deleted.",
                        icon: "success"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            getJobsData()
                            // navigate("/vendorlist");
                        }
                    });
                }
            }
        });

    }

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
                            <Headings MainHeading={"Job List"} />
                            <div className='text-right mb-3'>
                                <SharedButton onClick={handleCreateJob} BtnLabel={"Create Job"} BtnVariant={'light'} style={{ background: '#00285D' }} startIcon={<AddIconSvg />} />
                            </div>
                            <SearchPanel StartIcon={<IoSearch />} FormPlaceHolder={"Search by Job Name"} onChange={searchHandler} />
                            <JobTable
                                pagination={pagination}
                                maindata={maindata}
                                pageHanlder={pageHanlder}
                                handleDeleteClick={handleDeleteClick} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
