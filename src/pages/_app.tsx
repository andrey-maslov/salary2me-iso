import { Provider, useDispatch } from 'react-redux'
import axios from 'axios'
import App from 'next/app'
import '../assets/scss/index.scss'
import { appWithTranslation } from '@i18n'
import 'focus-visible/dist/focus-visible.js'
import { ToastProvider } from 'react-toast-notifications'
import { useStore } from '../store'
import { SVGSource } from '../components/common/media/svgflag/SVGFlag'
import ScrollToTop from '../components/common/ScrollToTop'
import { getCookieFromBrowser, getCookie } from '../helper/cookie'
import { addAuthData, checkAuth } from '../actions/actionCreator'

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
    // const token = getCookie('token', appContext.ctx.req)
    // if (token) {
    //     const url = `${process.env.BASE_API}/api/v${process.env.API_VER}/Account`
    //     axios
    //         .get(url, {
    //             headers: {
    //                 authorization: token
    //             }
    //         })
    //         .then(res => {
    //             appContext.store.dispatch(
    //                 addAuthData({
    //                     ...res.data,
    //                     email: res.data.username
    //                 })
    //             )
    //         })
    // }
    return { ...(await App.getInitialProps(appContext)) }
}

export default appWithTranslation(MyApp)
