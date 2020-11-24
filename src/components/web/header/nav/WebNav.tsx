import React, { useState, useEffect } from 'react'
import { Link, withTranslation } from '@i18n'
import { useRouter } from 'next/router'
import style from './web-nav.module.scss'
import PopoverUser from '../../../layout/header/popover-user/PopoverUser'

export interface INavigation {
    handleLoginBtn: () => void
    isLoggedIn: boolean
    userEmail: string
    navLinks: { title: string, path: string, icon?: React.ReactElement }[]
    t?: any
}

const WebNav = ({ handleLoginBtn, isLoggedIn, userEmail, navLinks, t }: INavigation) => {
    const router = useRouter()
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        setLogged(isLoggedIn)
    }, [isLoggedIn])

    const MainNav = () => {
        return (
            <nav>
                <ul className={`${style.list} ${style.nav}`}>
                    {navLinks.map(({ title, path }) => (
                        <li className={router.pathname === path ? style.active : ''} key={title}>
                            <Link href={path}>
                                <a className={style.link}>{title}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }

    return (
        <div className={style.wrapper}>
            <MainNav />
            {logged ? (
                <div className={style.user}>
                    <PopoverUser userEmail={userEmail} logoutHandle={handleLoginBtn} />
                </div>
            ) : (
                <ul className={`${style.list} ${style.auth}`}>
                    <li>
                        <Link href="/signin">
                            <a className={style.link}>{t('common:buttons.signin')}</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/registration">
                            <a className={style.link}>{t('common:buttons.signup')}</a>
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default withTranslation('common')(WebNav)
