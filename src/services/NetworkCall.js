import moment from "moment";
import { axiosInstance } from "./AxiosInstance";

const getHeader = () => {
    const authToken = localStorage.getItem("authToken");
    const devicetimezone = moment.tz.guess(); // Get device's current time zone
    const headers = {
        devicetimezone: devicetimezone,
        Authorization: "Bearer " + authToken, //the token is a variable which holds the token
    };

    return headers;
};

const postRequest = async (path, data) => {
    let res = {
        success: false,
        message: "Something went wrong, please try again later",
    };
    try {
        const response = await axiosInstance.post(path, data, { headers: getHeader() });
        res = response.data;
    } catch (err) {
        res.message = err.response?.data.message || err.message;
        return res;
    }
    return res;
};

const deleteRequest = async (path, data) => {
    let res = {
        success: false,
        message: "Something went wrong, please try again later",
    };

    try {
        const response = await axiosInstance.delete(path, data, { headers: getHeader() });
        res = response.data;
    } catch (err) {
        res.message = err.response?.data.message || err.message;
        return res;
    }
    return res;
};

const putRequest = async (path, data) => {
    let res = {
        success: false,
        message: "Something went wrong, please try again later",
    };

    try {
        const response = await axiosInstance.put(path, data, { headers: getHeader() });
        res = response.data;
    } catch (err) {
        res.message = err.response?.data.message || err.message;
        return res;
    }
    return res;
};

const getRequest = async (path) => {
    let res = {
        success: false,
        message: "Something went wrong, please try again later",
    };

    try {
        const response = await axiosInstance.get(path, { headers: getHeader() });
        res = response.data;
    } catch (err) {
        res.message = err.response?.data.message || err.message;
        return res;
    }
    return res;
};

//common login api for admin and super visor
export const login = async (data) => {
    const path = "/admin/auth/login";
    return await postRequest(path, data);
};

export const addVendor = async (data) => {
    const path = "/admin/vendor/addVendor";
    return await postRequest(path, data);
}

export const getVendors = async (page, search) => {
    const path = `/admin/vendor/getVendors?page=${page}&search=${search}`;
    return await getRequest(path);
}

export const updateVendor = async (data) => {
    const path = `/admin/vendor/updateVendorDetail/${data.id}`;
    return await putRequest(path, data);
}

export const deleteVendor = async (id) => {
    const path = `/admin/vendor/deleteVendor/${id}`;
    return await deleteRequest(path);
}

export const getEmployessWithoutPagination = async () => {
    const path = '/admin/user/getEmployeesWithOutPagination';
    return await getRequest(path);
}

export const createDepartment = async (data) => {
    const path = "/admin/department/createDepartment";
    return await postRequest(path, data);
}

export const updateDepartment = async (data) => {
    const path = `/admin/department/updateDepartment/${data.id}`;
    return await putRequest(path, data);
}

export const getDepartmentWithSupervisor = async (page) => {
    const path = `/admin/department/getDepartmentsWithSuperVisors?page=${page}`;
    return await getRequest(path);
}

export const deleteDepartment = async (id) => {
    const path = `/admin/department/deleteDepartment/${id}`;
    return await deleteRequest(path);
}

export const addEmployee = async (data) => {
    const path = `/admin/user/addEmployee`;
    return await postRequest(path, data);
}

export const getEmployees = async (page, search) => {
    const path = `/admin/user/getEmployees?page=${page}&search=${search}`;
    return await getRequest(path);
}

export const updateEmployee = async (data) => {
    const path = `/admin/user/updateEmployee/${data.id}`;
    return await putRequest(path, data);
}

export const deleteEmployee = async (id) => {
    const path = `/admin/user/deleteEmployee/${id}`;
    return await deleteRequest(path);
}

export const getDepartments = async () => {
    const path = `/admin/department/getDepartments`;
    return await getRequest(path);
}

export const getRolesWithPrivilages = async (page) => {
    const path = `/admin/role/getRolesWithPrivileges?page=${page}`;
    return await getRequest(path);
}

export const getPrivileges = async () => {
    const path = `/admin/role/getPrivileges`;
    return await getRequest(path);
}

export const getRoles = async () => {
    const path = "/admin/role/getRoles";
    return await getRequest(path);
}

export const createRole = async (data) => {
    const path = "/admin/role/createRole";
    return await postRequest(path, data);
}

export const updateRole = async (id, data) => {
    const path = `/admin/role/updateRole/${id}`;
    return await putRequest(path, data);
}

export const deleteRole = async (id) => {
    const path = `/admin/role/deleteRole/${id}`;
    return await deleteRequest(path);
}

export const getJobTypes = async () => {
    const path = `/admin/jobType/getJobTypes`;
    return await getRequest(path);
}

export const getJobs = async (page, search) => {
    const path = `/admin/job/getJobs?page=${page}&search=${search}`;
    return await getRequest(path);
}

export const createJob = async (data) => {
    const path = `/admin/job/createJob`;
    return await postRequest(path, data);
}

export const updateJob = async (data) => {
    const path = `/admin/job/updateJob/${data.id}`;
    return await putRequest(path, data);
}

export const deleteJob = async (id) => {
    const path = `/admin/job/deleteJob/${id}`;
    return await deleteRequest(path);
}

export const getTimeOffRequests = async (page, searchTerm) => {
    const path = `/timeoffrequest/getTimeOffRequests?page=${page}&search=${searchTerm}`;
    return await getRequest(path);
}

export const updateTimeOffRequestStatus = async (id, data) => {
    const path = `/timeoffrequest/updateTimeOffRequestStatus/${id}`;
    return await putRequest(path, data);
}

export const getEmployeesWhoHasTimeCard = async (page, search) => {
    const path = `/admin/timecard/getEmployeesWhoHasTimeCards?page=${page}&search=${search}`;
    return await getRequest(path);
}

export const getTimeCardByDate = async (page, userId, timeCardDate) => {
    const path = `/admin/timecard/getTimeCardByDate?page=${page}&userId=${userId}&timeCardDate=${timeCardDate}`;
    return await getRequest(path);
}

export const updateTimeCardStatus = async (data) => {
    const path = `/admin/timecard/updateTimeCardStatus/${data.id}`;
    return await putRequest(path, data);
}

export const getPOs = async (page, poType) => {
    const path = `/admin/PO/getPOs?page=${page}&poType=${poType}`;
    return await getRequest(path);
}





