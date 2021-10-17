import React from 'react';


interface IButtonProps {
    text: string
    styling?: string,
    functionCall?: () => void
}

function Button(props: IButtonProps) {
    return (
        <button className={props.styling}>{ props.text }</button>
    );
}

export default Button;