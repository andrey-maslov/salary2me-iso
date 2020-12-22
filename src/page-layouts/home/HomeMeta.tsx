import { withTranslation } from '@i18n'
import Head from 'next/head'
import { HOST, SITE_TITLE } from '../../constants/constants'

type HomeMetaType = {
    t: any
}

const HomeMeta = ({ t }: HomeMetaType) => {
    return (
        <Head>
            <title>{`${t('main:meta.title')} - ${SITE_TITLE}`}</title>
            <meta name="description" content={t('main:meta.description')} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`${t('main:meta.title')} - ${SITE_TITLE}`} />
            <meta property="og:site_name" content="" />
            <meta property="og:url" content={HOST} />
            <meta property="og:image" content="/img/social.jpg" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${t('main:meta.title')} - ${SITE_TITLE}`} />
            <meta
                name="twitter:description"
                content={t('main:meta.description')}
            />
            <meta name="twitter:site" content={HOST} />
            <meta name="twitter:image" content="/img/social.jpg" />
        </Head>
    )
}

export default withTranslation('main')(HomeMeta)
