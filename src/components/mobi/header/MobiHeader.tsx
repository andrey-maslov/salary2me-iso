import React, { useState } from 'react'
import MobiNav from './nav/MobiNav'
import MobileNavToggle from './nav-toggle/NavToggle'
import { Header } from '../../web/header/WebHeader'
import style from './mobi-header.module.scss'
import LangSwitcher from '../../common/buttons/lang-switcher/LangSwitcher'
import TopLogo from '../../layout/header/top-logo/TopLogo'
import { isBrowser } from '../../../helper/helper'

const MobiHeader = ({ isLoggedIn }: Header) => {
    const [isMobiNavOpened, setMobiNav] = useState(false)

    const mobileNavOpen = (): any => {
        setMobiNav(true)
        if (isBrowser) {
            document.body.classList.add('menu-opened')
        }
    }

    const mobileNavClose = (): void => {
        setMobiNav(false)
        if (isBrowser) {
            document.body.classList.remove('menu-opened')
        }
    }

    return (
        <header className={style.header}>
            <div className="container">
                <div className={style.bar}>
                    <MobileNavToggle handler={mobileNavOpen} />
                    <TopLogo />
                    <LangSwitcher />
                </div>
            </div>
            <MobiNav isLoggedIn={isLoggedIn} close={mobileNavClose} isOpened={isMobiNavOpened} />
        </header>
    )
}

export default MobiHeader
