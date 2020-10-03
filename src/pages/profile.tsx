import {ProfileLayout} from '../page-layouts'
//import {initializeStore} from "../store";

function Profile() {
    return (
        <ProfileLayout />
    )
}

Profile.getInitialProps = async (ctx) => {
    const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
    return { userAgent, namespacesRequired: ['profile', 'common'] }
}

export default Profile