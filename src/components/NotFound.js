import React from 'react';
import styled from '@emotion/styled/macro';

const NotFoundContainer = styled.div`
    position: relative;
    top: 300px;
    font-weight: bold;
    font-size: 32px;
    text-align: center;
`;

const NotFound = () => (<NotFoundContainer>Cant find this page</NotFoundContainer>);

export default NotFound;
