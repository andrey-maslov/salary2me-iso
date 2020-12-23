import { SignupLayout } from '../../page-layouts'

function Registration() {
    return <SignupLayout />
}

Registration.getInitialProps = async ({ req }) => {
    return { namespacesRequired: ['signin', 'common'] }
}

export default Registration
