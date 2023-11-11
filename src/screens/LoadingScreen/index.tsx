import React from 'react';
import { Spinner, Text } from '@gluestack-ui/themed';

import Container from '../../components/Container';

const LoadingScreen = () => {
    return (
        <Container>
            <Spinner size="large" color="#0c40fa" />
            <Text>Loading...</Text>
        </Container>
    )
}

export default LoadingScreen;