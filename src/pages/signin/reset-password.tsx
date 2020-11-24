import { SigninLayout } from '../../page-layouts'

function Reset({ ...props }) {
    return (
        <SigninLayout {...props} />
    )
}

Reset.getInitialProps = async () => ({
    namespacesRequired: ['signin', 'common']
})

export default Reset
