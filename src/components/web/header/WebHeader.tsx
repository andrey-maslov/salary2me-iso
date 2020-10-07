import React from 'react'
import WebNav from './nav/WebNav'
import style from './web-header.module.scss'
import TopLogo from "../../layout/header/top-logo/TopLogo"

export type Header = {
    isLoggedIn: boolean
    handleLoginBtn: () => void
    userEmail: string
}

const WebHeader = ({isLoggedIn, handleLoginBtn, userEmail}: Header) => {

    return (
        <header className={style.header}>
            <nav className={style.bar}>
                <TopLogo/>
                <WebNav
                    isLoggedIn={isLoggedIn}
                    handleLoginBtn={handleLoginBtn}
                    userEmail={userEmail}
                />
            </nav>
        </header>
    )
}

export default WebHeader