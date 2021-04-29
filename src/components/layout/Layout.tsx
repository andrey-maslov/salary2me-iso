import Head from 'next/head'
import { useRouter } from 'next/router'
import { withTranslation, i18n } from '@i18n'
import Footer from './footer/Footer'
import Header from './header/Header'
import Meta from './Meta'
import Modals from './modals/Modals'
import { accentColor, HOST, SITE_TITLE } from '../../constants/constants'

function Layout({ children, t }) {
    const { pathname } = useRouter()
    const mode = pathname === '/test' ? 'test' : 'common'

    const meta = {
        test: {
            title: t('test:page.meta_title'),
            desc: t('test:page.meta_desc'),
            url: `${HOST}/test`
        },
        common: {
            title: t('common:meta.title'),
            desc: t('common:meta.description'),
            url: HOST
        }
    }

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width,height=device-height,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover" />
                <meta name="description" content={t('common:meta.description')} />
                <meta property="og:site_name" content={SITE_TITLE} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={meta[mode].url} />
                <meta property="og:title" content={`${meta[mode].title} - ${SITE_TITLE}`} />
                <meta property="og:description" content={meta[mode].desc} />
                <meta property="og:image" content={`${HOST}/img/default.jpg`} />
                <meta property="og:locale" content={i18n.language} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${meta[mode].title} - ${SITE_TITLE}`} />
                <meta name="twitter:description" content={meta[mode].desc} />
                <meta name="twitter:site" content={SITE_TITLE} />
                <meta name="twitter:url" content={meta[mode].url} />
                <meta name="twitter:image" content={`${HOST}/img/default.jpg`} />
                <meta name="theme-color" content={accentColor} />
                {process.env.PRODUCTION && (
                    <>
                        {/* Google Tag Manager */}
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                })(window,document,'script','dataLayer','GTM-MFLMKPZ');`
                            }}
                        />
                        {/* End Google Tag Manager */}
                    </>
                )}
            </Head>
            {process.env.PRODUCTION && (
                <>
                    {/* Google Tag Manager noscript */}
                    <noscript
                        dangerouslySetInnerHTML={{
                            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MFLMKPZ"
                      height="0" width="0" style="display:none;visibility:hidden"></iframe>`
                        }}
                    />
                    {/* End Google Tag Manager noscript */}
                </>
            )}
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
