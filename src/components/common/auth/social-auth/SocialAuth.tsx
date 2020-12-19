import { withTranslation } from '@i18n'
import style from './social.module.scss'
import { GoogleLogin } from '../google-login/GoogleLogin'
import { FacebookLoginBtn } from '../facebook-login/FacebookLoginBtn'
import { LinkedinLogin } from '../linkedin-login/LinkedinLogin'

const SocialAuth = ({ t }) => {
    const isEnabled = true

    return (
        <div className={style.wrapper}>
            <div className={style.desc}>{t('signin:or_continue_with')}</div>
            <div className={style.buttons}>
                <div className={style.item}>
                    <GoogleLogin handleLogin={() => console.log('google')} isEnabled={isEnabled} />
                </div>
                <div className={style.item}>
                    <FacebookLoginBtn
                        handleLogin={() => console.log('facebook')}
                        isEnabled={isEnabled}
                    />
                </div>
                <div className={style.item}>
                    <LinkedinLogin isEnabled={isEnabled} />
                </div>
            </div>
        </div>
    )
}

export default withTranslation('signin')(SocialAuth)
