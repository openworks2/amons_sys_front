import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/pro-solid-svg-icons';
import styled from 'styled-components';

const HeaderCompo = styled.div`
    width: 100%;
    height: 100%;
    background-color: #2E2E2E;
    display: flex;
    .system-title-container{
        width: 84.4%;
        height: 100%;
        display: flex;
        padding-left: 1.7em;
        .title-box{
            height: 100%;
            font-size: 1.45rem;
            font-family: NotoSansKR-Medium;
            display: flex;
            justify-content: center;
            align-items: center;
            .site-name{
                height: 53%;
                color: #FFFFFF;
            }
            .tunnel-name{
                height: 53%;
                color: #F1592A;
            }
        }
    }
    .logout-btn{
        width: 15.6%;
        height: 100%;
        /* max-width: 60px; */
        /* background-color: aqua; */
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        color: #fff;
    }
`;

const Header = ({ onLogout }) => {
    return (
        <HeaderCompo>
            <div className="system-title-container">
                <div className="title-box">
                    <div className="site-name">함양-울산선 제4공구</div>
                        &nbsp;
                        <div className="tunnel-name">신원3터널</div>
                </div>
            </div>
            <div className="logout-btn">
                <div className="logout-icon" onClick={onLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </div>
            </div>
        </HeaderCompo>
    );
};

export default Header;