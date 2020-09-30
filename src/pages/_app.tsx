import {Provider} from 'react-redux'
import {useStore} from '../store/index'
import App from 'next/app'
import '../assets/scss/index.scss'
import {appWithTranslation} from '@i18n'
import {SVGSource} from "../components/common/media/svgflag/SVGFlag"
import 'focus-visible/dist/focus-visible.js'

import {MediaContextProvider} from "../../media"
import Head from "next/head";

function MyApp({Component, pageProps}) {
    const store = useStore(pageProps.initialReduxState)

    return (
        <MediaContextProvider>
            <Provider store={store}>
                <Component {...pageProps} />
                <SVGSource/>
            </Provider>
        </MediaContextProvider>
    )
}
MyApp.getInitialProps = async (appContext) => ({ ...await App.getInitialProps(appContext) })

export default appWithTranslation(MyApp)