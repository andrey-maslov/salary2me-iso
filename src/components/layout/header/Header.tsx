import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { useMediaPredicate } from 'react-media-hook'
import { useDeviceDetect } from '../../../helper/useDeviceDetect'
import { logOut, checkAuth } from '../../../actions/actionCreator'
import { globalStoreType } from '../../../typings/types'
import { REDIRECT_URL } from '../../../actions/actionTypes'
import style from './header.module.scss'
import LangSwitcher from '../../common/buttons/lang-switcher/LangSwitcher'
import MobiNav from '../../mobi/header/nav/MobiNav'
import TopLogo from './top-logo/TopLogo'
import WebNav from '../../web/header/nav/WebNav'

const Header: React.FC = () => {
    const { isLoggedIn, email } = useSelector((state: globalStoreType) => state.user)
    const dispatch = useDispatch()
    const smallDevice = useMediaPredicate('(max-width: 992px)')
    const { isMobile } = useDeviceDetect()
    const router = useRouter()
    const currentRoute = router.pathname

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(checkAuth())
        }
    }, [dispatch, isLoggedIn, isMobile, smallDevice])

    useEffect(() => {
        const isSigninPage = Boolean(currentRoute.match(/signin/))
        const isSignupPage = Boolean(currentRoute.match(/registration/))
        if (!isSigninPage && !isSignupPage) {
            dispatch({ type: REDIRECT_URL, redirectUrl: currentRoute })
        }
    }, [currentRoute, dispatch])

    const handleLogoutBtn = () => {
        if (isLoggedIn) {
            dispatch(logOut())
            if (router.pathname === '/profile') {
                router.push('/')
            }
        }
    }

    return (
        <header className={style.header}>
            <div className={style.bar}>
                <TopLogo/>
                {isMobile ? (
                    <>
                        <MobiNav isLoggedIn={isLoggedIn} handleLogoutBtn={handleLogoutBtn}/>
                    </>
                ) : (
                    <>
                        <WebNav
                            isLoggedIn={isLoggedIn}
                            handleLoginBtn={handleLogoutBtn}
                            userEmail={email}
                        />
                        <LangSwitcher/>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header
