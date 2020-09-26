import React, {useState} from 'react';
import {FacebookLoginBtn} from "./facebook-login/FacebookLoginBtn";
import {GoogleLogin} from "./google-login/GoogleLogin";
import {LinkedinLogin} from "./linkedin-login/LinkedinLogin";
import {withTranslation, Link} from '@i18n';
import {Tooltip} from "../tooltip/Tooltip";
import Checkbox from "../inputs/checkbox/Checkbox";

import style from './auth.module.scss';
import SignInForm from "./sign-in-form/SignInForm";

// const links = {
//     terms
// }

type AuthType = {
    handleLogin: (name: string, email: string) => void
    t: (key: string, options?: any) => string
}

const Auth: React.FC<AuthType> = ({handleLogin, t}) => {

    const [isConsented, setConsent] = useState(false);

    const handleConsent = () => {
        setConsent(!isConsented)
    }

    const renderSocialLoginBtns = () => {
        return (
            <div className={style.buttons}>
                <GoogleLogin handleLogin={handleLogin} isEnabled={isConsented}/>
                <FacebookLoginBtn handleLogin={handleLogin} isEnabled={isConsented}/>
                <LinkedinLogin isEnabled={isConsented}/>
            </div>
        )
    }


    return (
        <div className={style.content}>
            <div className={style.title}>{t('create')}</div>
            {isConsented ?
                renderSocialLoginBtns()
                : <Tooltip tip={t('tip')} direction='top'>
                    {renderSocialLoginBtns()}
                </Tooltip>}
            <div className={style.consent}>
                <Checkbox handle={handleConsent} isChecked={isConsented}/>
                <div
                    className={`text-center ${style.terms}`}
                    dangerouslySetInnerHTML={{__html: t('check_terms_text')}}
                />
            </div>
            <SignInForm/>
        </div>
    );
}

export default withTranslation('auth')(Auth)