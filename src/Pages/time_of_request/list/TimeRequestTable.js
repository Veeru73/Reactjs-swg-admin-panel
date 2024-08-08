import React from 'react';
import { Badge, Button, Table } from 'react-bootstrap';
import { TablePagination } from '../../../components/TablePagination';
import { useNavigate } from 'react-router-dom';

export const TimeRequestTable = ({ departmentdata, pagination, pageHanlder }) => {
    const navigate = useNavigate();

    const handleDetailScreenClick = (departmentFullData) => {
        navigate("/timerequestedit", { state: { data: departmentFullData } });

    }

    // get level name to show in table
    const getSuperVisorName = (supervisors) => {
        const fullNames = (supervisors.map((e) => { return `${e.first_name} ${e.last_name}` })).join(" , ")
        return fullNames;
    }

    return (
        <>
            <div className='MainTable'>
                <Table responsive className="table table-hover">
                    <thead>
                        <tr>
                            <th>Submission Date</th>
                            <th>Employee Name</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departmentdata && departmentdata.map((e, i) => (
                            <tr key={i}>
                                <td>20/06/2024</td>
                                <td style={{
                                    maxWidth: '350px'
                                }}>{getSuperVisorName(e.department_supervisors)}</td>
                                <td>Personal Leave</td>
                                <td><Badge className='bg-success p-2 rounded-5'>Approved</Badge>
                                    <Badge className='bg-danger p-2 rounded-5'>Decline</Badge>
                                    <Badge className='bg-secondary p-2 rounded-5'>Awaited</Badge></td>
                                <td>
                                    <Button bg="info" size="sm" className="me-2" style={{ color: "#fff", fontWeight: "500" }}
                                        onClick={() => handleDetailScreenClick(e)}>
                                        {/* <EyeIconSvg />  */}
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <TablePagination pagination={pagination} pageHanlder={pageHanlder} />
            </div>
        </>
    )
}
