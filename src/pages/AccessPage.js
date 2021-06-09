import React from 'react';
import AccessContainer from '../containers/mobile/AccessContainer';

const AccessPage = ({ match, history }) => {
    return (
        <AccessContainer match={match} history={history}/>
    );
};

export default AccessPage;