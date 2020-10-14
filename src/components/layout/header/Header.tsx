import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { useMediaPredicate } from 'react-media-hook'
import { useDeviceDetect } from '../../../helper/useDeviceDetect'
import { logOut, checkAuth } from '../../../actions/actionCreator'
import MobiHeader from '../../mobi/header/MobiHeader'
import WebHeader from '../../web/header/WebHeader'
import { globalStoreType } from '../../../typings/types'
import { REDIRECT_URL } from '../../../actions/actionTypes'

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
    }, [currentRoute])
    // const mobile = Boolean(agent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop|XiaoMi|MiuiBrowser/))
    const handleLoginBtn = () => {
        if (isLoggedIn) {
            dispatch(logOut())
            if (router.pathname === '/profile') {
                router.push('/')
            }
        }
    }

    return (
        <>
            {isMobile ? (
                <MobiHeader
                    isLoggedIn={isLoggedIn}
                    handleLoginBtn={handleLoginBtn}
                    userEmail={email}
                />
            ) : (
                <WebHeader
                    isLoggedIn={isLoggedIn}
                    handleLoginBtn={handleLoginBtn}
                    userEmail={email}
                />
            )}
        </>
    )
}

export default Header
