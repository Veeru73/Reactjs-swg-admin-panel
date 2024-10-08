import React, { useContext, useState } from 'react'
import { Image, Stack } from 'react-bootstrap'
import { LinkSidebar } from '../../components/LinkSidebar';
import { Avatar } from '../../components/Avatar';
import { SharedButton } from '../../components/Button';
import { CgLogOut } from "react-icons/cg";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../states/AuthContext";
import { hasPrivilege } from '../../helper/Helper';

export const PoSidebar = () => {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const { setLoggedIn, profileData, setProfileData } = useContext(AuthContext);


    const logoutClientHandler = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("profileData");
        localStorage.removeItem("loggedIn");
        setLoggedIn(false);
        setProfileData({});
        navigate('/');
    };

    return (
        <>
            <div className='CO_Sidebar p-md-4' style={{}}>
                <Stack direction='vertical' gap={3}>
                    <img src='./assets/images/MainLogo.svg' className='img-fluid' alt='' />
                    <h6 style={{
                        color: '#64748B'
                    }}>Menu</h6>
                    <ul style={{
                        listStyle: 'none',
                        padding: 0
                    }}>
                        <Stack direction='vertical' gap={3}>

                            {/* Check for Vendor Privilege */}
                            {hasPrivilege(profileData?.privileges, 'vendormodule', profileData?.user_type) && (
                                <li className={pathname === "/vendorlist" || pathname === "/editvendor" || pathname === "/createvendor" ? 'active' : ""} style={{ padding: '10px' }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/Vendor.svg' />} LinkLabel={'Vendor'} LinkPath={'/vendorlist'} />
                                </li>
                            )}

                            {/* Check for Department Privilege */}
                            {hasPrivilege(profileData?.privileges, 'departmentmodule', profileData?.user_type) && (
                                <li className={pathname === "/departmentlist" || pathname === "/editdepartment" || pathname === "/createdepartment" ? 'active' : ""} style={{ padding: '10px' }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/Department.svg' />} LinkLabel={'Department'} LinkPath={'/departmentlist'} />
                                </li>
                            )}

                            {/* Check for Employee Privilege */}
                            {hasPrivilege(profileData?.privileges, 'employeemodule', profileData?.user_type) && (
                                <li className={pathname === "/employeelist" || pathname === "/editemployee" || pathname === "/createemployee" ? 'active' : ""} style={{ padding: '10px', position: 'relative' }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/Employee.svg' />} LinkLabel={'Employee'} LinkPath={'/employeelist'} />
                                </li>
                            )}

                            {/* Check for Job Privilege */}
                            {hasPrivilege(profileData?.privileges, 'jobmodule', profileData?.user_type) && (
                                <li className={pathname === "/joblist" || pathname === "/editjob" || pathname === "/createjob" ? 'active' : ""} style={{ padding: '10px', position: 'relative' }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/Job.svg' />} LinkLabel={'Job'} LinkPath={'/joblist'} />
                                </li>
                            )}

                            {/* Check for Role Privilege */}
                            {hasPrivilege(profileData?.privileges, 'rolemodule', profileData?.user_type) && (
                                <li className={pathname === "/createrole" || pathname === "/roleList" || pathname === "/rolelistdetail" ? 'active' : ""} style={{ padding: '10px' }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/Role.svg' />} LinkLabel={'Role'} LinkPath={'/roleList'} />
                                </li>
                            )}
                            
                            {/* Check for Message */}
                            {hasPrivilege(profileData?.privileges, 'rolemodule', profileData?.user_type) && (
                                <li className={pathname === "/createmessage" || pathname === "/sendmessgaetable" ? 'active' : ""} style={{ padding: '10px' }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/MessageIcon.svg' />} LinkLabel={'Message'} LinkPath={'/createmessage'} />
                                </li>
                            )}

                            {/* Check for Time Off Request Privilege */}
                            {hasPrivilege(profileData?.privileges, 'timeoffrequestmodule', profileData?.user_type) && (
                                <li className={pathname === "/timeoffrequestlist" || pathname === "/timerequestedit" ? 'active' : ""} style={{ padding: '10px' }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/TimeRequest.svg' />} LinkLabel={'Time off Request'} LinkPath={'/timeoffrequestlist'} />
                                </li>
                            )}

                            {/* Check for Time Card Privilege */}
                            {hasPrivilege(profileData?.privileges, 'timecardmodule', profileData?.user_type) && (
                                <li className={pathname === "/timecarddetail" || pathname === "/timecardlist" ? 'active' : ""} style={{ padding: '10px' }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/Clock.svg' />} LinkLabel={'Time Card'} LinkPath={'/timecardlist'} />
                                </li>
                            )}

                            {/* check for Purchase order privilege */}
                            {hasPrivilege(profileData?.privileges, "purchaseordermodule", profileData?.user_type) && (
                                <li className={pathname === "/po-detail" || pathname === "/po-list" ? 'active' : ""} style={{ padding: '10px' }}>
                                    <LinkSidebar LinkIcon={<Image src='./assets/images/po.svg' />} LinkLabel={'Purchase Order'} LinkPath={'/po-list'} />
                                </li>
                            )}
                        </Stack>
                    </ul>
                    <hr />
                    <h6 style={{
                        color: '#64748B'
                    }}>Profile</h6>
                    <ul style={{
                        listStyle: 'none',
                        padding: 0
                    }}>
                        <Stack direction='vertical' gap={3}>
                            {/* <li className={pathname === "/myprofile" ? 'active' : ""} style={{ padding: '0px 10px' }} onClick={() => navigate('/myprofile')} > */}
                            <li style={{ padding: '0px 10px' }} >
                                <Avatar LinkLabel={`${profileData && profileData.first_name} ${profileData && profileData.last_name}`} Description={profileData && profileData.email} />
                            </li>
                            <li>
                                <SharedButton BtnLabel={"Logout"} onClick={logoutClientHandler} BtnVariant={"primary"} startIcon={<CgLogOut />} BtnClass={"w-100"} />
                            </li>

                        </Stack>
                    </ul>
                </Stack>
            </div>
        </>
    )
}
