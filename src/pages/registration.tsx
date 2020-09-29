import {LoginLayout} from '../page-layouts'

function Registration() {

    return <LoginLayout />
}

Registration.getInitialProps = async ({ req }) => {
    return { namespacesRequired: ['login', 'common'] }
}

export default Registration