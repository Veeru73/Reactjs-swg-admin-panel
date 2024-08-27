import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { TablePagination } from '../../../components/TablePagination';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EyeIconSvg } from '../../../../src/images/Eye.svg';
import { SearchPanel } from '../../../components/SearchPanel';
import { IoSearch } from 'react-icons/io5';
import moment from 'moment';


export const TimeCardTableDetail = ({ pagination, maindata = [], pageHanlder }) => {

  const navigate = useNavigate();

  const handleViewClick = (mydata) => { navigate('/editvendor', { state: { data: mydata } }); };

  return (
    <>
      <div className='MainTable '>
        <Table responsive className='table table-hover'>
          <thead>
            <tr>
              <th>JOB NAME</th>
              <th>TASK</th>
              <th>DEFINE</th>
              <th>NOTES</th>
              <th>WORKING HOURS</th>
              <th style={{ textAlign: "center" }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {maindata.map((account, index) => (
              <tr key={index}>
                <td>{account.owner_name}</td>
                <td>{account.vendor_name}</td>
                <td>{account.email}</td>
                <td>{account.phone_number}</td>
                <td>{account.phone_number}</td>
                <td>
                  <Button variant="success" size="sm" className="me-2" style={{ color: "#fff", fontWeight: "500" }}
                    onClick={() => handleViewClick(account)}
                  >
                    {/* <EyeIconSvg /> */}
                    Approve
                  </Button>
                  <Button variant="danger" size="sm" className="me-2" style={{ color: "#fff", fontWeight: "500" }}
                    onClick={() => handleViewClick(account)}
                  >
                    {/* <EyeIconSvg /> */}
                    Reject
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
