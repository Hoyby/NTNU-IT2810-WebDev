import React, { useRef, useState } from 'react'

// material-tailwind is not officially supported by TS - hence the ignores
/* eslint-disable */
// @ts-ignore
import NavbarContainer from '@material-tailwind/react/NavbarContainer'
// @ts-ignore
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper'
// @ts-ignore
import NavbarToggler from '@material-tailwind/react/NavbarToggler'
// @ts-ignore
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse'
// @ts-ignore
import Nav from '@material-tailwind/react/Nav'
// @ts-ignore
import NavItem from '@material-tailwind/react/NavItem'
// @ts-ignore
import Icon from '@material-tailwind/react/Icon'
// @ts-ignore
import Button from '@material-tailwind/react/Button'
// @ts-ignore
import Popover from '@material-tailwind/react/Popover'
// @ts-ignore
import PopoverContainer from '@material-tailwind/react/PopoverContainer'
// @ts-ignore
import PopoverHeader from '@material-tailwind/react/PopoverHeader'
// @ts-ignore
import PopoverBody from '@material-tailwind/react/PopoverBody'
/* eslint-enable */

export default function NavBar() {
    const [openMenu, setOpenMenu] = useState(false)
    const profileRef = useRef()
    const settingsRef = useRef()

    const notImplemented = (
        <PopoverContainer>
            <PopoverHeader>Whops! That's embarrassing</PopoverHeader>
            <PopoverBody>
                This functionality has not yet been implemented.
            </PopoverBody>
        </PopoverContainer>
    )

    return (
        <>
            <nav
                className="flex justify-start items-start shadow-lg md:flex-shrink py-1"
                data-testid="nav"
            >
                <NavbarContainer>
                    <NavbarWrapper>
                        <div className="text-sm font-bold leading-relaxed inline-block mr-4 whitespace-no-wrap text-white">
                            <h1 className="text-red-600 text-2xl">JAMDb</h1>
                            <p className="opacity-25 m-0 p-0 text-white">
                                Just Another Movie Database
                            </p>
                        </div>
                        <NavbarToggler
                            color="white"
                            onClick={() => setOpenMenu(!openMenu)}
                            ripple="light"
                            id="navToggle"
                        />
                    </NavbarWrapper>
                    <NavbarCollapse open={openMenu}>
                        <Nav>
                            <Button
                                ref={profileRef}
                                color=""
                                className="px-5 py-4 flex gap-1 text-xs uppercase font-medium leading text-white rounded-lg justify-start"
                                ripple="light"
                            />
                        </Nav>
                        <NavbarCollapse open={openMenu}>
                            <Nav>
                                <NavItem active="light" ripple="light">
                                    <Icon name="language" size="xl" />
                                    Discover
                                </NavItem>
                                <Button
                                    ref={profileRef}
                                    color=""
                                    className="px-5 py-4 flex gap-1 text-xs uppercase font-medium leading text-white rounded-lg justify-start"
                                    ripple="light"
                                >
                                    <Icon name="account_circle" size="xl" />
                                    Profile
                                </Button>
                                <Button
                                    ref={settingsRef}
                                    color=""
                                    className="px-5 py-4 flex gap-1 text-xs uppercase font-medium leading text-white rounded-lg justify-start"
                                    ripple="light"
                                >
                                    <Icon name="settings" size="xl" />
                                    Settings
                                </Button>
                                <Popover placement="bottom" ref={profileRef}>
                                    {notImplemented}
                                </Popover>
                                <Popover placement="bottom" ref={settingsRef}>
                                    {notImplemented}
                                </Popover>
                            </Nav>
                        </NavbarCollapse>
                    </NavbarCollapse>
                </NavbarContainer>
            </nav>
        </>
    )
}
