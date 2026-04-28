import React from 'react'

const Footer = () => {
    return (
        <footer className='app-footer'>
            <p className='app-footer__copy'>
                &copy; {new Date().getFullYear()} Interview AI. All rights reserved.
            </p>
            <ul className='app-footer__links'>
                <li><a href='#' className='app-footer__link'>Privacy Policy</a></li>
                <li><a href='#' className='app-footer__link'>Terms of Service</a></li>
                <li><a href='#' className='app-footer__link'>Help Center</a></li>
            </ul>
        </footer>
    )
}

export default Footer
