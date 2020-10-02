import {SigninLayout} from '../../page-layouts'

function Registration() {

    return <SigninLayout />
}

Registration.getInitialProps = async ({ req }) => {
    return { namespacesRequired: ['signin', 'common'] }
}

export default Registration