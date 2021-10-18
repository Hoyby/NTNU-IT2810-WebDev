import React, { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { BrowserRouter as Router } from "react-router-dom";
import {backgrounds, BgContext} from "./BackgroundContext";
import "@material-tailwind/react/tailwind.css";

export function Layout({ children }: { children: ReactNode }) {
    // const [bg, setBg] = useState('bg-cinema');
    // const BgContext = createContext(setBg)

    return (
        <div>
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
            />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
                integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
                crossOrigin="anonymous"
            />
            <Router>
                <BgContext.Provider value={backgrounds.landing_background}>
                    <div className={backgrounds.landing_background + ' ' + 'bg-cover'}>
                          <Navbar />
                          <div className="flex flex-col min-h-screen max-w-screen-xl my-0 mx-auto ">
                            <div className="flex-grow">{children}</div>
                          </div>
                          <Footer />
                    </div>
                </BgContext.Provider>
            </Router>
        </div>
  )
}
