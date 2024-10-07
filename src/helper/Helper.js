import moment from 'moment-timezone';


// Email validation regex pattern
export let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export const TimezoneList = () => {
  const tzNames = moment.tz.names();
  return tzNames ? tzNames : [];
};

export const statusArray = [
  { name: "Active", value: "Active" },
  { name: "InActive", value: "Inactive" }
]

export const timeFormateArray = [
  { name: '12-Hours', "value": 'hh:mm:ss A' },
  { name: '24-Hours', "value": 'HH:mm:ss' }
]

export const utcToLocal = (utcTime) => {
  return moment.utc(utcTime).local().format('YYYY-MM-DD');
}


export const utcToLocalTime = (utcTime) => {
  return moment.utc(utcTime).local().format('YYYY-MM-DD hh:mm:ss A');
}

export const redirectBasedOnPrivilege = ({ privileges, navigate, userType }) => {
  const privilegeRouteMap = {
    'timeoffrequestmodule': '/timeoffrequestlist',
    'vendormodule': '/vendorlist',
    'departmentmodule': '/departmentlist',
    'employeemodule': '/employeelist',
    'jobmodule': '/joblist',
    'rolemodule': '/roleList',
    'timecardmodule': '/timecardlist',
    'purchaseordermodule': '/po-list'
  };

  if (userType == "SUPER_ADMIN") {
    navigate("/vendorlist", { replace: true });
  } else {
    const firstPrivilege = privileges.find(privilege => privilegeRouteMap[privilege]);

    if (firstPrivilege) {
      navigate(privilegeRouteMap[firstPrivilege], { replace: true });
    }
  }
}


export const hasPrivilege = (privileges, privilegeToCheck, userType) => {
  // Check if the user is a SUPER_ADMIN
  if (userType === "SUPER_ADMIN") {
    return true;
  }

  // Check if the privilege exists in the user's privileges
  return privileges?.includes(privilegeToCheck);
};







