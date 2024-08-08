import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { TablePagination } from '../../../components/TablePagination';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EyeIconSvg } from '../../../../src/images/Eye.svg';
import { TbEdit } from 'react-icons/tb';
import { RiDeleteBinLine } from 'react-icons/ri';


export const JobTable = ({ pagination, maindata = [], pageHanlder, handleDeleteClick }) => {
  const navigate = useNavigate();

  const handleEditClick = (exdata) => {
    navigate('/editjob', { state: { data: exdata } });
  };



  return (
    <>
      <div className='MainTable '>
        <Table responsive className='table table-hover'>
          <thead>
            <tr>
              <th>JOB NAME</th>
              <th>JOB NUMBER</th>
              <th>DUE</th>
              <th>ODPI</th>
              <th>PW</th>
              {/* <th>JOB TYPE</th> */}
              <th style={{ textAlign: "center" }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {maindata.map((job, index) => (
              <tr key={index}>
                <td>{job?.job_name}</td>
                <td>{job?.job_number}</td>
                <td>{job?.due}</td>
                <td>{job?.odpi}</td>
                <td>{job?.pw}</td>
                {/* <td>{account?.department?.job_type}</td> */}
                <td>
                  <Button variant="success" size="sm" className='m-2' onClick={() => handleEditClick(job)} style={{ fontWeight: '500' }}><TbEdit /></Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick(job.id)} style={{ fontWeight: '500' }}><RiDeleteBinLine /></Button>
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
        <TablePagination pagination={pagination} pageHanlder={pageHanlder} />
      </div>
    </>
  )
}
