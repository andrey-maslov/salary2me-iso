import { useEffect } from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import Router from 'next/router'
import '../assets/scss/index.scss'
import { appWithTranslation } from '@i18n'
import 'focus-visible/dist/focus-visible.js'
import { ToastProvider } from 'react-toast-notifications'
import { useStore } from '../store'
import { SVGSource } from '../components/common/media/svgflag/SVGFlag'
import ScrollToTop from '../components/common/ScrollToTop'
import { getCookie } from '../helper/cookie'
import CookieConsent from '../components/layout/modals/cookie-consent/CookieConsent'
import { GTMPageView } from '../helper/gmt'

function MyApp({ Component, pageProps, isConsented }) {
    const store = useStore(pageProps.initialReduxState)

    // Initiate GTM
    useEffect(() => {
        if (process.env.PRODUCTION) {
            const handleRouteChange = (url: string) => GTMPageView(url)
            Router.events.on('routeChangeComplete', handleRouteChange)
            return () => {
                Router.events.off('routeChangeComplete', handleRouteChange)
            }
        }
    }, [])

    return (
        <Provider store={store}>
            <ToastProvider autoDismiss autoDismissTimeout={5000} placement="bottom-left">
                <ScrollToTop />
                <Component {...pageProps} />
                <SVGSource />
                {!isConsented && <CookieConsent />}
            </ToastProvider>
        </Provider>
    )
}

MyApp.getInitialProps = async appContext => {
    const isConsented = Boolean(getCookie('cookie-consent', appContext.ctx.req))
    return { ...(await App.getInitialProps(appContext)), isConsented }
}

export default appWithTranslation(MyApp)
