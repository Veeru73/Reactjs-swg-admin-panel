import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { TablePagination } from '../../../components/TablePagination';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EyeIconSvg } from '../../../../src/images/Eye.svg';
import { SearchPanel } from '../../../components/SearchPanel';
import { IoSearch } from 'react-icons/io5';
import moment from 'moment';


export const VendorTable = ({ pagination, maindata = [], pageHandler }) => {

  const navigate = useNavigate();

  const handleViewClick = (mydata) => { navigate('/editvendor', { state: { data: mydata } }); };

  return (
    <>
      <div className='MainTable '>
        <Table responsive className='table table-hover'>
          <thead>
            <tr>
              <th>VENDOR ID</th>
              <th>VENDOR NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>ADDRESS</th>
              <th style={{ textAlign: "center" }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {maindata.map((account, index) => (
              <tr key={index}>
                <td>{account.id}</td>
                <td>{account.vendor_name}</td>
                <td>{account.email}</td>
                <td>{account.phone_number}</td>
                <td>{account.address}</td>
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
