import Head from 'next/head'
import { withTranslation, i18n } from '@i18n'
import Footer from './footer/Footer'
import Header from './header/Header'
import Meta from './Meta'
import Modals from './modals/Modals'
import { accentColor, HOST, SITE_TITLE } from '../../constants/constants'

function Layout({ children, t }) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width,height=device-height,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover" />
                <meta name="description" content={t('common:meta.description')} />
                <meta property="og:site_name" content={SITE_TITLE} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={HOST} />
                <meta property="og:title" content={`${t('common:meta.title')} - ${SITE_TITLE}`} />
                <meta property="og:description" content={t('common:meta.description')} />
                <meta property="og:image" content={`${HOST}/img/default.jpg`} />
                <meta property="og:locale" content={i18n.language} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${t('common:meta.title')} - ${SITE_TITLE}`} />
                <meta name="twitter:description" content={t('common:meta.description')} />
                <meta name="twitter:site" content={SITE_TITLE} />
                <meta name="twitter:url" content={HOST} />
                <meta name="twitter:image" content={`${HOST}/img/default.jpg`} />
                <meta name="theme-color" content={accentColor} />
            </Head>
            <div className="app-wrapper">
                <Meta />
                <Header />
                <main className="main">{children}</main>
                <Footer />
                <Modals />
            </div>
        </>
    )
}

export default withTranslation('common')(Layout)
