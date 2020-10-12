import { ProfileLayout } from '../page-layouts'
import { getCookie } from '../helper/cookie'

function Profile() {
    return <ProfileLayout />
}

Profile.getInitialProps = async ctx => {
    const token = getCookie('token', ctx.req)
    return {
        namespacesRequired: ['profile', 'common']
    }
}

export default Profile
