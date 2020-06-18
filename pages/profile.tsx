import {ProfileLayout} from '../page-layouts'

export default function Profile(userAgent) {

    console.log(userAgent)
    return (
        <ProfileLayout />
    )
}

Profile.getInitialProps = async ({ req }) => {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
}