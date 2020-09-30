import {SigninLayout} from '../../page-layouts'

function Forgot({...props}) {

    return (
        <SigninLayout {...props} />
    )
}

Forgot.getInitialProps = async () => ({
    namespacesRequired: ['signin', 'common'],
})

export default Forgot