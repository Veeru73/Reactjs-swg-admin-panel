import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { TablePagination } from '../../../components/TablePagination';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EyeIconSvg } from '../../../../src/images/Eye.svg';
import { TbEdit } from 'react-icons/tb';
import { RiDeleteBinLine } from 'react-icons/ri';
import { utcToLocalTime } from '../../../helper/Helper';


export const EmployeeTable = ({ pagination, maindata = [], pageHandler, handleDeleteClick }) => {
  const navigate = useNavigate();

  const handleEditClick = (exdata) => {
    navigate('/editemployee', { state: { data: exdata } });
  };



  return (
    <>
      <div className='MainTable '>
        <Table responsive className='table table-hover'>
          <thead>
            <tr>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>MOBILE NO</th>
              <th>VEHICLE NO</th>
              <th>DEPARTMENT NAME</th>
              <th>HIRE DATE</th>
              <th>LAST LOGIN</th>
              <th style={{ textAlign: "center" }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {maindata.map((account, index) => (
              <tr key={index}>
                <td>{account?.first_name}</td>
                <td>{account?.last_name}</td>
                <td>{account?.email}</td>
                <td>{account?.phone_number}</td>
                <td>{account?.vehicle_number}</td>
                <td>{account?.department?.department_name}</td>
                <td>{account?.employee_hire_date}</td>
                <td>{account?.last_login_at ? utcToLocalTime(account.last_login_at) : "Not Yet Logged In"}</td>
                <td>
                  <Button variant="success" size="sm" className='m-2' onClick={() => handleEditClick(account)} style={{ fontWeight: '500' }}><TbEdit /></Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick(account.id)} style={{ fontWeight: '500' }}><RiDeleteBinLine /></Button>
                </td>
                {/* <td>
                  <Button variant="light" size="sm" className="me-2"
                    onClick={() => handleEditClick(account.full_data)}
                  >
                    <EyeIconSvg />
                    View
                  </Button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
        <TablePagination pagination={pagination} pageHandler={pageHandler} />
      </div>
    </>
  )
}
