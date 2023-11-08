import React from 'react';
import { Box } from '@gluestack-ui/themed';

type ContainerProps = {
    children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
    return (
        <Box
            width={"100%"}
            height={"100%"}
            p={16}
            backgroundColor="white"
        >
            {children}
        </Box>
    );
};

export default Container;