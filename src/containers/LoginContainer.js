import React, {useCallback, useEffect, useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../modules/login';
import storage from '../lib/starage';
import { Redirect } from 'react-router';
import { FullScreen, useFullScreenHandle } from "react-full-screen";



const LoginCompo = styled.div`
    width: 100%;
    height: 100%;
    min-height:817px;
    .header-compo{
        font-family: "NotoSansKR-Medium";
        width: 100%;
        height: 4.4%;
        background: #1B1C1D;
        display: flex;
        justify-content: center;
        align-items: center;
 
        div.title-box{
            height: 100%;
            text-align: center;
            width: 41%;
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 960px;
            span{
                font-size: 1.25vw;
                opacity:0.87;
                &.site-name{
                    color: #DADADA;
                    margin-right: 0.5vw;
                }
                &.tunnel-name{
                    color: #F1592A;
                }
            }
        }
    }
    .body-compo{
        font-family: "NotoSansKR-Medium";
        width: 100%;
        height: 95.6%;
        background:#F2F2F2;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-panel{
            width: 16.57%;
            height: 47%;
            min-height: 403px;
            min-width: 310px;
            position: relative;
            .system-title{
                width: 100%;
                height: 9%;
                color: #1B1C1D;
                opacity: 0.87;
                font-size: 1.25vw;
                text-align:center;
                margin-bottom: 1vh;
            }
            .login-box{
                width: 100%;
                height: 48.5%;
                background: #FFFFFF 0% 0% no-repeat padding-box;
                border: 1px solid #DEDEDF;
                border-radius: 4px;
                opacity: 1;
                margin-bottom: 11.55vh;
                form.ui.form.login-form {
                    width: 100%;
                    height: 100%;
                    padding-top: 2.85em;
                    padding-left: 1.95em;
                    .field {       
                        width: 90%;
                        input{
                            font-family: "NotoSansKR-Medium";
                            font-weight: 100;
                        }
                    }
                    button#login-btn {
                        font-family: "NotoSansKR-Medium";
                        width: 90%;
                        height: 23.4%;
                        background: #F1592A 0% 0% no-repeat padding-box;
                        border-radius: 4px;
                        margin-top: 5px;
                        color: #FFFFFF;
                        font-weight: 200;
                    }
                }
            }
            .logo-box{
                width: 100%;
                height: 14.4%;
                display:flex;
                justify-content:center;
                align-items: center;
                .logo-image{
                    width: 56.3%;
                    height: 98%;
                }
            }
            .error-message {
                position: absolute;
                top: 18em;
                width: 100%;
                text-align: center;
                color: red;
            }
        }
    }
    @media screen and (max-width: 1570px) {
        span.site-name,
        span.tunnel-name,
        div.system-title{
            font-size:20px !important;
        }
    }
`;

const LoginContainer = () => {
    const {
        data: user,
        loading,
        error,
        logined,
        validated,
        failMsg
    } = useSelector(state => state.login.login)


    const initialUserInfo = useCallback(async () => {
        const loginedInfo = storage.get("user"); // 로그인 정보를 로컬스코리지에서 가져오기
        if (!loginedInfo) return; // 로그인 정보가 없다면 멈춤
        console.log('loginedInfo--->', loginedInfo)
        console.log('user--->', user)
        console.log('failMsg-->', failMsg)

        // try {
        //     await dispatch(loginCheckAsync());
        // } catch (e) {
        //     storage.remove("user");
        // }
    }, []);

    useEffect(() => {
        initialUserInfo()

    }, [user]);


    const dispatch = useDispatch();

    const [loginForm, setForm] = useState({
        userId: "",
        password: "",
    })

    const onChange = (e) => {
        const { value, name } = e.target;
        setForm({
            ...loginForm,
            [name]: value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const reqData = {
            acc_user_id: loginForm.userId,
            acc_password: loginForm.password
        }

        dispatch(loginAsync(reqData))
    }

    if (storage.get("user")) return <Redirect to="/amons/home" />

    return (
        <LoginCompo className="login-container">
            <div className="header-compo">
                <div className="title-box">
                    <span className="site-name">고속국도 제 14호 함양-울산선(함양-합천) 건설공사(제4공구)</span>
                    <span className="tunnel-name">신원3터널</span>
                </div>
            </div>
            <div className="body-compo">
                <div className="login-panel">
                    <div className="system-title">
                        통합 안전관리 모니터링 시스템
                    </div>
                    <div className="login-box">
                        <Form onSubmit={onSubmit} className="login-form">
                            <Form.Field
                                control={Input}
                                type="text"
                                name="userId"
                                placeholder='아이디'
                                value={loginForm.userId}
                                onChange={onChange}
                                required
                            />
                            <Form.Field
                                control={Input}
                                type="password"
                                name="password"
                                placeholder='비밀번호'
                                value={loginForm.password}
                                onChange={onChange}
                                required
                            />
                            <Button type='submit' id="login-btn">로그인</Button>
                        </Form>
                    </div>
                    <div className="logo-box">
                        <img className="logo-image" src="../../../images/hanwha.png" alt="LOGO" />
                    </div>
                    {
                        failMsg &&
                        <div className="error-message">
                            <span>{failMsg.message}</span>
                        </div>
                    }
                </div>
            </div>
        </LoginCompo>
    );
};

export default LoginContainer;