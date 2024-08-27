import React, { useContext, useState } from 'react'
import { Row, Col, Stack, Form } from 'react-bootstrap'
import { InputField } from '../components/InputField'
import { Checkbox } from '../components/Checkbox'
import { SharedButton } from '../components/Button'
import { Loader } from '../components/Loader'
import { emailPattern, redirectBasedOnPrivilege } from '../helper/Helper'
import { login } from '../services/NetworkCall';
import { errorAlert, successAlert } from '../components/Alert'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../states/AuthContext";
import { FaEye, FaEyeSlash, } from 'react-icons/fa'; // Import icons for show/hide

export const Login = () => {
    const { setLoggedIn, setProfileData } = useContext(AuthContext);
    const [indata, setIndata] = useState({ "email": localStorage.getItem("myemail"), "password": localStorage.getItem("mypassword"), "reminder": localStorage.getItem("myreminder") });
    const [error, setError] = useState({ "email": "", "password": "" });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to handle password visibility

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setIndata((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const checkHenlder = (e) => {
        const { name, checked } = e.target;
        setIndata((pre) => ({ ...pre, [name]: checked }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (indata.reminder) {
            localStorage.setItem("myreminder", true);
            localStorage.setItem("myemail", indata.email);
            localStorage.setItem("mypassword", indata.password);
        } else {
            localStorage.removeItem("myreminder");
            localStorage.removeItem("myemail");
            localStorage.removeItem("mypassword");
        }

        let isvalid = 1;

        if (!indata.email) {
            setError((prev) => ({ ...prev, email: "Email is required *" }));
            isvalid = 2;
        } else if (!emailPattern.test(indata.email)) {
            setError((prev) => ({ ...prev, email: "Invalid email format *" }));
            isvalid = 3;
        }

        if (!indata.password) {
            setError((pre) => ({ ...pre, 'password': "Password is Required *" }));
            isvalid = 4;
        }

        if (isvalid === 1) {
            setLoading(true);
            const fdata = {
                "email": indata.email,
                "password": indata.password
            }

            const res = await login(fdata);

            if (res.success) {
                setLoggedIn(true);
                setProfileData(res.data);
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("authToken", `${res.data.token}`);
                localStorage.setItem("profileData", JSON.stringify(res.data));
                successAlert(res.message)

                // Redirect based on privileges
                redirectBasedOnPrivilege({ privileges: res.data.privileges, navigate: navigate, userType: res.data.user_type });
            } else {
                errorAlert(res.message);
            }
            setLoading(false);
        }

    }


    return (
        <>
            <Loader show={loading} />
            <div className='Login_Page maindiv'>
                <Row className="chiled-row">
                    <Col md="4">
                        <div className='Login_Content p-md-5 p-sm-2 rounded bg-white' >
                            <Stack direction='row' gap={3}>
                                <img src='./assets/images/MainLogo.svg' className='img-fluid w-50' alt='' />
                                <div className=''>
                                    <h4>Login</h4>
                                    <h6 style={{
                                        color: '#64748B'
                                    }}>Welcome back. Enter your credentials to access your account</h6>
                                </div>
                            </Stack>
                            <Form onSubmit={submitHandler}>
                                <Stack className='mt-4' direction='row' gap={3}>
                                    <InputField
                                        FormLabel={"Email Address"}
                                        FormType={"email"}
                                        FormPlaceHolder={"Enter Your Email"}
                                        name='email'
                                        value={indata.email}
                                        onChange={inputHandler}
                                        error={error.email}
                                    />
                                    {/* <InputField
                                        FormLabel={"Password"}
                                        FormType={"password"}
                                        FormPlaceHolder={"Enter Your Password"}
                                        name='password'
                                        value={indata.password}
                                        onChange={inputHandler}
                                        error={error.password}
                                    /> */}
                                    <div style={{ position: 'relative', width: '100%' }}>
                                        <InputField
                                            FormLabel={"Password"}
                                            FormType={showPassword ? "text" : "password"}
                                            FormPlaceHolder={"Enter Your Password"}
                                            name='password'
                                            value={indata.password}
                                            onChange={inputHandler}
                                            error={error.password}
                                        />
                                        <span onClick={togglePasswordVisibility} style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '38px',
                                            cursor: 'pointer',
                                            zIndex: '1'
                                        }}>
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                    <Checkbox name="reminder" value={indata.reminder} onChange={checkHenlder} Checklabel={'"Keep me signed in"'} ID={'custom-check'} />
                                    <SharedButton type={'submit'} BtnLabel={"Continue"} BtnSize={"lg"} BtnClass={"W-100"} BtnVariant={"primary"} style={{
                                        background: '#00285D'
                                    }} />
                                    {/* <Link to={'/forgotpassword'} style={{
                                        textAlign: 'center',
                                        color: '#06B09C',
                                        textDecoration: 'none',
                                        fontWeight: 'bold'
                                    }}>Forgot Password ?</Link> */}
                                </Stack>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}
