import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import storage from '../lib/starage';

const MainComo = styled.div`
    width: 100%;
    height: 100%;
`;

const MainContainer = () => {
 
    return (
        <MainComo className="main-component">
            <Redirect to="/amons/signin" />
        </MainComo>
    );
};

export default MainContainer;