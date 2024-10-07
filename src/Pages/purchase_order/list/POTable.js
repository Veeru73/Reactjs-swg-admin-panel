import React, { useState } from 'react';
import { Table, Button, Stack, Dropdown } from 'react-bootstrap';
import { TablePagination } from '../../../components/TablePagination';
import { useNavigate } from 'react-router-dom';
import { utcToLocalTime } from '../../../helper/Helper';
import { IoFilterOutline } from 'react-icons/io5';
import { Checkbox } from '../../../components/Checkbox';
import FilterDropdown from '../../../components/FilterDropdown';


export const POTable = ({ pagination, maindata = [], pageHandler }) => {
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
              <th>PO NUMBER</th>
              <th>PO TYPE</th>
              <th>VENDOR</th>
              <th>EMPLOYEE Name</th>
              <th>PO CREATED DATE</th>
              <th>COST</th>
              <th style={{ textAlign: "center" }}>ACTION</th>
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
                  <td>{utcToLocalTime(data?.createdAt)}</td>
                  <td>${data?.cost}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      style={{ color: "#fff", fontWeight: "500" }}
                      onClick={() => handleViewClick(data)}
                    >
                      Detail
                    </Button>
                  </td>
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
        {maindata && maindata.length !== 0 && (
          <TablePagination pagination={pagination} pageHandler={pageHandler} />
        )}
      </div>
    </>
  );
};
