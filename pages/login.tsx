import {LoginLayout} from '../page-layouts'

function Login({...props}) {

    return (
        <>
            <LoginLayout {...props} />
        </>
    )
}

Login.getInitialProps = async () => ({
    namespacesRequired: ['auth', 'common'],
})

export default Login