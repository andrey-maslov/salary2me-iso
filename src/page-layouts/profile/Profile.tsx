import Layout from "../../components/layout/Layout"
import Head from "next/head"
import {withTranslation} from '@i18n'
import UserProfile from "./user-profile/UserProfile"

type ProfileType = {
    t: any
}

const Profile = ({t}: ProfileType) => {
    return (
        <>
            <Head>
                <meta name="description" content={t('meta.description')}/>
                <title>{t('meta.title')}</title>
            </Head>
            <div className='page-profile page bg-grey'>
                <Layout>
                    <div className="container section">
                        <UserProfile/>
                    </div>
                </Layout>
            </div>
        </>
    )
}

export default withTranslation('profile')(Profile)