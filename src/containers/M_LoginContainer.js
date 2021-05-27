import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Button, Form, Input } from "semantic-ui-react";
import styled from 'styled-components';
import storage from '../lib/starage';
import { loginAsync, loginCheckAsync } from '../modules/login';

const LoginCompo = styled.div`
    width: 100%;
    height: 100%;
    .header {
        width: 100%;
        height: 9.4%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1B1C1D;
        min-height: 60px;
        .system-title{
            width: 80.7%;
            height: 75%;
            display: flex;
            justify-content: center;
            align-items: center;
            .title-box{
                width: 100%;
                height: 100%;
                div.title-text {
                    height: 50%;
                    font-size: 4.75vw;
                    letter-spacing: -0.17px;
                    font-family: NotoSansKR-Medium;
                    display: flex;
                    justify-content: center;
                    .site-name{
                        color: #D8D8D8;
                        opacity: 0.87;
                    }
                    .tunnel-name{
                        color: #F1592A;
                        opacity: 0.87;
                    }
    
                }
            }
        }
    }
    .body {
        width: 100%;
        height: 90.6%;
        width: 100%;
        background: #f2f2f2;
        font-family: "NotoSansKR-Medium";
        display: flex;
        justify-content: center;
        align-items: center;
        .login-panel {
            width: 72.2%;
            height: 47%;
            position: relative;
            min-height: 280px;

            .system-name {
                width: 100%;
                height: 12%;
                color: #1b1c1d;
                opacity: 0.87;
                font-size: 24px;
                text-align: center;
                margin-bottom: 1.2vh;
            }
            .login-box {
                width: 100%;
                height: 48.5%;
                /* background: #ffffff 0% 0% no-repeat padding-box;
                border: 1px solid #dededf;
                border-radius: 4px; */
                opacity: 1;
                margin-bottom: 15.2vh;
                button#login-btn {
                    font-family: "NotoSansKR-Medium";
                    width: 100%;
                    height: 23.4%;
                    background: #f1592a 0% 0% no-repeat padding-box;
                    border-radius: 4px;
                    margin-top: 5px;
                    color: #ffffff;
                    font-weight: 200;
                }
            }
            .logo-box {
                width: 100%;
                height: 11.2%;
                display: flex;
                justify-content: center;
                align-items: center;
                .logo-image {
                    width: 131px;
                    height: 43px;
                }
            }
            .error-message {
                position: absolute;
                top: 14em;
                width: 100%;
                text-align: center;
                color: red;
            }
        }
    }
    @media screen and (min-width: 500px) {
        .site-name,
        .tunnel-name{
            font-size: 25px;
        }
        .header{
            height: 70px;
        }
    }

`;

const M_LoginContainer = () => {

    const {
        data: user,
        failMsg,
    } = useSelector((state) => state.login.login);

    const dispatch = useDispatch();

    const [loginForm, setForm] = useState({
        userId: "",
        password: ""
    });

    useEffect(() => {
        initialUserInfo();
    }, [user]);

    const initialUserInfo = useCallback(async () => {
        const loginedInfo = storage.get("user"); // 로그인 정보를 로컬스코리지에서 가져오기
        if (!loginedInfo) return; // 로그인 정보가 없다면 멈춤
        console.log("loginedInfo--->", loginedInfo);
        console.log("user--->", user);
        console.log("failMsg-->", failMsg);

        // try {
        //     await dispatch(loginCheckAsync());
        // } catch (e) {
        //     storage.remove("user");
        // }
    }, []);

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
            acc_password: loginForm.password,
            screen: `${window.screen.width}x${window.screen.height}`
        }
        dispatch(loginAsync(reqData));
    }
    
    if (storage.get("user")) return <Redirect to="/amons/m.home" />;

    return (
        <LoginCompo className="mobile-loginCompo">
            <div className="header">
                <div className="system-title">
                    <div className="title-box">
                        <div className="title-text">
                            <div className="site-name">고속국도 제 14호 함양-울산선(함양-합천)</div>
                        </div>
                        <div className="title-text">
                            <div className="site-name">건설공사(제4공구)</div>
                        &nbsp;
                            <div className="tunnel-name">신원3터널</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="body">
                <div className="login-panel">
                    <div className="system-name">통합 안전관리 시스템</div>
                    <div className="login-box">
                        <Form
                            onSubmit={onSubmit} 
                            className="login-form"
                        >
                            <Form.Field
                                control={Input}
                                type="text"
                                name="userId"
                                placeholder="아이디"
                                value={loginForm.userId}
                                onChange={onChange}
                                required
                            />
                            <Form.Field
                                control={Input}
                                type="password"
                                name="password"
                                placeholder="비밀번호"
                                value={loginForm.password}
                                onChange={onChange}
                                required
                            />
                            <Button type="submit" id="login-btn">로그인</Button>
                        </Form>
                    </div>
                    <div className="logo-box">
                        <img
                            className="logo-image"
                            src="../../../images/hanwha.png"
                            alt="LOGO"
                        />
                    </div>
                    {failMsg && (
                        <div className="error-message">
                            <span>{failMsg.message}</span>
                        </div>
                    )}
                </div>
            </div>
        </LoginCompo>
    );
};

export default M_LoginContainer;