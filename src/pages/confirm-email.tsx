import { ConfirmEmailLayout } from '../page-layouts'

function ConfirmEmail(props) {
    return <ConfirmEmailLayout {...props} />
}

ConfirmEmail.getInitialProps = async () => ({
    namespacesRequired: ['profile']
})

export default ConfirmEmail
