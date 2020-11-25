import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { useMediaPredicate } from 'react-media-hook'
import { FiCheckCircle, FiHome, FiSettings } from 'react-icons/fi'
import { withTranslation } from '@i18n'
import { useDeviceDetect } from '../../../helper/useDeviceDetect'
import { logOut, checkAuth, getCurrencyRates } from '../../../actions/actionCreator'
import { globalStoreType } from '../../../typings/types'
import { CLEAR_CV_DATA, CLEAR_TEST_DATA, REDIRECT_URL } from '../../../actions/actionTypes'
import style from './header.module.scss'
import LangSwitcher from '../../common/buttons/lang-switcher/LangSwitcher'
import MobiNav from '../../mobi/header/nav/MobiNav'
import TopLogo from './top-logo/TopLogo'
import WebNav from '../../web/header/nav/WebNav'

const Header = ({ t }) => {
    const { isLoggedIn, email } = useSelector((state: globalStoreType) => state.user)
    const dispatch = useDispatch()
    const smallDevice = useMediaPredicate('(max-width: 992px)')
    const { isMobile } = useDeviceDetect()
    const router = useRouter()
    const currentRoute = router.pathname
    const { testData } = useSelector((state: globalStoreType) => state.test)
    const [testLink, setTestLink] = useState('/test')

    useEffect(() => {
        dispatch(getCurrencyRates())
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

    useEffect(() => {
        if (testData) {
            setTestLink('/test/result')
        }
    }, [testData])

    const navLinks = [
        { title: t('common:nav.home'), path: '/', icon: <FiHome /> },
        {
            title: t('common:nav.test'),
            path: testLink,
            icon: <FiCheckCircle />
        }
    ]
    const privateLinks = [{ title: 'Account settings', path: '/profile', icon: <FiSettings /> }]
    const allLinks = isLoggedIn ? [...navLinks, ...privateLinks] : navLinks

    const handleLogoutBtn = () => {
        if (isLoggedIn) {
            dispatch(logOut())
            dispatch({ type: CLEAR_TEST_DATA })
            dispatch({ type: CLEAR_CV_DATA })
            if (router.pathname === '/profile') {
                router.push('/')
            }
        }
    }

    return (
        <header className={style.header}>
            <div className={style.bar}>
                <TopLogo />
                {isMobile ? (
                    <MobiNav
                        isLoggedIn={isLoggedIn}
                        handleLogoutBtn={handleLogoutBtn}
                        navLinks={allLinks}
                    />
                ) : (
                    <>
                        <WebNav
                            isLoggedIn={isLoggedIn}
                            handleLoginBtn={handleLogoutBtn}
                            userEmail={email}
                            navLinks={navLinks}
                        />
                        <LangSwitcher />
                    </>
                )}
            </div>
        </header>
    )
}

export default withTranslation('common')(Header)
