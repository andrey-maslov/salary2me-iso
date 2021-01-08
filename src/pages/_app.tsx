import { Provider } from 'react-redux'
import App from 'next/app'
import '../assets/scss/index.scss'
import { appWithTranslation } from '@i18n'
import 'focus-visible/dist/focus-visible.js'
import { ToastProvider } from 'react-toast-notifications'
import { useStore } from '../store'
import { SVGSource } from '../components/common/media/svgflag/SVGFlag'
import ScrollToTop from '../components/common/ScrollToTop'
import { getCookieFromServer } from '../helper/cookie'
import CookieConsent from '../components/layout/modals/cookie-consent/CookieConsent'

function MyApp({ Component, pageProps, isConsented }) {
    const store = useStore(pageProps.initialReduxState)

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
    const isConsented = Boolean(getCookieFromServer('cookie-consent', appContext.ctx.req))
    return { ...(await App.getInitialProps(appContext)), isConsented }
}

export default appWithTranslation(MyApp)
