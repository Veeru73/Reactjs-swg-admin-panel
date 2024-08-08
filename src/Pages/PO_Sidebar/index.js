import React, { useContext, useState } from 'react'
import { Image, Stack } from 'react-bootstrap'
import { LinkSidebar } from '../../components/LinkSidebar';
import { Avatar } from '../../components/Avatar';
import { SharedButton } from '../../components/Button';
import { CgLogOut } from "react-icons/cg";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../states/AuthContext";

export const PoSidebar = () => {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [mydata, setMydata] = useState(JSON.parse(localStorage.getItem('userData')));
    // const profileData = localStorage.getItem("profileData");
    // const parsedData = JSON.parse(profileData);
    const { setLoggedIn, profileData, setProfileData } = useContext(AuthContext);

    const logoutClientHandler = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("profileData");
        localStorage.removeItem("loggedIn");
        setLoggedIn(false);
        setProfileData({});
        // localStorage.setItem("mydata", "");
        // localStorage.removeItem("mydata");
        // localStorage.removeItem('id');
        // localStorage.removeItem('Authorization');
        // localStorage.removeItem('type');
        // localStorage.removeItem('userData');
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
                            <li className={pathname === "/vendorlist" || pathname === "/editvendor" || pathname === "/createvendor" ? 'active' : ""} style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/Vendor.svg' />} LinkLabel={'Vendor'} LinkPath={'/vendorlist'} />
                            </li>
                            <li className={pathname === "/departmentlist" || pathname == "/editdepartment" || pathname === "/createdepartment" ? 'active' : ""} style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/Department.svg' />} LinkLabel={'Department'} LinkPath={'/departmentlist'} />
                            </li>
                            <li className={pathname === "/employeelist" || pathname === "/editemployee" || pathname === "/createemployee" ? 'active' : ""} style={{
                                padding: '10px',
                                position: 'relative'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/Employee.svg' />} LinkLabel={'Employee'} LinkPath={'/employeelist'} />
                            </li>
                            <li className={pathname === "/joblist" || pathname === "/editjob" || pathname === "/createjob" ? 'active' : ""} style={{
                                padding: '10px',
                                position: 'relative'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/Job.svg' />} LinkLabel={'Job'} LinkPath={'/joblist'} />
                            </li>

                            <li className={pathname === "/createrole" || pathname === "/roleList" || pathname === "/rolelistdetail" ? 'active' : ""} style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/Role.svg' />} LinkLabel={'Role'} LinkPath={'/roleList'} />
                            </li>

                            <li className={pathname === "/timeoffrequestlist" || pathname === "/timerequestedit" ? 'active' : ""} style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/TimeRequest.svg' />} LinkLabel={'Time off Request'} LinkPath={'/timeoffrequestlist'} />
                            </li>
                            {/* <li className={pathname === "/timecarddetail" || pathname === "/timecard" || pathname === "/subcriptionlistdetail" ? 'active' : ""} style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/Clock.svg' />} LinkLabel={'Time Card'} LinkPath={'/timecard'} />
                            </li>
                            {/* <li className={pathname === "/inventorymodulelist" || pathname === "/apparatusInfoDetails" || pathname === "/createGeareType" || pathname === "/gearinfo" || pathname === "/CreateGear" || pathname === "/CreateApparatus" || pathname === "/GearListDetail" ? 'active' : ""} style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/notification.svg' />} LinkLabel={'Notifications'} LinkPath={'#'} />
                            </li>
                            <li className={pathname === "/unavailability" ? 'active' : ""} style={{
                                padding: '10px'
                            }}>
                                <LinkSidebar LinkIcon={<Image src='./assets/images/Setting.svg' />} LinkLabel={'Settings '} LinkPath={'#'} />
                            </li> */}
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
