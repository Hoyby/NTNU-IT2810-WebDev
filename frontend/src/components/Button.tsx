import React from 'react';


interface IButtonProps {
    text: string
    styling?: string,
    onClick?: () => void
}

function Button(props: IButtonProps) {
    return (
        <button onClick={props.onClick} className={props.styling}>{ props.text }</button>
    );
}

export default Button;