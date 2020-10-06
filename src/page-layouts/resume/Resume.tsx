import Layout from "../../components/layout/Layout"
import {withTranslation} from '@i18n'
import Head from "next/head"

type ProfileType = {
    t: any
}

const Resume = ({t}: ProfileType) => {
    return (
        <>
            <Head>
                <meta name="description" content={t('meta.description')}/>
                <title>{t('meta.title')}</title>
            </Head>
            <div className='page-profile page bg-grey'>
                <Layout>
                    <div className="container section">
                        <h1>RESUME</h1>
                    </div>
                </Layout>
            </div>
        </>
    )
}

export default withTranslation('profile')(Resume)