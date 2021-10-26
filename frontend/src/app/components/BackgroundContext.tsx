import { createContext } from 'react'

export const backgrounds = {
    landing_background: 'bg-cinema',
    login_background: 'bg-camera',
}

export const BgContext = createContext(backgrounds.landing_background)
