import {Provider} from 'react-redux';
import {useStore} from '../store';
import '../assets/scss/index.scss';
import {appWithTranslation} from '../i18n';
import {SVGSource} from "../components/common/media/svgflag/SVGFlag";
import Head from "next/head";

function App({Component, pageProps, t}) {
    const store = useStore(pageProps.initialReduxState)

    console.log(pageProps)

    return (
        <Provider store={store}>
            <Component {...pageProps} />
            <SVGSource/>
        </Provider>
    )
}

// @ts-ignore
export default appWithTranslation(App);