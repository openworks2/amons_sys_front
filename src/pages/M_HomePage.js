import React from 'react';
import HomeContainer from '../containers/M_HomeContainer';

const M_HomePage = ({ match, history }) => {
    return (
        <>
            <HomeContainer match={match} history={history} />
        </>
    );
};

export default M_HomePage;