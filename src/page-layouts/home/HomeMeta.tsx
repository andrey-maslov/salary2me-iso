import { withTranslation } from '@i18n'
import Head from 'next/head'

type HomeMetaType = {
    t: any
}

const HomeMeta = ({ t }: HomeMetaType) => {
    return (
        <Head>
            <meta name="description" content={t('main:meta.description')} />
            <title>{t('main:meta.title')}</title>

            <meta name="description" content="" />
            <title>some title</title>
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Know your market rate - Salary2.me" />
            <meta
                property="og:site_name"
                content="Free service of CV instant AI analytics with results for multiple cities. Also service helps you to find a job. Know your resume rate!"
            />
            <meta property="og:url" content={process.env.HOST} />
            <meta property="og:image" content="/img/social.jpg" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Know your market rate - Salary2.me" />
            <meta
                name="twitter:description"
                content="Free service of CV instant AI analytics with results for multiple cities. Also service helps you to find a job. Know your resume rate!"
            />
            <meta name="twitter:site" content={process.env.HOST} />
            <meta name="twitter:image" content="/img/social.jpg" />
        </Head>
    )
}

export default withTranslation('main')(HomeMeta)
