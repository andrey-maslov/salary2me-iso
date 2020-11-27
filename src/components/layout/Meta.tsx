import Head from 'next/head'
import { withTranslation } from '@i18n'

type MetaType = {
    t: any
}

// TODO fixme, see https://github.com
const Meta: React.FC<MetaType> = ({ t }) => {
    return (
        <Head>
            <meta name="msapplication-TileColor" content="#000000" />
            <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
            <meta name="theme-color" content="#000" />
            <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
            <meta property="og:image" content="HOME_OG_IMAGE_URL" />
        </Head>
    )
}

export default withTranslation('common')(Meta)
