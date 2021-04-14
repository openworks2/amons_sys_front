<<<<<<< HEAD
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import storage from '../lib/starage';
=======
import React from "react";
import { Redirect } from "react-router";
import styled from "styled-components";
>>>>>>> admin_dev

const MainComo = styled.div`
  width: 100%;
  height: 100%;
`;

const MainContainer = () => {
<<<<<<< HEAD
 
    return (
        <MainComo className="main-component">
            <Redirect to="/amons/signin" />
        </MainComo>
    );
=======
  return (
    <MainComo className="main-component">
      <Redirect to="/amons/home" />
    </MainComo>
  );
>>>>>>> admin_dev
};

export default MainContainer;
