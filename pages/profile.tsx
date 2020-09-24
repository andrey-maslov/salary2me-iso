import {ProfileLayout} from '../page-layouts'

function Profile() {

    return (
        <ProfileLayout />
    )
}

Profile.getInitialProps = async ({ req }) => {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent, namespacesRequired: ['profile', 'common'] }
}

export default Profile