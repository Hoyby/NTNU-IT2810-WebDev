import React, { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { BrowserRouter as Router } from 'react-router-dom'

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
                <div className="min-h-screen relative">
                    <Navbar />
                    <div className="flex flex-col max-w-screen-xl my-0 mx-auto ">
                        <div className="flex-grow">{children}</div>
                    </div>
                    <Footer />
                </div>
            </Router>
        </div>
    )
}
