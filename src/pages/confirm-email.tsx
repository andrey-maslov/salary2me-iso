import { ConfirmEmailLayout } from '../page-layouts'

function ConfirmEmail(props) {
    return <ConfirmEmailLayout {...props} />
}

ConfirmEmail.getInitialProps = async () => ({
    namespacesRequired: ['profile', 'common']
})

export default ConfirmEmail
