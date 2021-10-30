import React from 'react'
import image from '../../img/logo.svg'

export function Navbar() {
    return (
        <nav
            className="flex justify-start items-start shadow-lg md:flex-shrink py-3"
            data-testid="nav"
        >
            <a className="block px-40" href="/">
                <img className="h-10" src={image} alt="movie hall" />
            </a>
        </nav>
    )
}
