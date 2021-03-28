import { withTranslation } from '@i18n'
import Head from 'next/head'
import { HOST, SITE_TITLE } from '../constants/constants'

type HomeMetaType = {
    t: any
}

const MetaCommon = ({ t }: HomeMetaType) => {
    return (
        <Head>
            <meta name="description" content={t('main:meta.description')} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`${t('main:meta.title')} - ${SITE_TITLE}`} />
            <meta property="og:site_name" content={SITE_TITLE} />
            <meta property="og:url" content={HOST} />
            <meta property="og:image" content={`${HOST}'/img/social.jpg`} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${t('main:meta.title')} - ${SITE_TITLE}`} />
            <meta name="twitter:description" content={t('main:meta.description')} />
            <meta name="twitter:site" content={HOST} />
            <meta name="twitter:image" content={`${HOST}'/img/social.jpg`} />
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
                {/* Google Tag Manager (noscript) */}
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MFLMKPZ"
                      height="0" width="0" style="display:none;visibility:hidden"></iframe>`
                    }}
                />
                {/* End Google Tag Manager (noscript) */}
            </>
        </Head>
    )
}

export default withTranslation('main')(MetaCommon)
