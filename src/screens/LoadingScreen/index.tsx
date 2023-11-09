import React from 'react';
import { Spinner } from '@gluestack-ui/themed';

import Container from '../../components/Container';

const LoadingScreen = () => {
    return (
        <Container>
            <Spinner size="large" color="#0c40fa" />
        </Container>
    )
}

export default LoadingScreen;