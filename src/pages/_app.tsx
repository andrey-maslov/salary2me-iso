import { Provider } from 'react-redux'
import App from 'next/app'
import '../assets/scss/index.scss'
import { appWithTranslation } from '@i18n'
import 'focus-visible/dist/focus-visible.js'
import { ToastProvider } from 'react-toast-notifications'
import { useStore } from '../store'
import { SVGSource } from '../components/common/media/svgflag/SVGFlag'
import ScrollToTop from '../components/common/ScrollToTop'

function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)

    return (
        <Provider store={store}>
            <ToastProvider autoDismiss autoDismissTimeout={5000} placement="bottom-left">
                <ScrollToTop />
                <Component {...pageProps} />
                <SVGSource />
            </ToastProvider>
        </Provider>
    )
}

MyApp.getInitialProps = async appContext => {
    return { ...(await App.getInitialProps(appContext)) }
}

export default appWithTranslation(MyApp)
