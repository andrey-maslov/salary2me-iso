import {Provider} from 'react-redux';
import {useStore} from '../store';
import '../assets/scss/index.scss';
import { appWithTranslation } from '../i18n';
import {SVGSource} from "../components/common/media/svgflag/SVGFlag";
import Head from "next/head";

function App({Component, pageProps, t}) {
    const store = useStore(pageProps.initialReduxState)

    return (
        <Provider store={store}>
            <div className="app-wrapper">
                <Component {...pageProps} />
                <SVGSource/>
            </div>
        </Provider>
    )
}

// @ts-ignore
export default appWithTranslation(App);