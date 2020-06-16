import Layout from "../components/layout/Layout";
import Auth from '../components/common/auth/Auth'
import Head from "next/head";
import {withTranslation} from '@i18n';

type LoginType = {
    t: any
}

const Login: React.FC<LoginType> = ({t, ...props}) => {
    return (
        <>
            <Head>
                <meta name="description" content={t('meta.description')} />
                <title>{t('meta.title')}</title>
            </Head>
            <div className='login-page page'>
                <Layout>
                    <div className="container">
                        <Auth/>
                    </div>
                </Layout>
            </div>
        </>
    )
}

export default withTranslation('login')(Login);