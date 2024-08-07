import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { TablePagination } from '../../../components/TablePagination';
import { Navigate, useNavigate } from 'react-router-dom';
import { ReactComponent as EyeIconSvg } from '../../../../src/images/Eye.svg';

export const DepartmentTable = ({ departmentdata, pagination, pageHanlder }) => {
    const navigate = useNavigate();

    const handleDetailScreenClick = (departmentFullData) => {
        navigate("/editdepartment", { state: { data: departmentFullData } });

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
                            <th>Department Name</th>
                            <th>Supervisors</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departmentdata && departmentdata.map((e, i) => (
                            <tr key={i}>
                                <td>{e.department_name}</td>
                                <td style={{
                                    maxWidth: '350px'
                                }}>{getSuperVisorName(e.department_supervisors)}</td>
                                <td>
                                    <Button variant="info" size="sm" className="me-2" style={{ color: "#fff", fontWeight: "500" }}
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
