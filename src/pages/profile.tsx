import { ProfileLayout } from '../page-layouts'

function Profile() {
    return <ProfileLayout />
}

Profile.getInitialProps = async ctx => {
    return {
        namespacesRequired: ['profile', 'common']
    }
}

export default Profile
