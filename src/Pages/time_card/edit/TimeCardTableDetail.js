import React, { useState } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { TablePagination } from '../../../components/TablePagination';
import { ReactComponent as EyeIconSvg } from '../../../../src/images/Eye.svg';

export const TimeCardTableDetail = ({ pagination, timeCardData = [], pageHanlder, handleStatusChangeButtonClick }) => {

  // const getStatusBadge = (status) => {
  //   let badge;
  //   switch (status) {
  //     case "APPROVED":
  //       badge = <Badge className='bg-success p-2'>APPROVED</Badge>;
  //       break;
  //     case "REJECTED":
  //       badge = <Badge className='bg-danger p-2'>REJECTED</Badge>;
  //       break;
  //   }
  //   return badge;
  // }

  return (
    <>
      <div className='MainTable '>
        <Table responsive className='table table-hover'>
          <thead>
            <tr>
              <th>JOB NAME</th>
              <th>WORK ORDER NUMBER</th>
              <th>TASK</th>
              <th>DEFINE</th>
              <th>NOTES</th>
              <th>WORKING HOURS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {timeCardData.map((d, index) => (
              <tr key={index}>
                <td>{d?.job?.job_name}</td>
                <td>{d?.work_order_number}</td>
                <td>{d?.task?.task_name}</td>
                <td>{d?.task_define?.task_define_name}</td>
                <td>{d?.notes}</td>
                <td>{`${d?.working_hours} hr ${d?.working_minutes} mins`}</td>
                <td style={{ color: d?.status == "APPROVED" ? "green" : "red" }}>{d?.status != "AWAITING" ?
                  d?.status
                  :
                  <>
                    <Button variant="outline-success" size="sm" className="me-2" style={{ fontWeight: "500" }}
                      onClick={() => handleStatusChangeButtonClick(d.id, "APPROVED")}
                    >
                      APPROVE
                    </Button>
                    <Button variant="outline-danger" size="sm" className="me-2" style={{ fontWeight: "500" }}
                      onClick={() => handleStatusChangeButtonClick(d.id, "REJECTED")}
                    >
                      REJECT
                    </Button>
                  </>
                }</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <TablePagination pagination={pagination} pageHanlder={pageHanlder} />
      </div>
    </>
  )
}
