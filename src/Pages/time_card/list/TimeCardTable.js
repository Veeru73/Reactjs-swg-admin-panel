import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { TablePagination } from '../../../components/TablePagination';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EyeIconSvg } from '../../../../src/images/Eye.svg';
import { SearchPanel } from '../../../components/SearchPanel';
import { IoSearch } from 'react-icons/io5';
import moment from 'moment';


export const TimeCardTable = ({ pagination, maindata = [], pageHanlder }) => {

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
                <td>{account.owner_name}</td>
                <td>{account.vendor_name}</td>
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
        <TablePagination pagination={pagination} pageHanlder={pageHanlder} />
      </div>
    </>
  )
}
