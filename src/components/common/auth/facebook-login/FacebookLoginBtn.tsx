import { FaFacebookF } from 'react-icons/fa'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Button from '../../buttons/button/Button'
import { LoginBtnProps } from '../google-login/GoogleLogin'
import { FacebookAuthData } from '../social-auth/SocialAuth'

export const FacebookLoginBtn: React.FC<LoginBtnProps<FacebookAuthData>> = ({ handleLogin, isEnabled }) => {

    const responseFacebook = (response: any) => {
        const { accessToken } = response
        console.log('facebook handler')
        // handleLogin({ accessToken }, 'facebook')
    }

    const handleFailure = (response: any) => {
        console.log('facebook auth failure')
        // dispatch({ type: SET_ERROR, apiErrorMsg: 'facebook auth failure' })
    }

    return (
        <FacebookLogin
            appId={process.env.FACEBOOK_APP_ID}
            fields="name,email,picture"
            callback={responseFacebook}
            onFailure={handleFailure}
            autoLoad={false}
            render={(renderProps: any) => (
                <Button
                    handle={renderProps.onClick}
                    btnClass="btn btn-facebook"
                    title=""
                    startIcon={<FaFacebookF />}
                    isEnabled={isEnabled}
                />
            )}
        />
    )
}
