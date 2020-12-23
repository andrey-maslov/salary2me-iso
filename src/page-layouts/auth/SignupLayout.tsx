import Head from 'next/head'
import { withTranslation } from '@i18n'
import Layout from '../../components/layout/Layout'
import Auth from '../../components/common/auth/Auth'
import { SITE_TITLE } from '../../constants/constants'

type LoginType = {
    t: any
}

const SignupLayout: React.FC<LoginType> = ({ t }) => {
    return (
        <>
            <Head>
                <title>{`${t('signin:signup')} - ${SITE_TITLE}`}</title>
            </Head>
            <div className="signup-page page">
                <Layout>
                    <section className="section main flex-centered">
                        <Auth />
                    </section>
                </Layout>
            </div>
        </>
    )
}

export default withTranslation('signin')(SignupLayout)
