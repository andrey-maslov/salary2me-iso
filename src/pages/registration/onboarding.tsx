import {SigninLayout} from '../../page-layouts'

function RegistrationInfo() {

    return <SigninLayout />
}

RegistrationInfo.getInitialProps = async ({ req }) => {
    return { namespacesRequired: ['signin', 'common'] }
}

export default RegistrationInfo