import React, { useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSignOutAlt } from '@fortawesome/pro-solid-svg-icons';
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
                display: flex;
                align-items: center;
                div#division-bar {
                    height: 13px;
                    border-left: 2px solid #fff;
                    margin-left: 5px;
                    margin-right: 5px;
                    margin-top: 10px;
                }
            }
            .icon-box {
                color: #fff;
                margin-right: 10px;
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

const Header = ({ onLogout, curruntPage, onGoBack }) => {

    const onChangeHeader = useCallback((path) => {
        if (path === 'ble') {
            return <div className="title-box">
                <div className="site-name">막장 잔류이력</div>
            </div>
        }
        else if (path === 'alarm') {
            return <div className="title-box">
                <div className="site-name">비상알람 이력</div>
            </div>
        }
        else if (path === 'drill') {
            return <div className="title-box">
                <div className="site-name">공정 <div id="division-bar"></div> 굴진 입력</div>
            </div>
        }
        else if (path === 'result') {
            return <div className="title-box">
                <div className="icon-box" onClick={onGoBack}><FontAwesomeIcon icon={faArrowLeft} /></div>
                <div className="site-name">조회결과</div>
            </div>
        }
        else {
            return <div className="title-box">
                <div className="site-name">함양-울산선 제4공구</div>
                    &nbsp;
                <div className="tunnel-name">신원3터널</div>
            </div>
        }
    }, [curruntPage]);


    return (
        <HeaderCompo>
            <div className="system-title-container">
                {/* <div className="title-box">
                    <div className="site-name">함양-울산선 제4공구</div>
                        &nbsp;
                        <div className="tunnel-name">신원3터널</div>
                </div> */}
                {onChangeHeader(curruntPage)}
            </div>
            {
                curruntPage === 'result' ||
                <div className="logout-btn">
                    <div className="logout-icon" onClick={onLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </div>
                </div>
            }
        </HeaderCompo>
    );
};

export default Header;