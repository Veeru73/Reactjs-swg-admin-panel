import React from 'react';
import { Badge, Button, Table } from 'react-bootstrap';
import { TablePagination } from '../../../components/TablePagination';
import { useNavigate } from 'react-router-dom';
import {
    utcToLocal

} from '../../../helper/Helper';
export const TimeOffRequestTable = ({ timeOffRequestData, pagination, pageHanlder }) => {
    const navigate = useNavigate();

    const handleDetailScreenClick = (offrequestfulldata) => {
        navigate("/timeoffrequestdetail", { state: { data: offrequestfulldata } });

    }

    // // get level name to show in table
    const getStatusBadge = (status) => {
        let badge;
        switch (status) {
            case "AWAITING":
                badge = <Badge className='bg-secondary p-2 rounded-5'>AWAITING</Badge>;
                break;
            case "APPROVED":
                badge = <Badge className='bg-success p-2 rounded-5'>APPROVED</Badge>;
                break;
            case "REJECTED":
                badge = <Badge className='bg-danger p-2 rounded-5'>REJECTED</Badge>;
                break;
        }
        return badge;
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
                        {timeOffRequestData && timeOffRequestData.map((e, i) => (
                            <tr key={i}>
                                <td>{utcToLocal(e.createdAt)}</td>
                                <td>{e.user?.first_name} {e.user?.last_name}</td>
                                <td>{e.time_off_reason?.reason}</td>
                                <td>{getStatusBadge(e.status)}</td>
                                <td>
                                    <Button bg="info" size="sm" className="me-2" style={{ color: "#fff", fontWeight: "500" }}
                                        onClick={() => handleDetailScreenClick(e)}>
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
