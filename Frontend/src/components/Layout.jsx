import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'
import Footer from './Footer'
import './layout.scss'

const Layout = () => {
    return (
        <div className='app-layout'>
            <Navbar />
            <main className='app-layout__main'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout
