import {ProfileLayout} from '../page-layouts'
import {withTranslation} from "@i18n";

function Profile(userAgent) {

    // console.log(userAgent)
    return (
        <ProfileLayout />
    )
}

Profile.getInitialProps = async ({ req }) => {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent, namespacesRequired: ['profile', 'common'] }
}

export default Profile