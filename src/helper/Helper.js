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


