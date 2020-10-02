import {ProfileLayout} from '../page-layouts'
import {initializeStore} from "../store";

function Profile(props) {
    console.log(props)
    return (
        <ProfileLayout />
    )
}

// Profile.getInitialProps = async (ctx) => {
//     const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
//     return { userAgent, namespacesRequired: ['profile', 'common'] }
// }

export function getServerSideProps() {
    const reduxStore = initializeStore()
    // console.log('store', reduxStore.getState())
    return {props: {initialState: reduxStore.getState(), namespacesRequired: ['profile', 'common']}}
}

export default Profile