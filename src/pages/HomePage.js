import React from 'react';
import { Suspense } from 'react';
// import HomeContainer from '../containers/HomeContainer';
import {
    isBrowser
} from "react-device-detect";

const HomeContainer = React.lazy(() => import("../containers/HomeContainer"));

const HomePage = () => {
    return (
        <>
            {
                isBrowser &&
                <Suspense fallback={<div></div>}>
                    <HomeContainer />
                </Suspense>
            }
        </>
    );
};

export default HomePage;