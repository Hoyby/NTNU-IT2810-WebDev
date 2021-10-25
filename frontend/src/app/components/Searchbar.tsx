import React from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import InputIcon from "@material-tailwind/react/InputIcon";

interface ISearchBarProps {
    className?: string,
    placeholder?: string
}

function Searchbar({className, placeholder}: ISearchBarProps) {
    return (
        <div className={className}>
            <InputIcon
                type='text'
                color='amber'
                size='lg'
                outline={true}
                placeholder={placeholder}
                iconFamily="material-icons"
                iconName="search"
            />
        </div>
)
}

export default Searchbar
