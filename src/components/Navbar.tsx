import React from 'react'
// import image from '../img/logo.svg'

export function Navbar() {
  return (
    <nav
      className="flex justify-around items-center shadow-lg md:flex-shrink"
      data-testid="nav"
    >
      {/* <img className="h-10" src={image} /> */}
      <div className="whitespace-nowrap flex">
        <a className="mx-12 p-3 block " href="/">
          Home
        </a>
      </div>
    </nav>
  )
}
