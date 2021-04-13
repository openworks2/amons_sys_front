import React from 'react';
import styled from 'styled-components';

const LoginCompo = styled.div`
    width: 100%;
    height: 100%;
    .header-compo{
        width: 100%;
        height: 4.4%;
        background: #1B1C1D;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "NotoSansKR-Medium";
        div.title-box{
            height: 100%;
            text-align: center;
            width: 41%;
            display: flex;
            justify-content: center;
            align-items: center;
            span{
                font-size: 1.25vw;
                opacity:0.87;
                &.site-name{
                    color: #DADADA;
                }
                &.tunnel-name{
                    color: #F1592A;
                }
            }
        }
    }
    .body-compo{
        width: 100%;
        height: 95.6%;
        background:#F2F2F2;
    }
    
`;

const LoginContainer = () => {
    return (
        <LoginCompo className="login-container">
            <div className="header-compo">
                <div className="title-box">
                    <span className="site-name">고속국도 제 14호 함양-울산선(함양-합천) 건설공사(제4공구)</span>
                    <span className="tunnel-name">신원3터널</span>
                </div>
            </div>
            <div className="body-compo">바디</div>
        </LoginCompo>
    );
};

export default LoginContainer;