import { withTranslation } from '@i18n'
import { useDispatch, useSelector } from 'react-redux'
import style from './social.module.scss'
import { GoogleLogin } from '../google-login/GoogleLogin'
import { FacebookLoginBtn } from '../facebook-login/FacebookLoginBtn'
import { LinkedinLogin } from '../linkedin-login/LinkedinLogin'
import { socialAuth } from '../../../../actions/api/socialAuthAPI'
import { globalStoreType } from '../../../../typings/types'

export type Provider = 'google' | 'facebook' | 'linkedin'
export type SocialAuthData<T> = T
export type GoogleAuthData = {
    id_token: string
}
export type FacebookAuthData = {
    accessToken: string
}
export type LinkedinAuthData = {
    authCode: string
    redirectUri: string
}

const SocialAuth = ({ t }) => {
    const isEnabled = true
    const dispatch = useDispatch()
    const { apiErrorMsg } = useSelector((state: globalStoreType) => state.app)

    return (
        <div className={style.wrapper}>
            <div className={style.desc}>{t('signin:or_continue_with')}</div>
            <div className={style.buttons}>
                <div className={style.item}>
                    <GoogleLogin isEnabled={isEnabled} handleLogin={socialAuthHandle} />
                </div>
                <div className={style.item}>
                    <FacebookLoginBtn handleLogin={socialAuthHandle} isEnabled={isEnabled} />
                </div>
                <div className={style.item}>
                    <LinkedinLogin isEnabled={isEnabled} />
                </div>
            </div>
            {apiErrorMsg && <div className="item-explain danger">{apiErrorMsg}</div>}
        </div>
    )

    function socialAuthHandle<T>(data: T, provider): void {
        dispatch(socialAuth(data, provider))
    }
}

export default withTranslation('signin')(SocialAuth)
