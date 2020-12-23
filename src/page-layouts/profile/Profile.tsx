import Head from 'next/head'
import { withTranslation } from '@i18n'
import Layout from '../../components/layout/Layout'
import UserProfile from './user-profile/UserProfile'
import { SITE_TITLE } from '../../constants/constants'

type ProfileType = {
    t: any
}

const Profile = ({ t }: ProfileType) => {
    return (
        <>
            <Head>
                <title>
                    {t('profile:title')} - {SITE_TITLE}
                </title>
            </Head>
            <div className="page-profile page bg-grey">
                <Layout>
                    <div className="container section">
                        <UserProfile />
                    </div>
                </Layout>
            </div>
        </>
    )
}

export default withTranslation('profile')(Profile)
