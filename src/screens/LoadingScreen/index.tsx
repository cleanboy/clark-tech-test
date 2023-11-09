import React from 'react';
import { ActivityIndicator } from 'react-native';

import Container from '../../components/Container';

const LoadingScreen = () => {
    return (
        <Container>
            <ActivityIndicator size="large" color="#0c40fa" />
        </Container>
    )
}

export default LoadingScreen;