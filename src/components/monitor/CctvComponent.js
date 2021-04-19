import React from 'react';
import styled from 'styled-components';

const CctvCompo = styled.div`
    width: 100%;
    height: 100%;
    .info-box{
        height: 15.55%;
        background-color:tomato;
    }
    .status-box{
        height: 30.6%;
        background-color:aqua;
    }
    .cctv-box{
        height: 53%;
        background-color:beige
    }   
`;


const CctvComponent = () => {
    return (
        <CctvCompo>
            <div className="info-box"></div>
            <div className="status-box"></div>
            <div className="cctv-box"></div>
        </CctvCompo>
    );
};

export default CctvComponent;