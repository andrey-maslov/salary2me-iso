import { ConfirmEmailLayout } from '../page-layouts'

function ConfirmEmail(props) {
    return <ConfirmEmailLayout {...props} />
}

ConfirmEmail.getInitialProps = async () => ({
    namespacesRequired: ['signin']
})

export default ConfirmEmail
