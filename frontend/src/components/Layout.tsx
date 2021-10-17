import React, {createContext, ReactNode, useState} from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function Layout({ children }: { children: ReactNode }) {
    const [bg, setBg] = useState('bg-cinema');
    const BgContext = createContext(setBg)

    return (
    <div className={bg + ' bg-cover'}>
        <BgContext.Provider value={setBg}>
          <Navbar />
          <div className="flex flex-col min-h-screen max-w-screen-xl my-0 mx-auto ">
            <div className="flex-grow">{children}</div>
          </div>
          <Footer />
        </BgContext.Provider>
    </div>
  )
}