import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './commonpages/Login';
import { EmployeeList } from './Pages/Employee/list/EmployeeList';
import { CreateEmployee } from './Pages/Employee/add/CreateEmployee';
import Auth from './services/Auth';
import { VendorList } from './Pages/vendor/list/VendorList';
import { ForgotPassword } from './commonpages/ForgotPassword';
import { CreateDepartment } from './Pages/department/add/CreateDepartment';
import { DepartmentList } from './Pages/department/list/DepartmentList';
import { CreateVendor } from './Pages/vendor/add/CreateVendor';
import { EditVendor } from './Pages/vendor/Edit/EditVendor';
import { EditDepartment } from './Pages/department/Edit/EditDepartment';
import { EditEmployee } from './Pages/Employee/edit/EditEmployee';
import { RoleList } from "./Pages/role_module/RoleList"
import { CreateRole } from './Pages/role_module/CreateRole';
import { RoleListDetail } from "./Pages/role_module/RoleListDetail"
import { TimeCardList } from './Pages/time_card/list/TimeCardList';
import { TimeCardDetail } from './Pages/time_card/edit/TimeCardDetail';
import { JobList } from './Pages/Job/list/JobList';
import { CreateJob } from './Pages/Job/add/CreateJob';
import { EditJob } from './Pages/Job/edit/EditJob';
import { TimeOffRequestList } from './Pages/time_off_request/list/TimeOffRequestList';
import { TimeOffRequestDetail } from './Pages/time_off_request/detail/TimeOffRequestDetail';
import { Error404 } from './commonpages/Error404';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route element={<Auth requiredPrivileges={['vendormodule']} />} >
          <Route path="/vendorlist" element={<VendorList />} />
          <Route path="/createvendor" element={<CreateVendor />} />
          <Route path="/editvendor" element={<EditVendor />} />
        </Route>

        <Route element={<Auth requiredPrivileges={['departmentmodule']} />} >
          <Route path="/departmentlist" element={<DepartmentList />} />
          <Route path="/createdepartment" element={<CreateDepartment />} />
          <Route path="/editdepartment" element={<EditDepartment />} />
        </Route>

        <Route element={<Auth requiredPrivileges={['employeemodule']} />} >
          <Route path="/employeelist" element={<EmployeeList />} />
          <Route path="/createemployee" element={<CreateEmployee />} />
          <Route path="/editemployee" element={<EditEmployee />} />
        </Route>

        <Route element={<Auth requiredPrivileges={['rolemodule']} />} >
          <Route path="/roleList" element={<RoleList />} />
          <Route path="/createrole" element={<CreateRole />} />
          <Route path="/rolelistdetail" element={<RoleListDetail />} />
        </Route>

        <Route element={<Auth requiredPrivileges={['jobmodule']} />} >
          <Route path="/joblist" element={<JobList />} />
          <Route path="/createjob" element={<CreateJob />} />
          <Route path="/editjob" element={<EditJob />} />
        </Route>

        <Route element={<Auth requiredPrivileges={['timeoffrequestmodule']} />} >
          <Route path="/timeoffrequestlist" element={<TimeOffRequestList />} />
          <Route path="/timeoffrequestdetail" element={<TimeOffRequestDetail />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes >
    </>
  );
}
export default App;
