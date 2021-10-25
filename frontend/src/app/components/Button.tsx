import React from 'react'
import { Link } from 'react-router-dom'

interface IButtonProps {
    text: string
    styling?: string
    to?: string
    onClick?: () => void
}

function Button(props: IButtonProps) {
    return (
        <Link to={props.to ? props.to : ''}>
            <button onClick={props.onClick} className={props.styling}>
                {props.text}
            </button>
        </Link>
    )
}

export default Button
