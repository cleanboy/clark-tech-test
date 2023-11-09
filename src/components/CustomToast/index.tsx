import React from 'react';
import {
    Toast,
    ToastTitle,
    ToastDescription,
    VStack
} from '@gluestack-ui/themed';

type ToastProps = {
    id: number;
}

const CustomToast = ({ id }: ToastProps) => {
    return (
        <Toast nativeID={"toast-" + id} action="error" variant="accent">
            <VStack space="xs">
                <ToastTitle>Error</ToastTitle>
                <ToastDescription>
                    Oops, something went wrong. Please try again later.
                </ToastDescription>
            </VStack>
        </Toast>
    )
}

export default CustomToast;