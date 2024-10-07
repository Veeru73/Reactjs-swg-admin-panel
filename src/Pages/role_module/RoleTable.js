import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { TablePagination } from '../../components/TablePagination';
import { Navigate, useNavigate } from 'react-router-dom';
import { ReactComponent as EyeIconSvg } from '../../../src/images/Eye.svg';

export const RoleTable = ({ rolesdata, pagination, pageHandler }) => {
    const navigate = useNavigate();

    const handleDetailScreenClick = (data) => {
        navigate("/rolelistdetail", { state: { data } });

    }

    // get level name to show in table
    const getPrivilegeLebelName = (privileges) => {
        const lebelName = (privileges.map((e) => e.name_label)).join(" , ")
        return lebelName;
    }

    return (
        <>
            <div className='MainTable'>
                <Table responsive className="table table-hover">
                    <thead>
                        <tr>
                            <th>ROLE NAME</th>
                            <th>MODULES</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rolesdata.map((e, i) => (
                            <tr key={i}>
                                <td>{e.role_name}</td>
                                <td style={{
                                    maxWidth: '350px'
                                }}>{getPrivilegeLebelName(e.privileges)}</td>
                                <td>
                                    <Button variant="light" size="sm" className="me-2"
                                        onClick={() => handleDetailScreenClick(e)}>
                                        <EyeIconSvg /> View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <TablePagination pagination={pagination} pageHandler={pageHandler} />
            </div>
        </>
    )
}
