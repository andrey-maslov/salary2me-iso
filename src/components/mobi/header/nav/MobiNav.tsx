import { Link, withTranslation } from '@i18n'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { SITE_TITLE } from '../../../../constants/constants'
import style from './mobi-nav.module.scss'
import Button from '../../../common/buttons/button/Button'
import { isBrowser } from '../../../../helper/helper'
import MobileNavToggle from '../nav-toggle/NavToggle'
import LangSwitcher from '../../../common/buttons/lang-switcher/LangSwitcher'
import { INavigation } from '../../../web/header/nav/WebNav'

interface MobiNavigation extends INavigation {
    handleLogoutBtn: () => void
}

const MobiNav = ({ isLoggedIn, handleLogoutBtn, navLinks, t }: MobiNavigation) => {
    const router = useRouter()

    const [isVisible, setVisible] = useState(false)

    useEffect(() => {
        if (isBrowser && isVisible) {
            document.body.classList.add('menu-opened')
        } else if (isBrowser && !isVisible) {
            document.body.classList.remove('menu-opened')
        }
    }, [isVisible])

    return (
        <>
            <MobileNavToggle handler={() => setVisible(true)} />
            <div className={`${style.overlay} ${isVisible ? style.opened : ''} mobile-nav-overlay`}>
                <nav className={`${style.wrapper} mobile-nav-wrapper`}>
                    <h5 className={style.title}>
                        Salary2<span className="color-accent">me</span>
                    </h5>
                    <ul className={style.nav}>
                        {navLinks.map(({ title, path, icon }) => (
                            <li
                                className={`${style.item} ${
                                    router.pathname === path ? style.active : ''
                                }`}
                                key={title}>
                                <Link href={path}>
                                    <a className={style.link}>
                                        {icon}
                                        {title}
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul className={style.auth}>
                        {isLoggedIn ? (
                            <li>
                                <Button
                                    title="Log Out"
                                    btnClass="btn btn-outlined"
                                    handle={handleLogoutBtn}
                                />
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link href="/signin">
                                        <a className="btn btn-accent">
                                            {t('common:buttons.signin')}
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/registration">
                                        <a className="btn btn-outlined">
                                            {t('common:buttons.signup')}
                                        </a>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className={style.footer}>
                        <div className={style.copy}>
                            © {new Date().getFullYear()} | {SITE_TITLE}
                        </div>
                        <LangSwitcher />
                    </div>
                </nav>
                <div className={style.closure} onClick={() => setVisible(false)} />
            </div>
        </>
    )
}

export default withTranslation('common')(MobiNav)
