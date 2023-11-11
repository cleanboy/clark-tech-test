import React from 'react';
import { 
    Input, 
    InputField, 
    InputSlot, 
    InputIcon, 
    SearchIcon 
} from '@gluestack-ui/themed';

type SearchInputProps = {
    onChange: (text: string) => void;
};

const searchInput = ({onChange}: SearchInputProps) => {
    return (
        <Input 
            variant="rounded"
            size="md"
            mb="$4"
        >
            <InputSlot>
                <InputIcon as={SearchIcon} color="#aaa" size="md" marginLeft={16} />
            </InputSlot>
            <InputField 
                onChangeText={onChange}
                placeholder="Search..." 
            />
        </Input>
    )
}

export default searchInput;