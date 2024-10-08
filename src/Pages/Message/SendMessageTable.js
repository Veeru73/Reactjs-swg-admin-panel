import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export const SendMessageTable = ({ pagination, maindata = [], pageHandler }) => {
  const navigate = useNavigate();
  const handleViewClick = (mydata) => {
    navigate('/po-detail', { state: { data: mydata } });
  };

  return (
    <>

      {/* <Stack direction='horizontal' gap={2} style={{
        justifyContent: 'end'
      }}>
        <Dropdown>
          <Dropdown.Toggle className='rounded-5' variant="light" id="dropdown-basic">
            <IoFilterOutline className='mx-2' /> Filter
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Other PO</Dropdown.Item>
            <Dropdown.Item>Job PO</Dropdown.Item>
            <Dropdown.Item>Work Order PO</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Stack> */}
      {/* <FilterDropdown selectedValue={selectedValue} setSelectedValue={setSelectedValue} /> */}
      <div className='MainTable'>
        <Table responsive className='table table-hover'>
          <thead>
            <tr>
              <th>USER NAME</th>
              <th>DATE</th>
              <th>EMAIL</th>
              <th>MESSAGE</th>
            </tr>
          </thead>
          <tbody>
            {maindata && maindata.length !== 0 ? (
              maindata.map((data, index) => (
                <tr key={index}>
                  <td>{data?.po_number}</td>
                  <td>{data?.po_type}</td>
                  <td>{data?.vendor?.vendor_name || `${data?.unlisted_vendor} (Unlisted Vendor)`}</td>
                  <td>{data?.user?.first_name} {data?.user?.last_name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  <h5 className="alignItemCent">Data Not Found</h5>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        {/* {maindata && maindata.length !== 0 && (
          <TablePagination pagination={pagination} pageHandler={pageHandler} />
        )} */}
      </div>
    </>
  );
};
