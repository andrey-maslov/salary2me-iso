import {SigninLayout} from '../../page-layouts'

function Signin({...props}) {

    return (
        <SigninLayout {...props} />
    )
}

Signin.getInitialProps = async () => ({
    namespacesRequired: ['signin', 'common'],
})

export default Signin