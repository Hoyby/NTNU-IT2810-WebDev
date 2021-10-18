import React, { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { BrowserRouter as Router } from "react-router-dom";
import {backgrounds, BgContext} from "./BackgroundContext";

export function Layout({ children }: { children: ReactNode }) {
    // const [bg, setBg] = useState('bg-cinema');
    // const BgContext = createContext(setBg)

    return (
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
  )
}
