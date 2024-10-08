import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { TablePagination } from '../../../components/TablePagination';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EyeIconSvg } from '../../../../src/images/Eye.svg';


export const TimeCardTable = ({ pagination, maindata = [], pageHandler }) => {

  const navigate = useNavigate();

  const handleViewClick = (mydata) => { navigate('/timecarddetail', { state: { data: mydata } }); };

  return (
    <>
      <div className='MainTable '>
        <Table responsive className='table table-hover'>
          <thead>
            <tr>
              <th>EMPLOYEE NAME</th>
              <th>DEPARTMENT NAME</th>
              <th>EMAIL</th>
              <th>MOBILE NO</th>
              <th style={{ textAlign: "center" }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {maindata.map((account, index) => (
              <tr key={index}>
                <td>{account.first_name} {account.last_name}</td>
                <td>{account?.department_name}</td>
                <td>{account.email}</td>
                <td>{account.phone_number}</td>
                <td>
                  <Button variant="info" size="sm" className="me-2" style={{ color: "#fff", fontWeight: "500" }}
                    onClick={() => handleViewClick(account)}
                  >
                    {/* <EyeIconSvg /> */}
                    View
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
