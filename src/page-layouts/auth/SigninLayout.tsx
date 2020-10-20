import Head from 'next/head'
import { withTranslation } from '@i18n'
import Layout from '../../components/layout/Layout'
import Auth from '../../components/common/auth/Auth'

type LoginType = {
    t: any
}

const SigninLayout: React.FC<LoginType> = ({ t }) => {
    return (
        <>
            <Head>
                <meta name="description" content={t('meta.description')} />
                <title>{t('meta.title')}</title>
            </Head>
            <div className="signin-page page">
                <Layout>
                    <section className="section main flex-centered">
                        <Auth />
                    </section>
                </Layout>
            </div>
        </>
    )
}

export default withTranslation('signin')(SigninLayout)
